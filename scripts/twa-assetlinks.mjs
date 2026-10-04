/**
 * Writes public/.well-known/assetlinks.json from android/twa.config.json.
 *
 * Android only hides the URL bar inside the wrapper when the published site
 * serves this file and it lists the signing fingerprint of the installed APK.
 * The file therefore has to ship with the web app, not with the APK.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadTwaConfig, ROOT } from "./twa-config.mjs";

const OUT = path.join(ROOT, "public", ".well-known", "assetlinks.json");

const config = await loadTwaConfig();

if (config.fingerprints.length === 0) {
  console.error(
    "No fingerprints in android/twa.config.json — run `npm run twa:keystore` first.",
  );
  process.exit(1);
}

const statements = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: config.packageId,
      sha256_cert_fingerprints: config.fingerprints.map((f) => f.value),
    },
  },
];

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(statements, null, 2)}\n`);

console.log(`wrote ${path.relative(ROOT, OUT)}`);
console.log(`  host         https://${config.host}/.well-known/assetlinks.json`);
console.log(`  package      ${config.packageId}`);
for (const f of config.fingerprints) console.log(`  fingerprint  ${f.name} ${f.value}`);
