import re
import json
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dims_path = os.path.join(root, "image-dimensions.json")
with open(dims_path, encoding="utf-8") as f:
    dims = json.load(f)

canonical_map = {
    "services.html": "https://www.mutag.co.za/services",
    "portfolio.html": "https://www.mutag.co.za/portfolio",
    "about.html": "https://www.mutag.co.za/about",
    "contact.html": "https://www.mutag.co.za/contact",
    "beneficial-ownership.html": "https://www.mutag.co.za/beneficial-ownership",
    "thank-you.html": "https://www.mutag.co.za/thank-you",
}

files = [
    "index.html",
    "services.html",
    "portfolio.html",
    "about.html",
    "contact.html",
    "beneficial-ownership.html",
]


def basename_key(src):
    return os.path.basename(src.split("?")[0])


def get_dims(src):
    key = basename_key(src)
    if key in dims:
        return dims[key]
    norm = src.replace("\\", "/")
    for k, v in dims.items():
        if norm.endswith(k):
            return v
    return None


def add_logo_dims(html):
  def add_dims(match):
    tag = match.group(0)
    if "width=" in tag:
      return tag
    return tag[:-1] + ' width="120" height="40">'

  return re.sub(
    r'<img src="Logo-(?:white|black)\.svg"[^>]*>',
    add_dims,
    html,
  )


def wrap_raster_images(html):
    result = []
    pos = 0
    for match in re.finditer(r"<img[^>]+>", html):
        start = match.start()
        result.append(html[pos:start])
        tag = match.group(0)
        prefix = html[max(0, start - 20):start]
        if "<picture>" in prefix or tag.lower().endswith(".svg") or ".svg" in tag.lower():
            result.append(tag)
            pos = match.end()
            continue

        src_match = re.search(r'src="([^"]+)"', tag)
        if not src_match:
            result.append(tag)
            pos = match.end()
            continue

        src = src_match.group(1)
        lower = src.lower()
        if not lower.endswith((".png", ".jpg", ".jpeg")):
            result.append(tag)
            pos = match.end()
            continue

        info = get_dims(src)
        if not info:
            result.append(tag)
            pos = match.end()
            continue

        webp = re.sub(r"\.(png|jpe?g)$", ".webp", src, flags=re.I)
        new_tag = tag
        if "width=" not in tag:
            new_tag = new_tag[:-1] + f' width="{info["width"]}" height="{info["height"]}">'

        result.append(
            f'<picture><source srcset="{webp}" type="image/webp">{new_tag}</picture>'
        )
        pos = match.end()

    result.append(html[pos:])
    return "".join(result)


def fix_scripts(html):
    html = re.sub(
        r'(<canvas id="particle-canvas"></canvas>)\s*<script src="particles-bg\.js"></script>',
        r"\1",
        html,
    )

    for src in ["particles-bg.js", "mobile-menu.js", "script.js"]:
        html = re.sub(
            rf'<script src="{re.escape(src)}"(?![^>]*\bdefer\b)[^>]*></script>',
            f'<script src="{src}" defer></script>',
            html,
        )

    html = re.sub(
        r'<script src="https://unpkg.com/aos@2\.3\.1/dist/aos\.js"(?![^>]*\bdefer\b)[^>]*></script>',
        '<script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer></script>',
        html,
    )

    if 'src="particles-bg.js"' not in html:
        html = html.replace(
            "</body>",
            '  <script src="particles-bg.js" defer></script>\n</body>',
        )

    return html


for fn in files:
    path = os.path.join(root, fn)
    with open(path, encoding="utf-8") as f:
        html = f.read()

    if fn in canonical_map:
        url = canonical_map[fn]
        html = re.sub(
            r'<link rel="canonical" href="[^"]+" */?>',
            f'<link rel="canonical" href="{url}" />',
            html,
        )
        html = re.sub(
            r'<meta property="og:url" content="[^"]+" */?>',
            f'<meta property="og:url" content="{url}" />',
            html,
        )

    html = add_logo_dims(html)
    html = wrap_raster_images(html)
    html = fix_scripts(html)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Updated {fn}")
