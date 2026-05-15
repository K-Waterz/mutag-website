import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const files = [
  ...fs.readdirSync(root).filter((f) => f.endsWith('.html')),
  path.join('dist', 'index.html')
].map((f) => path.join(root, f));

const stripRe = [
  /<!--\s*Google Fonts\s*-->\s*/gi,
  /<link rel="dns-prefetch" href="https:\/\/fonts\.googleapis\.com"[^>]*>\s*/gi,
  /<link rel="dns-prefetch" href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/gi,
  /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"[^>]*>\s*/gi,
  /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/gi,
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet"[^>]*>\s*/gi
];

function stripGoogleFonts(html) {
  let s = html;
  for (const re of stripRe) {
    s = s.replace(re, '');
  }
  return s;
}

function insertLocalFonts(html, href, isReact) {
  if (html.includes('mutag-fonts.css')) {
    return html;
  }
  const tag = isReact
    ? `    <link rel="stylesheet" href="${href}" />\n`
    : `  <link rel="stylesheet" href="${href}" />\n`;

  if (isReact) {
    return html.replace(/(<meta name="theme-color"[^>]*>\s*)/i, `$1${tag}`);
  }

  const m = html.match(/<link rel="stylesheet" href="style\.css"/i);
  if (m) {
    return html.replace(m[0], `${tag}${m[0]}`);
  }
  const m2 = html.match(/<link rel="stylesheet" href="\.\/assets\//i);
  if (m2) {
    return html.replace(m2[0], `${tag}${m2[0]}`);
  }
  return html.replace(/<\/head>/i, `${tag}</head>`);
}

for (const fp of files) {
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes('fonts.googleapis.com/css2')) continue;

  const isReact = fp.endsWith('index-react.html');
  html = stripGoogleFonts(html);
  const href = isReact ? '/fonts/mutag-fonts.css' : 'fonts/mutag-fonts.css';
  html = insertLocalFonts(html, href, isReact);

  fs.writeFileSync(fp, html, 'utf8');
  console.log('patched', path.relative(root, fp));
}
