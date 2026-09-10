/* Start the entrance once the access gate has finished. */
(function () {
  "use strict";
  var started = false;
  var observer;
  var ready = false;
  function start() {
    if (!ready || started || document.querySelector(".vinyl-gate") || document.documentElement.classList.contains("access-pending")) return;
    started = true;
    if (observer) observer.disconnect();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || window.scrollY > 80) return;
    import("./entry-flight.js").then(function (module) { return module.playEntrance(); }).catch(function () {});
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
