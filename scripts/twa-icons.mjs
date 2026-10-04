/**
 * Renders the launcher icons the Android wrapper needs from the Pediu brand
 * mark. Chromium is already in the sandbox for QA, so the mark is drawn as SVG
 * and screenshotted instead of pulling an image pipeline into the app.
 *
 * Android masks launcher icons to the device's shape, so the maskable variant
 * keeps the mark inside the inner 80% safe zone.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public");
const SIZE = 512;

const CREAM = "#fff4e8";
const YELLOW = "#ffc400";

/** The favicon mark on a 32x32 grid, scaled to fill `span` centred in SIZE. */
function mark(span) {
  const scale = span / 32;
  const offset = (SIZE - span) / 2;
  return `
    <g transform="translate(${offset} ${offset}) scale(${scale})">
      <path fill="${CREAM}" fill-rule="evenodd" d="M10.2 8.4h7.1c3.3 0 5.4 1.9 5.4 4.8 0 3.1-2.2 4.9-5.5 4.9h-3.3V23.2H10.2V8.4Zm3.7 3.1v3.4h3.1c1.5 0 2.3-.8 2.3-1.7 0-1-.8-1.7-2.3-1.7h-3.1Z"/>
      <circle cx="24.2" cy="7.6" r="3.1" fill="${YELLOW}"/>
    </g>`;
}

function svg({ radius, span }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f2152f"/>
        <stop offset="1" stop-color="#c00a22"/>
      </linearGradient>
    </defs>
    <rect width="${SIZE}" height="${SIZE}" rx="${radius}" fill="url(#bg)"/>
    ${mark(span)}
  </svg>`;
}

const VARIANTS = [
  // Launcher icon: rounded square, mark nearly full bleed.
  { file: "icon-512.png", radius: 112, span: 416 },
  // Maskable: square edge to edge, mark shrunk into the safe zone.
  { file: "icon-maskable-512.png", radius: 0, span: 320 },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: SIZE, height: SIZE },
      deviceScaleFactor: 1,
    });
    for (const variant of VARIANTS) {
      const markup = svg(variant);
      await page.setContent(
        `<!doctype html><html><body style="margin:0">${markup}</body></html>`,
      );
      const png = await page.screenshot({ omitBackground: true });
      const out = path.join(OUT_DIR, variant.file);
      await writeFile(out, png);
      console.log(`wrote ${path.relative(ROOT, out)} (${png.length} bytes)`);
    }
  } finally {
    await browser.close();
  }
}

await main();
