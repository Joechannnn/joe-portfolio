/* Joe Chan — portfolio entrance.
   Part of the immersive vinyl direction: the visitor checks in at the coin
   slot before the collection opens.
   Entry is optimistic — the record is POSTed in the background, so a
   form-service outage never blocks access. */
(function () {
  "use strict";

  // GLOBAL SWITCH: change only this value, then deploy access.js.
  // "on" shows the gate; "off" opens the portfolio directly.
  var GATE_MODE = "off";

  var root = document.documentElement;
  var cookieName = "joe_portfolio_access";
  var endpoint = "https://formsubmit.co/ajax/joechanwainam@gmail.com";
  var thirtyDays = 60 * 60 * 24 * 30;
  var gateScript =
    document.currentScript ||
    Array.prototype.find.call(document.scripts, function (script) {
      return /assets\/js\/access\.js(?:\?|$)/.test(script.src);
    });
  var assetRoot = new URL(
    "../",
    gateScript ? gateScript.src : document.baseURI,
  );
  var gateUsesPortraitFilm = window.matchMedia("(max-width: 768px)").matches;
  var gateFilmStem = gateUsesPortraitFilm
    ? "listening-gate-cinematic-portrait"
    : "listening-gate-cinematic-wide";
  var gateVideoUrl = new URL("video/" + gateFilmStem + ".mp4", assetRoot).href;
  var gatePosterUrl = new URL(
    "video/" + gateFilmStem + "-poster.webp",
    assetRoot,
  ).href;
  var coinAudioContext;
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function hasPass() {
    return new RegExp("(?:^|;\\s*)" + cookieName + "=1(?:;|$)").test(
      document.cookie,
    );
  }

  function openPortfolioImmediately() {
    root.classList.remove("access-pending");
    root.classList.add("access-granted");
  }

  var gateRequest = String(
    new URLSearchParams(window.location.search).get("gate") || "",
  ).toLowerCase();
  var forceGate = gateRequest === "preview" || gateRequest === "reset";
  var gateIsActive = String(GATE_MODE).toLowerCase() === "on";

  if (gateRequest === "reset") {
    document.cookie = cookieName + "=; Max-Age=0; Path=/; SameSite=Lax";
  }

  if (gateRequest === "skip") {
    rememberPass();
    openPortfolioImmediately();
    return;
  }

  if ((!gateIsActive && !forceGate) || (!forceGate && hasPass())) {
    openPortfolioImmediately();
    return;
  }

  root.classList.remove("access-granted");

  var gate = document.createElement("section");
  gate.className = "vinyl-gate";
  gate.setAttribute("data-beat", "pass");
  gate.setAttribute("role", "dialog");
  gate.setAttribute("tabindex", "-1");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "vinyl-gate-title");
  gate.innerHTML =
    '<div class="gate-cinema" aria-hidden="true">' +
    '<video class="gate-cinema__video" muted playsinline preload="auto" poster="' +
    gatePosterUrl +
    '">' +
    '<source src="' +
    gateVideoUrl +
    '" type="video/mp4" />' +
    "</video>" +
    '<span class="gate-slot-anchor"></span>' +
    '<span class="gate-record-anchor"></span>' +
    "</div>" +
    '<div class="vinyl-gate__shell">' +
    '<main class="vinyl-gate__stage">' +
    '<form class="vinyl-form" action="' +
    endpoint +
    '" method="post" novalidate>' +
    '<div class="vinyl-pass__head">' +
    '<h1 class="vinyl-pass__title" id="vinyl-gate-title"><span>Joe\u2019s</span> <em>portfolio</em></h1>' +
    '<span class="vinyl-pass__side">Visitor details</span>' +
    "</div>" +
    '<p class="vinyl-pass__prompt">' +
    '<span class="vinyl-pass__identity">I\u2019m Joe \u2014 a Hong Kong-based Product Designer and Product Manager.</span>' +
    '<strong class="vinyl-pass__hook">Inside: selected case studies showing how strategy, systems and design move from first idea to real-world launch.</strong>' +
    '<span class="vinyl-pass__instruction">Leave your name and company below, then insert the coin to enter.</span>' +
    "</p>" +
    '<div class="vinyl-form__fields">' +
    '<div class="vinyl-field">' +
    '<label for="visitor-name">Your name</label>' +
    '<input id="visitor-name" name="name" type="text" autocomplete="name" placeholder="Name" minlength="2" maxlength="80" aria-describedby="visitor-name-error" required />' +
    '<p class="vinyl-field__error" id="visitor-name-error"></p>' +
    "</div>" +
    '<div class="vinyl-field">' +
    '<label for="visitor-company">Company / organisation</label>' +
    '<input id="visitor-company" name="company" type="text" autocomplete="organization" placeholder="Company name" minlength="2" maxlength="120" aria-describedby="visitor-company-error" required />' +
    '<p class="vinyl-field__error" id="visitor-company-error"></p>' +
    "</div>" +
    "</div>" +
    '<div class="vinyl-form__honey" aria-hidden="true">' +
    '<label for="visitor-website">Leave this field empty</label>' +
    '<input id="visitor-website" name="_honey" type="text" tabindex="-1" autocomplete="off" />' +
    "</div>" +
    '<button class="vinyl-form__submit" type="submit"><span class="vinyl-form__submit-label">Insert coin &amp; enter portfolio</span><span class="vinyl-form__coin-mark" aria-hidden="true"><span>J</span></span></button>' +
    '<p class="vinyl-form__status" role="status" aria-live="polite"></p>' +
    "</form>" +
    "</main>" +
    '<footer class="vinyl-gate__footer">' +
    '<p class="vinyl-gate__privacy">Your name and company are sent privately to Joe. They are not displayed publicly.</p>' +
    '<span class="vinyl-gate__pass">30-day access</span>' +
    "</footer>" +
    "</div>";

  document.body.appendChild(gate);
  root.classList.add("access-pending");

  /* Warm the single Blender-rendered sprite before the visitor submits. */
  var coinSprite = new Image();
  coinSprite.decoding = "async";
  coinSprite.src = new URL(
    "img/gate/coin/coin-spin-strip.webp",
    assetRoot,
  ).href;

  var lockedElements = [];
  var backgroundObserver;

  function lockElement(element) {
    if (!element || element.nodeType !== 1) return;
    if (
      element === gate ||
      element.tagName === "SCRIPT" ||
      element.tagName === "STYLE" ||
      element.classList.contains("cursor-dot") ||
      element.classList.contains("cursor-ring")
    ) {
      return;
    }
    lockedElements.push({
      element: element,
      inert: element.hasAttribute("inert"),
      ariaHidden: element.getAttribute("aria-hidden"),
    });
    element.setAttribute("inert", "");
    element.setAttribute("aria-hidden", "true");
  }

  Array.prototype.forEach.call(document.body.children, lockElement);
  backgroundObserver = new MutationObserver(function (records) {
    records.forEach(function (recordItem) {
      Array.prototype.forEach.call(recordItem.addedNodes, lockElement);
    });
  });
  backgroundObserver.observe(document.body, { childList: true });

  var form = gate.querySelector(".vinyl-form");
  var submitButton = gate.querySelector(".vinyl-form__submit");
  var submitLabel = gate.querySelector(".vinyl-form__submit-label");
  var status = gate.querySelector(".vinyl-form__status");
  var nameInput = gate.querySelector("#visitor-name");
  var companyInput = gate.querySelector("#visitor-company");
  var fields = [nameInput, companyInput];
  var film = gate.querySelector(".gate-cinema__video");
  var slot = gate.querySelector(".gate-slot-anchor");
  var record = gate.querySelector(".gate-record-anchor");
  var coinMark = gate.querySelector(".vinyl-form__coin-mark");
  var running = false;

  /* Film is under 1 MB. Preload during form entry so the coin never lands
     on an empty video layer. */
  try {
    film.load();
  } catch (error) {
    // A failed preload is handled by waitForFilmFrame before playback.
  }

  /* object-fit: cover crops a different amount per viewport, so derive the
     slot position from the source frame. */
  function positionSlotAnchor() {
    var sourceWidth = gateUsesPortraitFilm ? 900 : 1440;
    var sourceHeight = gateUsesPortraitFilm ? 1600 : 900;
    var slotX = sourceWidth * (gateUsesPortraitFilm ? 0.726 : 0.702);
    var slotY = sourceHeight * (gateUsesPortraitFilm ? 0.488 : 0.484);
    var scale = Math.max(
      window.innerWidth / sourceWidth,
      window.innerHeight / sourceHeight,
    );
    var cropX = (sourceWidth * scale - window.innerWidth) / 2;
    var cropY = (sourceHeight * scale - window.innerHeight) / 2;

    slot.style.left = slotX * scale - cropX + "px";
    slot.style.top = slotY * scale - cropY + "px";
  }

  positionSlotAnchor();
  window.addEventListener("resize", positionSlotAnchor);

  function fieldMessage(input) {
    var value = input.value.trim();
    if (!value) {
      return input === nameInput
        ? "Enter your name to continue."
        : "Enter your company or organisation to continue.";
    }
    if (value.length < 2) return "Please enter at least 2 characters.";
    return "";
  }

  function validateField(input) {
    var message = fieldMessage(input);
    var field = input.closest(".vinyl-field");
    var error = document.getElementById(input.getAttribute("aria-describedby"));
    field.classList.toggle("has-error", !!message);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
    return !message;
  }

  fields.forEach(function (input) {
    input.addEventListener("blur", function () {
      validateField(input);
    });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validateField(input);
    });
  });

  function wait(milliseconds) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, milliseconds);
    });
  }

  function playCoinSound(delaySeconds) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    try {
      var context = coinAudioContext || new AudioContext();
      coinAudioContext = context;
      if (context.state === "suspended") {
        context.resume().catch(function () {});
      }
      var now = context.currentTime + (delaySeconds || 0);
      var master = context.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.17, now + 0.012);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
      master.connect(context.destination);

      function metallicPing(start, frequency, duration, volume) {
        var oscillator = context.createOscillator();
        var gain = context.createGain();
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(frequency, start);
        oscillator.frequency.exponentialRampToValueAtTime(
          Math.max(180, frequency * 0.42),
          start + duration,
        );
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start(start);
        oscillator.stop(start + duration);
      }

      metallicPing(now, 1840, 0.09, 0.52);
      metallicPing(now + 0.065, 970, 0.14, 0.34);
      metallicPing(now + 0.18, 230, 0.18, 0.42);
      window.setTimeout(
        function () {
          context.close().catch(function () {});
        },
        700 + (delaySeconds || 0) * 1000,
      );
    } catch (error) {
      // Audio is a flourish. Privacy modes or device policies must never
      // prevent the visitor from entering the portfolio.
    }
  }

  function primeCoinSound() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    try {
      if (!coinAudioContext || coinAudioContext.state === "closed") {
        coinAudioContext = new AudioContext();
      }
      if (coinAudioContext.state === "suspended") {
        coinAudioContext.resume().catch(function () {});
      }
    } catch (error) {
      // The visual sequence remains available when device audio is blocked.
    }
  }

  function rememberPass() {
    document.cookie =
      cookieName + "=1; Max-Age=" + thirtyDays + "; Path=/; SameSite=Lax";
  }

  function sendCheckIn(data) {
    if (!window.fetch) return;
    window
      .fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        keepalive: true,
        body: JSON.stringify(data),
      })
      .catch(function () {
        // Optimistic access is deliberate: an external form service outage
        // must never lock the owner or a visitor out of the portfolio.
      });
  }

  function releaseBackground() {
    if (backgroundObserver) backgroundObserver.disconnect();
    window.removeEventListener("resize", positionSlotAnchor);
    lockedElements.forEach(function (item) {
      if (!item.inert) item.element.removeAttribute("inert");
      if (item.ariaHidden === null) item.element.removeAttribute("aria-hidden");
      else item.element.setAttribute("aria-hidden", item.ariaHidden);
    });
    root.classList.remove("access-pending", "access-revealing");
    root.classList.add("access-granted");
    document.body.classList.remove("cursor-hover");
    gate.remove();
  }

  function buildCircularWipe() {
    var rect = record.getBoundingClientRect();
    var width = window.innerWidth;
    var height = window.innerHeight;
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    var maxRadius =
      Math.hypot(
        Math.max(centerX, width - centerX),
        Math.max(centerY, height - centerY),
      ) + 3;
    var namespace = "http://www.w3.org/2000/svg";
    var wipe = document.createElementNS(namespace, "svg");
    var definitions = document.createElementNS(namespace, "defs");
    var mask = document.createElementNS(namespace, "mask");
    var cover = document.createElementNS(namespace, "rect");
    var aperture = document.createElementNS(namespace, "ellipse");
    var curtain = document.createElementNS(namespace, "rect");
    var edge = document.createElementNS(namespace, "ellipse");

    wipe.classList.add("gate-circular-wipe");
    wipe.setAttribute("viewBox", "0 0 " + width + " " + height);
    wipe.setAttribute("preserveAspectRatio", "none");
    mask.setAttribute("id", "gate-record-wipe-mask");
    mask.setAttribute("maskUnits", "userSpaceOnUse");
    cover.setAttribute("width", width);
    cover.setAttribute("height", height);
    cover.setAttribute("fill", "white");
    aperture.setAttribute("cx", centerX);
    aperture.setAttribute("cy", centerY);
    aperture.setAttribute("rx", rect.width / 2);
    aperture.setAttribute("ry", rect.height / 2);
    aperture.setAttribute("fill", "black");
    curtain.setAttribute("width", width);
    curtain.setAttribute("height", height);
    curtain.setAttribute("fill", "#0b0e0f");
    curtain.setAttribute("mask", "url(#gate-record-wipe-mask)");
    edge.setAttribute("cx", centerX);
    edge.setAttribute("cy", centerY);
    edge.setAttribute("rx", rect.width / 2);
    edge.setAttribute("ry", rect.height / 2);
    edge.setAttribute("fill", "none");
    edge.setAttribute("stroke", "#ffa400");
    edge.setAttribute("stroke-width", "2");

    mask.appendChild(cover);
    mask.appendChild(aperture);
    definitions.appendChild(mask);
    wipe.appendChild(definitions);
    wipe.appendChild(curtain);
    wipe.appendChild(edge);
    gate.appendChild(wipe);

    return {
      aperture: aperture,
      edge: edge,
      startRadiusX: rect.width / 2,
      startRadiusY: rect.height / 2,
      maxRadius: maxRadius,
    };
  }

  function animateCircularWipe(wipe, duration) {
    return new Promise(function (resolve) {
      var startedAt;

      function frame(timestamp) {
        if (!startedAt) startedAt = timestamp;
        var progress = Math.min(1, (timestamp - startedAt) / duration);
        var eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        var radiusX =
          wipe.startRadiusX + (wipe.maxRadius - wipe.startRadiusX) * eased;
        var radiusY =
          wipe.startRadiusY + (wipe.maxRadius - wipe.startRadiusY) * eased;

        wipe.aperture.setAttribute("rx", radiusX);
        wipe.aperture.setAttribute("ry", radiusY);
        wipe.edge.setAttribute("rx", radiusX);
        wipe.edge.setAttribute("ry", radiusY);
        wipe.edge.setAttribute("opacity", Math.max(0, 1 - progress * 1.45));

        if (progress < 1) window.requestAnimationFrame(frame);
        else resolve();
      }

      window.requestAnimationFrame(frame);
    });
  }

  async function animateCoinToSlot() {
    var start = coinMark.getBoundingClientRect();
    var destination = slot.getBoundingClientRect();
    var flyingCoin = coinMark.cloneNode(true);
    var deltaX =
      destination.left + destination.width / 2 - (start.left + start.width / 2);
    var deltaY =
      destination.top + destination.height / 2 - (start.top + start.height / 2);

    flyingCoin.classList.add("gate-flying-coin");
    flyingCoin.style.left = start.left + "px";
    flyingCoin.style.top = start.top + "px";
    flyingCoin.style.width = start.width + "px";
    flyingCoin.style.height = start.height + "px";
    gate.appendChild(flyingCoin);
    coinMark.style.opacity = "0";
    gate.setAttribute("data-beat", "coin");
    gate.classList.add("is-committing");
    playCoinSound(0.68);

    if (!flyingCoin.animate) {
      await wait(720);
      flyingCoin.remove();
      return;
    }

    var flightAnimation = flyingCoin.animate(
      [
        {
          transform: "translate3d(0, 0, 0) rotateZ(-4deg) scale(1)",
        },
        {
          offset: 0.3,
          transform:
            "translate3d(" +
            deltaX * 0.3 +
            "px, " +
            (deltaY * 0.16 - 54) +
            "px, 0) rotateZ(7deg) scale(1.08)",
        },
        {
          offset: 0.68,
          transform:
            "translate3d(" +
            deltaX * 0.72 +
            "px, " +
            (deltaY * 0.57 - 58) +
            "px, 0) rotateZ(-5deg) scale(1.1)",
        },
        {
          offset: 0.9,
          transform:
            "translate3d(" +
            deltaX * 0.95 +
            "px, " +
            (deltaY * 0.9 - 13) +
            "px, 0) rotateZ(1deg) scale(0.92)",
        },
        {
          transform:
            "translate3d(" +
            deltaX +
            "px, " +
            deltaY +
            "px, 0) rotateZ(0deg) scale(0.62)",
        },
      ],
      {
        duration: 720,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      },
    );
    var insertionFade = flyingCoin.animate(
      [{ opacity: 1 }, { offset: 0.9, opacity: 1 }, { opacity: 0 }],
      {
        duration: 720,
        easing: "linear",
        fill: "forwards",
      },
    );

    await Promise.all([
      flightAnimation.finished.catch(function () {}),
      insertionFade.finished.catch(function () {}),
    ]);

    await wait(30);
    flyingCoin.remove();
  }

  function waitForFilmFrame(maxWait) {
    return new Promise(function (resolve) {
      var settled = false;
      var readinessTimeout;

      function complete(isReady) {
        if (settled) return;
        settled = true;
        window.clearTimeout(readinessTimeout);
        film.removeEventListener("loadeddata", handleReady);
        film.removeEventListener("canplay", handleReady);
        film.removeEventListener("error", handleError);
        resolve(isReady);
      }

      function handleReady() {
        complete(film.readyState >= 2);
      }

      function handleError() {
        complete(false);
      }

      if (film.error) {
        complete(false);
        return;
      }
      if (film.readyState >= 2) {
        complete(true);
        return;
      }

      film.addEventListener("loadeddata", handleReady);
      film.addEventListener("canplay", handleReady);
      film.addEventListener("error", handleError);
      readinessTimeout = window.setTimeout(function () {
        complete(film.readyState >= 2);
      }, maxWait);

      try {
        film.preload = "auto";
        film.load();
      } catch (error) {
        complete(false);
      }
    });
  }

  function playGateFilm() {
    return new Promise(function (resolve) {
      var settled = false;
      var progressWatchdog;

      function armProgressWatchdog() {
        window.clearTimeout(progressWatchdog);
        progressWatchdog = window.setTimeout(complete, 2500);
      }

      function complete() {
        if (settled) return;
        settled = true;
        window.clearTimeout(progressWatchdog);
        film.removeEventListener("ended", complete);
        film.removeEventListener("error", complete);
        film.removeEventListener("timeupdate", updateStoryBeat);
        gate.setAttribute("data-beat", "needle");
        resolve();
      }

      function updateStoryBeat() {
        armProgressWatchdog();
        gate.setAttribute(
          "data-beat",
          film.currentTime >= 2.75 ? "needle" : "record",
        );
      }

      film.addEventListener("ended", complete, { once: true });
      film.addEventListener("error", complete, { once: true });
      film.addEventListener("timeupdate", updateStoryBeat);
      armProgressWatchdog();

      try {
        film.currentTime = 0;
        var playback = film.play();
        if (playback && playback.catch) {
          playback.catch(function () {
            window.setTimeout(complete, 160);
          });
        }
      } catch (error) {
        window.setTimeout(complete, 160);
      }
    });
  }

  async function runGateSequence() {
    form.setAttribute("aria-busy", "true");
    submitButton.disabled = true;
    submitLabel.textContent = "Inserting coin";
    status.className = "vinyl-form__status";
    status.textContent = "Moving the coin to the slot\u2026";

    if (reduceMotion) {
      playCoinSound(0);
      status.className = "vinyl-form__status is-success";
      status.textContent = "Opening Joe\u2019s portfolio\u2026";
      await wait(180);
      root.classList.add("access-revealing");
      gate.classList.add("is-leaving");
      await wait(30);
      releaseBackground();
      return;
    }

    await animateCoinToSlot();
    status.className = "vinyl-form__status is-success";
    status.textContent = "Coin accepted. Opening Joe\u2019s portfolio\u2026";
    await wait(120);
    gate.focus({ preventScroll: true });
    form.setAttribute("inert", "");
    form.setAttribute("aria-hidden", "true");
    var filmReady = await waitForFilmFrame(1400);
    if (filmReady) {
      gate.setAttribute("data-beat", "record");
      gate.classList.add("is-playing");
      await playGateFilm();
    } else {
      gate.setAttribute("data-beat", "needle");
    }

    var wipe = buildCircularWipe();
    root.classList.add("access-revealing");
    gate.classList.add("is-wiping");
    await animateCircularWipe(wipe, 760);
    releaseBackground();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (running) return;

    var firstInvalid = null;
    fields.forEach(function (input) {
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      status.className = "vinyl-form__status is-error";
      status.textContent =
        "Enter your name and company to open Joe\u2019s portfolio.";
      firstInvalid.focus();
      return;
    }

    running = true;
    rememberPass();
    primeCoinSound();

    var formData = new FormData(form);
    sendCheckIn({
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      _subject: "New portfolio visitor",
      _template: "table",
      _captcha: "false",
      _honey: String(formData.get("_honey") || ""),
    });

    runGateSequence().catch(function () {
      root.classList.add("access-revealing");
      gate.classList.add("is-leaving");
      window.setTimeout(releaseBackground, 300);
    });
  });

  gate.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      return;
    }
    if (event.key !== "Tab") return;

    var focusable = Array.prototype.slice
      .call(
        gate.querySelectorAll(
          "input:not([tabindex='-1']):not(:disabled), button:not(:disabled)",
        ),
      )
      .filter(function (control) {
        return !control.closest("[inert]");
      });
    if (!focusable.length) {
      gate.focus({ preventScroll: true });
      event.preventDefault();
      return;
    }
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      last.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === last) {
      first.focus();
      event.preventDefault();
    }
  });

  gate.querySelectorAll("input, button").forEach(function (control) {
    control.addEventListener("mouseenter", function () {
      document.body.classList.add("cursor-hover");
    });
    control.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor-hover");
    });
  });

  window.requestAnimationFrame(function () {
    gate.focus({ preventScroll: true });
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.setTimeout(function () {
        nameInput.focus({ preventScroll: true });
      }, 0);
    }
  });
})();
