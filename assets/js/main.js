/* Joe Chan — portfolio interactions.
   Progressive enhancement: with no JS / no GSAP / reduced motion,
   all content stays fully visible and usable. */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  var hasGsap = typeof window.gsap !== "undefined";

  /* ---------- Custom cursor: dot + follower ring (difference blend) ---------- */
  if (finePointer && !reducedMotion && hasGsap) {
    document.body.classList.add("custom-cursor");

    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.innerHTML = '<span class="cursor-label">view</span>';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    var dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    var dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    var ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    var ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    window.addEventListener("mousemove", function (e) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    });

    // Grow ring over interactive elements; italic "view" state over project collages
    document.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        document.body.classList.add(
          el.closest(".project") ? "cursor-view" : "cursor-hover",
        );
      });
      el.addEventListener("mouseleave", function () {
        document.body.classList.remove("cursor-hover", "cursor-view");
      });
    });
  }

  /* ---------- Magnetic pull on nav + social links ---------- */
  if (finePointer && !reducedMotion && hasGsap) {
    document
      .querySelectorAll(".site-nav a, .contact-social a")
      .forEach(function (el) {
        var xTo = gsap.quickTo(el, "x", {
          duration: 0.4,
          ease: "elastic.out(1,0.4)",
        });
        var yTo = gsap.quickTo(el, "y", {
          duration: 0.4,
          ease: "elastic.out(1,0.4)",
        });
        el.addEventListener("mousemove", function (e) {
          var r = el.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.3);
          yTo((e.clientY - r.top - r.height / 2) * 0.3);
        });
        el.addEventListener("mouseleave", function () {
          xTo(0);
          yTo(0);
        });
      });
  }

  /* ---------- Nav portfolio title: gentle scatter float ---------- */
  if (!reducedMotion && hasGsap) {
    document.querySelectorAll(".nav-hello span").forEach(function (el, i) {
      gsap.to(el, {
        y: i % 2 === 0 ? 5 : -5,
        duration: 1.6 + i * 0.25,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });
  }

  /* ---------- Scroll reveals + collage parallax ---------- */
  if (!reducedMotion && hasGsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal").forEach(function (el) {
      gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // Ghost letters drift slowly
    gsap.utils.toArray(".ghost").forEach(function (el, i) {
      gsap.to(el, {
        yPercent: i % 2 === 0 ? 30 : -30,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, scrub: 1 },
      });
    });

    // Stat counters
    gsap.utils.toArray(".stat-value[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var num = { v: 0 };
      var numEl = el.querySelector(".num");
      gsap.to(num, {
        v: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: function () {
          if (numEl) numEl.textContent = Math.round(num.v);
        },
      });
    });

    // Footer dots pop in
    var dots = document.querySelectorAll(".contact-dots span");
    if (dots.length) {
      gsap.from(dots, {
        scale: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.06,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".contact-dots", start: "top 92%" },
      });
    }
  }

  /* ---------- Crate: the record box that opens the site ---------- */
  (function crate() {
    "use strict";

    // main.js is shared with the case pages, which have no crate.
    // Bailing on a missing GSAP keeps every module after this one alive
    // instead of taking the page down with a ReferenceError.
    if (!document.querySelector(".crate-scene") || !hasGsap) return;

    // The listing in index.html is the single source of truth; the crate
    // derives its sleeves from those rows. Add a project there and it
    // appears here automatically, in the same order.
    var CASES = [
      { intro: true, a: "Collection", b: "Recent Work", tag: "aka portfolio" },
    ];

    Array.prototype.forEach.call(
      document.querySelectorAll("#worklist .wl-row"),
      function (row) {
        var cover = row.dataset.cover;
        var href = row.getAttribute("href");
        // A half-written row should cost you that one record, not the page.
        if (!cover || !href) {
          if (window.console) {
            console.warn(
              "crate: skipping a work row missing data-cover or href",
              row,
            );
          }
          return;
        }
        var tagEl = row.querySelector(".wl-tag");
        var titleEl = row.querySelector(".wl-title");
        var title = titleEl ? titleEl.textContent.trim() : "Untitled";
        CASES.push({
          a: row.dataset.a || title,
          b: row.dataset.b || "",
          tag: tagEl ? tagEl.textContent.trim() : "",
          img: cover.replace(/^assets\/img\//, ""),
          circuit: row.dataset.circuit || "",
          accent: row.dataset.accent || "#ffffff",
          href: href,
        });
      },
    );

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scene = document.querySelector(".crate-scene");
    var introEl = document.getElementById("intro");
    var caseEl = document.getElementById("case");
    var rail = document.getElementById("rail");
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");
    var crate = document.getElementById("crate");
    var art = document.getElementById("art");
    var titleEl = document.getElementById("title");
    var tagEl = document.getElementById("tag");
    var indexEl = document.getElementById("index");
    var openEl = document.getElementById("open");
    var countEl = document.getElementById("count");

    function setCircuitMask(el, path) {
      if (!el) return;
      if (!path) {
        el.style.removeProperty("--circuit-mask");
        el.classList.remove("has-circuit");
        return;
      }
      var resolvedPath = new URL(path, document.baseURI).href;
      el.style.setProperty("--circuit-mask", 'url("' + resolvedPath + '")');
      el.classList.add("has-circuit");
    }

    // The cursor behaves like a probe: movement briefly energises only the
    // nearby section of the field and the selected artwork's own traces.
    if (finePointer && !reduced) {
      var signalFrame = 0;
      var signalEvent = null;
      var signalIdleTimer = 0;

      function settleSignal() {
        scene.classList.remove("is-signal-awake");
      }

      function paintSignal() {
        signalFrame = 0;
        if (!signalEvent) return;

        var sceneRect = scene.getBoundingClientRect();
        var artRect = art.getBoundingClientRect();
        scene.style.setProperty(
          "--signal-x",
          signalEvent.clientX - sceneRect.left + "px",
        );
        scene.style.setProperty(
          "--signal-y",
          signalEvent.clientY - sceneRect.top + "px",
        );
        art.style.setProperty(
          "--signal-x",
          signalEvent.clientX - artRect.left + "px",
        );
        art.style.setProperty(
          "--signal-y",
          signalEvent.clientY - artRect.top + "px",
        );
        scene.classList.add("is-signal-awake");
      }

      scene.addEventListener(
        "pointermove",
        function (e) {
          signalEvent = e;
          if (!signalFrame) signalFrame = requestAnimationFrame(paintSignal);
          window.clearTimeout(signalIdleTimer);
          signalIdleTimer = window.setTimeout(settleSignal, 520);
        },
        { passive: true },
      );
      scene.addEventListener("pointerleave", function () {
        signalEvent = null;
        window.clearTimeout(signalIdleTimer);
        settleSignal();
      });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) settleSignal();
      });
    }

    var active = 0;
    var sleeves = [];
    var arts = [];

    countEl.textContent =
      "/" + (CASES.length - 1 < 10 ? "0" : "") + (CASES.length - 1);

    CASES.forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "sleeve";
      b.type = "button";
      b.setAttribute("role", "option");
      b.setAttribute("aria-label", c.a + " " + c.b);
      b.id = "sleeve-" + i;
      if (c.accent) b.style.setProperty("--case-accent", c.accent);
      if (!c.intro) setCircuitMask(b, c.circuit);
      // a composite widget owns one tab stop; arrows move within it
      b.tabIndex = -1;
      b.innerHTML = c.intro
        ? '<span class="sleeve-type"><b>Joe Chan</b><i>Collection</i><u>2021&ndash;2026</u></span>'
        : '<img src="assets/img/' + c.img + '" alt="" />';
      b.addEventListener("click", function () {
        // Native click owns taps and mouse picks. Pointer release owns only
        // real drags, so one physical gesture can never select twice and
        // cancel its own stage flight.
        if (performance.now() - dragEndedAt < 300) return;
        select(i);
      });
      rail.appendChild(b);
      sleeves.push(b);

      if (c.intro) {
        arts.push(null);
        return;
      }
      var im = document.createElement("img");
      im.src = "assets/img/" + c.img;
      im.alt = c.a + " " + c.b;
      if (c.accent) im.style.setProperty("--case-accent", c.accent);
      art.appendChild(im);
      arts.push(im);
    });

    /* ---- sleeve geometry ----
       `centre` is a float, so a drag can sit between two sleeves. */
    function step() {
      return sleeves[0].offsetWidth * 0.62;
    }

    function layout(centre, instant) {
      var w = sleeves[0].offsetWidth;
      var near = Math.round(centre);
      sleeves.forEach(function (s, i) {
        var d = i - centre;
        var ad = Math.abs(d);
        var lift = ad < 0.5 ? (0.5 - ad) * 2 * 40 : 0;
        var props = {
          x: d * step() - w / 2,
          y: -lift,
          z: -ad * 46,
          rotateY: Math.max(-38, Math.min(38, -d * 15)),
          rotateZ: Math.max(-5, Math.min(5, d * 2.2)),
          scale: (ad < 0.5 ? 1.1 - ad * 0.2 : 1) - Math.min(ad, 4) * 0.05,
          opacity: ad > 4.6 ? 0 : 1,
          zIndex: 100 - Math.round(ad * 10),
        };
        // During a drag the sleeves must track the finger exactly; a tween
        // here is what made the crate feel like it was fighting you.
        if (instant || reduced) gsap.set(s, props);
        else
          gsap.to(
            s,
            Object.assign({ duration: 0.55, ease: "power3.out" }, props),
          );
        s.classList.toggle("is-active", i === near);
        s.setAttribute("aria-selected", i === active ? "true" : "false");
        if (i === active) crate.setAttribute("aria-activedescendant", s.id);
      });
    }

    /* ---- swapping the record on the stage ---- */
    function paint(i, instant, viaFlight) {
      var c = CASES[i];
      var wasIntro = scene.classList.contains("is-intro");
      scene.classList.toggle("is-intro", !!c.intro);
      scene.style.setProperty("--case-accent", c.accent || "#ffa400");
      art.style.setProperty("--case-accent", c.accent || "#ffffff");
      setCircuitMask(art, c.intro ? "" : c.circuit);

      // Both blocks are always driven to an explicit target, and any
      // tween still running on them is killed first. Conditional fades
      // let overlapping interactions strand one block half-faded — or
      // leave both fully visible on top of each other.
      var showIntro = !!c.intro;
      var settle = function () {
        gsap.set(introEl, { opacity: showIntro ? 1 : 0, y: 0 });
        gsap.set(caseEl, { opacity: showIntro ? 0 : 1, y: 0 });
      };
      gsap.killTweensOf([introEl, caseEl]);

      if (instant || reduced || showIntro === wasIntro) {
        settle();
      } else {
        var outgoing = showIntro ? caseEl : introEl;
        var incoming = showIntro ? introEl : caseEl;
        gsap.to(outgoing, {
          opacity: 0,
          y: showIntro ? 0 : -14,
          duration: 0.32,
          ease: "power2.in",
        });
        gsap.fromTo(
          incoming,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
            delay: 0.13,
          },
        );
      }

      // Keep the hidden half out of the accessibility tree so a screen
      // reader never announces the block that is faded out.
      introEl.setAttribute("aria-hidden", showIntro ? "false" : "true");
      caseEl.setAttribute("aria-hidden", showIntro ? "true" : "false");
      // inert also pulls the faded half out of the tab order, so focus can
      // never land on a link nobody can see
      introEl.inert = !showIntro;
      caseEl.inert = showIntro;

      arts.forEach(function (im, j) {
        if (!im) return;
        var live = j === i;
        // A stale fade from the previous selection must not overwrite the
        // explicit state below after a fast click or drag.
        gsap.killTweensOf(im);
        im.classList.toggle("is-live", live);
        if (instant || reduced) {
          gsap.set(im, { opacity: live ? 1 : 0, scale: 1 });
        } else if (live && viaFlight) {
          // the flyer is standing in for this image until it lands
          gsap.set(im, { opacity: 0, scale: 1 });
        } else {
          gsap.to(im, {
            opacity: live ? 1 : 0,
            scale: live ? 1 : 1.04,
            duration: 0.6,
            ease: "power2.out",
          });
          if (live)
            gsap.fromTo(
              im,
              { scale: 1.06 },
              { scale: 1, duration: 0.9, ease: "expo.out" },
            );
        }
      });

      if (c.intro) return;
      indexEl.textContent = (i < 9 ? "0" : "") + i;
      tagEl.textContent = c.tag;
      openEl.href = c.href;
      openEl.setAttribute("aria-label", "Open case study: " + c.a + " " + c.b);

      titleEl.setAttribute("aria-label", c.a + " " + c.b);
      titleEl.textContent = "";
      [c.a, c.b].forEach(function (line, li) {
        var row = document.createElement("span");
        row.className = "title-line" + (li ? " title-line--off" : "");
        row.setAttribute("aria-hidden", "true");
        line.split("").forEach(function (ch) {
          var sp = document.createElement("span");
          sp.className = "char";
          sp.innerHTML = ch === " " ? "&nbsp;" : ch;
          row.appendChild(sp);
        });
        titleEl.appendChild(row);
      });
      if (!instant && !reduced) {
        // when a sleeve is in the air, the title lands with it
        var land = viaFlight ? 0.42 : 0;
        gsap.from(titleEl.querySelectorAll(".char"), {
          yPercent: 110,
          opacity: 0,
          duration: 0.7,
          stagger: 0.018,
          ease: "expo.out",
          delay: land,
        });
        gsap.from([tagEl, indexEl], {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          delay: land,
        });
      }
    }

    var flight = null;

    // Every path that changes the record must drop a flight still in the air —
    // otherwise its onComplete lights up an image that is no longer showing.
    function cancelFlight() {
      if (!flight) return;
      flight.kill();
      if (flight.node) {
        gsap.killTweensOf(flight.node);
        if (flight.node.parentNode) flight.node.remove();
      }
      flight = null;
    }

    // A sleeve lifts out of the crate and opens into the artwork on stage.
    function fly(i) {
      var target = arts[i];
      var sleeve = sleeves[i];
      if (!target || !sleeve) return false;

      var to = target.getBoundingClientRect();
      var from = sleeve.getBoundingClientRect();
      if (!to.width || !from.width) return false;

      cancelFlight();

      var node = document.createElement("div");
      node.className = "flyer";
      node.setAttribute("aria-hidden", "true");
      node.innerHTML =
        '<img src="' + target.getAttribute("src") + '" alt="" />';
      if (CASES[i].accent) {
        node.style.setProperty("--case-accent", CASES[i].accent);
      }
      setCircuitMask(node, CASES[i].circuit);
      document.body.appendChild(node);

      gsap.set(node, {
        left: from.left,
        top: from.top,
        width: from.width,
        height: from.height,
        // take off wearing the sleeve's own dimming, then come to life
        filter: getComputedStyle(sleeve).filter,
      });
      gsap.to(node, { filter: "none", duration: 0.34, ease: "power2.out" });

      flight = gsap.to(node, {
        left: to.left,
        top: to.top,
        width: to.width,
        height: to.height,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(255, 255, 255, 0)",
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        duration: 0.68,
        ease: "power2.inOut",
        onComplete: function () {
          gsap.set(target, { opacity: 1 });
          node.remove();
          flight = null;
        },
      });
      flight.node = node;
      return true;
    }

    function clamp(i) {
      return Math.max(0, Math.min(CASES.length - 1, i));
    }

    function select(i, instant) {
      i = clamp(i);
      var same = i === active;
      active = i;
      layout(active, instant);

      var flown = false;
      if (instant || same || reduced || CASES[i].intro) cancelFlight();
      else flown = fly(i);
      // paint every time to keep the stage in sync; re-selecting the current
      // record settles instead of re-animating.
      paint(i, instant || same, flown);
      syncArrows();
    }

    function syncArrows() {
      prevBtn.disabled = active === 0;
      nextBtn.disabled = active === CASES.length - 1;
    }

    /* ---- flipping through: drag, arrows, keys, wheel ---- */
    var down = false,
      startX = 0,
      lastX = 0,
      lastT = 0,
      vel = 0;
    var offset = 0,
      dragged = false,
      base = 0,
      // A timestamp of zero swallows clicks during the first 300ms of load.
      dragEndedAt = -Infinity;

    var captured = false;

    crate.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".crate-nav")) return;
      down = true;
      dragged = false;
      captured = false;
      startX = lastX = e.clientX;
      lastT = performance.now();
      vel = 0;
      base = active;
      crate.classList.add("is-dragging");
    });

    crate.addEventListener("pointermove", function (e) {
      if (!down) return;
      var now = performance.now();
      var dt = now - lastT;
      if (dt > 0) vel = (e.clientX - lastX) / dt; // px per ms
      lastX = e.clientX;
      lastT = now;

      offset = e.clientX - startX;
      if (Math.abs(offset) > 4) {
        dragged = true;
        // capture only once this is a real drag, so a plain press stays a click
        if (!captured) {
          captured = true;
          try {
            crate.setPointerCapture(e.pointerId);
          } catch (err) {
            /* pointer already gone */
          }
        }
      }

      var centre = base - offset / step();
      layout(Math.max(-0.6, Math.min(CASES.length - 0.4, centre)), true);

      // Show what you are about to land on, before you let go.
      var near = clamp(Math.round(centre));
      if (near !== active) {
        active = near;
        cancelFlight();
        paint(active, true);
        syncArrows();
      }
    });

    function release() {
      if (!down) return;
      down = false;
      if (dragged) dragEndedAt = performance.now();
      crate.classList.remove("is-dragging");
      // A flick carries, a deliberate drag does not — and it never runs
      // away from you: two records of coast is the ceiling.
      var carry =
        Math.abs(vel) < 0.35
          ? 0
          : Math.max(-2, Math.min(2, (-vel * 110) / step()));
      if (dragged) {
        // A tap/click is selected by the sleeve's native click handler.
        // Selecting it here as well used to cancel the flight immediately,
        // leaving the stage blank until the same sleeve was clicked again.
        select(Math.round(base - offset / step() + carry));
      }
      offset = 0;
      vel = 0;
    }
    crate.addEventListener("pointerup", release);
    crate.addEventListener("pointercancel", release);
    crate.addEventListener("lostpointercapture", release);

    prevBtn.addEventListener("click", function () {
      select(active - 1);
    });
    nextBtn.addEventListener("click", function () {
      select(active + 1);
    });

    crate.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        select(active + 1);
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") {
        select(active - 1);
        e.preventDefault();
      }
      if ((e.key === "Enter" || e.key === " ") && CASES[active].href) {
        window.location.href = CASES[active].href;
        e.preventDefault();
      }
    });

    var wheelLock = false;
    crate.addEventListener(
      "wheel",
      function (e) {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
        e.preventDefault();
        if (wheelLock) return;
        wheelLock = true;
        select(active + (e.deltaX > 0 ? 1 : -1));
        setTimeout(function () {
          wheelLock = false;
        }, 220);
      },
      { passive: false },
    );

    window.addEventListener("resize", function () {
      layout(active, true);
    });

    select(0, true);
    if (!reduced) {
      gsap.from(sleeves, {
        y: 90,
        opacity: 0,
        duration: 0.8,
        stagger: 0.045,
        ease: "expo.out",
        delay: 0.1,
      });
    }
  })();

  /* ---------- Nav: take colour from the surface beneath it ---------- */
  (function navSurface() {
    var nav = document.querySelector(".site-nav");
    var zones = document.querySelectorAll("[data-surface]");
    if (!nav || !zones.length) return;

    var probe = 58; // low in the bar, so it adopts the incoming surface early
    function sync() {
      var light = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          light = zones[i].dataset.surface === "light";
          break;
        }
      }
      nav.classList.toggle("on-light", light);
    }

    var queued = false;
    window.addEventListener(
      "scroll",
      function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          sync();
        });
      },
      { passive: true },
    );
    window.addEventListener("resize", sync);
    sync();
  })();

  /* ---------- Work listing: numbering, count, phone thumbs ---------- */
  (function worklist() {
    var list = document.getElementById("worklist");
    if (!list) return;

    var rows = Array.prototype.slice.call(list.querySelectorAll(".wl-row"));
    var pad = function (n) {
      return (n < 10 ? "0" : "") + n;
    };

    rows.forEach(function (row, i) {
      // numbering and the section count are derived, never hand-maintained
      var num = row.querySelector(".wl-num");
      if (num) num.textContent = pad(i + 1);

      // phones get an inline cover, since there is no hover there
      var thumb = document.createElement("span");
      thumb.className = "wl-thumb";
      thumb.setAttribute("aria-hidden", "true");
      thumb.style.setProperty("--case-accent", row.dataset.accent || "#ffffff");
      if (row.dataset.circuit) {
        var circuitUrl = new URL(row.dataset.circuit, document.baseURI).href;
        thumb.style.setProperty("--circuit-mask", 'url("' + circuitUrl + '")');
        thumb.classList.add("has-circuit");
      }

      var thumbImage = document.createElement("img");
      thumbImage.src = row.dataset.cover;
      thumbImage.alt = "";
      thumbImage.loading = "lazy";
      thumbImage.width = 54;
      thumbImage.height = 54;
      thumb.appendChild(thumbImage);
      row.insertBefore(thumb, row.firstChild);
    });

    var count = document.getElementById("work-count");
    if (count) count.textContent = "/" + pad(rows.length);
  })();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
