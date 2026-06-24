"""Part 1 SEO updates: meta tags, geo tags, schema, URLs, service IDs."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "index.html",
    "services.html",
    "portfolio.html",
    "about.html",
    "contact.html",
    "beneficial-ownership.html",
]

GEO_META = """  <meta name="geo.region" content="ZA-GP" />
  <meta name="geo.placename" content="Centurion, Gauteng" />
  <meta name="geo.position" content="-25.8958786;28.1094738" />
  <meta name="ICBM" content="-25.8958786, 28.1094738" />
"""

PAGE_META = {
    "index.html": {
        "title": "Custom Software Development Studio in Centurion, South Africa | MUTAG HOUSE",
        "description": "Build custom web applications, APIs, and automation systems with MUTAG HOUSE — a software development studio in Centurion, South Africa. Schedule your free consultation.",
        "og_title": "Custom Software Development Studio in Centurion, South Africa | MUTAG HOUSE",
        "og_description": "Build custom web applications, APIs, and automation systems with MUTAG HOUSE — a software development studio in Centurion, South Africa. Schedule your free consultation.",
    },
    "services.html": {
        "title": "Software Development Services in Centurion | MUTAG HOUSE",
        "description": "Explore software development services from MUTAG HOUSE in Centurion — custom web apps, APIs, dashboards, automation, and e-commerce for South African businesses.",
        "og_title": "Software Development Services in Centurion | MUTAG HOUSE",
        "og_description": "Explore software development services from MUTAG HOUSE in Centurion — custom web apps, APIs, dashboards, automation, and e-commerce for South African businesses.",
    },
    "portfolio.html": {
        "title": "Software Development Portfolio | MUTAG HOUSE",
        "description": "See how MUTAG HOUSE builds custom software, dashboards, and digital platforms for South African businesses — real projects from our Centurion studio.",
        "og_title": "Software Development Portfolio | MUTAG HOUSE",
        "og_description": "See how MUTAG HOUSE builds custom software, dashboards, and digital platforms for South African businesses — real projects from our Centurion studio.",
    },
    "about.html": {
        "title": "About Our Software Development Studio | MUTAG HOUSE",
        "description": "Meet MUTAG HOUSE — a Centurion-based software development studio building scalable web applications, APIs, and digital systems for businesses across South Africa.",
        "og_title": "About Our Software Development Studio | MUTAG HOUSE",
        "og_description": "Meet MUTAG HOUSE — a Centurion-based software development studio building scalable web applications, APIs, and digital systems for businesses across South Africa.",
    },
    "contact.html": {
        "title": "Contact MUTAG HOUSE | Schedule a Consultation",
        "description": "Contact MUTAG HOUSE in Centurion, South Africa to discuss your software project. Schedule a free technical consultation — we respond within one business day.",
        "og_title": "Contact MUTAG HOUSE | Schedule a Consultation",
        "og_description": "Contact MUTAG HOUSE in Centurion, South Africa to discuss your software project. Schedule a free technical consultation — we respond within one business day.",
    },
    "beneficial-ownership.html": {
        "title": "CIPC Beneficial Ownership Services in South Africa | MUTAG HOUSE",
        "description": "CIPC beneficial ownership filing and compliance services in South Africa. MUTAG HOUSE handles your beneficial ownership registration so you stay compliant.",
        "og_title": "CIPC Beneficial Ownership Services in South Africa | MUTAG HOUSE",
        "og_description": "CIPC beneficial ownership filing and compliance services in South Africa. MUTAG HOUSE handles your beneficial ownership registration so you stay compliant.",
    },
}

URL_MAP = {
    'href="index.html"': 'href="/"',
    "href='index.html'": "href='/'",
    'href="services.html"': 'href="/services"',
    'href="portfolio.html"': 'href="/portfolio"',
    'href="about.html"': 'href="/about"',
    'href="contact.html"': 'href="/contact"',
    'href="beneficial-ownership.html"': 'href="/beneficial-ownership"',
    'action="thank-you.html"': 'action="/thank-you"',
}

ORG_SCHEMA = """  <!-- Organization Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "legalName": "MUTAG HOUSE (Pty) Ltd",
    "name": "MUTAG HOUSE",
    "url": "https://www.mutag.co.za",
    "logo": "https://www.mutag.co.za/Logo-no-background.png",
    "description": "MUTAG HOUSE is a software development studio in Centurion, Gauteng, South Africa that designs and builds custom web applications, APIs, and automation systems for growing businesses.",
    "email": "info@mutag.co.za",
    "telephone": "+27729572238",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Centurion",
      "addressLocality": "Centurion",
      "addressRegion": "Gauteng",
      "postalCode": "0157",
      "addressCountry": "ZA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+27729572238",
      "email": "info@mutag.co.za",
      "contactType": "customer service",
      "areaServed": "ZA",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.facebook.com/people/MUTAG-House/61578437019157/",
      "https://www.linkedin.com/company/mutag-house/",
      "https://www.instagram.com/mutag_house"
    ]
  }
  </script>"""

LOCAL_SCHEMA = """  <!-- LocalBusiness Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MUTAG HOUSE",
    "image": "https://www.mutag.co.za/Logo-no-background.png",
    "@id": "https://www.mutag.co.za",
    "url": "https://www.mutag.co.za",
    "telephone": "+27729572238",
    "email": "info@mutag.co.za",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Centurion",
      "addressLocality": "Centurion",
      "addressRegion": "Gauteng",
      "postalCode": "0157",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.8958786,
      "longitude": 28.1094738
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "priceRange": "ZAR",
    "areaServed": {
      "@type": "Country",
      "name": "South Africa"
    },
    "sameAs": [
      "https://www.facebook.com/people/MUTAG-House/61578437019157/",
      "https://www.linkedin.com/company/mutag-house/",
      "https://www.instagram.com/mutag_house"
    ]
  }
  </script>"""

SERVICE_SCHEMAS = """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Web Application Development",
    "provider": { "@type": "Organization", "name": "MUTAG HOUSE" },
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "description": "Full-stack web applications built with modern, production-ready frameworks appropriate to each use case.",
    "url": "https://www.mutag.co.za/services#custom-web-apps"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "E-Commerce & Transaction Platforms",
    "provider": { "@type": "Organization", "name": "MUTAG HOUSE" },
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "description": "Custom e-commerce solutions and payment integrations.",
    "url": "https://www.mutag.co.za/services#e-commerce-platforms"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Backend Systems & APIs",
    "provider": { "@type": "Organization", "name": "MUTAG HOUSE" },
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "description": "Scalable, distributed system architecture and API development.",
    "url": "https://www.mutag.co.za/services#backend-systems-apis"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Business Intelligence & Dashboards",
    "provider": { "@type": "Organization", "name": "MUTAG HOUSE" },
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "description": "Custom dashboards and data visualization platforms.",
    "url": "https://www.mutag.co.za/services#business-intelligence-dashboards"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Automation & Workflow Systems",
    "provider": { "@type": "Organization", "name": "MUTAG HOUSE" },
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "description": "Business process automation and workflow management systems.",
    "url": "https://www.mutag.co.za/services#automation-workflow-systems"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Authentication & Security Systems",
    "provider": { "@type": "Organization", "name": "MUTAG HOUSE" },
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "description": "User authentication, authorization, and security systems.",
    "url": "https://www.mutag.co.za/services#authentication-security-systems"
  }
  </script>"""

LOGO_ALT = "MUTAG HOUSE logo — custom software development studio in Centurion, South Africa"


def set_meta(html: str, page: str) -> str:
    meta = PAGE_META[page]
    html = re.sub(r"<title>[^<]+</title>", f"<title>{meta['title']}</title>", html)
    html = re.sub(
        r'<meta name="description" content="[^"]*" */?>',
        f'<meta name="description" content="{meta["description"]}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:title" content="[^"]*" */?>',
        f'<meta property="og:title" content="{meta["og_title"]}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:description" content="[^"]*" */?>',
        f'<meta property="og:description" content="{meta["og_description"]}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:title" content="[^"]*" */?>',
        f'<meta name="twitter:title" content="{meta["og_title"]}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:description" content="[^"]*" */?>',
        f'<meta name="twitter:description" content="{meta["og_description"]}" />',
        html,
        count=1,
    )
    return html


def add_geo(html: str) -> str:
    if "geo.region" in html:
        return html
    return html.replace(
        '<meta name="robots" content="index, follow" />',
        '<meta name="robots" content="index, follow" />\n' + GEO_META,
        1,
    )


def normalize_urls(html: str) -> str:
    for old, new in URL_MAP.items():
        html = html.replace(old, new)
    return html


def update_logo_alt(html: str) -> str:
    html = re.sub(
        r'(<img src="Logo-(?:white|black)\.svg" )alt="[^"]*"',
        rf'\1alt="{LOGO_ALT}"',
        html,
    )
    return html


def update_index(html: str) -> str:
    html = re.sub(
        r"  <!-- Organization Schema -->.*?  </script>\s*  <!-- LocalBusiness Schema -->.*?  </script>",
        ORG_SCHEMA + "\n  \n" + LOCAL_SCHEMA,
        html,
        flags=re.S,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:image" content="[^"]*" */?>',
        '<meta property="og:image" content="https://www.mutag.co.za/Logo-no-background.png" />',
        html,
        count=1,
    )
    if "hero-keyword-subtitle" not in html:
        html = html.replace(
            "</h1>\n      <p class=\"hero-subtitle\">",
            '</h1>\n      <p class="hero-keyword-subtitle" style="font-size: 1.05rem; color: #94a3b8; margin-top: 1.25rem; max-width: 720px; margin-left: auto; margin-right: auto; line-height: 1.7;">\n        A software development studio in Centurion, South Africa — we design and build custom web applications, APIs, and automation systems for growing businesses.\n      </p>\n      <p class="hero-subtitle">',
        )
    html = re.sub(
        r"(We architect, build, and scale enterprise-grade software solutions—from )custom web applications",
        r'\1<a href="/services">custom web applications</a>',
        html,
        count=1,
    )
    html = html.replace(
        'alt="MUTAG HOUSE team developing software systems"',
        'alt="MUTAG HOUSE software development team collaborating on custom web applications in Centurion, South Africa"',
    )
    return html


def update_services(html: str) -> str:
    html = re.sub(
        r'  <script type="application/ld\+json">\s*\{\s*"@context": "https://schema\.org",\s*"@type": "LocalBusiness".*?</script>\s*  <script type="application/ld\+json">\s*\{\s*"@context": "https://schema\.org",\s*"@type": "Organization".*?</script>\s*  <script type="application/ld\+json">\s*\{\s*"@context": "https://schema\.org",\s*"@type": "WebPage".*?</script>\s*  <script type="application/ld\+json">\s*\{\s*"@context": "https://schema\.org",\s*"@type": "Service".*?</script>',
        SERVICE_SCHEMAS,
        html,
        flags=re.S,
        count=1,
    )
    intro = (
        "MUTAG HOUSE delivers custom web application development, REST API design, business intelligence dashboards, "
        "and workflow automation systems tailored for South African businesses — from startups to enterprise clients."
    )
    html = re.sub(
        r'(<h2[^>]*>Core Software Services</h2>\s*<p style="text-align: center[^"]*">)[^<]+(</p>)',
        rf"\1{intro}\2",
        html,
        count=1,
    )
    id_map = [
        ("Custom Web Application Development", "custom-web-apps"),
        ("Backend Systems & APIs", "backend-systems-apis"),
        ("Authentication & Security Systems", "authentication-security-systems"),
        ("Business Intelligence & Dashboards", "business-intelligence-dashboards"),
        ("Automation & Workflow Systems", "automation-workflow-systems"),
        ("E-Commerce & Transaction Platforms", "e-commerce-platforms"),
        ("Web Development & Digital Presence", "web-development-digital-presence"),
        ("Branding & Visual Identity", "branding-visual-identity"),
        ("Growth & Go-To-Market Support", "growth-go-to-market"),
        ("Business Services", "business-services"),
        ("Print Services", "print-services"),
    ]
    for title, sid in id_map:
        html = re.sub(
            rf'(<article class="service-card"[^>]*)(\s*>\s*<div class="service-icon">[\s\S]*?<h3>{re.escape(title)}</h3>)',
            rf'\1 id="{sid}"\2',
            html,
            count=1,
        )
    learn_map = {
        "custom-web-apps": "custom-web-apps",
        "backend-systems-apis": "backend-systems-apis",
        "authentication-security-systems": "authentication-security-systems",
        "business-intelligence-dashboards": "business-intelligence-dashboards",
        "automation-workflow-systems": "automation-workflow-systems",
        "e-commerce-platforms": "e-commerce-platforms",
    }
    for sid in learn_map:
        pattern = (
            rf'(<article class="service-card"[^>]*id="{sid}"[\s\S]*?<a href=")[^"]*(" class="btn"[^>]*>\s*<span>Learn More</span>)'
        )
        html = re.sub(pattern, rf'\1/services#{sid}\2', html, count=1)
    return html


def main():
    for page in PAGES:
        path = ROOT / page
        html = path.read_text(encoding="utf-8")
        html = set_meta(html, page)
        html = add_geo(html)
        html = normalize_urls(html)
        html = update_logo_alt(html)
        if page == "index.html":
            html = update_index(html)
        if page == "services.html":
            html = update_services(html)
        path.write_text(html, encoding="utf-8")
        print(f"Part 1 updated {page}")


if __name__ == "__main__":
    main()
