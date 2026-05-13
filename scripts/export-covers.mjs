import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coversDir = path.join(__dirname, "../public/covers");

const covers = [
  { file: "facebook-cover.html",  width: 851,  height: 315, out: "facebook-cover.png" },
  { file: "x-twitter-cover.html", width: 1500, height: 500, out: "x-twitter-cover.png" },
  { file: "linkedin-cover.html",  width: 1584, height: 396, out: "linkedin-cover.png" },
];

const browser = await puppeteer.launch({ headless: "new" });

for (const cover of covers) {
  const page = await browser.newPage();
  await page.setViewport({ width: cover.width, height: cover.height, deviceScaleFactor: 2 });
  const filePath = `file://${path.join(coversDir, cover.file)}`;
  await page.goto(filePath, { waitUntil: "networkidle0" });
  const outPath = path.join(coversDir, cover.out);
  await page.screenshot({ path: outPath, type: "png", clip: { x: 0, y: 0, width: cover.width, height: cover.height } });
  console.log(`✅ Exported: ${cover.out} (${cover.width}×${cover.height} @2x)`);
  await page.close();
}

await browser.close();
console.log("\nAll covers exported to public/covers/");
