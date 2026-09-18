"""Generate a designed Mutag House Company Profile PDF with client logos."""
from __future__ import annotations

from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    FrameBreak,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
OUT = Path(__file__).resolve().parent / "Mutag-House-Company-Profile.pdf"

# Brand colours (aligned with Mutag House site — navy / blue, not purple)
NAVY = colors.HexColor("#1E3A5F")
BLUE = colors.HexColor("#2563EB")
SLATE = colors.HexColor("#475569")
LIGHT = colors.HexColor("#F8FAFC")
BORDER = colors.HexColor("#E2E8F0")
WHITE = colors.white
DARK = colors.HexColor("#0F172A")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

REG_NUMBER = "2025/500507/07"
ADDRESS = "2957B Goshawk Street, Thatchfield Hills, Centurion, 0157"

MUTAG_LOGO = ROOT / "Mutag new logo" / "Mutag House Black logo Transparent.png"

CLIENTS = [
    {
        "name": "XFM Tech",
        "logo": ROOT / "xfm-tech-logo.png",
        "work": [
            "Website design and development",
            "Brand identity",
            "Search engine optimisation (SEO)",
            "Custom web application development",
            "Social media marketing and branded visual content",
        ],
    },
    {
        "name": "FlowerClub",
        "logo": ROOT / "flowerclub-logo.png",
        "work": [
            "Social media transformation and brand storytelling",
            "Social media strategy and content creation",
            "Digital marketing strategy",
            "Paid advertising",
            "Ongoing website maintenance",
        ],
    },
    {
        "name": "Mathibele Mahlaela Attorneys",
        "logo": ROOT / "attorneys-logo.png",
        "work": [
            "Website design and development",
            "Legal branding solutions and professional business cards",
            "Corporate giftings and printing services",
            "CRM implementation",
            "CIPC compliance and regulatory filing / business documentation",
        ],
    },
    {
        "name": "Magnificent Pools",
        "logo": ROOT / "magnificent-pools-logo.png",
        "work": [
            "Corporate branding and graphic design",
            "Lead-capture landing page campaign for lead generation",
            "Lead capture system with database integration",
            "Social media visual advertising",
        ],
    },
    {
        "name": "We Moove SA",
        "logo": ROOT / "we-moove-sa-logo.png",
        "work": [
            "Custom internal web-based quoting system",
            "Internal tools to streamline pricing workflows and improve turnaround time",
        ],
    },
    {
        "name": "Rapatla Rue Attorneys",
        "logo": ROOT / "Rapatla-rue-logo.jpg",
        "work": [
            "Complete digital business setup and advertising",
            "Custom website development",
            "Premium hosting setup and professional email configuration",
            "SEO optimisation",
            "Digital advertising campaigns",
        ],
    },
    {
        "name": "La Gracia Estate",
        "logo": ROOT / "lagracia-logo.png",
        "work": [
            "Complete brand identity (logo, business cards, and letterhead)",
            "Strategic brand planning and cohesive stationery package",
        ],
    },
]


def make_styles():
    base = getSampleStyleSheet()
    styles = {
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=28,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=6,
            leading=32,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=13,
            textColor=BLUE,
            alignment=TA_CENTER,
            spaceAfter=4,
            leading=18,
        ),
        "cover_tag": ParagraphStyle(
            "cover_tag",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=SLATE,
            alignment=TA_CENTER,
            leading=14,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=14,
            textColor=NAVY,
            spaceBefore=4,
            spaceAfter=8,
            leading=18,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=BLUE,
            spaceBefore=8,
            spaceAfter=4,
            leading=14,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            textColor=DARK,
            alignment=TA_JUSTIFY,
            spaceAfter=7,
            leading=13,
        ),
        "body_bold": ParagraphStyle(
            "body_bold",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            textColor=DARK,
            alignment=TA_LEFT,
            spaceAfter=7,
            leading=13,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            textColor=DARK,
            leading=12,
            leftIndent=0,
        ),
        "client_name": ParagraphStyle(
            "client_name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=NAVY,
            spaceAfter=2,
            leading=14,
        ),
        "meta": ParagraphStyle(
            "meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            textColor=SLATE,
            leading=11,
        ),
        "meta_label": ParagraphStyle(
            "meta_label",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            textColor=NAVY,
            leading=11,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            textColor=SLATE,
            alignment=TA_CENTER,
        ),
        "section_intro": ParagraphStyle(
            "section_intro",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=9.5,
            textColor=SLATE,
            spaceAfter=10,
            leading=13,
        ),
    }
    return styles


