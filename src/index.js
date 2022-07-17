const puppeteer = require("puppeteer");
const fs = require('fs/promises');
const path = require('path');
const maxstache = require('maxstache');
const html = path.resolve(__dirname, 'template.html');
const { readFileSync } = require('fs');
const tokens = require('./tokens.json');
const SCRIPT_DEFAULT = readFileSync(path.resolve(__dirname, './folio.min.js'), 'utf8');
const mkdirp = require('mkdirp');

const maxTokens = 1; // up to 100
const height = 2400; // in pixels

const defaultHash = "0xb80f546bd257e3aaa0d49d087a2efdf107df2aebfdbbb9ad75a5f191c03cbe06"

start();

async function start () {
  await mkdirp(path.resolve(__dirname, '../tmp'));

  const sceneAspect = 0.7063020214;
  const width = Math.floor(height * sceneAspect);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width,
      height
    },
    args: [`--window-size=${width},${height}`],
  });
  const page = await browser.newPage()

  for (let token of tokens.slice(0,maxTokens)) {
    await page.goto("about:blank");
    await render(token.hash);
  }

  await browser.close()

  async function render (hash=defaultHash) {
    const script = SCRIPT_DEFAULT;
    console.log(hash);
    const content = await fs.readFile(html, 'utf8');
    await page.setContent(maxstache(content, {
      hash: JSON.stringify(hash),
      script
    }));
    await page.screenshot({ path: `tmp/${hash}.png` });
  }
}