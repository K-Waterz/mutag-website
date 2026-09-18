/**
 * Mutag House — Client Onboarding Wizard
 * Flow: client type → services → follow-ups → contact details
 */
(function () {
  "use strict";

  const INDIVIDUAL_SERVICES = [
    {
      id: "register-company",
      title: "Register a company",
      desc: "CIPC company registration and setup in South Africa",
    },
    {
      id: "design-materials",
      title: "Design materials",
      desc: "Logo, brand identity, business cards, and print design",
    },
    {
      id: "website",
      title: "Website",
      desc: "A professional online presence for your business",
    },
    {
      id: "landing-page",
      title: "Landing page",
      desc: "A focused page for a product, offer, or campaign",
    },
    {
      id: "custom-software",
      title: "Custom software",
      desc: "Web apps, tools, or systems built for your needs",
    },
    {
      id: "ict-infrastructure",
      title: "ICT & infrastructure",
      desc: "Cybersecurity, IT support, cloud, cabling, and ICT projects",
    },
    {
      id: "business-docs",
      title: "Business documentation",
      desc: "Profiles, presentations, and compliance paperwork",
    },
  ];

  const COMPANY_SERVICES = [
    {
      id: "beneficial-ownership",
      title: "Beneficial ownership",
      desc: "CIPC beneficial ownership filing and compliance",
    },
    {
      id: "website",
      title: "Corporate website",
      desc: "A full website for your company brand and services",
    },
    {
      id: "landing-page",
      title: "Landing page",
      desc: "Conversion-focused pages for campaigns or launches",
    },
    {
      id: "branding",
      title: "Branding & design",
      desc: "Logo refresh, brand guidelines, and visual identity",
    },
    {
      id: "custom-software",
      title: "Custom software",
      desc: "Web applications, platforms, and internal tools",
    },
    {
      id: "ict-infrastructure",
      title: "ICT & infrastructure",
      desc: "Cybersecurity, managed IT, cloud, cabling, and ICT projects",
    },
    {
      id: "dashboards",
      title: "Dashboards & analytics",
      desc: "Business intelligence and reporting systems",
    },
    {
      id: "automation",
      title: "Automation & workflows",
      desc: "Streamline processes and reduce manual work",
    },
    {
      id: "seo-maintenance",
      title: "SEO & maintenance",
      desc: "Ongoing website care, updates, and search visibility",
    },
    {
      id: "business-docs",
      title: "Business documentation",
      desc: "Corporate docs, presentations, and filings support",
    },
  ];

  /** Follow-up questions keyed by service id */
  const FOLLOW_UPS = {
    "register-company": {
      title: "Company registration",
      questions: [
        {
          id: "reg_entity",
          label: "What type of entity do you want to register?",
          type: "single",
          options: [
            { value: "pty-ltd", label: "Private company (Pty Ltd)" },
            { value: "sole-prop", label: "Sole proprietorship" },
            { value: "npc", label: "Non-profit company (NPC)" },
            { value: "unsure", label: "Not sure yet" },
          ],
        },
        {
          id: "reg_name",
          label: "Have you reserved a company name with CIPC?",
          type: "single",
          options: [
            { value: "yes", label: "Yes, name is reserved" },
            { value: "no", label: "No, I still need a name" },
            { value: "help", label: "I need help choosing a name" },
          ],
        },
      ],
    },
    "design-materials": {
      title: "Design materials",
      questions: [
        {
          id: "design_items",
          label: "Which design items do you need?",
          type: "multi",
          options: [
            { value: "logo", label: "Logo" },
            { value: "brand-guidelines", label: "Brand guidelines" },
            { value: "business-cards", label: "Business cards" },
            { value: "stationery", label: "Letterheads / stationery" },
            { value: "social", label: "Social media graphics" },
            { value: "print", label: "Large-format / print materials" },
          ],
        },
      ],
    },
    branding: {
      title: "Branding & design",
      questions: [
        {
          id: "brand_scope",
          label: "What branding work do you need?",
          type: "multi",
          options: [
            { value: "new-logo", label: "New logo" },
            { value: "logo-refresh", label: "Logo refresh" },
            { value: "brand-guidelines", label: "Brand guidelines" },
            { value: "full-identity", label: "Full corporate identity" },
            { value: "print-pack", label: "Print & stationery pack" },
          ],
        },
      ],
    },
    website: {
      title: "Website",
      questions: [
        {
          id: "web_status",
          label: "Do you already have a website?",
          type: "single",
          options: [
            { value: "none", label: "No — starting from scratch" },
            { value: "redesign", label: "Yes — I want a redesign" },
            { value: "rebuild", label: "Yes — I need a full rebuild" },
          ],
        },
        {
          id: "web_pages",
          label: "Roughly how many pages do you need?",
          type: "single",
          options: [
            { value: "1-5", label: "1–5 pages" },
            { value: "6-15", label: "6–15 pages" },
            { value: "15+", label: "15+ pages" },
            { value: "unsure", label: "Not sure yet" },
          ],
        },
      ],
    },
    "landing-page": {
      title: "Landing page",
      questions: [
        {
          id: "lp_goal",
          label: "What is the main goal of this landing page?",
          type: "single",
          options: [
            { value: "leads", label: "Generate leads / enquiries" },
            { value: "launch", label: "Product or service launch" },
            { value: "event", label: "Event or campaign" },
            { value: "sales", label: "Drive sales" },
            { value: "other", label: "Something else" },
          ],
        },
      ],
    },
    "beneficial-ownership": {
      title: "Beneficial ownership",
      questions: [
        {
          id: "bo_status",
          label: "Have you filed beneficial ownership before?",
          type: "single",
          options: [
            { value: "never", label: "No — first time filing" },
            { value: "update", label: "Yes — need an update / amendment" },
            { value: "unsure", label: "Not sure if we're compliant" },
          ],
        },
        {
          id: "bo_directors",
          label: "About how many directors / beneficial owners?",
          type: "single",
          options: [
            { value: "1-2", label: "1–2" },
            { value: "3-5", label: "3–5" },
            { value: "6+", label: "6 or more" },
            { value: "unsure", label: "Not sure" },
          ],
        },
      ],
    },
    "custom-software": {
      title: "Custom software",
      questions: [
        {
          id: "soft_type",
          label: "What kind of software are you looking for?",
          type: "multi",
          options: [
            { value: "web-app", label: "Custom web application" },
            { value: "ecommerce", label: "E-commerce / transactions" },
            { value: "internal", label: "Internal business tool" },
            { value: "api", label: "Backend / API" },
            { value: "auth", label: "Auth & security (login, SSO)" },
            { value: "unsure", label: "Not sure — need advice" },
          ],
        },
      ],
    },
    "ict-infrastructure": {
      title: "ICT & infrastructure",
      questions: [
        {
          id: "ict_focus",
          label: "Which ICT services do you need?",
          type: "multi",
          options: [
            { value: "cybersecurity", label: "Cybersecurity & network protection" },
            { value: "managed-it", label: "Managed IT / 24/7 support" },
            { value: "cloud", label: "Cloud (Microsoft 365 / Google Workspace)" },
            { value: "cabling", label: "Cabling, WiFi & server rooms" },
            { value: "cctv-access", label: "CCTV, biometrics & access control" },
            { value: "ict-project", label: "Full ICT rollout / transformation" },
            { value: "unsure", label: "Not sure — need advice" },
          ],
        },
      ],
    },
    dashboards: {
      title: "Dashboards & analytics",
      questions: [
        {
          id: "dash_data",
          label: "Where does your data live today?",
          type: "single",
          options: [
            { value: "spreadsheets", label: "Spreadsheets" },
            { value: "existing-system", label: "An existing system / database" },
            { value: "multiple", label: "Multiple sources" },
            { value: "none", label: "Starting fresh" },
          ],
        },
      ],
    },
    automation: {
      title: "Automation & workflows",
      questions: [
        {
          id: "auto_focus",
          label: "What would you like to automate?",
          type: "multi",
          options: [
            { value: "approvals", label: "Approvals & workflows" },
            { value: "notifications", label: "Notifications & alerts" },
            { value: "data-entry", label: "Data entry / syncing" },
            { value: "reporting", label: "Reporting" },
            { value: "other", label: "Other / not sure" },
          ],
        },
      ],
    },
    "seo-maintenance": {
      title: "SEO & maintenance",
      questions: [
        {
          id: "seo_need",
          label: "What do you need help with?",
          type: "multi",
          options: [
            { value: "seo", label: "Search engine optimisation" },
            { value: "updates", label: "Content & site updates" },
            { value: "hosting", label: "Hosting & upkeep" },
            { value: "security", label: "Security & backups" },
            { value: "performance", label: "Speed & performance" },
          ],
        },
      ],
    },
    "business-docs": {
      title: "Business documentation",
      questions: [
        {
          id: "docs_type",
          label: "Which documents do you need?",
          type: "multi",
          options: [
            { value: "business-profile", label: "Business profile" },
            { value: "presentation", label: "Presentation / pitch deck" },
            { value: "compliance", label: "Compliance documents" },
            { value: "proposals", label: "Proposals / templates" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
  };

  const state = {
    step: 0, // 0 type, 1 services, 2 followups, 3 contact
    clientType: null,
    services: [],
    followUps: {},
    followUpIndex: 0,
    contact: {
      name: "",
      email: "",
      phone: "",
      company_name: "",
      message: "",
    },
  };

  const wizardEl = document.getElementById("onboarding-wizard");
  const stepLabel = document.getElementById("step-label");
  const progressBar = document.getElementById("progress-bar");
  const btnBack = document.getElementById("btn-back");
  const btnNext = document.getElementById("btn-next");
  const navEl = document.getElementById("onboarding-nav");

  function serviceList() {
    return state.clientType === "company" ? COMPANY_SERVICES : INDIVIDUAL_SERVICES;
  }

  function activeFollowUps() {
    return state.services
      .map((id) => ({ id, config: FOLLOW_UPS[id] }))
      .filter((item) => item.config);
  }

  function totalSteps() {
    const followCount = activeFollowUps().length;
    // type + services + follow-ups + contact + review
    return 4 + followCount;
  }

  function currentStepNumber() {
    if (state.step === 0) return 1;
    if (state.step === 1) return 2;
    if (state.step === 2) return 2 + state.followUpIndex + 1;
    const followCount = activeFollowUps().length;
    if (state.step === 3) return 2 + followCount + 1; // contact
    return 2 + followCount + 2; // review
  }

  function updateChrome() {
    const total = Math.max(totalSteps(), 5);
    const current = currentStepNumber();
    stepLabel.textContent = `Step ${current} of ${total}`;
    progressBar.style.width = `${Math.min(100, (current / total) * 100)}%`;

    btnBack.hidden = state.step === 0;
    navEl.hidden = false;

    if (state.step === 4) {
      btnNext.textContent = "Submit";
    } else {
      btnNext.textContent = "Continue";
    }
  }

  function selectedServiceTitles() {
    return serviceList()
      .filter((s) => state.services.includes(s.id))
      .map((s) => s.title);
  }

  function optionLabel(serviceId, qid, value) {
    const config = FOLLOW_UPS[serviceId];
    if (!config) return value;
    const question = config.questions.find((q) => q.id === qid);
    if (!question) return value;
    const opt = question.options.find((o) => o.value === value);
    return opt ? opt.label : value;
  }

  function formatFollowUpsReadable() {
    const blocks = [];
    activeFollowUps().forEach(({ id, config }) => {
      const answers = state.followUps[id] || {};
      const lines = config.questions.map((q) => {
        const raw = answers[q.id];
        if (Array.isArray(raw)) {
          const labels = raw.map((v) => optionLabel(id, q.id, v)).join(", ");
          return `${q.label} ${labels}`;
        }
        return `${q.label} ${optionLabel(id, q.id, raw || "—")}`;
      });
      blocks.push({ title: config.title, lines });
    });
    return blocks;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderTypeStep() {
    wizardEl.innerHTML = `
      <h2>Are you an individual or a company?</h2>
      <p class="onboarding-hint">This helps us show the right options for you.</p>
      <div class="onboarding-choice-grid" role="radiogroup" aria-label="Client type">
        <button type="button" class="onboarding-choice ${state.clientType === "individual" ? "is-selected" : ""}" data-type="individual" aria-pressed="${state.clientType === "individual"}">
          <span class="onboarding-choice-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </span>
          <strong>Individual</strong>
          <span>Starting out, registering a business, or need personal design &amp; digital help</span>
        </button>
        <button type="button" class="onboarding-choice ${state.clientType === "company" ? "is-selected" : ""}" data-type="company" aria-pressed="${state.clientType === "company"}">
          <span class="onboarding-choice-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>
          </span>
          <strong>Company</strong>
          <span>An existing business needing software, ICT, compliance, web, or branding</span>
        </button>
      </div>
    `;

    wizardEl.querySelectorAll("[data-type]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextType = btn.getAttribute("data-type");
        if (state.clientType !== nextType) {
          state.clientType = nextType;
          state.services = [];
          state.followUps = {};
          state.followUpIndex = 0;
        }
        render();
      });
    });
  }

  function renderServicesStep() {
    const list = serviceList();
    const label =
      state.clientType === "company"
        ? "What services does your company need?"
        : "What would you like help with?";

    wizardEl.innerHTML = `
      <h2>${label}</h2>
      <p class="onboarding-hint">Select all that apply — you can choose more than one.</p>
      <div class="onboarding-option-grid">
        ${list
          .map(
            (s) => `
          <label class="onboarding-option ${state.services.includes(s.id) ? "is-selected" : ""}">
            <input type="checkbox" value="${s.id}" ${state.services.includes(s.id) ? "checked" : ""} />
            <span class="onboarding-option-check" aria-hidden="true"></span>
            <span class="onboarding-option-body">
              <strong>${escapeHtml(s.title)}</strong>
              <span>${escapeHtml(s.desc)}</span>
            </span>
          </label>
        `
          )
          .join("")}
      </div>
    `;

    wizardEl.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.addEventListener("change", () => {
        const id = input.value;
        if (input.checked) {
          if (!state.services.includes(id)) state.services.push(id);
        } else {
          state.services = state.services.filter((x) => x !== id);
          delete state.followUps[id];
        }
        input.closest(".onboarding-option").classList.toggle("is-selected", input.checked);
      });
    });
  }

  function renderFollowUpStep() {
    const items = activeFollowUps();
    const current = items[state.followUpIndex];
    if (!current) {
      state.step = 3;
      render();
      return;
    }

    const { id: serviceId, config } = current;
    const answers = state.followUps[serviceId] || {};

    wizardEl.innerHTML = `
      <p class="onboarding-sub-eyebrow">${escapeHtml(config.title)}</p>
      <h2>A few more details</h2>
      <p class="onboarding-hint">This helps us prepare the right next steps for you.</p>
      <div class="onboarding-followups">
        ${config.questions
          .map((q) => {
            const selected = answers[q.id] || (q.type === "multi" ? [] : "");
            return `
              <fieldset class="onboarding-fieldset" data-qid="${q.id}" data-qtype="${q.type}">
                <legend>${escapeHtml(q.label)}</legend>
                <div class="onboarding-chip-grid">
                  ${q.options
                    .map((opt) => {
                      const isOn =
                        q.type === "multi"
                          ? Array.isArray(selected) && selected.includes(opt.value)
                          : selected === opt.value;
                      return `
                        <button type="button" class="onboarding-chip ${isOn ? "is-selected" : ""}" data-value="${escapeHtml(opt.value)}" aria-pressed="${isOn}">
                          ${escapeHtml(opt.label)}
                        </button>
                      `;
                    })
                    .join("")}
                </div>
              </fieldset>
            `;
          })
          .join("")}
      </div>
    `;

    wizardEl.querySelectorAll(".onboarding-fieldset").forEach((fieldset) => {
      const qid = fieldset.getAttribute("data-qid");
      const qtype = fieldset.getAttribute("data-qtype");

      fieldset.querySelectorAll(".onboarding-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          if (!state.followUps[serviceId]) state.followUps[serviceId] = {};
          const value = chip.getAttribute("data-value");

          if (qtype === "multi") {
            const currentVals = Array.isArray(state.followUps[serviceId][qid])
              ? state.followUps[serviceId][qid]
              : [];
            if (currentVals.includes(value)) {
              state.followUps[serviceId][qid] = currentVals.filter((v) => v !== value);
            } else {
              state.followUps[serviceId][qid] = [...currentVals, value];
            }
          } else {
            state.followUps[serviceId][qid] = value;
          }
          render();
        });
      });
    });
  }

  function renderContactStep() {
    const c = state.contact;
    const showCompany = state.clientType === "company";

    wizardEl.innerHTML = `
      <h2>How can we reach you?</h2>
      <p class="onboarding-hint">We'll use this to follow up with a clear next step.</p>
      <form class="onboarding-contact-form" id="contact-step-form" novalidate>
        <div class="form-group">
          <label for="ob-name">Name <span class="required">*</span></label>
          <input type="text" id="ob-name" name="name" required value="${escapeHtml(c.name)}" autocomplete="name" />
        </div>
        <div class="form-group">
          <label for="ob-email">Email <span class="required">*</span></label>
          <input type="email" id="ob-email" name="email" required value="${escapeHtml(c.email)}" autocomplete="email" />
        </div>
        <div class="form-group">
          <label for="ob-phone">Phone</label>
          <input type="tel" id="ob-phone" name="phone" value="${escapeHtml(c.phone)}" autocomplete="tel" />
        </div>
        ${
          showCompany
            ? `<div class="form-group">
          <label for="ob-company">Company name</label>
          <input type="text" id="ob-company" name="company_name" value="${escapeHtml(c.company_name)}" autocomplete="organization" />
        </div>`
            : ""
        }
        <div class="form-group">
          <label for="ob-message">Anything else we should know?</label>
          <textarea id="ob-message" name="message" rows="4">${escapeHtml(c.message)}</textarea>
        </div>
      </form>
    `;

    ["ob-name", "ob-email", "ob-phone", "ob-company", "ob-message"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", () => {
        state.contact[el.name] = el.value;
      });
    });
  }

  function renderReviewStep() {
    const services = selectedServiceTitles();
    const followBlocks = formatFollowUpsReadable();
    const c = state.contact;

    wizardEl.innerHTML = `
      <h2>Review your answers</h2>
      <p class="onboarding-hint">Check everything looks right before you send.</p>
      <div class="onboarding-review">
        <div class="onboarding-review-block">
          <h3>About you</h3>
          <p><strong>Type:</strong> ${state.clientType === "company" ? "Company" : "Individual"}</p>
          ${
            c.company_name
              ? `<p><strong>Company:</strong> ${escapeHtml(c.company_name)}</p>`
              : ""
          }
          <p><strong>Name:</strong> ${escapeHtml(c.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(c.email)}</p>
          ${c.phone ? `<p><strong>Phone:</strong> ${escapeHtml(c.phone)}</p>` : ""}
        </div>
        <div class="onboarding-review-block">
          <h3>Services</h3>
          <ul class="onboarding-review-list">
            ${services.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
          </ul>
        </div>
        ${
          followBlocks.length
            ? followBlocks
                .map(
                  (block) => `
          <div class="onboarding-review-block">
            <h3>${escapeHtml(block.title)}</h3>
            <ul class="onboarding-review-list">
              ${block.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
            </ul>
          </div>`
                )
                .join("")
            : ""
        }
        ${
          c.message
            ? `<div class="onboarding-review-block">
          <h3>Additional notes</h3>
          <p>${escapeHtml(c.message)}</p>
        </div>`
            : ""
        }
      </div>
    `;
  }

  function render() {
    if (state.step === 0) renderTypeStep();
    else if (state.step === 1) renderServicesStep();
    else if (state.step === 2) renderFollowUpStep();
    else if (state.step === 3) renderContactStep();
    else renderReviewStep();
    updateChrome();
    wizardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function validateCurrent() {
    if (state.step === 0) {
      if (!state.clientType) {
        alert("Please select whether you are an individual or a company.");
        return false;
      }
      return true;
    }
    if (state.step === 1) {
      if (!state.services.length) {
        alert("Please select at least one option to continue.");
        return false;
      }
      return true;
    }
    if (state.step === 2) {
      const items = activeFollowUps();
      const current = items[state.followUpIndex];
      if (!current) return true;
      const answers = state.followUps[current.id] || {};
      for (const q of current.config.questions) {
        const val = answers[q.id];
        if (q.type === "multi") {
          if (!Array.isArray(val) || val.length === 0) {
            alert("Please answer all questions on this step.");
            return false;
          }
        } else if (!val) {
          alert("Please answer all questions on this step.");
          return false;
        }
      }
      return true;
    }
    if (state.step === 3) {
      const name = (state.contact.name || "").trim();
      const email = (state.contact.email || "").trim();
      if (!name || !email) {
        alert("Please enter your name and email.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
      }
      return true;
    }
    return true;
  }

  function goNext() {
    if (!validateCurrent()) return;

    if (state.step === 0) {
      state.step = 1;
      render();
      return;
    }

    if (state.step === 1) {
      const items = activeFollowUps();
      if (items.length) {
        state.step = 2;
        state.followUpIndex = 0;
      } else {
        state.step = 3;
      }
      render();
      return;
    }

    if (state.step === 2) {
      const items = activeFollowUps();
      if (state.followUpIndex < items.length - 1) {
        state.followUpIndex += 1;
      } else {
        state.step = 3;
      }
      render();
      return;
    }

    if (state.step === 3) {
      state.step = 4;
      render();
      return;
    }

    if (state.step === 4) {
      submitForm();
    }
  }

  function goBack() {
    if (state.step === 1) {
      state.step = 0;
      render();
      return;
    }
    if (state.step === 2) {
      if (state.followUpIndex > 0) {
        state.followUpIndex -= 1;
      } else {
        state.step = 1;
      }
      render();
      return;
    }
    if (state.step === 3) {
      const items = activeFollowUps();
      if (items.length) {
        state.step = 2;
        state.followUpIndex = items.length - 1;
      } else {
        state.step = 1;
      }
      render();
      return;
    }
    if (state.step === 4) {
      state.step = 3;
      render();
    }
  }

  function buildContactMessage() {
    const lines = [
      "—— Onboarding enquiry ——",
      `Client type: ${state.clientType === "company" ? "Company" : "Individual"}`,
    ];

    if (state.contact.company_name) {
      lines.push(`Company name: ${state.contact.company_name.trim()}`);
    }

    lines.push(`Services: ${selectedServiceTitles().join(", ")}`);

    formatFollowUpsReadable().forEach((block) => {
      lines.push("");
      lines.push(`[${block.title}]`);
      block.lines.forEach((line) => lines.push(`- ${line}`));
    });

    if (state.contact.message && state.contact.message.trim()) {
      lines.push("");
      lines.push("Additional notes:");
      lines.push(state.contact.message.trim());
    }

    return lines.join("\n");
  }

  function submitForm() {
    btnNext.disabled = true;
    btnNext.textContent = "Sending…";

    // Same Netlify form as contact.html — only one form slot needed
    const formData = new FormData();
    formData.append("form-name", "contact");
    formData.append("name", state.contact.name.trim());
    formData.append("email", state.contact.email.trim());
    formData.append("phone", (state.contact.phone || "").trim());
    formData.append("service", "other");
    formData.append("message", buildContactMessage());

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Submit failed");
        window.location.href = "/thank-you";
      })
      .catch(() => {
        const subject = encodeURIComponent("Onboarding enquiry — Mutag House");
        const body = encodeURIComponent(
          [
            `Name: ${state.contact.name}`,
            `Email: ${state.contact.email}`,
            `Phone: ${state.contact.phone || "—"}`,
            "",
            buildContactMessage(),
          ].join("\n")
        );
        window.location.href = `mailto:info@mutag.co.za?subject=${subject}&body=${body}`;
        btnNext.disabled = false;
        btnNext.textContent = "Submit";
      });
  }

  btnNext.addEventListener("click", goNext);
  btnBack.addEventListener("click", goBack);

  render();
})();
