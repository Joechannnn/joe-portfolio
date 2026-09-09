/* Play the power-on moment automatically on each homepage load. */
(function () {
  "use strict";
  var scene = document.querySelector(".crate-scene");
  var cue = document.querySelector(".intro-cue");
  var rail = document.getElementById("rail");
  if (!scene || !cue || !rail || !rail.children.length || document.querySelector(".vinyl-gate")) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches) return;
  var state = "standby";
  var timer;
  var paths = [
    "M0 220h134l34 34h178l38 38h92",
    "M1440 150h-112l-38 38h-190l-40 40h-82",
    "M0 700h116l36-36h208l42-42h76",
    "M1440 504h-118l-28-28h-142l-30 30H1014"
  ];
  var namespace = "http://www.w3.org/2000/svg";
  var circuits = document.createElementNS(namespace, "svg");
  circuits.setAttribute("viewBox", "0 0 1440 900");
  circuits.setAttribute("preserveAspectRatio", "none");
  circuits.setAttribute("aria-hidden", "true");
  circuits.classList.add("entry-circuits");
  paths.forEach(function (d, i) {
    ["entry-trace", "entry-pulse"].forEach(function (className) {
      var path = document.createElementNS(namespace, "path");
      path.setAttribute("d", d);
      path.setAttribute("pathLength", "1");
      path.classList.add(className);
      path.style.setProperty("--entry-delay", i * 65 + "ms");
      circuits.appendChild(path);
    });
  });
  var light = document.createElement("div");
  light.className = "entry-light";
  light.setAttribute("aria-hidden", "true");
  scene.prepend(circuits, light);
  scene.classList.add("entry-standby");
  function finish() {
    if (state === "done") return;
    state = "done";
    clearTimeout(timer);
    scene.classList.remove("entry-standby", "entry-starting");
    circuits.remove();
    light.remove();
    scene.removeEventListener("pointerdown", browseDirectly, true);
    scene.removeEventListener("keydown", browseDirectly, true);
    document.removeEventListener("visibilitychange", visibility);
  }
  function browseDirectly(event) {
    if (event.target.closest(".crate") || event.key === "Escape") finish();
  }
  function visibility() { if (document.hidden && state === "starting") finish(); }
  scene.addEventListener("pointerdown", browseDirectly, true);
  scene.addEventListener("keydown", browseDirectly, true);
  document.addEventListener("visibilitychange", visibility);
  requestAnimationFrame(function () {
    if (state !== "standby") return;
    state = "starting";
    scene.classList.add("entry-starting");
    timer = setTimeout(finish, 2100);
  });
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
