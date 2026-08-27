(function () {
  "use strict";

  var PROJECTS = {
    crm: {
      title: "好大個網 CRM",
      kicker: "Audience to Action · Decision system",
      intro:
        "This archive follows the product from the management dashboard into campaign operations, audience selection and member-level detail. Screens are captured from the working prototype; member-level values are mock data.",
      back: "crm.html",
      accent: "#c80815",
      coverage: "6 interface captures",
      layout: "Desktop and iPad evidence",
      groups: [
        {
          title: "Read the operation at a glance",
          note: "The main dashboard frames audience health and campaign performance before the user moves into individual activities.",
          items: [
            {
              src: "../assets/img/crm/dashboard-overview.png",
              label: "01 · Management dashboard",
              alt: "CRM dashboard with membership health, campaign performance and six audience tiers",
              format: "screen",
            },
            {
              src: "../assets/img/crm/campaign-list.png",
              label: "02 · Campaign portfolio",
              alt: "CRM campaign list comparing status, batches, revenue and conversion",
              format: "screen",
            },
          ],
        },
        {
          title: "Turn an audience into a campaign",
          note: "Selection stays connected to execution: find the right people, save the audience and continue into the structured launch flow.",
          items: [
            {
              src: "../assets/img/crm/member-list-concept.jpg",
              label: "01 · Audience management",
              alt: "CRM member-management interface connecting selection to campaign creation",
              format: "web",
            },
            {
              src: "../assets/img/crm/campaign-builder.png",
              label: "02 · Campaign builder",
              alt: "CRM campaign builder with audience selection, launch steps and live cost estimates",
              format: "screen",
            },
          ],
        },
        {
          title: "Inspect the member behind the segment",
          note: "Member-level values are mock. The screens show how commercial and behavioural detail stays inspectable behind a segment label.",
          items: [
            {
              src: "../assets/img/crm/member-profile-traits.jpg",
              label: "01 · Trait explanation",
              alt: "CRM member profile with commercial and engagement traits",
              format: "portrait",
            },
            {
              src: "../assets/img/crm/member-profile-spend.jpg",
              label: "02 · Transaction evidence",
              alt: "CRM member profile showing spending history and transaction evidence",
              format: "web",
            },
          ],
        },
      ],
    },
    scene: {
      title: "SCENE × Horror Online",
      kicker: "Crossover launch · Artifact sequence",
      intro:
        "The available archive follows the crossover from the released collection to its restrained front and expressive back applications. Website flow exports can be added to this same sequence without changing the layout.",
      back: "scene.html",
      accent: "#c43a32",
      coverage: "3 released artifacts",
      groups: [
        {
          title: "Crossover product system",
          note: "The released collection, then the front and back applications of the artwork.",
          items: [
            {
              src: "../assets/img/scene/crossover-product-overview.jpg",
              label: "Collection overview",
              alt: "Released SCENE and Horror Online crossover products shown together",
              format: "wide",
            },
            {
              src: "../assets/img/scene/crossover-tee-front.jpg",
              label: "Front application",
              alt: "Front of the SCENE and Horror Online crossover T-shirt",
              format: "portrait",
            },
            {
              src: "../assets/img/scene/crossover-phoenix-back.jpg",
              label: "Back application",
              alt: "Phoenix artwork applied to the back of the crossover T-shirt",
              format: "portrait",
            },
          ],
        },
      ],
    },
    aapoakgy: {
      title: "AAPOAKGY",
      kicker: "From Brand to Checkout · Live surfaces",
      intro:
        "A growing archive of the live brand and product-evaluation journey. Current captures cover entry, browse logic and the exact-specimen detail that supports a considered purchase.",
      back: "aapoakgy.html",
      accent: "#38a88c",
      coverage: "4 live surfaces",
      groups: [
        {
          title: "Discover and browse",
          note: "Live-site captures establish the brand promise before moving into colour-led discovery.",
          items: [
            {
              src: "../assets/img/aapoakgy/screens/live-home.png",
              label: "Brand entry",
              alt: "Live AAPOAKGY landing page introducing the vital pulse of ammolite",
              format: "web",
            },
            {
              src: "../assets/img/aapoakgy/screens/live-browse.png",
              label: "Browse by colour",
              alt: "Live AAPOAKGY browse page organising ammolite by colour meaning",
              format: "web",
            },
          ],
        },
        {
          title: "Evaluate the exact specimen",
          note: "The product itself acts as the interface — every stone is one-off inventory.",
          items: [
            {
              src: "../assets/img/aapoakgy/ammolite-m001-001.jpg",
              label: "Primary specimen view",
              alt: "Exact AAPOAKGY ammolite specimen photographed for evaluation",
              format: "wide",
            },
            {
              src: "../assets/img/aapoakgy/ammolite-m001-001-turntable.jpg",
              label: "Alternate angle",
              alt: "Turntable view of the same AAPOAKGY ammolite specimen",
              format: "wide",
            },
          ],
        },
      ],
    },
    edmondpoon: {
      title: "edmondpoon.com",
      kicker: "Horror Online & Beyond · Platform reach",
      intro:
        "The current archive starts with Horror Online, then shows the genuine programme, participation and commerce evidence behind the wider platform. Raw episode, chat and service screens can extend these groups as they become available.",
      back: "edmondpoon.html",
      accent: "#be1522",
      coverage: "5 source assets",
      groups: [
        {
          title: "Horror Online first, connected layers around it",
          note: "Horror Online remains dominant while another live programme, a metaphysics programme and commerce show the platform's wider reach.",
          items: [
            {
              src: "../assets/img/edmond/platform-logo.png",
              label: "Platform identity",
              alt: "Official 好大個網 platform wordmark",
              format: "logo",
            },
            {
              src: "../assets/img/edmond/live-media.jpg",
              label: "Horror Online",
              alt: "Official Horror Online live programme artwork on edmondpoon.com",
              format: "wide",
            },
            {
              src: "../assets/img/edmond/programme-win.jpg",
              label: "贏到開晒巷",
              alt: "Official 贏到開晒巷 programme artwork",
              format: "wide",
            },
            {
              src: "../assets/img/edmond/programme-five-arts.jpg",
              label: "五術袁李",
              alt: "Official 五術袁李 metaphysics programme artwork",
              format: "wide",
            },
            {
              src: "../assets/img/edmond/commerce-fourleaf.jpg",
              label: "Commerce",
              alt: "Four-leaf water product family sold through the platform",
              format: "wide",
            },
          ],
        },
      ],
    },
    vfit24: {
      title: "V-FIT24",
      kicker: "Pay by the Minute · Mobile flow",
      intro:
        "The documented member journey moves from product entry to everyday access and wallet top-up, with real interface captures kept at their native mobile proportions.",
      back: "vfit24.html",
      accent: "#08b9df",
      coverage: "3 mobile screens + location proof",
      groups: [
        {
          title: "Acquire, access and top up",
          note: "A compact end-to-end slice of the core minute-based membership model.",
          items: [
            {
              src: "../assets/img/vfit-landing.jpg",
              label: "01 · Product entry",
              alt: "V-FIT24 mobile landing screen",
              format: "portrait",
            },
            {
              src: "../assets/img/vfit-home.png",
              label: "02 · Member home",
              alt: "V-FIT24 member home with access and plan options",
              format: "portrait",
            },
            {
              src: "../assets/img/vfit-topup.png",
              label: "03 · Top up minutes",
              alt: "V-FIT24 top-up interface converting Hong Kong dollars into minutes",
              format: "portrait",
            },
          ],
        },
        {
          title: "Service context",
          note: "Location coverage makes the digital access flow useful in the physical service network.",
          items: [
            {
              src: "../assets/img/vfit-locations.png",
              label: "Gym locations",
              alt: "V-FIT24 location map",
              format: "evidence",
            },
          ],
        },
      ],
    },
    "read-tongue": {
      title: "Read Tongue Online",
      kicker: "Tongue Diagnosis · Mobile flow",
      intro:
        "The strongest complete mobile sequence in the current archive: orient the user, capture usable evidence, confirm upload and move into a trust-sensitive purchase.",
      back: "read-tongue.html",
      accent: "#b85b4e",
      coverage: "4 mobile screens",
      groups: [
        {
          title: "Diagnosis intake",
          note: "Guidance and feedback reduce uncertainty before a practitioner reviews the image.",
          items: [
            {
              src: "../assets/img/readtongue-welcome.jpg",
              label: "01 · Welcome",
              alt: "Read Tongue welcome screen",
              format: "portrait",
            },
            {
              src: "../assets/img/readtongue-capture.jpg",
              label: "02 · Guided capture",
              alt: "Read Tongue guided tongue photo capture screen",
              format: "portrait",
            },
            {
              src: "../assets/img/readtongue-uploaded.jpg",
              label: "03 · Upload confirmed",
              alt: "Read Tongue successful image upload screen",
              format: "portrait",
            },
            {
              src: "../assets/img/readtongue-checkout.jpg",
              label: "04 · Prescription checkout",
              alt: "Read Tongue prescription checkout screen",
              format: "portrait",
            },
          ],
        },
      ],
    },
    bba: {
      title: "BigBigAir Aura Reading",
      kicker: "Scan to Report · Input and outcomes",
      intro:
        "The palm scanner is the input; the two report variants are what the customer walks away with.",
      back: "bba.html",
      accent: "#6d63d8",
      coverage: "1 input + 2 report variants",
      groups: [
        {
          title: "Input to outcome",
          note: "The physical service, then the digital outputs customers receive.",
          items: [
            {
              src: "../assets/img/bba-device.jpg",
              label: "01 · Palm scanner",
              alt: "Physical palm scanner used for the aura reading service",
              format: "evidence",
            },
            {
              src: "../assets/img/bba-report-green.jpg",
              label: "02A · Green report",
              alt: "Green BigBigAir aura reading report variant",
              format: "wide",
            },
            {
              src: "../assets/img/bba-report-blue.jpg",
              label: "02B · Blue report",
              alt: "Blue BigBigAir aura reading report variant",
              format: "wide",
            },
          ],
        },
      ],
    },
    "divit-miles": {
      title: "divit Miles",
      kicker: "Miles Conversion · Available screens",
      intro:
        "Current evidence covers the responsive balance entry state that begins the conversion journey. Future raw exports can extend this into linking, amount, review and confirmation steps.",
      back: "divit-miles.html",
      accent: "#f5be22",
      coverage: "1 entry state + responsive proof",
      groups: [
        {
          title: "Miles dashboard entry",
          note: "Two views of the same state, kept together to show how it responds across breakpoints.",
          items: [
            {
              src: "../assets/img/divit-thumbnails.png",
              label: "Member balance",
              alt: "divit mobile member home and miles balance",
              format: "evidence",
            },
            {
              src: "../assets/img/thumb-mile-conversion.jpg",
              label: "Responsive system",
              alt: "divit miles experience shown across phone, tablet and desktop",
              format: "wide",
            },
          ],
        },
      ],
    },
    "divit-website": {
      title: "divit Website",
      kicker: "Corporate Revamp · IA overview",
      intro:
        "The available composite records the designed relationship between business explanation, merchant discovery and member shopping. It remains an overview until raw screen exports are added.",
      back: "divit-website.html",
      accent: "#f5be22",
      coverage: "1 responsive overview",
      groups: [
        {
          title: "Business and member surfaces",
          note: "One composite covering all three surfaces, kept at its original export.",
          items: [
            {
              src: "../assets/img/thumb-website.jpg",
              label: "Responsive website system",
              alt: "divit business, merchant and shopping website screens shown as one system",
              format: "panorama",
            },
          ],
        },
      ],
    },
    twgh: {
      title: "TWGH Temple Culture",
      kicker: "Guided Worship · Mobile concept",
      intro:
        "The current concept composite contains three real mobile views: choose the experience, understand the deity and prepare the required offerings.",
      back: "twgh.html",
      accent: "#d77c73",
      coverage: "3 mobile views in one composite",
      groups: [
        {
          title: "Guided worship journey",
          note: "Kept at the original composite resolution — cropping the three views apart would soften them.",
          items: [
            {
              src: "../assets/img/thumb-twgh.jpg",
              label: "Choose · understand · prepare",
              alt: "TWGH temple culture mobile concept showing entry, deity detail and offering preparation",
              format: "panorama",
            },
            {
              src: "../assets/img/twgh-blended.jpeg",
              label: "Temple context",
              alt: "Temple exterior and interior context for the TWGH digital experience",
              format: "wide",
            },
          ],
        },
      ],
    },
    aldi: {
      title: "ALDI E-commerce",
      kicker: "Online Grocery · Prototype overview",
      intro:
        "The current archive records the tested online-shopping direction and its physical-retail context. Raw mobile prototype exports can later expand this into browse, basket, fulfilment and checkout sequences.",
      back: "aldi.html",
      accent: "#27a9df",
      coverage: "1 prototype overview + retail context",
      groups: [
        {
          title: "From retail context to online concept",
          note: "The retail context that framed the brief, then the tested online direction.",
          items: [
            {
              src: "../assets/img/aldi-hero.jpg",
              label: "Retail context",
              alt: "ALDI storefront and shopping-cart context",
              format: "wide",
            },
            {
              src: "../assets/img/thumb-aldi.jpg",
              label: "Online shopping direction",
              alt: "ALDI online shopping prototype shown on a laptop",
              format: "panorama",
            },
          ],
        },
      ],
    },
  };

  var ORDER = [
    "crm",
    "scene",
    "aapoakgy",
    "edmondpoon",
    "vfit24",
    "read-tongue",
    "bba",
    "divit-miles",
    "divit-website",
    "twgh",
    "aldi",
  ];

  var params = new URLSearchParams(window.location.search);
  var slug = params.get("case");
  if (!PROJECTS[slug] || ORDER.indexOf(slug) === -1) slug = "edmondpoon";
  var project = PROJECTS[slug];
  var flowRoot = document.getElementById("flow-root");
  var toolbar = document.getElementById("flow-toolbar");
  var dialog = document.getElementById("flow-dialog");
  var dialogImage = document.getElementById("flow-dialog-image");
  var dialogCaption = document.getElementById("flow-dialog-caption");

  document.title = project.title + " — Screen Flow Library · Joe Chan";
  document.documentElement.style.setProperty("--flow-accent", project.accent);
  document.getElementById("flow-title").textContent = project.title;
  document.getElementById("flow-intro").textContent = project.intro;
  document.getElementById("flow-coverage").textContent = project.coverage;
  document.getElementById("flow-layout").textContent =
    project.layout || "Mobile-first layout";
  document.getElementById("flow-back").href = project.back;
  document.getElementById("flow-back-nav").href = project.back;

  function make(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderProjectNav() {
    var nav = document.getElementById("flow-case-nav");
    var list = make("ul", "flow-case-list");
    ORDER.forEach(function (key) {
      var item = make("li");
      var link = make(
        "a",
        key === slug ? "is-current" : "",
        PROJECTS[key].title,
      );
      link.href = "flows.html?case=" + encodeURIComponent(key);
      if (key === slug) link.setAttribute("aria-current", "page");
      item.appendChild(link);
      list.appendChild(item);
    });
    nav.appendChild(list);
  }

  function openScreen(item) {
    dialogImage.src = item.src;
    dialogImage.alt = item.alt;
    dialogCaption.textContent = item.label;
    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  function renderGroups() {
    project.groups.forEach(function (group, groupIndex) {
      var section = make("section", "flow-group");
      section.dataset.group = String(groupIndex);
      var head = make("div", "flow-group-head");
      var label = make(
        "p",
        "flow-group-index",
        "Flow " + String(groupIndex + 1).padStart(2, "0"),
      );
      var title = make("h2", "", group.title);
      var note = make("p", "flow-group-note", group.note);
      head.appendChild(label);
      head.appendChild(title);
      head.appendChild(note);
      section.appendChild(head);

      var list = make("ol", "flow-grid");
      group.items.forEach(function (item, itemIndex) {
        var card = make("li", "flow-card flow-card--" + item.format);
        var button = make("button", "flow-screen-open");
        button.type = "button";
        button.setAttribute("aria-label", "Open " + item.label);
        button.addEventListener("click", function () {
          openScreen(item);
        });

        var media = make("span", "flow-card-media");
        var image = document.createElement("img");
        image.src = item.src;
        image.alt = item.alt;
        image.loading = groupIndex === 0 && itemIndex < 4 ? "eager" : "lazy";
        image.decoding = "async";
        media.appendChild(image);

        var caption = make("span", "flow-card-caption");
        caption.appendChild(
          make(
            "span",
            "flow-card-step",
            String(itemIndex + 1).padStart(2, "0"),
          ),
        );
        caption.appendChild(make("strong", "", item.label));
        button.appendChild(media);
        button.appendChild(caption);
        card.appendChild(button);
        list.appendChild(card);
      });
      section.appendChild(list);
      flowRoot.appendChild(section);
    });
  }

  function renderToolbar() {
    if (project.groups.length < 2) return;
    var label = make("span", "flow-toolbar-label", "Jump to");
    toolbar.appendChild(label);
    project.groups.forEach(function (group, index) {
      var button = make("button", "", group.title);
      button.type = "button";
      button.addEventListener("click", function () {
        var target = flowRoot.querySelector('[data-group="' + index + '"]');
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      toolbar.appendChild(button);
    });
  }

  function enableCircuitSignal() {
    var page = document.querySelector(".flow-page");
    if (
      !page ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    page.addEventListener("pointermove", function (event) {
      var bounds = page.getBoundingClientRect();
      page.style.setProperty(
        "--flow-signal-x",
        event.clientX - bounds.left + "px",
      );
      page.style.setProperty(
        "--flow-signal-y",
        event.clientY - bounds.top + "px",
      );
      page.classList.add("is-signal-awake");
    });
    page.addEventListener("pointerleave", function () {
      page.classList.remove("is-signal-awake");
    });
  }

  dialog
    .querySelector(".flow-dialog-close")
    .addEventListener("click", function () {
      dialog.close();
    });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  renderProjectNav();
  renderToolbar();
  renderGroups();
  enableCircuitSignal();
})();
