"""Generate Mutag House Company Profile (Word) for tender use."""
from docx import Document
from docx.shared import Pt, Inches, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from pathlib import Path

OUT = Path(__file__).resolve().parent / "Mutag-House-Company-Profile.docx"

BLUE = RGBColor(0x1E, 0x3A, 0x5F)
ACCENT = RGBColor(0x25, 0x63, 0xEB)
DARK = RGBColor(0x1A, 0x1A, 0x1A)
MUTED = RGBColor(0x4B, 0x55, 0x63)

ADDRESS = "2957B Goshawk Street, Thatchfield Hills, Centurion, 0157"
REG_NUMBER = "2025/500507/07"


def set_run(run, *, size=11, bold=False, color=DARK, font="Calibri"):
    run.font.name = font
    run._element.rPr.rFonts.set(qn("w:eastAsia"), font)
    run.font.size = Pt(size)
    run.bold = bold
    run.font.color.rgb = color


def add_heading(doc, text, level=1):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18 if level == 1 else 12)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run(text)
    size = {1: 16, 2: 13, 3: 11}.get(level, 11)
    set_run(run, size=size, bold=True, color=BLUE)
    return p


def add_body(doc, text, *, bold=False, space_after=8):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    run = p.add_run(text)
    set_run(run, size=11, bold=bold, color=DARK)
    return p


