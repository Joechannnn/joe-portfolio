/* Start the entrance once the access gate has finished. */
(function () {
  "use strict";
  var started = false;
  var observer;
  var ready = false;
  var gated = false;
  function start() {
    if (document.querySelector(".vinyl-gate")) gated = true;
    if (!ready || started || document.querySelector(".vinyl-gate") || document.documentElement.classList.contains("access-pending")) return;
    started = true;
    if (observer) observer.disconnect();
    var root = document.documentElement;
    // Once the first-paint cover has started giving the page back, a new cover would read as a flash.
    // The access gate hides the page itself, so time spent there does not count.
    var late = !gated && root.classList.contains("entry-standby") && +getComputedStyle(document.body, "::after").opacity < 1;
    var quiet = matchMedia("(prefers-reduced-motion: reduce)").matches || window.scrollY > 80 || late;
    var standby = quiet ? null : cover();
    root.classList.remove("entry-standby");
    if (quiet) return;
    function drop() { if (standby) standby.remove(); }
    function hidden() { if (document.hidden) drop(); }
    function stopWaiting() {
      document.removeEventListener("pointerdown", drop, true);
      document.removeEventListener("keydown", drop, true);
      document.removeEventListener("visibilitychange", hidden);
    }
    if (standby) {
      document.addEventListener("pointerdown", drop, true);
      document.addEventListener("keydown", drop, true);
      document.addEventListener("visibilitychange", hidden);
    }
    import("./entry-flight.js").then(function (module) { stopWaiting(); return module.playEntrance(standby); }).catch(function () {
      stopWaiting();
      if (!standby) return;
      standby.querySelector(".entry-flight-skip").hidden = true;
      standby.classList.add("is-leaving");
      setTimeout(drop, 450);
    });
  }
  // The flight's own ground goes up the moment playback is decided, so the page never shows first.
  function cover() {
    var seen = false;
    try { seen = sessionStorage.getItem("portfolio-entrance") === "seen"; } catch (e) {}
    if ((seen && new URLSearchParams(location.search).get("entrance") !== "full") || document.hidden || !document.querySelector(".crate-scene")) return null;
    var el = document.createElement("div");
    var skip = document.createElement("button");
    el.className = "entry-flight-standby";
    skip.className = "entry-flight-skip";
    skip.type = "button";
    skip.textContent = "Skip intro";
    el.append(skip);
    document.body.append(el);
    return el;
  }
  observer = new MutationObserver(start);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  observer.observe(document.body, { childList: true });
  function readyToStart() { ready = true; start(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", readyToStart, { once: true });
  else readyToStart();
})();

/* Give the artwork and its circuit backing separate planes in 3D space. */
(function () {
  "use strict";
  var scene = document.querySelector(".crate-scene");
  var art = document.getElementById("art");
  if (!scene || !art) return;
  var motion = matchMedia("(prefers-reduced-motion: reduce)");
  var pointer = matchMedia("(hover: hover) and (pointer: fine)");
  var frame = 0;
  var event;
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    art.style.setProperty("--art-rx", "0deg");
    art.style.setProperty("--art-ry", "0deg");
    art.classList.remove("is-exploring-depth");
  }
  art.classList.add("stage-depth");
  art.addEventListener("pointermove", function (e) {
    if (motion.matches || !pointer.matches || e.pointerType === "touch") return;
    event = e;
    if (frame) return;
    frame = requestAnimationFrame(function () {
      var bounds = art.getBoundingClientRect();
      var x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
      var y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
      art.style.setProperty("--art-rx", -y * 8 + "deg");
      art.style.setProperty("--art-ry", x * 10 + "deg");
      art.classList.add("is-exploring-depth");
      frame = 0;
    });
  }, { passive: true });
  art.addEventListener("pointerleave", reset);
  window.addEventListener("blur", reset);
  motion.addEventListener("change", reset);
  document.addEventListener("visibilitychange", function () { if (document.hidden) reset(); });
  new MutationObserver(function (changes) {
    if (changes.some(function (change) { return change.target.tagName === "IMG"; })) reset();
  }).observe(art, { subtree: true, attributes: true, attributeFilter: ["class"] });
})();
