import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const re =
  /[^\n]*<link rel="stylesheet" href="fonts\/mutag-fonts\.css" \/>[^\n]*\n[^\n]*<link rel="stylesheet" href="style\.css"([^>]*)>/g;

for (const f of fs.readdirSync(root).filter((x) => x.endsWith('.html'))) {
  const fp = path.join(root, f);
  let s = fs.readFileSync(fp, 'utf8');
  const next = s.replace(
    re,
    '  <link rel="stylesheet" href="fonts/mutag-fonts.css" />\n  <link rel="stylesheet" href="style.css"$1>'
  );
  if (next !== s) {
    fs.writeFileSync(fp, next);
    console.log('fixed', f);
  }
}