def add_bullet(doc, text, *, bold_prefix=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.space_before = Pt(0)
    if bold_prefix:
        r1 = p.add_run(bold_prefix)
        set_run(r1, size=11, bold=True, color=DARK)
        r2 = p.add_run(text)
        set_run(r2, size=11, color=DARK)
    else:
        run = p.add_run(text)
        set_run(run, size=11, color=DARK)
    return p


def set_cell_text(cell, text, *, bold=False, size=10, color=DARK, center=False):
    cell.text = ""
    p = cell.paragraphs[0]
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(text)
    set_run(run, size=size, bold=bold, color=color)


def add_info_table(doc, rows):
    table = doc.add_table(rows=len(rows), cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    table.autofit = True
    for i, (label, value) in enumerate(rows):
        set_cell_text(table.rows[i].cells[0], label, bold=True, size=10, color=BLUE)
        set_cell_text(table.rows[i].cells[1], value, size=10)
        table.rows[i].cells[0].width = Inches(1.8)
        table.rows[i].cells[1].width = Inches(4.7)
    return table


def add_client_entry(doc, client, work_items):
    """Client name as bold heading-style bullet intro, then work list."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run(client)
    set_run(run, size=11, bold=True, color=BLUE)

    for item in work_items:
        add_bullet(doc, item)


def build():
    doc = Document()

    for section in doc.sections:
        section.top_margin = Cm(2.0)
        section.bottom_margin = Cm(2.0)
        section.left_margin = Cm(2.2)
        section.right_margin = Cm(2.2)

    # Cover / title
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title.paragraph_format.space_after = Pt(4)
    r = title.add_run("MUTAG HOUSE (PTY) LTD")
    set_run(r, size=22, bold=True, color=BLUE)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle.paragraph_format.space_after = Pt(2)
    r = subtitle.add_run("Company Profile")
    set_run(r, size=16, bold=True, color=ACCENT)

    tag = doc.add_paragraph()
    tag.alignment = WD_ALIGN_PARAGRAPH.CENTER
    tag.paragraph_format.space_after = Pt(4)
    r = tag.add_run("End-to-End Business Solutions — Marketing & Technology")
    set_run(r, size=11, color=MUTED)

    prepared = doc.add_paragraph()
    prepared.alignment = WD_ALIGN_PARAGRAPH.CENTER
    prepared.paragraph_format.space_after = Pt(14)
    r = prepared.add_run("August 2026")
    set_run(r, size=10, color=MUTED)

    # 1. Overview
    add_heading(doc, "1. Company Overview", 1)
    add_body(
        doc,
        "Mutag House is an end-to-end business solutions partner. Based in Centurion, "
        "Gauteng, we help organisations form, grow, and run — through business setup "
        "and compliance, marketing services, and technology services.",
    )
    add_body(
        doc,
        "The three pillars can be engaged together or alone. Some clients come to us to "
        "register a company and stay CIPC-compliant. Others need a brand, a website, and "
        "campaigns. Others need custom software, cybersecurity, or the ICT that keeps an "
        "office connected. Many need a mix, and they want one partner instead of a "
        "scattered vendor list.",
    )
    add_body(
        doc,
        "Where marketing and technology meet, we treat that as one MarTech practice: "
        "brands, campaigns, websites, and systems designed to work together. We work with "
        "startups, SMEs, corporates, and institutions across South Africa. The work is "
        "practical, scoped to the outcome, and built to last beyond launch.",
    )
    add_body(
        doc,
        "At our core, we are a business partner — not a single-service studio.",
        bold=True,
    )

    add_heading(doc, "Company Particulars", 2)
    add_info_table(
        doc,
        [
            ("Legal name", "Mutag House (Pty) Ltd"),
            ("Trading as", "Mutag House"),
            ("Registration number", REG_NUMBER),
            ("Physical address", ADDRESS),
            ("Website", "www.mutag.co.za"),
            ("Email", "info@mutag.co.za"),
            ("Telephone", "+27 72 957 2238"),
            ("Business hours", "Monday–Friday, 08:00–17:00"),
            (
                "Service area",
                "South Africa (Gauteng-focused; remote nationwide and international)",
            ),
        ],
    )

    # 2–4 Mission / Vision / Values
    add_heading(doc, "2. Mission", 1)
    add_body(
        doc,
        "To help South African businesses and institutions form, grow, and operate with "
        "clarity — combining business setup, marketing, and technology under one partner.",
    )

    add_heading(doc, "3. Vision", 1)
    add_body(
        doc,
        "To be a trusted end-to-end business solutions partner for growing organisations "
        "— known for practical delivery across business, marketing, and technology, and "
        "for work that endures beyond launch.",
    )

    add_heading(doc, "4. Core Values", 1)
    add_bullet(
        doc,
        " We hold every project to high standards of quality and professionalism.",
        bold_prefix="Excellence —",
    )
    add_bullet(
        doc,
        " We stay current with proven technologies and design approaches that deliver lasting value.",
        bold_prefix="Innovation —",
    )
    add_bullet(
        doc,
        " We treat every client relationship as a collaboration, not a transaction.",
        bold_prefix="Partnership —",
    )
    add_bullet(
        doc,
        " We commit to on-time delivery, clear communication, and systems that perform under real-world conditions.",
        bold_prefix="Reliability —",
    )

    # 5 Services
    add_heading(doc, "5. Services Offered", 1)
    add_body(
        doc,
        "Mutag House organises its work into three pillars. Clients can engage one, or we coordinate the full stack.",
    )

    add_heading(doc, "5.1 Business Solutions", 2)
    add_body(doc, "End-to-end setup and operations:")
    add_bullet(doc, "CIPC company registration and the paperwork required to start trading in South Africa", bold_prefix="Company registration —")
    add_bullet(doc, "CIPC beneficial ownership filings")
    add_bullet(doc, "Profiles, compliance paperwork, and operating documents", bold_prefix="Business documentation —")
    add_bullet(doc, "CRM implementation and presentation design (investor decks, sales materials)")

    add_heading(doc, "5.2 Marketing Services", 2)
    add_body(doc, "Brand, presence, and growth:")
    add_bullet(doc, "Logo design, brand guidelines, corporate identity packages, marketing materials, print, and corporate giftings", bold_prefix="Branding & design —")
    add_bullet(doc, "Corporate websites, conversion-focused landing pages, SEO-optimised web properties, and ongoing maintenance", bold_prefix="Web & digital presence —")
    add_bullet(doc, "Email, SEO, content, social, and paid advertising as standalone marketing services or as part of a wider engagement", bold_prefix="Growth & campaigns —")

    add_heading(doc, "5.3 Technology Services", 2)
    add_body(doc, "Software that runs the business, and the ICT that keeps it secure and connected.")
    add_heading(doc, "Software engineering", 3)
    add_bullet(
        doc,
        " Progressive Web Apps (PWAs), Single Page Applications (SPAs), multi-tenant SaaS platforms, and enterprise portals",
        bold_prefix="Custom Web Application Development —",
    )
    add_bullet(
        doc,
        " Payment gateway integrations, inventory management, order processing, and subscription billing",
        bold_prefix="E-Commerce & Transaction Platforms —",
    )
    add_bullet(
        doc,
        " RESTful and GraphQL APIs, database design, cloud infrastructure, and third-party integrations",
        bold_prefix="Backend Systems & APIs —",
    )
    add_bullet(
        doc,
        " Real-time analytics, data visualisation, KPI tracking, and reporting tools",
        bold_prefix="Business Intelligence & Dashboards —",
    )
    add_bullet(
        doc,
        " Workflow engines, CRM/ERP integrations, automated notifications, and custom automation tooling",
        bold_prefix="Automation & Workflow Systems —",
    )
    add_bullet(
        doc,
        " OAuth, SSO, role-based access control (RBAC), API security, and POPIA/GDPR-aligned compliance",
        bold_prefix="Authentication & Security Systems —",
    )

    add_heading(doc, "ICT & infrastructure", 3)
    add_body(
        doc,
        "Reliable ICT that keeps the business secure and connected. Cybersecurity sits at the centre of every technology engagement we design.",
    )
    add_bullet(
        doc,
        " Endpoint monitoring, firewalls, MFA, backup and disaster recovery, biometric/RFID access, smart locks, CCTV, and security audits",
        bold_prefix="Cybersecurity & Network Protection —",
    )
    add_bullet(
        doc,
        " Remote and on-site support with SLAs, device monitoring, software and licence management, and 24/7 support",
        bold_prefix="Managed IT Services —",
    )
    add_bullet(
        doc,
        " Microsoft 365 or Google Workspace migration, cloud backup, secure storage, and real-time collaboration tools",
        bold_prefix="Cloud Solutions —",
    )
    add_bullet(
        doc,
        " Structured cabling (Cat5e, Cat6, fibre), server rooms and racks, WiFi design, UPS/backup power, and IoT hardware",
        bold_prefix="Infrastructure Services —",
    )
    add_bullet(
        doc,
        " Multi-floor network installations, fleet-wide endpoint deployments, digital transformation, and scoped solutions",
        bold_prefix="Custom ICT Projects —",
    )

    # 6 Approach
    add_heading(doc, "6. Our Approach", 1)
    add_bullet(
        doc,
        " We start with how the organisation operates today — goals, constraints, and what actually needs to change — before recommending a mix of business, marketing, or technology work.",
        bold_prefix="Understand the Business —",
    )
    add_bullet(
        doc,
        " Clients can engage one pillar or the full stack. We map the work so they only take on what the outcome requires, and the pieces stay aligned.",
        bold_prefix="Shape the Right Mix —",
    )
    add_bullet(
        doc,
        " We file, brand, build, or install in cycles, then stay after go-live for maintenance, campaigns, compliance updates, and the next stage of growth.",
        bold_prefix="Deliver and Support —",
    )

    add_heading(doc, "7. How We Work", 1)
    add_bullet(
        doc,
        " How you operate today, what needs to change, and the outcome you want.",
        bold_prefix="1. Understand the business —",
    )
    add_bullet(
        doc,
        " Map work across business, marketing, and technology so you only take on what the outcome requires.",
        bold_prefix="2. Shape the right mix —",
    )
    add_bullet(
        doc,
        " Build, brand, file, or install in cycles, with clear checkpoints as the work lands.",
        bold_prefix="3. Deliver —",
    )
    add_bullet(
        doc,
        " Stay after go-live for maintenance, campaigns, compliance, and the next stage of growth.",
        bold_prefix="4. Support —",
    )

    # 8 Industries
    add_heading(doc, "8. Industries Served", 1)
    add_body(
        doc,
        "Mutag House works across sectors that need to form, grow, or run the business, including "
        "fintech, healthcare, logistics, retail and e-commerce, education, professional "
        "services (including legal), and hospitality and lifestyle brands. Solutions are "
        "adaptable to any organisation requiring business setup, marketing, custom platforms, "
        "secure data handling, or process automation.",
    )

    # 9 Selected Client Work
    add_heading(doc, "9. Selected Client Work", 1)
    add_body(
        doc,
        "These are some of the companies we have worked with, and the nature of the "
        "work completed for each:",
    )

    # Website portfolio + track-record additions merged (no contacts / no amounts)
    add_client_entry(
        doc,
        "XFM Tech",
        [
            "Website design and development",
            "Brand identity",
            "Search engine optimisation (SEO)",
            "Custom web application development",
            "Social media marketing and branded visual content",
        ],
    )
    add_client_entry(
        doc,
        "FlowerClub",
        [
            "Social media transformation and brand storytelling",
            "Social media strategy and content creation",
            "Digital marketing strategy",
            "Paid advertising",
            "Ongoing website maintenance",
        ],
    )
    add_client_entry(
        doc,
        "Mathibele Mahlaela Attorneys",
        [
            "Website design and development",
            "Legal branding solutions and professional business cards",
            "Corporate giftings and printing services",
            "CRM implementation",
            "CIPC compliance and regulatory filing / business documentation",
        ],
    )
    add_client_entry(
        doc,
        "Magnificent Pools",
        [
            "Corporate branding and graphic design",
            "Lead-capture landing page campaign for lead generation",
            "Lead capture system with database integration",
            "Social media visual advertising",
        ],
    )
    add_client_entry(
        doc,
        "We Moove SA",
        [
            "Custom internal web-based quoting system",
            "Internal tools to streamline pricing workflows and improve turnaround time",
        ],
    )
    add_client_entry(
        doc,
        "Rapatla Rue Attorneys",
        [
            "Complete digital business setup and advertising",
            "Custom website development",
            "Premium hosting setup and professional email configuration",
            "SEO optimisation",
            "Digital advertising campaigns",
        ],
    )
    add_client_entry(
        doc,
        "La Gracia Estate",
        [
            "Complete brand identity (logo, business cards, and letterhead)",
            "Strategic brand planning and cohesive stationery package",
        ],
    )

    note = doc.add_paragraph()
    note.paragraph_format.space_before = Pt(10)
    note.paragraph_format.space_after = Pt(8)
    r = note.add_run(
        "Further case studies and project details are available at www.mutag.co.za/portfolio."
    )
    set_run(r, size=9, color=MUTED)

    # 10 Why Mutag
    add_heading(doc, "10. Why Mutag House", 1)
    add_bullet(
        doc,
        " Based in Centurion with familiarity with South African business, regulatory, and market realities (including POPIA).",
        bold_prefix="Local expertise —",
    )
    add_bullet(
        doc,
        " Business solutions, marketing services, and technology services can be engaged together or alone.",
        bold_prefix="Three pillars, one partner —",
    )
    add_bullet(
        doc,
        " Where marketing and technology meet, brands, campaigns, websites, and systems are designed as one practice.",
        bold_prefix="MarTech that holds together —",
    )
    add_bullet(
        doc,
        " Solutions are scoped to each client’s goals, constraints, and growth stage.",
        bold_prefix="Personalised engagement —",
    )
    add_bullet(
        doc,
        " We remain available for maintenance, iteration, and scaling after go-live.",
        bold_prefix="Long-term support —",
    )

    # 11 Contact
    add_heading(doc, "11. Contact Details", 1)
    add_info_table(
        doc,
        [
            ("Company", "Mutag House (Pty) Ltd"),
            ("Registration number", REG_NUMBER),
            ("Physical address", ADDRESS),
            ("Website", "www.mutag.co.za"),
            ("Email", "info@mutag.co.za"),
            ("Telephone", "+27 72 957 2238"),
            ("WhatsApp", "wa.link/rgwahs"),
            ("LinkedIn", "linkedin.com/company/mutag-house"),
            ("Instagram", "@mutag_house"),
            ("Facebook", "MUTAG House"),
        ],
    )

    footer = doc.add_paragraph()
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer.paragraph_format.space_before = Pt(24)
    r = footer.add_run(
        "© 2026 Mutag House (Pty) Ltd. All rights reserved.\n"
        "Company Profile — August 2026"
    )
    set_run(r, size=9, color=MUTED)

    doc.save(OUT)
    print(f"Saved: {OUT}")


if __name__ == "__main__":
    build()
