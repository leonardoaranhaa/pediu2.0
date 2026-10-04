/**
 * Builds the Android wrapper (a Trusted Web Activity) around the published
 * Pediu site using Bubblewrap.
 *
 * The APK contains no app code: it is a signed shell that opens
 * https://<host> full screen. Everything the user sees is the deployed web
 * app, so shipping a change means publishing the site, not reinstalling.
 *
 * Bubblewrap normally downloads its own JDK and Android SDK and asks questions
 * interactively; both are pointed at the toolchains already installed here and
 * the TWA manifest is written from android/twa.config.json so the build is
 * reproducible and non-interactive.
 */
import { execFile } from "node:child_process";
import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { loadTwaConfig, ROOT } from "./twa-config.mjs";

const run = promisify(execFile);

const PROJECT_DIR = path.join(ROOT, "android", "project");
const MANIFEST_FILE = path.join(PROJECT_DIR, "twa-manifest.json");
const DIST_DIR = path.join(ROOT, "android", "dist");
const BUBBLEWRAP = path.join(ROOT, "node_modules", ".bin", "bubblewrap");

const JDK_PATH = process.env.JAVA_HOME ?? "/usr/lib/jvm/java-21-openjdk-amd64";
const SDK_PATH = process.env.ANDROID_HOME ?? path.join(os.homedir(), "android-sdk");

const config = await loadTwaConfig();

async function exists(target) {
  return access(target).then(
    () => true,
    () => false,
  );
}

async function requireTool(target, hint) {
  if (await exists(target)) return;
  throw new Error(`Missing ${target}. ${hint}`);
}

await requireTool(
  BUBBLEWRAP,
  "Install the build-only toolchain with `npm install --no-save @bubblewrap/cli`.",
);
await requireTool(JDK_PATH, "Set JAVA_HOME to a JDK 17+ install.");
await requireTool(
  path.join(SDK_PATH, "platform-tools"),
  "Set ANDROID_HOME to an Android SDK with platform-tools, platforms and build-tools.",
);

if (config.fingerprints.length === 0) {
  throw new Error("No signing fingerprint yet — run `npm run twa:keystore` first.");
}

// Bubblewrap reads its toolchain locations from a global config and offers to
// download them when it is absent, which would stall a non-interactive build.
const bubblewrapHome = path.join(os.homedir(), ".bubblewrap");
await mkdir(bubblewrapHome, { recursive: true });
await writeFile(
  path.join(bubblewrapHome, "config.json"),
  `${JSON.stringify({ jdkPath: JDK_PATH, androidSdkPath: SDK_PATH }, null, 2)}\n`,
);

const iconOrigin = process.env.TWA_ICON_ORIGIN ?? "http://127.0.0.1:8080";

const twaManifest = {
  packageId: config.packageId,
  host: config.host,
  name: config.name,
  launcherName: config.launcherName ?? config.name,
  display: "standalone",
  themeColor: config.themeColor,
  themeColorDark: config.themeColor,
  navigationColor: config.themeColor,
  navigationColorDark: config.themeColor,
  navigationDividerColor: config.themeColor,
  navigationDividerColorDark: config.themeColor,
  backgroundColor: config.backgroundColor,
  enableNotifications: false,
  startUrl: config.startUrl,
  iconUrl: `${iconOrigin}/icon-512.png`,
  maskableIconUrl: `${iconOrigin}/icon-maskable-512.png`,
  // Bubblewrap serialises the version name under `appVersion`; `appVersionName`
  // is the in-memory field and is silently ignored on the way in.
  appVersion: config.appVersionName,
  appVersionCode: config.appVersionCode,
  shortcuts: [],
  signingKey: {
    path: path.join(ROOT, config.signingKey.path),
    alias: config.signingKey.alias,
  },
  // Devices without Chrome fall back to a plain web view rather than failing
  // to launch; the TWA path is still preferred when it is available.
  fallbackType: "customtabs",
  enableSiteSettingsShortcut: true,
  isChromeOSOnly: false,
  isMetaQuest: false,
  orientation: "portrait",
  fingerprints: config.fingerprints,
  additionalTrustedOrigins: [],
  retainedBundles: [],
  splashScreenFadeOutDuration: 300,
  generatorApp: "bubblewrap-cli",
};

await mkdir(PROJECT_DIR, { recursive: true });
await writeFile(MANIFEST_FILE, `${JSON.stringify(twaManifest, null, 2)}\n`);
console.log(`wrote ${path.relative(ROOT, MANIFEST_FILE)}`);

const env = {
  ...process.env,
  JAVA_HOME: JDK_PATH,
  ANDROID_HOME: SDK_PATH,
  BUBBLEWRAP_KEYSTORE_PASSWORD:
    process.env.BUBBLEWRAP_KEYSTORE_PASSWORD ?? "pediu-sideload",
  BUBBLEWRAP_KEY_PASSWORD:
    process.env.BUBBLEWRAP_KEY_PASSWORD ??
    process.env.BUBBLEWRAP_KEYSTORE_PASSWORD ??
    "pediu-sideload",
};

async function bubblewrap(args) {
  console.log(`\n$ bubblewrap ${args.join(" ")}`);
  const child = await run(BUBBLEWRAP, args, {
    cwd: PROJECT_DIR,
    env,
    maxBuffer: 32 * 1024 * 1024,
  });
  process.stdout.write(child.stdout);
  if (child.stderr.trim()) process.stderr.write(child.stderr);
}

await bubblewrap([
  "update",
  `--manifest=${MANIFEST_FILE}`,
  `--directory=${PROJECT_DIR}`,
  "--skipVersionUpgrade",
]);

// --skipPwaValidation: the published site is a normal SSR app, not a Lighthouse
// installable PWA, and that check would otherwise fail the build.
await bubblewrap(["build", `--manifest=${MANIFEST_FILE}`, "--skipPwaValidation"]);

const built = path.join(PROJECT_DIR, "app-release-signed.apk");
if (!(await exists(built))) {
  throw new Error(`Bubblewrap did not produce ${built}`);
}

// The APK ships from public/ because the install page is the only way a user
// can reach it: there is no app store in the loop. The name is fixed so
// rebuilds replace one file instead of piling up versions.
const published = path.join(ROOT, "public", "download", "pediu.apk");
await mkdir(path.dirname(published), { recursive: true });
await copyFile(built, published);

await mkdir(DIST_DIR, { recursive: true });
await copyFile(
  path.join(PROJECT_DIR, "app-release-bundle.aab"),
  path.join(DIST_DIR, `pediu-${config.appVersionName}.aab`),
);

const bytes = (await readFile(published)).length;

// The install page states what the APK actually opens, so that claim is
// generated from the same build rather than written by hand.
await writeFile(
  path.join(ROOT, "src", "lib", "android-app.ts"),
  `// Generated by scripts/twa-build.mjs — run \`npm run twa:apk\` to refresh.\n` +
    `export const androidApp = ${JSON.stringify(
      {
        host: config.host,
        startPath: config.startUrl,
        packageId: config.packageId,
        version: config.appVersionName,
        file: "/download/pediu.apk",
        bytes,
        fingerprint: config.fingerprints[0].value,
        builtAt: new Date().toISOString().slice(0, 10),
      },
      null,
      2,
    )} as const;\n`,
);

console.log(`\nAPK  public/download/pediu.apk  ${(bytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`AAB  ${path.relative(ROOT, path.join(DIST_DIR, `pediu-${config.appVersionName}.aab`))}`);
console.log(`host https://${config.host}${config.startUrl}`);
console.log(
  `verify https://${config.host}/.well-known/assetlinks.json lists ${config.packageId}`,
);
