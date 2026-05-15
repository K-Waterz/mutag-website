/**
 * One-off / repeatable: read _source.css from Google (browser UA),
 * keep latin + latin-ext @font-face only, download woff2, emit mutag-fonts.css
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(__dirname, '_source.css');
const OUT_CSS = path.join(__dirname, 'mutag-fonts.css');

const css = fs.readFileSync(SOURCE, 'utf8');

/** @type {{ subset: string; block: string }[]} */
const chunks = [];
const re = /\/\*\s*(latin-ext|latin)\s*\*\/\s*(@font-face\s*\{[\s\S]*?\})/gi;
let m;
while ((m = re.exec(css)) !== null) {
  chunks.push({ subset: m[1].toLowerCase(), block: m[2] });
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          download(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const bufs = [];
        res.on('data', (d) => bufs.push(d));
        res.on('end', () => resolve(Buffer.concat(bufs)));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

const urlToFile = new Map();
let idx = 0;

async function main() {
  const outParts = ['/* Self-hosted Inter + Poppins — latin & latin-ext only */\n'];

  for (const { subset, block } of chunks) {
    const urlMatch = block.match(/src:\s*url\(([^)]+)\)\s*format\(['"]woff2['"]\)/);
    if (!urlMatch) continue;
    const remote = urlMatch[1].trim();

    let localName = urlToFile.get(remote);
    if (!localName) {
      const u = new URL(remote);
      const base = path.basename(u.pathname).replace(/\.woff2$/i, '') || `font-${idx}`;
      const family = /font-family:\s*['"]Inter['"]/.test(block) ? 'inter' : 'poppins';
      idx += 1;
      localName = `${family}-${subset}-${base}.woff2`.toLowerCase();
      urlToFile.set(remote, localName);

      const dest = path.join(__dirname, localName);
      if (!fs.existsSync(dest)) {
        process.stdout.write(`Downloading ${localName}...\n`);
        const buf = await download(remote);
        fs.writeFileSync(dest, buf);
      }
    }

    const newBlock = block.replace(
      /src:\s*url\([^)]+\)\s*format\(['"]woff2['"]\)/,
      `src: url('./${localName}') format('woff2')`
    );
    outParts.push(`/* ${subset} */\n${newBlock}\n\n`);
  }

  fs.writeFileSync(OUT_CSS, outParts.join(''), 'utf8');
  process.stdout.write(`Wrote ${OUT_CSS} (${chunks.length} @font-face rules)\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