def draw_header_footer(canvas, doc):
    canvas.saveState()
    # Top accent bar
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 6 * mm, PAGE_W, 6 * mm, fill=1, stroke=0)
    canvas.setFillColor(BLUE)
    canvas.rect(0, PAGE_H - 7.5 * mm, PAGE_W, 1.5 * mm, fill=1, stroke=0)

    # Footer
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 12 * mm, PAGE_W - MARGIN, 12 * mm)
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(MARGIN, 7 * mm, "Mutag House (Pty) Ltd  |  www.mutag.co.za")
    canvas.drawRightString(PAGE_W - MARGIN, 7 * mm, f"Page {doc.page}")
    canvas.restoreState()


def draw_cover_page(canvas, doc):
    canvas.saveState()
    # Full navy band at top
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 55 * mm, PAGE_W, 55 * mm, fill=1, stroke=0)
    canvas.setFillColor(BLUE)
    canvas.rect(0, PAGE_H - 57 * mm, PAGE_W, 2 * mm, fill=1, stroke=0)

    # Bottom band
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, 22 * mm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(
        PAGE_W / 2,
        10 * mm,
        f"Reg. No. {REG_NUMBER}  ·  {ADDRESS}",
    )
    canvas.restoreState()


def fit_logo(path: Path, max_w: float, max_h: float) -> Image | None:
    if not path.exists():
        return None
    # Normalize to RGB/RGBA PNG temp for reliable ReportLab rendering
    img = PILImage.open(path)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA")
    # Soft white background for transparent logos so they read on white pages
    if img.mode == "RGBA":
        bg = PILImage.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    else:
        img = img.convert("RGB")

    tmp = Path(__file__).resolve().parent / "_tmp_logos"
    tmp.mkdir(exist_ok=True)
    out = tmp / f"{path.stem}_pdf.jpg"
    # Downscale very large source images for file size
    img.thumbnail((900, 900), PILImage.Resampling.LANCZOS)
    img.save(out, "JPEG", quality=88)

    iw, ih = img.size
    scale = min(max_w / iw, max_h / ih)
    return Image(str(out), width=iw * scale, height=ih * scale)


def logo_cell(path: Path, max_w=38 * mm, max_h=22 * mm):
    logo = fit_logo(path, max_w, max_h)
    if logo is None:
        return Paragraph("—", ParagraphStyle("x", fontSize=8, textColor=SLATE))
    # Centre logo in a fixed-height cell via nested table
    inner = Table([[logo]], colWidths=[max_w + 4 * mm])
    inner.setStyle(
        TableStyle(
            [
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 2),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return inner


def section_rule():
    data = [[""]]
    t = Table(data, colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, -1), 1.2, BLUE),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def info_table(styles, rows):
    data = []
    for label, value in rows:
        data.append(
            [
                Paragraph(label, styles["meta_label"]),
                Paragraph(value, styles["meta"]),
            ]
        )
    t = Table(data, colWidths=[42 * mm, PAGE_W - 2 * MARGIN - 42 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def client_card(styles, client: dict):
    bullets = "<br/>".join(f"• {w}" for w in client["work"])
    work_para = Paragraph(bullets, styles["bullet"])
    name = Paragraph(client["name"], styles["client_name"])

    content = Table(
        [[name], [work_para]],
        colWidths=[PAGE_W - 2 * MARGIN - 48 * mm],
    )
    content.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )

    card = Table(
        [[logo_cell(client["logo"]), content]],
        colWidths=[46 * mm, PAGE_W - 2 * MARGIN - 46 * mm],
    )
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.8, BORDER),
                ("LINEBEFORE", (1, 0), (1, 0), 2.5, BLUE),
                ("VALIGN", (0, 0), (0, 0), "MIDDLE"),
                ("VALIGN", (1, 0), (1, 0), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 6),
                ("RIGHTPADDING", (0, 0), (0, 0), 6),
                ("LEFTPADDING", (1, 0), (1, 0), 10),
                ("RIGHTPADDING", (1, 0), (1, 0), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("BACKGROUND", (0, 0), (0, 0), LIGHT),
            ]
        )
    )
    return KeepTogether([card, Spacer(1, 7 * mm)])


