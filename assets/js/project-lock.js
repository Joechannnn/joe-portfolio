(() => {
  "use strict";

  const site = new URL("../../", document.currentScript.src);
  const work = new URL("index.html#work", site);
  const restricted = new Set(["scene", "aapoakgy", "edmondpoon", "read-tongue", "bba"]);
  const unlockKey = "portfolio-project-access";
  const passwordHash = "3e8fd78d63b880d4a3d3d1568708974810a36ce3760af15a94cb0c422c5ec0aa";
  const root = document.documentElement;
  const isRestricted = (value) => {
    const url = new URL(value, document.baseURI);
    const projectsPath = `${site.pathname}projects/`;
    if (url.origin !== site.origin || !url.pathname.startsWith(projectsPath)) return false;

    const page = url.pathname.slice(projectsPath.length);
    if (page === "flows.html") return restricted.has(url.searchParams.get("case"));
    return page.endsWith(".html") && restricted.has(page.slice(0, -5));
  };

  let unlocked = false;
  const hasAccess = () => {
    try {
      return unlocked || sessionStorage.getItem(unlockKey) === passwordHash;
    } catch {
      return unlocked;
    }
  };

  const isDirect = isRestricted(location.href);
  if (isDirect && !hasAccess()) root.classList.add("project-lock-pending");

  let dialog, input, error, destination, trigger;
  let attempt = 0;

  function updateLink(link) {
    const locked = isRestricted(link.href) && !hasAccess();
    link.toggleAttribute("data-project-locked", locked);
    if (locked) {
      link.setAttribute("aria-description", "Password required");
      link.setAttribute("aria-haspopup", "dialog");
    } else {
      link.removeAttribute("aria-description");
      link.removeAttribute("aria-haspopup");
    }
  }

  function refreshLinks() {
    document.querySelectorAll("#worklist a.wl-row, #open.stage-open").forEach(updateLink);
  }

  function setError(message) {
    error.textContent = message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function close() {
    if (dialog.open) return;
    attempt += 1;
    if (isDirect && !hasAccess()) {
      location.replace(work.href);
      return;
    }
    trigger?.focus({ preventScroll: true });
  }

  function createDialog() {
    const element = document.createElement("dialog");
    element.className = "project-lock-dialog";
    element.setAttribute("aria-labelledby", "project-lock-title");
    element.setAttribute("aria-describedby", "project-lock-description");
    element.innerHTML = `
      <h2 id="project-lock-title">Locked project</h2>
      <p id="project-lock-description">Contact me for the password.<br>
        <a href="mailto:joechanwainam@gmail.com">joechanwainam@gmail.com</a>
      </p>
      <form class="project-lock-form">
        <label for="project-lock-password">Password</label>
        <input id="project-lock-password" type="password" required autofocus
          autocomplete="current-password" aria-describedby="project-lock-error">
        <p id="project-lock-error" class="project-lock-error" role="alert"></p>
        <div class="project-lock-actions">
          <button class="project-lock-cancel" type="button">Cancel</button>
          <button class="project-lock-submit" type="submit">Unlock</button>
        </div>
      </form>`;
    document.body.append(element);

    input = element.querySelector("input");
    error = element.querySelector("#project-lock-error");
    input.addEventListener("input", () => setError(""));
    element.querySelector(".project-lock-cancel").addEventListener("click", () => element.close());
    element.addEventListener("close", close);
    element.querySelector("form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const submission = ++attempt;
      let hash;
      try {
        const bytes = new TextEncoder().encode(input.value);
        const digest = await crypto.subtle.digest("SHA-256", bytes);
        hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
      } catch {
        if (submission === attempt) setError("Couldn’t check the password. Please try again.");
        return;
      }

      if (submission !== attempt || !element.open) return;
      if (hash !== passwordHash) {
        setError("Incorrect password. Try again.");
        input.value = "";
        input.focus();
        return;
      }

      unlocked = true;
      try {
        sessionStorage.setItem(unlockKey, passwordHash);
      } catch {
        // The current page stays available when browser storage is disabled.
      }
      input.value = "";
      root.classList.remove("project-lock-pending");
      refreshLinks();
      element.close();
      if (destination) location.assign(destination);
    });
    return element;
  }

  function request(value, opener) {
    if (!isRestricted(value) || hasAccess()) return false;
    dialog ??= createDialog();
    if (dialog.open) return true;
    destination = opener ? new URL(value, document.baseURI).href : null;
    trigger = opener;
    attempt += 1;
    input.value = "";
    setError("");
    dialog.showModal();
    return true;
  }

  window.ProjectLock = { request, updateLink };

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const link = event.target instanceof Element && event.target.closest("a[href]");
    if (link && (!link.target || link.target === "_self") && !link.hasAttribute("download") && request(link.href, link)) {
      event.preventDefault();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    refreshLinks();
    if (isDirect) request(location.href);
  });
  window.addEventListener("pageshow", refreshLinks);
})();
