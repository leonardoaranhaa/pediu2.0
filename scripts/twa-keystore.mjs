/**
 * Creates the sideload signing key for the Android wrapper and records its
 * SHA-256 fingerprint in android/twa.config.json.
 *
 * The keystore itself is git-ignored: it is a signing key, not source. It is
 * also not disposable — the fingerprint it produces is baked into the
 * assetlinks.json served by the published site, so losing the file means
 * regenerating both the key and that file. Keep a backup outside the repo.
 *
 * A Play Store release uses a different key (Play App Signing), whose
 * fingerprint is then added alongside this one.
 */
import { execFile } from "node:child_process";
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { CONFIG_PATH, ROOT } from "./twa-config.mjs";

const run = promisify(execFile);

const raw = JSON.parse(await readFile(CONFIG_PATH, "utf8"));
const keystore = path.join(ROOT, raw.signingKey.path);
const alias = raw.signingKey.alias;
const storepass = process.env.BUBBLEWRAP_KEYSTORE_PASSWORD ?? "pediu-sideload";
const keypass = process.env.BUBBLEWRAP_KEY_PASSWORD ?? storepass;

const exists = await access(keystore).then(
  () => true,
  () => false,
);

if (exists) {
  console.log(`reusing ${path.relative(ROOT, keystore)}`);
} else {
  await run("keytool", [
    "-genkeypair",
    "-keystore", keystore,
    "-alias", alias,
    "-keyalg", "RSA",
    "-keysize", "2048",
    "-validity", "10000",
    "-storepass", storepass,
    "-keypass", keypass,
    "-dname", "CN=Pediu, O=Pediu, L=Sao Paulo, C=BR",
  ]);
  console.log(`created ${path.relative(ROOT, keystore)}`);
}

const { stdout } = await run("keytool", [
  "-list",
  "-v",
  "-keystore", keystore,
  "-alias", alias,
  "-storepass", storepass,
]);

const match = stdout.match(/SHA256:\s*((?:[0-9A-F]{2}:){31}[0-9A-F]{2})/i);
if (!match) throw new Error("keytool did not print a SHA-256 fingerprint");
const value = match[1].toUpperCase();

const others = (raw.fingerprints ?? []).filter((f) => f.name !== "sideload");
raw.fingerprints = [{ name: "sideload", value }, ...others];
await writeFile(CONFIG_PATH, `${JSON.stringify(raw, null, 2)}\n`);

console.log(`fingerprint  ${value}`);
console.log("recorded in android/twa.config.json — now run `npm run twa:assetlinks`");
