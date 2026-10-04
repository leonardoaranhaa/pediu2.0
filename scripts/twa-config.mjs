/**
 * Shared loader for android/twa.config.json — the single place the Android
 * wrapper's identity lives. The published host is assigned when the app is
 * published, so TWA_HOST overrides the file without editing it.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..");
export const CONFIG_PATH = path.join(ROOT, "android", "twa.config.json");

const HOST_RE = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;
const PACKAGE_RE = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/;
const SHA256_RE = /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/;

export async function loadTwaConfig() {
  const raw = JSON.parse(await readFile(CONFIG_PATH, "utf8"));
  const host = (process.env.TWA_HOST ?? raw.host ?? "").trim().toLowerCase();

  if (!HOST_RE.test(host)) {
    throw new Error(
      `Invalid host ${JSON.stringify(host)}. Set "host" in android/twa.config.json ` +
        "to the published address of the app (or pass TWA_HOST=...).",
    );
  }
  if (!PACKAGE_RE.test(raw.packageId)) {
    throw new Error(`Invalid packageId ${JSON.stringify(raw.packageId)}.`);
  }

  const fingerprints = (raw.fingerprints ?? []).map((entry) => {
    const value = String(entry.value ?? entry).toUpperCase();
    if (!SHA256_RE.test(value)) {
      throw new Error(
        `Invalid SHA-256 fingerprint ${JSON.stringify(value)}. Expected 32 ` +
          "colon-separated hex pairs, as printed by `keytool -list`.",
      );
    }
    return { name: entry.name ?? "sideload", value };
  });

  return {
    ...raw,
    host,
    fingerprints,
    startUrl: raw.startPath ?? "/",
    origin: `https://${host}`,
  };
}
