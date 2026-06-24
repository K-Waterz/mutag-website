from pathlib import Path
import re

path = Path(__file__).resolve().parents[1] / "services.html"
html = path.read_text(encoding="utf-8")

core_order = [
    "custom-web-apps",
    "e-commerce-platforms",
    "backend-systems-apis",
    "business-intelligence-dashboards",
    "automation-workflow-systems",
    "authentication-security-systems",
]
support_order = [
    "business-services",
    "web-development-digital-presence",
    "branding-visual-identity",
    "growth-go-to-market",
    "print-services",
]


def extract_articles(block):
    articles = {}
    pattern = r'(<article class="service-card"[^>]*id="([^"]+)"[^>]*>.*?</article>)'
    for match in re.finditer(pattern, block, re.S):
        articles[match.group(2)] = match.group(1)
    return articles


core_match = re.search(
    r'(<h2[^>]*>Core Software Services</h2>.*?<div class="service-cards">)(.*?)(</div>\s*\n\s*<!-- Supporting Services Section -->)',
    html,
    re.S,
)
if core_match:
    articles = extract_articles(core_match.group(2))
    delays = [200, 300, 400, 500, 600, 700]
    rebuilt = []
    for index, sid in enumerate(core_order):
        art = articles[sid]
        art = re.sub(r'data-aos-delay="\d+"', f'data-aos-delay="{delays[index]}"', art, count=1)
        rebuilt.append("          " + art.strip())
    new_core = core_match.group(1) + "\n" + "\n\n".join(rebuilt) + "\n        " + core_match.group(3)
    html = html[: core_match.start()] + new_core + html[core_match.end() :]

sup_match = re.search(
    r'(<!-- Supporting Services Section -->.*?<div class="service-cards">)(.*?)(</div>\s*\n\s*</div>\s*\n\s*<!-- Elevate Business Video Section -->)',
    html,
    re.S,
)
if sup_match:
    articles = extract_articles(sup_match.group(2))
    delays = [200, 300, 400, 500, 600]
    rebuilt = []
    for index, sid in enumerate(support_order):
        art = articles[sid]
        art = re.sub(r'data-aos-delay="\d+"', f'data-aos-delay="{delays[index]}"', art, count=1)
        rebuilt.append("            " + art.strip())
    new_sup = sup_match.group(1) + "\n" + "\n\n".join(rebuilt) + "\n          " + sup_match.group(3)
    html = html[: sup_match.start()] + new_sup + html[sup_match.end() :]

path.write_text(html, encoding="utf-8")
print("Reordered services")