def logo_strip(styles):
    """Row of all client logos for visual impact."""
    cells = []
    for c in CLIENTS:
        cells.append(logo_cell(c["logo"], max_w=22 * mm, max_h=14 * mm))
    # Split into two rows if needed
    row1 = cells[:4]
    row2 = cells[4:]
    while len(row2) < 4:
        row2.append("")

    col_w = (PAGE_W - 2 * MARGIN) / 4
    t1 = Table([row1], colWidths=[col_w] * 4)
    t2 = Table([row2], colWidths=[col_w] * 4)
    style = TableStyle(
        [
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
            ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
            ("INNERGRID", (0, 0), (-1, -1), 0.4, BORDER),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
    )
    t1.setStyle(style)
    t2.setStyle(style)
    return [t1, Spacer(1, 2 * mm), t2]


def bullet_list(styles, items):
    flowables = []
    for item in items:
        flowables.append(
            ListItem(Paragraph(item, styles["bullet"]), leftIndent=8, bulletColor=BLUE)
        )
    return ListFlowable(
        flowables,
        bulletType="bullet",
        start="•",
        leftIndent=12,
        bulletFontName="Helvetica",
        bulletFontSize=9,
        spaceBefore=0,
        spaceAfter=4,
    )


def build():
    styles = make_styles()
    content_top = 16 * mm
    content_bottom = 16 * mm

    frame = Frame(
        MARGIN,
        content_bottom,
        PAGE_W - 2 * MARGIN,
        PAGE_H - content_top - content_bottom,
        id="normal",
    )
    cover_frame = Frame(
        MARGIN,
        28 * mm,
        PAGE_W - 2 * MARGIN,
        PAGE_H - 70 * mm,
        id="cover",
    )

    doc = BaseDocTemplate(
        str(OUT),
        pagesize=A4,
        title="Mutag House — Company Profile",
        author="Mutag House (Pty) Ltd",
    )
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover_page),
            PageTemplate(id="main", frames=[frame], onPage=draw_header_footer),
        ]
    )

    story = []

    # ===== COVER =====
    story.append(Spacer(1, 8 * mm))
    mutag = fit_logo(MUTAG_LOGO, 70 * mm, 28 * mm)
    if mutag:
        wrap = Table([[mutag]], colWidths=[PAGE_W - 2 * MARGIN])
        wrap.setStyle(
            TableStyle(
                [
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ]
            )
        )
        story.append(wrap)
    story.append(Spacer(1, 10 * mm))
    story.append(Paragraph("COMPANY PROFILE", styles["cover_title"]))
    story.append(Paragraph("Software Development Studio &amp; Digital Systems Company", styles["cover_sub"]))
    story.append(Spacer(1, 4 * mm))
    story.append(
        Paragraph(
            "Centurion, Gauteng, South Africa<br/>August 2026",
            styles["cover_tag"],
        )
    )
    story.append(Spacer(1, 14 * mm))
    story.append(Paragraph("Trusted by organisations across industries", styles["cover_tag"]))
    story.append(Spacer(1, 4 * mm))
    story.extend(logo_strip(styles))
    story.append(PageBreak())

    # ===== OVERVIEW =====
    story.append(Paragraph("1. Company Overview", styles["h1"]))
    story.append(section_rule())
    story.append(
        Paragraph(
            "Mutag House is a software development studio specialising in the design and "
            "delivery of scalable digital systems. Based in Centurion, Gauteng, we build "
            "the platforms, applications, and backend infrastructure that organisations "
            "rely on to operate, grow, and scale.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "Our work goes beyond websites. We architect and implement custom web "
            "applications, secure authentication systems, APIs, dashboards, and automated "
            "workflows that support real business processes and complex operational "
            "requirements. Every system we build is grounded in clean architecture, clear "
            "business logic, and long-term maintainability.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "We work with startups, SMEs, corporates, and institutions that require systems "
            "that integrate with existing tools, enforce access control, manage data "
            "securely, and perform reliably at scale.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "At our core, we are builders of systems — practical, scalable, and designed "
            "for the realities of modern business.",
            styles["body_bold"],
        )
    )

    story.append(Paragraph("Company Particulars", styles["h2"]))
    story.append(
        info_table(
            styles,
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
    )

    # ===== MISSION / VISION / VALUES =====
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("2. Mission", styles["h1"]))
    story.append(section_rule())
    story.append(
        Paragraph(
            "To design and deliver scalable software systems that help South African "
            "businesses and institutions operate with clarity, efficiency, and confidence "
            "— combining technical excellence with practical business understanding.",
            styles["body"],
        )
    )

    story.append(Paragraph("3. Vision", styles["h1"]))
    story.append(section_rule())
    story.append(
        Paragraph(
            "To be a trusted digital systems partner for growing organisations — known for "
            "clean architecture, reliable delivery, and solutions that endure beyond launch.",
            styles["body"],
        )
    )

    story.append(Paragraph("4. Core Values", styles["h1"]))
    story.append(section_rule())
    story.append(
        bullet_list(
            styles,
            [
                "<b>Excellence</b> — We hold every project to high standards of quality and professionalism.",
                "<b>Innovation</b> — We stay current with proven technologies and design approaches that deliver lasting value.",
                "<b>Partnership</b> — We treat every client relationship as a collaboration, not a transaction.",
                "<b>Reliability</b> — We commit to on-time delivery, clear communication, and systems that perform under real-world conditions.",
            ],
        )
    )

    story.append(PageBreak())

    # ===== SERVICES =====
    story.append(Paragraph("5. Services Offered", styles["h1"]))
    story.append(section_rule())
    story.append(
        Paragraph(
            "Mutag House organises its work into five complementary service areas.",
            styles["body"],
        )
    )

    story.append(Paragraph("5.1 Software Engineering (Core)", styles["h2"]))
    story.append(
        bullet_list(
            styles,
            [
                "<b>Custom Web Application Development</b> — PWAs, SPAs, multi-tenant SaaS platforms, and enterprise portals",
                "<b>E-Commerce &amp; Transaction Platforms</b> — Payment gateways, inventory, order processing, subscriptions",
                "<b>Backend Systems &amp; APIs</b> — REST/GraphQL APIs, databases, cloud infrastructure, integrations",
                "<b>Business Intelligence &amp; Dashboards</b> — Real-time analytics, visualisation, KPI tracking",
                "<b>Automation &amp; Workflow Systems</b> — Workflow engines, CRM/ERP integrations, automation tooling",
                "<b>Authentication &amp; Security Systems</b> — OAuth, SSO, RBAC, API security, POPIA/GDPR-aligned compliance",
            ],
        )
    )

    story.append(Paragraph("5.2 Web &amp; Digital Presence", styles["h2"]))
    story.append(
        bullet_list(
            styles,
            [
                "Corporate websites and conversion-focused landing pages",
                "SEO-optimised web properties and ongoing website maintenance",
                "Growth and go-to-market support where it complements software delivery",
            ],
        )
    )

    story.append(Paragraph("5.3 Branding &amp; Design", styles["h2"]))
    story.append(
        bullet_list(
            styles,
            [
                "Logo design, brand guidelines, and corporate identity packages",
                "Marketing materials and print services",
                "Corporate giftings and related print production",
            ],
        )
    )

    story.append(Paragraph("5.4 Business &amp; Compliance", styles["h2"]))
    story.append(
        bullet_list(
            styles,
            [
                "Company registration and business documentation",
                "CIPC beneficial ownership filings",
                "CRM implementation and presentation design",
            ],
        )
    )

    story.append(Paragraph("5.5 ICT &amp; Infrastructure", styles["h2"]))
    story.append(
        Paragraph(
            "Reliable ICT that keeps the business secure and connected. Cybersecurity sits at the centre of every engagement we design.",
            styles["body"],
        )
    )
    story.append(
        bullet_list(
            styles,
            [
                "<b>Cybersecurity &amp; Network Protection</b> — Endpoint monitoring, firewalls, MFA, backup/DR, CCTV, biometrics, and security audits",
                "<b>Managed IT Services</b> — Remote and on-site support with SLAs, device monitoring, licence management, 24/7 support",
                "<b>Cloud Solutions</b> — Microsoft 365 or Google Workspace, cloud backup, secure storage, collaboration tools",
                "<b>Infrastructure Services</b> — Cabling (Cat5e/Cat6/fibre), server rooms, WiFi, UPS/backup power, IoT hardware",
                "<b>Custom ICT Projects</b> — Multi-floor networks, fleet-wide endpoints, digital transformation, scoped solutions",
            ],
        )
    )

    story.append(Paragraph("6. Our Approach", styles["h1"]))
    story.append(section_rule())
    story.append(
        bullet_list(
            styles,
            [
                "<b>Systems Architecture</b> — Scalable, maintainable software designed to grow and integrate.",
                "<b>Business Logic Engineering</b> — Operational requirements accurately reflected in code.",
                "<b>Full-Stack Capability</b> — Frontend, backend, databases, authentication, and automation.",
            ],
        )
    )

    story.append(Paragraph("7. Development Process", styles["h1"]))
    story.append(section_rule())
    story.append(
        bullet_list(
            styles,
            [
                "<b>Discovery &amp; System Architecture</b> — Requirements and scalable technical design",
                "<b>Business Logic Mapping</b> — Maintainable, testable software",
                "<b>Iterative Development &amp; Testing</b> — Build, test, and refine in cycles",
                "<b>Deployment, Scaling &amp; Long-Term Support</b> — Launch, monitor, and maintain",
            ],
        )
    )

    story.append(Paragraph("8. Industries Served", styles["h1"]))
    story.append(section_rule())
    story.append(
        Paragraph(
            "Fintech, healthcare, logistics, retail and e-commerce, education, professional "
            "services (including legal), and hospitality and lifestyle brands — adaptable to "
            "any organisation requiring custom platforms, secure data handling, or process automation.",
            styles["body"],
        )
    )

    story.append(PageBreak())

    # ===== SELECTED CLIENT WORK =====
    story.append(Paragraph("9. Selected Client Work", styles["h1"]))
    story.append(section_rule())
    story.append(
        Paragraph(
            "These are some of the companies we have worked with, and the nature of the "
            "work completed for each:",
            styles["section_intro"],
        )
    )

    for client in CLIENTS:
        story.append(client_card(styles, client))

    story.append(
        Paragraph(
            "Further case studies and project details are available at www.mutag.co.za/portfolio.",
            styles["meta"],
        )
    )

    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("10. Why Mutag House", styles["h1"]))
    story.append(section_rule())
    story.append(
        bullet_list(
            styles,
            [
                "<b>Local expertise</b> — Centurion-based with South African business and POPIA familiarity",
                "<b>Systems-first mindset</b> — Infrastructure and applications that run operations",
                "<b>Integrated delivery</b> — Software, web, branding, and compliance under one partner",
                "<b>Personalised engagement</b> — Scoped to each client’s goals and growth stage",
                "<b>Long-term support</b> — Maintenance, iteration, and scaling after go-live",
            ],
        )
    )

    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("11. Contact Details", styles["h1"]))
    story.append(section_rule())
    story.append(
        info_table(
            styles,
            [
                ("Company", "Mutag House (Pty) Ltd"),
                ("Registration number", REG_NUMBER),
                ("Physical address", ADDRESS),
                ("Website", "www.mutag.co.za"),
                ("Email", "info@mutag.co.za"),
                ("Telephone", "+27 72 957 2238"),
                ("WhatsApp", "wa.link/rgwahs"),
                ("LinkedIn", "linkedin.com/company/mutag-house"),
            ],
        )
    )

    story.append(Spacer(1, 10 * mm))
    story.append(
        Paragraph(
            "© 2026 Mutag House (Pty) Ltd. All rights reserved.  ·  Company Profile — August 2026",
            styles["footer"],
        )
    )

    doc.build(story)
    print(f"Saved: {OUT}")


if __name__ == "__main__":
    build()
