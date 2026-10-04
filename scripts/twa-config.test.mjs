import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { loadTwaConfig, ROOT } from "./twa-config.mjs";

function read(relative) {
  return readFileSync(join(ROOT, relative), "utf8");
}

test("rejects a host that is not a domain", async () => {
  process.env.TWA_HOST = "http://pediu.grok.me/";
  try {
    await assert.rejects(loadTwaConfig(), /Invalid host/);
  } finally {
    delete process.env.TWA_HOST;
  }
});

// The Android wrapper only drops the URL bar when the published site serves a
// fingerprint matching the installed APK, so these three files drifting apart
// is a silent, hard-to-debug failure.
test("published assetlinks match the signing config", async () => {
  const config = await loadTwaConfig();
  const [statement, ...rest] = JSON.parse(read("public/.well-known/assetlinks.json"));

  assert.equal(rest.length, 0);
  assert.deepEqual(statement.relation, ["delegate_permission/common.handle_all_urls"]);
  assert.equal(statement.target.namespace, "android_app");
  assert.equal(statement.target.package_name, config.packageId);
  assert.deepEqual(
    statement.target.sha256_cert_fingerprints,
    config.fingerprints.map((f) => f.value),
  );
});

test("the install page describes the APK that is actually published", async () => {
  const config = await loadTwaConfig();
  const generated = read("src/lib/android-app.ts");

  for (const value of [config.host, config.packageId, config.fingerprints[0].value]) {
    assert.ok(generated.includes(value), `src/lib/android-app.ts is missing ${value}`);
  }
  assert.ok(generated.includes('"file": "/download/pediu.apk"'));

  const apk = readFileSync(join(ROOT, "public/download/pediu.apk"));
  const bytes = Number(generated.match(/"bytes": (\d+)/)[1]);
  assert.equal(bytes, apk.length, "stale byte count — rerun `npm run twa:apk`");
  // An APK is a zip; anything else means the file was replaced by mistake.
  assert.equal(apk.subarray(0, 2).toString("latin1"), "PK");
});
