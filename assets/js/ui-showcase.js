(() => {
  "use strict";
  const viewer = document.querySelector(".screen-viewer");
  if (!viewer || typeof viewer.showModal !== "function") return;

  const image = viewer.querySelector(".viewer-image");
  const title = viewer.querySelector("#viewer-title");
  const scroller = viewer.querySelector(".viewer-scroll");
  let trigger;

  document.querySelectorAll("[data-screen]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      image.src = link.href;
      image.alt = link.dataset.title;
      title.textContent = link.dataset.title;
      viewer.showModal();
      scroller.scrollTop = 0;
      document.body.classList.add("screen-viewer-open");
    });
  });
  viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("close", () => {
    document.body.classList.remove("screen-viewer-open");
    trigger?.focus({ preventScroll: true });
  });
})();
