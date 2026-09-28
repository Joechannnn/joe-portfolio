(function () {
  "use strict";

  var PROJECTS = {
  "inventory": {
    "title": "Inventory in View",
    "kicker": "Operations · From records to daily work",
    "intro": "Recreated views of the finished inventory GUI and its reference structure. All operational values, products, suppliers and identifiers are fictional portfolio examples.",
    "back": "inventory.html",
    "accent": "#457aa6",
    "coverage": "3 interface views + 1 reference recreation",
    "layout": "Overview · incomplete journey evidence",
    "groups": [
      {
        "title": "Assess, inspect, replenish",
        "note": "The completed interface structure, presented with sample data.",
        "items": [
          {
            "src": "../assets/img/inventory/overview.webp",
            "label": "Inventory overview",
            "alt": "Recreated stock overview with sample quantities and grouped products",
            "format": "screen",
            "id": "screen-1",
            "note": "Read availability and replenishment priorities using fictional data.",
            "width": 2160,
            "height": 1875
          },
          {
            "src": "../assets/img/inventory/detail.webp",
            "label": "SKU states and actions",
            "alt": "Recreated product group with healthy, low and out-of-stock examples",
            "format": "screen",
            "id": "screen-2",
            "note": "Expand a product group to inspect SKU states and actions.",
            "width": 2160,
            "height": 1935
          },
          {
            "src": "../assets/img/inventory/restock.webp",
            "label": "Replenishment workflow",
            "alt": "Recreated replenishment orders using fictional supplier and order details",
            "format": "screen",
            "id": "screen-3",
            "note": "Inspect replenishment orders and their current status. Completion is not shown.",
            "width": 2160,
            "height": 1740
          }
        ],
        "id": "evidence-1",
        "kind": "overview"
      },
      {
        "title": "The reference structure",
        "note": "An anonymised recreation of the record-heavy administration view supplied as the starting reference.",
        "items": [
          {
            "src": "../assets/img/inventory/legacy.webp",
            "label": "Reference · Administrative records",
            "alt": "Recreated legacy table using fictional records",
            "format": "screen",
            "id": "screen-1",
            "note": "Compare the record-oriented reference structure with the finished GUI.",
            "width": 2160,
            "height": 1650
          }
        ],
        "id": "evidence-2",
        "kind": "overview"
      }
    ],
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  },
  "crm": {
    "title": "好大個網 CRM",
    "kicker": "Audience to Action · Decision system",
    "intro": "Available evidence of audience assessment, member inspection and campaign preparation. The archive does not yet contain the intermediate builder steps or launch outcome.",
    "back": "crm.html",
    "accent": "#c80815",
    "coverage": "6 interface captures",
    "layout": "Overview · incomplete journey evidence",
    "groups": [
      {
        "title": "Read the operation at a glance",
        "note": "The main dashboard frames audience health and campaign performance before the user moves into individual activities.",
        "items": [
          {
            "src": "../assets/img/crm/flows/dashboard-overview.webp",
            "label": "Management dashboard",
            "alt": "CRM dashboard with membership health, campaign performance and six audience tiers",
            "format": "screen",
            "id": "screen-1",
            "note": "Assess audience health and campaign performance before investigating.",
            "width": 1440,
            "height": 1200
          },
          {
            "src": "../assets/img/crm/flows/campaign-list.webp",
            "label": "Campaign portfolio",
            "alt": "CRM campaign list comparing status, batches, revenue and conversion",
            "format": "screen",
            "id": "screen-2",
            "note": "Compare existing campaign states and results.",
            "width": 1440,
            "height": 1200
          }
        ],
        "id": "evidence-1",
        "kind": "overview"
      },
      {
        "title": "Turn an audience into a campaign",
        "note": "An audience-management concept and one builder capture show the intended handoff. They do not establish a complete launch flow.",
        "items": [
          {
            "src": "../assets/img/crm/flows/member-list-concept.webp",
            "label": "Audience management concept",
            "alt": "CRM member-management interface connecting selection to campaign creation",
            "format": "web",
            "id": "screen-1",
            "note": "Filter members and prepare a target audience; personal details are anonymised.",
            "width": 1440,
            "height": 1437
          },
          {
            "src": "../assets/img/crm/flows/campaign-builder.webp",
            "label": "Campaign builder",
            "alt": "CRM campaign builder with audience selection, launch steps and live cost estimates",
            "format": "screen",
            "id": "screen-2",
            "note": "Review the available builder state and its estimate. Intermediate steps and launch confirmation are not available.",
            "width": 1440,
            "height": 1200
          }
        ],
        "id": "evidence-2",
        "kind": "overview"
      },
      {
        "title": "Inspect the member behind the segment",
        "note": "Member-level values are mock. The screens show how commercial and behavioural detail stays inspectable behind a segment label.",
        "items": [
          {
            "src": "../assets/img/crm/flows/member-profile-traits.webp",
            "label": "Trait explanation",
            "alt": "CRM member profile with commercial and engagement traits",
            "format": "portrait",
            "id": "screen-1",
            "note": "Inspect the evidence behind a member trait; identity is anonymised.",
            "width": 1161,
            "height": 1600
          },
          {
            "src": "../assets/img/crm/flows/member-profile-spend.webp",
            "label": "Transaction evidence",
            "alt": "CRM member profile showing spending history and transaction evidence",
            "format": "web",
            "id": "screen-2",
            "note": "Read the transaction evidence behind the displayed spending trait.",
            "width": 1440,
            "height": 1437
          }
        ],
        "id": "evidence-3",
        "kind": "overview"
      }
    ],
    "evidence": "The supplied Figma file is not accessible with the current account. Existing prototype captures and a labelled audience concept are retained; intermediate builder steps, launch confirmation and recovery states are not available."
  },
  "scene": {
    "title": "SCENE × Horror Online",
    "kicker": "Crossover launch · Artifact sequence",
    "intro": "Released crossover artifacts: the collection, front application and expressive back artwork. These are product artifacts, not an interaction flow.",
    "back": "scene.html",
    "accent": "#c43a32",
    "coverage": "3 released artifacts",
    "groups": [
      {
        "title": "Crossover product system",
        "note": "The released collection, then the front and back applications of the artwork.",
        "items": [
          {
            "src": "../assets/img/scene/crossover-product-overview.jpg",
            "label": "Collection overview",
            "alt": "Released SCENE and Horror Online crossover products shown together",
            "format": "wide",
            "id": "screen-1",
            "note": "See the released crossover collection together.",
            "width": 960,
            "height": 540
          },
          {
            "src": "../assets/img/scene/crossover-tee-front.jpg",
            "label": "Front application",
            "alt": "Front of the SCENE and Horror Online crossover T-shirt",
            "format": "portrait",
            "id": "screen-2",
            "note": "Inspect the restrained front application of the artwork.",
            "width": 1175,
            "height": 1399
          },
          {
            "src": "../assets/img/scene/crossover-phoenix-back.jpg",
            "label": "Back application",
            "alt": "Phoenix artwork applied to the back of the crossover T-shirt",
            "format": "portrait",
            "id": "screen-3",
            "note": "Inspect the expressive back artwork on the finished garment.",
            "width": 1175,
            "height": 1399
          }
        ],
        "id": "evidence-1",
        "kind": "artifacts"
      }
    ],
    "layout": "Selected artifacts",
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  },
  "aapoakgy": {
    "title": "AAPOAKGY",
    "kicker": "From Brand to Checkout · Live surfaces",
    "intro": "Selected brand, browse and specimen-detail surfaces from the live site. Purchase completion and recovery states are not available in this archive.",
    "back": "aapoakgy.html",
    "accent": "#38a88c",
    "coverage": "4 live surfaces",
    "groups": [
      {
        "title": "Discover and browse",
        "note": "Live-site captures establish the brand promise before moving into colour-led discovery.",
        "items": [
          {
            "src": "../assets/img/aapoakgy/screens/live-home.png",
            "label": "Brand entry",
            "alt": "Live AAPOAKGY landing page introducing the vital pulse of ammolite",
            "format": "web",
            "id": "screen-1",
            "note": "Enter the brand and establish the product’s visual context.",
            "width": 430,
            "height": 333
          },
          {
            "src": "../assets/img/aapoakgy/screens/live-browse.png",
            "label": "Browse by colour",
            "alt": "Live AAPOAKGY browse page organising ammolite by colour meaning",
            "format": "web",
            "id": "screen-2",
            "note": "Browse the collection by colour.",
            "width": 430,
            "height": 333
          }
        ],
        "id": "evidence-1",
        "kind": "artifacts"
      },
      {
        "title": "Evaluate the exact specimen",
        "note": "The product itself acts as the interface — every stone is one-off inventory.",
        "items": [
          {
            "src": "../assets/img/aapoakgy/ammolite-m001-001.jpg",
            "label": "Primary specimen view",
            "alt": "Exact AAPOAKGY ammolite specimen photographed for evaluation",
            "format": "wide",
            "id": "screen-1",
            "note": "Inspect the exact specimen before considering a purchase.",
            "width": 2400,
            "height": 1600
          },
          {
            "src": "../assets/img/aapoakgy/ammolite-m001-001-turntable.jpg",
            "label": "Alternate angle",
            "alt": "Turntable view of the same AAPOAKGY ammolite specimen",
            "format": "wide",
            "id": "screen-2",
            "note": "Use an alternate angle to assess the same specimen.",
            "width": 3840,
            "height": 2160
          }
        ],
        "id": "evidence-2",
        "kind": "artifacts"
      }
    ],
    "layout": "Selected artifacts",
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  },
  "edmondpoon": {
    "title": "edmondpoon.com",
    "kicker": "Horror Online & Beyond · Platform reach",
    "intro": "The current archive starts with Horror Online, then shows the genuine programme, participation and commerce evidence behind the wider platform. Raw episode, chat and service screens can extend these groups as they become available.",
    "back": "edmondpoon.html",
    "accent": "#be1522",
    "coverage": "5 source assets",
    "groups": [
      {
        "title": "Horror Online first, connected layers around it",
        "note": "Horror Online remains dominant while another live programme, a metaphysics programme and commerce show the platform's wider reach.",
        "items": [
          {
            "src": "../assets/img/edmond/platform-logo.png",
            "label": "Platform identity",
            "alt": "Official 好大個網 platform wordmark",
            "format": "logo",
            "id": "screen-1",
            "note": "Recognise the platform identity across its services.",
            "width": 240,
            "height": 60
          },
          {
            "src": "../assets/img/edmond/live-media.jpg",
            "label": "Horror Online",
            "alt": "Official Horror Online live programme artwork on edmondpoon.com",
            "format": "wide",
            "id": "screen-2",
            "note": "Inspect the Horror Online subscription surface.",
            "width": 678,
            "height": 369
          },
          {
            "src": "../assets/img/edmond/programme-win.jpg",
            "label": "贏到開晒巷",
            "alt": "Official 贏到開晒巷 programme artwork",
            "format": "wide",
            "id": "screen-3",
            "note": "Inspect the programme’s branded content surface.",
            "width": 640,
            "height": 360
          },
          {
            "src": "../assets/img/edmond/programme-five-arts.jpg",
            "label": "五術袁李",
            "alt": "Official 五術袁李 metaphysics programme artwork",
            "format": "wide",
            "id": "screen-4",
            "note": "Inspect the specialist content identity within the wider platform.",
            "width": 640,
            "height": 360
          },
          {
            "src": "../assets/img/edmond/commerce-fourleaf.jpg",
            "label": "Commerce",
            "alt": "Four-leaf water product family sold through the platform",
            "format": "wide",
            "id": "screen-5",
            "note": "Inspect the platform’s commerce surface; checkout completion is not shown.",
            "width": 1920,
            "height": 1080
          }
        ],
        "id": "evidence-1",
        "kind": "artifacts"
      }
    ],
    "layout": "Selected artifacts",
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  },
  "vfit24": {
    "title": "V-FIT24",
    "kicker": "Access, time, settle · Member and operator journeys",
    "intro": "Follow a member from registration to a recorded gym session, then see how staff recover access failures and disputed charges. Decisions link directly to their recovery paths.",
    "back": "vfit24.html",
    "accent": "#08b9df",
    "coverage": "3 core journeys · 5 recovery paths · 1 context artifact",
    "groups": [
      {
        "id": "member",
        "title": "Register, enter, settle",
        "kind": "flow",
        "actor": "Member",
        "note": "The core route: verify a member, unlock access, track a session and explain the final charge before it becomes a transaction.",
        "items": [
          {
            "id": "landing",
            "src": "../assets/img/vfit24/flows/landing.webp",
            "label": "Choose membership",
            "note": "Start registration from the self-service gym entry.",
            "alt": "Choose membership — Start registration from the self-service gym entry.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Start"
          },
          {
            "id": "register",
            "src": "../assets/img/vfit24/flows/register.webp",
            "label": "Create an account",
            "note": "Enter contact details and a member name.",
            "alt": "Create an account — Enter contact details and a member name.",
            "format": "portrait",
            "width": 774,
            "height": 1600
          },
          {
            "id": "otp",
            "src": "../assets/img/vfit24/flows/otp.webp",
            "label": "Verify the phone",
            "note": "Submit the one-time code to establish account access.",
            "alt": "Verify the phone — Submit the one-time code to establish account access.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Decision",
            "routes": [
              {
                "target": "otp-recovery",
                "label": "No code? Follow verification recovery ↗"
              }
            ]
          },
          {
            "id": "home",
            "src": "../assets/img/vfit24/flows/home.webp",
            "label": "Check plans and balance",
            "note": "Review available minutes and choose door access.",
            "alt": "Check plans and balance — Review available minutes and choose door access.",
            "format": "portrait",
            "width": 774,
            "height": 1600
          },
          {
            "id": "scan",
            "src": "../assets/img/vfit24/flows/scan.webp",
            "label": "Scan at the door",
            "note": "Scan the gym QR code to request entry.",
            "alt": "Scan at the door — Scan the gym QR code to request entry.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Decision",
            "routes": [
              {
                "target": "door-recovery",
                "label": "QR fails? Use a code or get help ↗"
              }
            ]
          },
          {
            "id": "timer",
            "src": "../assets/img/vfit24/flows/timer.webp",
            "label": "See time in use",
            "note": "The running timer makes the chargeable session visible.",
            "alt": "See time in use — The running timer makes the chargeable session visible.",
            "format": "portrait",
            "width": 774,
            "height": 1600
          },
          {
            "id": "checkout",
            "src": "../assets/img/vfit24/flows/checkout.webp",
            "label": "Review and unlock",
            "note": "Confirm the charge: HK$1/minute, capped at a HK$120 Day Pass after two hours.",
            "alt": "Review and unlock — Confirm the charge: HK$1/minute, capped at a HK$120 Day Pass after two hours.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Decision"
          },
          {
            "id": "transaction",
            "src": "../assets/img/vfit24/flows/transaction.webp",
            "label": "Inspect the transaction",
            "note": "Review recorded entry, exit, charge and balance change.",
            "alt": "Inspect the transaction — Review recorded entry, exit, charge and balance change.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Complete",
            "routes": [
              {
                "target": "appeals",
                "label": "Incorrect charge? Follow the staff appeal path ↗"
              }
            ]
          }
        ],
        "outcome": "Completion: the session has a recorded charge. An appeal remains available from its transaction."
      },
      {
        "id": "otp-recovery",
        "title": "Restore account access",
        "kind": "recovery",
        "actor": "Member",
        "note": "If the SMS code does not arrive, try the supported alternative before escalating to a person. Staff resolution is a handoff, not an automatic success state.",
        "items": [
          {
            "id": "otp",
            "src": "../assets/img/vfit24/flows/otp.webp",
            "label": "Check delivery options",
            "note": "The verification screen offers resend and WhatsApp verification.",
            "alt": "Check delivery options — The verification screen offers resend and WhatsApp verification.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Trigger"
          },
          {
            "id": "otp-options",
            "src": "../assets/img/vfit24/flows/otp-options.webp",
            "label": "Try another method",
            "note": "Use the WhatsApp resend option; continuing failure leads to support.",
            "alt": "Try another method — Use the WhatsApp resend option; continuing failure leads to support.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Decision"
          },
          {
            "id": "support",
            "src": "../assets/img/vfit24/flows/support.webp",
            "label": "Contact support",
            "note": "Ask staff to resolve the account-access problem.",
            "alt": "Contact support — Ask staff to resolve the account-access problem.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Human handoff"
          }
        ],
        "resume": {
          "target": "member:otp",
          "label": "Once resolved, return to phone verification →"
        },
        "outcome": "Exit: support takes ownership if the extra resend fails. The case specifies one additional WhatsApp resend.",
        "from": {
          "target": "member:otp",
          "label": "From member step 03 · code not received"
        }
      },
      {
        "id": "door-recovery",
        "title": "Recover physical access",
        "kind": "recovery",
        "actor": "Member",
        "note": "A failed scan first has a self-service fallback. If the lock still does not respond, the route hands off to staff and asks the member to confirm the physical outcome.",
        "items": [
          {
            "id": "manual-code",
            "src": "../assets/img/vfit24/flows/manual-code.webp",
            "label": "Enter the door code",
            "note": "Use the code printed below the QR code. Contact support if it still cannot unlock.",
            "alt": "Enter the door code — Use the code printed below the QR code. Contact support if it still cannot unlock.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Fallback",
            "routes": [
              {
                "target": "member:timer",
                "label": "Code works → return to the session ↗"
              }
            ]
          },
          {
            "id": "door-error",
            "src": "../assets/img/vfit24/flows/door-error.webp",
            "label": "Retry or contact staff",
            "note": "A lock fault offers retry and a visible customer-service route.",
            "alt": "Retry or contact staff — A lock fault offers retry and a visible customer-service route.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Decision",
            "routes": [
              {
                "target": "door-assist",
                "label": "Staff handoff → open-door request ↗"
              }
            ]
          },
          {
            "id": "door-followup",
            "src": "../assets/img/vfit24/flows/door-followup.webp",
            "label": "Confirm the door opened",
            "note": "Answer whether staff have actually unlocked the door.",
            "alt": "Confirm the door opened — Answer whether staff have actually unlocked the door.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Confirm",
            "routes": [
              {
                "target": "door-assist",
                "label": "Still locked → return to staff assistance ↗"
              }
            ]
          }
        ],
        "resume": {
          "target": "member:timer",
          "label": "After confirmed entry, resume the timed session →"
        },
        "outcome": "Recovery is complete only when physical access is confirmed; an unanswered or failed unlock stays with support.",
        "from": {
          "target": "member:scan",
          "label": "From member step 05 · QR or lock failure"
        }
      },
      {
        "id": "appeals",
        "title": "Review a disputed charge",
        "kind": "flow",
        "actor": "CS operator",
        "note": "Staff review the original record, decide whether to accept the appeal, then check the time and fee adjustment before saving it.",
        "items": [
          {
            "id": "operator-queue",
            "src": "../assets/img/vfit24/flows/operator-queue.webp",
            "label": "Open the work queue",
            "note": "Select a fee appeal from the outstanding requests.",
            "alt": "Open the work queue — Select a fee appeal from the outstanding requests.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Start",
            "routes": [
              {
                "target": "new-record",
                "label": "Missing record? Add it in two steps ↗"
              }
            ]
          },
          {
            "id": "appeal",
            "src": "../assets/img/vfit24/flows/appeal.webp",
            "label": "Accept or reject",
            "note": "Inspect entry, door events, checkout and the original charge.",
            "alt": "Accept or reject — Inspect entry, door events, checkout and the original charge.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Decision",
            "routes": [
              {
                "target": "appeal-rejected",
                "label": "Not accepted → retain the original charge ↗"
              }
            ]
          },
          {
            "id": "edit-time",
            "src": "../assets/img/vfit24/flows/edit-time.webp",
            "label": "Correct the timestamps",
            "note": "Enter the justified entry and checkout times.",
            "alt": "Correct the timestamps — Enter the justified entry and checkout times.",
            "format": "portrait",
            "width": 774,
            "height": 1600
          },
          {
            "id": "adjustment",
            "src": "../assets/img/vfit24/flows/adjustment.webp",
            "label": "Review the adjustment",
            "note": "Check the example change from HK$120 to HK$119 and the balance credit.",
            "alt": "Review the adjustment — Check the example change from HK$120 to HK$119 and the balance credit.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Confirm"
          },
          {
            "id": "adjusted-record",
            "src": "../assets/img/vfit24/flows/adjusted-record.webp",
            "label": "Inspect the saved record",
            "note": "The record retains the original fee and the adjusted fee for review.",
            "alt": "Inspect the saved record — The record retains the original fee and the adjusted fee for review.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Complete"
          }
        ],
        "outcome": "Completion evidence: the adjusted member record shows the changed charge. A separate appeal-success toast is not included in the available frames.",
        "from": {
          "target": "member:transaction",
          "label": "Handoff from the member’s transaction appeal"
        }
      },
      {
        "id": "appeal-rejected",
        "title": "Keep the original charge",
        "kind": "recovery",
        "actor": "CS operator",
        "note": "Rejection is a separate outcome of the review decision; it must not look like another step in the accepted-appeal route.",
        "items": [
          {
            "id": "appeal-rejected",
            "src": "../assets/img/vfit24/flows/appeal-rejected.webp",
            "label": "Appeal not accepted",
            "note": "The rejection status is recorded and the original fee remains visible.",
            "alt": "Appeal not accepted — The rejection status is recorded and the original fee remains visible.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Alternative outcome"
          }
        ],
        "resume": {
          "target": "appeals:operator-queue",
          "label": "Return to the work queue →"
        },
        "outcome": "No fee adjustment is made on this branch.",
        "from": {
          "target": "appeals:appeal",
          "label": "Branch from appeal step 02 · not accepted"
        }
      },
      {
        "id": "door-assist",
        "title": "Resolve an unlock request",
        "kind": "recovery",
        "actor": "CS operator",
        "note": "Choose whether an entry time needs to be recorded, process the door request, and return to the member’s physical confirmation.",
        "items": [
          {
            "id": "door-request",
            "src": "../assets/img/vfit24/flows/door-request.webp",
            "label": "Check entry-time handling",
            "note": "Decide whether a manual entry time is needed before marking the request handled.",
            "alt": "Check entry-time handling — Decide whether a manual entry time is needed before marking the request handled.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Decision"
          },
          {
            "id": "door-success",
            "src": "../assets/img/vfit24/flows/door-success.webp",
            "label": "See processing success",
            "note": "The operator receives a success confirmation for the door request.",
            "alt": "See processing success — The operator receives a success confirmation for the door request.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Complete"
          }
        ],
        "resume": {
          "target": "door-recovery:door-followup",
          "label": "Return to member confirmation →"
        },
        "outcome": "The success toast belongs to door assistance, not to fee appeals.",
        "from": {
          "target": "door-recovery:door-error",
          "label": "Handoff from the member’s lock fault"
        }
      },
      {
        "id": "new-record",
        "title": "Add a missing record",
        "kind": "recovery",
        "actor": "Management",
        "note": "The supplied record-creation screens are on the management page. They show the two-step correction action; no separate saved-success frame is available.",
        "items": [
          {
            "id": "new-record-member",
            "src": "../assets/img/vfit24/flows/new-record-member.webp",
            "label": "Find the member",
            "note": "Search by phone and select the correct member.",
            "alt": "Find the member — Search by phone and select the correct member.",
            "format": "portrait",
            "width": 838,
            "height": 1600,
            "state": "Step 1"
          },
          {
            "id": "new-record-time",
            "src": "../assets/img/vfit24/flows/new-record-time.webp",
            "label": "Enter the visit times",
            "note": "Review the selected member, enter entry and exit times, then confirm.",
            "alt": "Enter the visit times — Review the selected member, enter entry and exit times, then confirm.",
            "format": "portrait",
            "width": 838,
            "height": 1600,
            "state": "Step 2"
          }
        ],
        "resume": {
          "target": "appeals:operator-queue",
          "label": "After saving, return to outstanding work →"
        },
        "outcome": "Coverage limit: the confirmation action is shown, but its success state is not in the available source.",
        "from": {
          "target": "appeals:operator-queue",
          "label": "Related recovery · a visit record is missing"
        }
      },
      {
        "id": "management",
        "title": "From venue health to revenue",
        "kind": "flow",
        "actor": "Management",
        "note": "A manager starts with the three locations, inspects a venue and its user list, then reviews the income breakdown.",
        "items": [
          {
            "id": "management",
            "src": "../assets/img/vfit24/flows/management.webp",
            "label": "Compare the locations",
            "note": "Read overall attendance and revenue across Kwun Tong, Yuen Long and Kwai Hing.",
            "alt": "Compare the locations — Read overall attendance and revenue across Kwun Tong, Yuen Long and Kwai Hing.",
            "format": "portrait",
            "width": 774,
            "height": 1600,
            "state": "Start"
          },
          {
            "id": "venue",
            "src": "../assets/img/vfit24/flows/venue.webp",
            "label": "Inspect the venue",
            "note": "Open a location to inspect attendance, income and member entry/exit records.",
            "alt": "Inspect the venue — Open a location to inspect attendance, income and member entry/exit records.",
            "format": "portrait",
            "width": 642,
            "height": 1600,
            "state": "Decision"
          },
          {
            "id": "revenue",
            "src": "../assets/img/vfit24/flows/revenue.webp",
            "label": "Review income distribution",
            "note": "Compare minute billing, Day Pass and monthly-plan revenue.",
            "alt": "Review income distribution — Compare minute billing, Day Pass and monthly-plan revenue.",
            "format": "portrait",
            "width": 461,
            "height": 1600,
            "state": "Complete"
          }
        ],
        "outcome": "Completion: the management report provides the breakdown. Venue detail and the user list share one screen."
      },
      {
        "id": "context",
        "title": "The physical service network",
        "kind": "artifacts",
        "actor": "Context",
        "note": "The location graphic supports the case context; it is not a screen transition.",
        "items": [
          {
            "id": "locations",
            "src": "../assets/img/vfit24/flows/locations.webp",
            "label": "Gym locations",
            "note": "Three physical sites make the access and support journey an operational service.",
            "alt": "Gym locations — Three physical sites make the access and support journey an operational service.",
            "format": "wide",
            "width": 329,
            "height": 347,
            "surface": "light"
          }
        ]
      }
    ],
    "layout": "Ordered screens · linked decisions",
    "evidence": "Selected Figma states match the case study’s HK$1/minute rule and HK$120 Day Pass cap. Some session examples retain an older Causeway Bay label; the case study’s three-location scope is authoritative. Personal details are replaced with examples."
  },
  "read-tongue": {
    "title": "Read Tongue Online",
    "kicker": "Patient → practitioner → continued care",
    "intro": "Follow evidence from a patient’s guided capture to a practitioner’s questions and analysis, then through result delivery and follow-up. An unusable photo branches into a reason-led retake path.",
    "back": "read-tongue.html",
    "accent": "#b85b4e",
    "coverage": "3 connected journeys · 1 retake recovery",
    "groups": [
      {
        "id": "intake",
        "title": "Capture, answer, wait",
        "kind": "flow",
        "actor": "Patient",
        "note": "The patient submits usable evidence and answers practitioner-selected questions. Submission confirms receipt and explains the wait for human review.",
        "items": [
          {
            "id": "welcome-live",
            "src": "../assets/img/read-tongue/flows/welcome-live.webp",
            "label": "Enter the service",
            "note": "See the current case status and the registered practitioner team.",
            "alt": "Enter the service — See the current case status and the registered practitioner team.",
            "format": "portrait",
            "width": 757,
            "height": 1600,
            "state": "Start"
          },
          {
            "id": "capture-live",
            "src": "../assets/img/read-tongue/flows/capture-live.webp",
            "label": "Capture usable evidence",
            "note": "Follow the lighting and framing guidance before choosing a tongue photo.",
            "alt": "Capture usable evidence — Follow the lighting and framing guidance before choosing a tongue photo.",
            "format": "portrait",
            "width": 757,
            "height": 1600,
            "state": "Decision",
            "routes": [
              {
                "target": "retake",
                "label": "After review, photo cannot be assessed → retake path ↗"
              }
            ]
          },
          {
            "id": "uploaded-live",
            "src": "../assets/img/read-tongue/flows/uploaded-live.webp",
            "label": "Confirm the upload",
            "note": "The service acknowledges receipt; the practitioner prepares any further questions.",
            "alt": "Confirm the upload — The service acknowledges receipt; the practitioner prepares any further questions.",
            "format": "portrait",
            "width": 757,
            "height": 1600,
            "state": "Handoff",
            "routes": [
              {
                "target": "practitioner:select-questionnaire",
                "label": "Practitioner prepares questions ↗"
              }
            ]
          },
          {
            "id": "questionnaire",
            "src": "../assets/img/read-tongue/flows/questionnaire.webp",
            "label": "Answer the questions",
            "note": "Respond to the targeted questionnaire prepared by the practitioner.",
            "alt": "Answer the questions — Respond to the targeted questionnaire prepared by the practitioner.",
            "format": "portrait",
            "width": 740,
            "height": 1600
          },
          {
            "id": "questionnaire-sent",
            "src": "../assets/img/read-tongue/flows/questionnaire-sent.webp",
            "label": "Submit and await review",
            "note": "The confirmation acknowledges the answers and asks the patient to wait for practitioner review.",
            "alt": "Submit and await review — The confirmation acknowledges the answers and asks the patient to wait for practitioner review.",
            "format": "portrait",
            "width": 740,
            "height": 1600,
            "state": "Complete",
            "routes": [
              {
                "target": "practitioner:review-answers",
                "label": "Answers submitted → practitioner review ↗"
              }
            ]
          }
        ],
        "outcome": "Patient submission is complete. The confirmation carries the wait instruction; a separate current-style waiting dashboard is not available.",
        "resume": {
          "target": "practitioner:review-answers",
          "label": "After submission, hand off to answer review →"
        }
      },
      {
        "id": "practitioner",
        "title": "Review, edit, send",
        "kind": "flow",
        "actor": "Practitioner",
        "note": "A practitioner chooses what to ask, reviews the patient’s evidence and answers, edits the analysis, and explicitly sends it to the patient.",
        "items": [
          {
            "id": "practitioner-queue",
            "src": "../assets/img/read-tongue/flows/practitioner-queue.webp",
            "label": "Choose a case",
            "note": "Prioritise newly uploaded photos and completed questionnaires.",
            "alt": "Choose a case — Prioritise newly uploaded photos and completed questionnaires.",
            "format": "portrait",
            "width": 740,
            "height": 1600,
            "state": "Start"
          },
          {
            "id": "select-questionnaire",
            "src": "../assets/img/read-tongue/flows/select-questionnaire.webp",
            "label": "Choose relevant questions",
            "note": "Select a questionnaire, then wait for the patient to answer before reviewing. Patient-record detail.",
            "alt": "Choose relevant questions — Select a questionnaire, then wait for the patient to answer before reviewing. Patient-record detail.",
            "format": "portrait",
            "width": 607,
            "height": 1600,
            "state": "Handoff",
            "routes": [
              {
                "target": "intake:questionnaire",
                "label": "Patient answers the selected questionnaire ↗"
              },
              {
                "target": "retake",
                "label": "Evidence unclear → request a new photo ↗"
              }
            ]
          },
          {
            "id": "review-answers",
            "src": "../assets/img/read-tongue/flows/review-answers.webp",
            "label": "Inspect the answers",
            "note": "Review the response detail before entering analysis; sensitive responses are hidden.",
            "alt": "Inspect the answers — Review the response detail before entering analysis; sensitive responses are hidden.",
            "format": "portrait",
            "width": 595,
            "height": 1600
          },
          {
            "id": "edit-analysis",
            "src": "../assets/img/read-tongue/flows/edit-analysis.webp",
            "label": "Edit the assessment",
            "note": "Adjust the analysis and prescribed content before sending. Clinical content is anonymised.",
            "alt": "Edit the assessment — Adjust the analysis and prescribed content before sending. Clinical content is anonymised.",
            "format": "portrait",
            "width": 676,
            "height": 1600,
            "state": "Decision"
          },
          {
            "id": "analysis-sent",
            "src": "../assets/img/read-tongue/flows/analysis-sent.webp",
            "label": "Confirm delivery",
            "note": "The completion dialog confirms the analysis was sent to the patient account.",
            "alt": "Confirm delivery — The completion dialog confirms the analysis was sent to the patient account.",
            "format": "portrait",
            "width": 740,
            "height": 1600,
            "state": "Complete"
          }
        ],
        "resume": {
          "target": "results",
          "label": "Continue to result and follow-up →"
        },
        "outcome": "Completion: the practitioner receives an explicit sent confirmation.",
        "from": {
          "target": "intake:uploaded-live",
          "label": "Start after upload; submitted answers enter at step 03"
        }
      },
      {
        "id": "results",
        "title": "From result to follow-up",
        "kind": "flow",
        "actor": "Patient + practitioner",
        "note": "Delivery leads to a readable result and prescription context. The continuing-care sequence returns new evidence to the practitioner and makes comparison possible.",
        "items": [
          {
            "id": "result-notification",
            "src": "../assets/img/read-tongue/flows/result-notification.webp",
            "label": "Receive the notification",
            "note": "A result-ready notification invites the patient back. Notification excerpt only.",
            "alt": "Receive the notification — A result-ready notification invites the patient back. Notification excerpt only.",
            "format": "portrait",
            "width": 740,
            "height": 430,
            "state": "Start"
          },
          {
            "id": "result",
            "src": "../assets/img/read-tongue/flows/result.webp",
            "label": "Read the result",
            "note": "Open the practitioner’s result summary. Detail from the completed result page.",
            "alt": "Read the result — Open the practitioner’s result summary. Detail from the completed result page.",
            "format": "portrait",
            "width": 736,
            "height": 1600
          },
          {
            "id": "prescription",
            "src": "../assets/img/read-tongue/flows/prescription.webp",
            "label": "Review prescription context",
            "note": "Inspect the prescription section and practitioner context before checkout. Prescription content is hidden.",
            "alt": "Review prescription context — Inspect the prescription section and practitioner context before checkout. Prescription content is hidden.",
            "format": "portrait",
            "width": 828,
            "height": 1230
          },
          {
            "id": "checkout-live",
            "src": "../assets/img/read-tongue/flows/checkout-live.webp",
            "label": "Verify identity at checkout",
            "note": "The live checkout explains why identity verification is needed for a prescription.",
            "alt": "Verify identity at checkout — The live checkout explains why identity verification is needed for a prescription.",
            "format": "portrait",
            "width": 757,
            "height": 1600,
            "state": "Decision"
          },
          {
            "id": "followup",
            "src": "../assets/img/read-tongue/flows/followup.webp",
            "label": "Return for another assessment",
            "note": "A follow-up prompt invites a new tongue photo after an interval. Detail view.",
            "alt": "Return for another assessment — A follow-up prompt invites a new tongue photo after an interval. Detail view.",
            "format": "portrait",
            "width": 736,
            "height": 1600
          },
          {
            "id": "history-comparison",
            "src": "../assets/img/read-tongue/flows/history-comparison.webp",
            "label": "Compare successive images",
            "note": "The practitioner sees previous and current evidence side by side. Detail from the follow-up record.",
            "alt": "Compare successive images — The practitioner sees previous and current evidence side by side. Detail from the follow-up record.",
            "format": "portrait",
            "width": 828,
            "height": 1340
          },
          {
            "id": "progress-result",
            "src": "../assets/img/read-tongue/flows/progress-result.webp",
            "label": "Review the next assessment",
            "note": "The follow-up result shows comparison with the previous assessment. Sample display, not a claimed clinical outcome.",
            "alt": "Review the next assessment — The follow-up result shows comparison with the previous assessment. Sample display, not a claimed clinical outcome.",
            "format": "portrait",
            "width": 744,
            "height": 1600,
            "state": "Complete"
          }
        ],
        "outcome": "Coverage limit: checkout is shown, but payment confirmation is not available. The sequence resumes at the documented return-visit state.",
        "from": {
          "target": "practitioner:analysis-sent",
          "label": "After the practitioner sends the result"
        }
      },
      {
        "id": "retake",
        "title": "Recover an unusable photo",
        "kind": "recovery",
        "actor": "Practitioner → patient",
        "note": "The practitioner supplies a reason, the patient sees what needs changing, and a new submission returns to review.",
        "items": [
          {
            "id": "retake-request",
            "src": "../assets/img/read-tongue/flows/retake-request.webp",
            "label": "Explain the problem",
            "note": "Select why the photo cannot be assessed and request a replacement. Dialog detail.",
            "alt": "Explain the problem — Select why the photo cannot be assessed and request a replacement. Dialog detail.",
            "format": "portrait",
            "width": 828,
            "height": 1540,
            "state": "Trigger"
          },
          {
            "id": "retake-status",
            "src": "../assets/img/read-tongue/flows/retake-status.webp",
            "label": "See the retake request",
            "note": "The patient’s status directs them to upload a new tongue image.",
            "alt": "See the retake request — The patient’s status directs them to upload a new tongue image.",
            "format": "portrait",
            "width": 736,
            "height": 1600
          },
          {
            "id": "retake-guidance",
            "src": "../assets/img/read-tongue/flows/retake-guidance.webp",
            "label": "Correct the capture",
            "note": "Use the stated reason and capture guidance to improve the new submission.",
            "alt": "Correct the capture — Use the stated reason and capture guidance to improve the new submission.",
            "format": "portrait",
            "width": 632,
            "height": 1600,
            "state": "Decision"
          },
          {
            "id": "retake-uploaded",
            "src": "../assets/img/read-tongue/flows/retake-uploaded.webp",
            "label": "Confirm the new upload",
            "note": "The repeated-upload confirmation acknowledges the new evidence and explains the next review.",
            "alt": "Confirm the new upload — The repeated-upload confirmation acknowledges the new evidence and explains the next review.",
            "format": "portrait",
            "width": 740,
            "height": 1600,
            "state": "Complete"
          }
        ],
        "resume": {
          "target": "practitioner:practitioner-queue",
          "label": "Return the new evidence to the review queue →"
        },
        "outcome": "The supplied confirmation is the repeat-upload state; no distinct retake-only success frame is available.",
        "from": {
          "target": "practitioner:select-questionnaire",
          "label": "Branch from evidence review · photo cannot be assessed"
        }
      }
    ],
    "layout": "Patient and practitioner handoffs",
    "evidence": "The four published case captures are retained alongside selected Figma states. Figma still shows email in some notifications; the live upload capture uses WhatsApp. The prescription example shows HK$200, while the published checkout shows HK$199; the published case takes precedence. Clinical text, patient identities and prescription details are hidden or replaced. Cropped views are labelled as details."
  },
  "bba": {
    "title": "BigBigAir Aura Reading",
    "kicker": "Scan to Report · Input and outcomes",
    "intro": "The palm scanner and green report show the service; a separate visual concept explores a new report direction.",
    "back": "bba.html",
    "accent": "#6d63d8",
    "coverage": "1 input + 1 report + 1 visual concept",
    "groups": [
      {
        "title": "Input to outcome",
        "note": "The physical scanner, a report example and a labelled visual concept.",
        "items": [
          {
            "src": "../assets/img/bba-device.jpg",
            "label": "Palm scanner",
            "alt": "Physical palm scanner used for the aura reading service",
            "format": "evidence",
            "id": "screen-1",
            "note": "Identify the physical palm scanner used as the service input.",
            "width": 800,
            "height": 800
          },
          {
            "src": "../assets/img/bba-report-green.jpg",
            "label": "Green report",
            "alt": "Green BigBigAir aura reading report variant",
            "format": "wide",
            "id": "screen-2",
            "note": "Inspect an existing green report example.",
            "width": 1440,
            "height": 1024
          },
          {
            "src": "../assets/img/bba-aura-concept.webp",
            "label": "Report visual concept",
            "alt": "Aura report visual concept with a blue light sculpture and reading summary",
            "format": "wide",
            "id": "screen-3",
            "note": "Review the separately labelled visual concept; it is not a shipped flow state.",
            "width": 1487,
            "height": 1058
          }
        ],
        "id": "evidence-1",
        "kind": "artifacts"
      }
    ],
    "layout": "Selected artifacts",
    "evidence": "The accessible Figma file contains a component library and a campaign screen, not a complete service journey. The existing report visual concept remains explicitly labelled."
  },
  "divit-miles": {
    "title": "divit Miles",
    "kicker": "Miles Conversion · Available screens",
    "intro": "The available evidence shows a balance entry state and responsive presentation. The conversion, review and completion journey is not available.",
    "back": "divit-miles.html",
    "accent": "#f5be22",
    "coverage": "1 entry state + responsive proof",
    "groups": [
      {
        "title": "Miles dashboard entry",
        "note": "Two views of the same state, kept together to show how it responds across breakpoints.",
        "items": [
          {
            "src": "../assets/img/divit-thumbnails.png",
            "label": "Member balance",
            "alt": "divit mobile member home and miles balance",
            "format": "evidence",
            "id": "screen-1",
            "note": "Read the member balance entry state. Conversion completion is not available.",
            "width": 1200,
            "height": 800
          },
          {
            "src": "../assets/img/thumb-mile-conversion.jpg",
            "label": "Responsive system",
            "alt": "divit miles experience shown across phone, tablet and desktop",
            "format": "wide",
            "id": "screen-2",
            "note": "Compare the same entry concept across device sizes.",
            "width": 2400,
            "height": 1350
          }
        ],
        "id": "evidence-1",
        "kind": "overview"
      }
    ],
    "layout": "Overview · incomplete journey evidence",
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  },
  "divit-website": {
    "title": "divit Website",
    "kicker": "Corporate Revamp · IA overview",
    "intro": "The available composite records the designed relationship between business explanation, merchant discovery and member shopping. It remains an overview until raw screen exports are added.",
    "back": "divit-website.html",
    "accent": "#f5be22",
    "coverage": "1 responsive overview",
    "groups": [
      {
        "title": "Business and member surfaces",
        "note": "One composite covering all three surfaces, kept at its original export.",
        "items": [
          {
            "src": "../assets/img/thumb-website.jpg",
            "label": "Responsive website system",
            "alt": "divit business, merchant and shopping website screens shown as one system",
            "format": "panorama",
            "id": "screen-1",
            "note": "Inspect the business, merchant and shopping surfaces in the original composite.",
            "width": 2400,
            "height": 1350
          }
        ],
        "id": "evidence-1",
        "kind": "overview"
      }
    ],
    "layout": "Overview · incomplete journey evidence",
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  },
  "twgh": {
    "title": "TWGH Temple Culture",
    "kicker": "Guided Worship · Mobile concept",
    "intro": "The current concept composite contains three real mobile views: choose the experience, understand the deity and prepare the required offerings.",
    "back": "twgh.html",
    "accent": "#d77c73",
    "coverage": "3 mobile views in one composite",
    "groups": [
      {
        "title": "Guided worship journey",
        "note": "Kept at the original composite resolution — cropping the three views apart would soften them.",
        "items": [
          {
            "src": "../assets/img/thumb-twgh.jpg",
            "label": "Choose · understand · prepare",
            "alt": "TWGH temple culture mobile concept showing entry, deity detail and offering preparation",
            "format": "panorama",
            "id": "screen-1",
            "note": "Read the choose, understand and prepare views within the original concept composite.",
            "width": 2400,
            "height": 1350
          },
          {
            "src": "../assets/img/twgh-blended.jpeg",
            "label": "Temple context",
            "alt": "Temple exterior and interior context for the TWGH digital experience",
            "format": "wide",
            "id": "screen-2",
            "note": "See the physical temple context behind the design.",
            "width": 1600,
            "height": 1066
          }
        ],
        "id": "evidence-1",
        "kind": "overview"
      }
    ],
    "layout": "Overview · incomplete journey evidence",
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  },
  "aldi": {
    "title": "ALDI E-commerce",
    "kicker": "Online Grocery · Prototype overview",
    "intro": "The available archive records the online-shopping prototype and its retail context. Individual browse, basket and checkout states are not available.",
    "back": "aldi.html",
    "accent": "#27a9df",
    "coverage": "1 prototype overview + retail context",
    "groups": [
      {
        "title": "From retail context to online concept",
        "note": "The retail context that framed the brief, then the tested online direction.",
        "items": [
          {
            "src": "../assets/img/aldi-hero.jpg",
            "label": "Retail context",
            "alt": "ALDI storefront and shopping-cart context",
            "format": "wide",
            "id": "screen-1",
            "note": "See the retail context that informed the prototype.",
            "width": 1600,
            "height": 1066
          },
          {
            "src": "../assets/img/thumb-aldi.jpg",
            "label": "Online shopping direction",
            "alt": "ALDI online shopping prototype shown on a laptop",
            "format": "panorama",
            "id": "screen-2",
            "note": "Inspect the online-shopping prototype overview; checkout states are not available.",
            "width": 2400,
            "height": 1350
          }
        ],
        "id": "evidence-1",
        "kind": "overview"
      }
    ],
    "layout": "Overview · incomplete journey evidence",
    "evidence": "Only the available evidence is shown. Completion and recovery states are not available in this archive; these groups are not presented as complete flows."
  }
};

  var ORDER = ["inventory", "crm", "scene", "aapoakgy", "edmondpoon", "vfit24", "read-tongue", "bba", "divit-miles", "divit-website", "twgh", "aldi"];

  var params = new URLSearchParams(window.location.search);
  var slug = params.get("case");
  if (!PROJECTS[slug] || ORDER.indexOf(slug) === -1) slug = "edmondpoon";
  var project = PROJECTS[slug];
  var flowRoot = document.getElementById("flow-root");
  var toolbar = document.getElementById("flow-toolbar");
  var dialog = document.getElementById("flow-dialog");
  var dialogImage = document.getElementById("flow-dialog-image");
  var dialogCaption = document.getElementById("flow-dialog-caption");
  var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var opener;

  document.title = project.title + " — Screen Flow Library · Joe Chan";
  document.querySelector(".flow-page").style.setProperty("--flow-accent", project.accent);
  document.getElementById("flow-title").textContent = project.title;
  document.getElementById("flow-kicker").textContent = project.kicker;
  document.getElementById("flow-intro").textContent = project.intro;
  document.getElementById("flow-coverage").textContent = project.coverage;
  document.getElementById("flow-layout").textContent = project.layout || "Selected artifacts";
  document.getElementById("flow-back").href = project.back;
  document.getElementById("flow-back-nav").href = project.back;
  var evidence = document.getElementById("flow-evidence");
  evidence.textContent = project.evidence || "";
  evidence.hidden = !project.evidence;

  function make(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function targetId(ref) { return "flow-" + slug + "-" + ref.replace(":", "-"); }
  function follow(ref) {
    var target = document.getElementById(targetId(ref));
    if (!target) return;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: motion.matches ? "auto" : "smooth", block: "start", inline: "center" });
  }
  function routeLink(route, className) {
    var link = make("a", className, route.label);
    link.href = "#" + targetId(route.target);
    link.addEventListener("click", function (event) {
      event.preventDefault();
      history.replaceState(null, "", link.getAttribute("href"));
      follow(route.target);
    });
    return link;
  }
  function renderProjectNav() {
    var list = make("ul", "flow-case-list");
    ORDER.forEach(function (key) {
      var item = make("li");
      var link = make("a", key === slug ? "is-current" : "", PROJECTS[key].title);
      link.href = "flows.html?case=" + encodeURIComponent(key);
      if (key === slug) link.setAttribute("aria-current", "page");
      item.appendChild(link); list.appendChild(item);
    });
    document.getElementById("flow-case-nav").appendChild(list);
    var current = list.querySelector(".is-current");
    if (current) list.scrollLeft = Math.max(0, current.offsetLeft - list.clientWidth / 2 + current.offsetWidth / 2);
  }
  function openScreen(item, button) {
    opener = button;
    dialogImage.width = item.width;
    dialogImage.height = item.height;
    dialogImage.src = item.src;
    dialogImage.alt = item.alt;
    dialogImage.dataset.surface = item.surface || "dark";
    dialogCaption.textContent = item.label + " — " + item.note;
    dialog.showModal();
  }
  function stripControls(list, title) {
    var controls = make("div", "flow-strip-controls");
    var hint = make("span", "flow-strip-hint", "Scroll to follow the steps →");
    var actions = make("div", "flow-strip-actions");
    var prev = make("button", "", "←");
    var next = make("button", "", "→");
    prev.type = next.type = "button";
    prev.setAttribute("aria-label", "Previous steps: " + title);
    next.setAttribute("aria-label", "Next steps: " + title);
    prev.setAttribute("aria-controls", list.id); next.setAttribute("aria-controls", list.id);
    function update() {
      var overflow = list.scrollWidth > list.clientWidth + 2;
      controls.hidden = !overflow;
      prev.disabled = list.scrollLeft < 2;
      next.disabled = list.scrollLeft + list.clientWidth >= list.scrollWidth - 2;
    }
    function advance(direction) {
      var card = list.firstElementChild;
      var distance = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap) : list.clientWidth;
      list.scrollBy({ left: distance * direction, behavior: motion.matches ? "auto" : "smooth" });
    }
    prev.addEventListener("click", function () { advance(-1); });
    next.addEventListener("click", function () { advance(1); });
    actions.append(prev, next); controls.append(hint, actions);
    list.addEventListener("scroll", update, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(update).observe(list);
    requestAnimationFrame(update);
    return controls;
  }
  function renderGroups() {
    var flowNumber = 0, recoveryNumber = 0, artifactNumber = 0;
    project.groups.forEach(function (group) {
      var kind = group.kind || "artifacts";
      var connected = kind === "flow" || kind === "recovery";
      var section = make("section", "flow-group flow-group--" + kind);
      section.id = targetId(group.id);
      section.tabIndex = -1;
      var headingId = section.id + "-title";
      section.setAttribute("aria-labelledby", headingId);
      var head = make("div", "flow-group-head");
      var identity = make("div", "flow-group-identity");
      var count = kind === "flow" ? ++flowNumber : kind === "recovery" ? ++recoveryNumber : ++artifactNumber;
      var kindLabel = kind === "flow" ? "Flow" : kind === "recovery" ? "Recovery" : kind === "overview" ? "Overview" : "Artifacts";
      identity.appendChild(make("p", "flow-group-index", kindLabel + " " + String(count).padStart(2, "0") + (group.actor ? " / " + group.actor : "")));
      var title = make("h2", "", group.title); title.id = headingId; identity.appendChild(title);
      head.append(identity, make("p", "flow-group-note", group.note)); section.appendChild(head);
      if (group.from) section.appendChild(routeLink(group.from, "flow-route-origin"));
      var list = make("ol", "flow-grid" + (connected ? " flow-grid--sequence" : " flow-grid--artifacts"));
      list.id = section.id + "-screens";
      list.style.setProperty("--flow-columns", Math.min(group.items.length, group.items.some(function (item) { return item.format !== "portrait"; }) ? 3 : 4));
      if (connected) {
        list.tabIndex = 0;
        list.setAttribute("aria-label", group.title + " — ordered screens; scroll horizontally for more");
      }
      group.items.forEach(function (item, index) {
        var card = make("li", "flow-card flow-card--" + item.format);
        card.id = targetId(group.id + ":" + item.id); card.tabIndex = -1;
        var button = make("button", "flow-screen-open"); button.type = "button";
        button.setAttribute("aria-label", "Enlarge " + item.label);
        button.addEventListener("click", function () { openScreen(item, button); });
        var media = make("span", "flow-card-media");
        media.dataset.surface = item.surface || "dark";
        var img = document.createElement("img");
        img.width = item.width; img.height = item.height;
        img.src = item.src; img.alt = item.alt;
        img.loading = "lazy"; img.decoding = "async";
        media.appendChild(img); button.appendChild(media);
        var caption = make("span", "flow-card-caption");
        caption.appendChild(make("span", "flow-card-step", String(index + 1).padStart(2, "0")));
        var copy = make("span", "flow-card-copy");
        if (item.state) copy.appendChild(make("span", "flow-card-state", item.state));
        copy.appendChild(make("strong", "", item.label));
        copy.appendChild(make("span", "flow-card-note", item.note));
        caption.appendChild(copy); button.appendChild(caption); card.appendChild(button);
        if (item.routes) {
          var routes = make("div", "flow-card-routes");
          item.routes.forEach(function (route) { routes.appendChild(routeLink(route, "flow-branch-link")); });
          card.appendChild(routes);
        }
        if (connected && index < group.items.length - 1) {
          var arrow = make("span", "flow-connector", "→"); arrow.setAttribute("aria-hidden", "true"); card.appendChild(arrow);
        }
        list.appendChild(card);
      });
      section.appendChild(list);
      if (connected) section.appendChild(stripControls(list, group.title));
      if (group.outcome || group.resume) {
        var ending = make("div", "flow-outcome");
        if (group.outcome) ending.appendChild(make("p", "", group.outcome));
        if (group.resume) ending.appendChild(routeLink(group.resume, "flow-resume"));
        section.appendChild(ending);
      }
      flowRoot.appendChild(section);
    });
  }
  function renderToolbar() {
    if (project.groups.length < 2) return;
    toolbar.appendChild(make("span", "flow-toolbar-label", "Jump to"));
    project.groups.forEach(function (group) {
      var button = make("button", "", group.shortTitle || group.title); button.type = "button";
      button.addEventListener("click", function () { follow(group.id); });
      toolbar.appendChild(button);
    });
  }
  function enableCircuitSignal() {
    var page = document.querySelector(".flow-page");
    if (motion.matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    page.addEventListener("pointermove", function (event) {
      if (motion.matches) return;
      var bounds = page.getBoundingClientRect();
      page.style.setProperty("--flow-signal-x", event.clientX - bounds.left + "px");
      page.style.setProperty("--flow-signal-y", event.clientY - bounds.top + "px");
      page.classList.add("is-signal-awake");
    });
    page.addEventListener("pointerleave", function () { page.classList.remove("is-signal-awake"); });
  }
  dialog.querySelector(".flow-dialog-close").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", function () { if (opener) opener.focus({ preventScroll: true }); });
  renderProjectNav(); renderGroups(); renderToolbar(); enableCircuitSignal();
  if (location.hash.indexOf("#flow-" + slug + "-") === 0) {
    requestAnimationFrame(function () {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ block: "start", inline: "center" });
    });
  }
})();
