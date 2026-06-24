from pathlib import Path

path = Path(__file__).resolve().parents[1] / "services.html"
html = path.read_text(encoding="utf-8")

replacements = {
    "<p class=\"service-desc\">Full-stack web applications built with modern, production-ready frameworks appropriate to each use case.</p>":
    "<p class=\"service-desc\">Custom web application development is the process of building full-stack web applications tailored to specific business requirements. MUTAG HOUSE develops production-ready PWAs, SPAs, SaaS platforms, and enterprise portals using modern frameworks.</p>",
    "<p class=\"service-desc\">Custom e-commerce solutions and payment integrations.</p>":
    "<p class=\"service-desc\">E-commerce and transaction platforms are digital systems that enable online sales, payments, and order management. MUTAG HOUSE builds custom e-commerce solutions with payment gateway integrations, inventory management, and subscription billing.</p>",
    "<p class=\"service-desc\">Scalable, distributed system architecture and API development.</p>":
    "<p class=\"service-desc\">Backend systems and APIs are the server-side infrastructure that powers web and mobile applications. MUTAG HOUSE designs scalable REST and GraphQL APIs, database architectures, and cloud infrastructure for production workloads.</p>",
    "<p class=\"service-desc\">Custom dashboards and data visualization platforms.</p>":
    "<p class=\"service-desc\">Business intelligence and dashboards are data visualisation platforms that turn raw business data into actionable insights. MUTAG HOUSE builds real-time analytics dashboards, KPI tracking systems, and custom reporting tools.</p>",
    "<p class=\"service-desc\">Business process automation and workflow management systems.</p>":
    "<p class=\"service-desc\">Automation and workflow systems are software platforms that streamline repetitive business processes and integrate with existing tools. MUTAG HOUSE builds workflow engines, CRM integrations, and automated reporting pipelines.</p>",
    "<p class=\"service-desc\">User authentication, authorization, and security systems.</p>":
    "<p class=\"service-desc\">Authentication and security systems are the identity and access control layers that protect user data and application resources. MUTAG HOUSE implements OAuth, SSO, RBAC, and POPIA-compliant security architectures.</p>",
    "<p class=\"service-desc\">Corporate websites and digital properties built on modern frameworks.</p>":
    "<p class=\"service-desc\">Web development and digital presence is the practice of building corporate websites and online properties that represent a business online. MUTAG HOUSE develops SEO-optimised corporate sites, landing pages, and conversion-focused web properties.</p>",
    "<p class=\"service-desc\">Logo design, brand guidelines, and corporate identity packages.</p>":
    "<p class=\"service-desc\">Branding and visual identity is the design discipline that defines how a business looks and communicates visually. MUTAG HOUSE creates logo systems, brand guidelines, and corporate identity packages aligned with your software products.</p>",
    "<p class=\"service-desc\">Integrated marketing support when it complements software systems.</p>":
    "<p class=\"service-desc\">Growth and go-to-market support is strategic marketing assistance that helps businesses launch and scale their digital products. MUTAG HOUSE provides email campaigns, SEO optimisation, and content strategy when it complements software delivery.</p>",
    "<p class=\"service-desc\">Business registration and documentation services.</p>":
    "<p class=\"service-desc\">Business services cover company registration, compliance documentation, and corporate filings required to operate legally in South Africa. MUTAG HOUSE handles CIPC registrations, beneficial ownership filings, and business documentation.</p>",
    "<p class=\"service-desc\">Professional printing and stationery services for businesses.</p>":
    "<p class=\"service-desc\">Print services are professional production of business stationery and marketing materials. MUTAG HOUSE designs and produces business cards, stationery, and large-format marketing materials for South African businesses.</p>",
}

for old, new in replacements.items():
    html = html.replace(old, new, 1)

path.write_text(html, encoding="utf-8")
print("Updated service AEO descriptions")
