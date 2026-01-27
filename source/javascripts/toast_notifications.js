(function () {
  const DEFAULTS = {
    endpoint: "https://datacite.org/wp-json/wp/v2/toast/",
    site: "",
    storageKey: "datacite_toasts_dismissed",
  };
  const SCRIPT_OPTIONS = (() => {
    const script = document.currentScript;
    if (!script || !script.dataset) return {};
    const site = (script.dataset.site || "").trim();
    return site ? { site } : {};
  })();

  const toastStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');

    .dc-toast-wrapper {
      position: fixed;
      bottom: 16px;
      left: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      z-index: 1000000;
      font-family: 'DM Sans', sans-serif;
    }

    .dc-toast {
      min-width: 500px;
      max-width: 500px;
      padding: 20px;
      border-color: rgba(36, 59, 84, 0.08);
      border-width: 1px;
      border-style: solid;
      background-color: #ffffff;
      box-shadow: 0px 28px 36px -10px rgba(13, 96, 212, 0.08);
      display: flex;
      flex-direction: column;
      gap: 6px;
      opacity: 0;
      transform: translateX(-12px);
      animation: dc-toast-in 0.25s forwards;
    }

    .dc-toast__content {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .dc-toast__icon {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: rgba(0, 177, 226, 1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dc-toast__icon svg {
      display: block;
    }

    .dc-toast__text {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .dc-toast__title {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 12px;
      color: rgba(36, 59, 84, 1);
    }

    .dc-toast__body {
      font-size: 14px;
      margin-bottom: 12px;
    }

    .dc-toast__cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
      color: #0071b2;
      text-decoration: none;
    }

    .dc-toast__cta::after {
      content: '\u2192';
      font-size: 14px;
    }

    .dc-toast__dismiss {
      margin-left: auto;
      background: none;
      border: none;
      color: rgba(36, 59, 84, 1);
      font-size: 32px;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      font-weight: 400;
    }

    .dc-toast__inner {
      position: relative;
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    @keyframes dc-toast-in {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

  const ICONS = {
    info: {
      background: "transparent",
      width: 48,
      height: 48,
      svg: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#00B1E2"/>
          <path d="M24.2685 17.7871C23.5459 17.7871 22.9402 17.5533 22.4514 17.0857C21.9838 16.5969 21.75 15.9912 21.75 15.2686C21.75 14.5247 21.9838 13.9189 22.4514 13.4514C22.9189 12.9838 23.5247 12.75 24.2685 12.75C25.0124 12.75 25.6182 12.9838 26.0857 13.4514C26.5533 13.9189 26.7871 14.5247 26.7871 15.2686C26.7871 15.9912 26.5427 16.5969 26.0539 17.0857C25.5863 17.5533 24.9912 17.7871 24.2685 17.7871ZM22.3557 35.25C22.2495 35.25 22.1538 35.2181 22.0688 35.1544C22.005 35.0693 21.9732 34.9737 21.9732 34.8674V20.7141C21.9732 20.6079 22.005 20.5229 22.0688 20.4591C22.1538 20.3741 22.2495 20.3316 22.3557 20.3316H26.0857C26.192 20.3316 26.277 20.3741 26.3408 20.4591C26.4258 20.5229 26.4683 20.6079 26.4683 20.7141V34.8674C26.4683 34.9737 26.4258 35.0693 26.3408 35.1544C26.277 35.2181 26.192 35.25 26.0857 35.25H22.3557Z" fill="white"/>
        </svg>
      `,
    },
    warning: {
      background: "transparent",
      width: 48,
      height: 43,
      svg: `
        <svg width="48" height="43" viewBox="0 0 48 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0575 1.69883C22.3653 -0.56628 25.6347 -0.566276 26.9425 1.69884L47.5397 37.3743C48.8475 39.6395 47.2128 42.4708 44.5973 42.4708H3.40273C0.787208 42.4708 -0.847492 39.6395 0.460271 37.3743L21.0575 1.69883Z" fill="#FA9A2D"/>
          <path d="M22.5696 27.7006C22.4746 27.7006 22.3892 27.6721 22.3132 27.6152C22.2563 27.5392 22.2278 27.4538 22.2278 27.3588L21.2354 14.9411C21.2354 14.8462 21.2639 14.7703 21.3209 14.7133C21.3968 14.6373 21.4823 14.5994 21.5772 14.5994H26.1537C26.2487 14.5994 26.3246 14.6373 26.3816 14.7133C26.4575 14.7703 26.4955 14.8462 26.4955 14.9411L25.4461 27.3588C25.4461 27.4538 25.4082 27.5392 25.3322 27.6152C25.2753 27.6721 25.1993 27.7006 25.1044 27.7006H22.5696ZM23.6803 34.5076C23.0348 34.5076 22.4936 34.2987 22.0569 33.881C21.6392 33.4443 21.4303 32.9031 21.4303 32.2576C21.4303 31.593 21.6392 31.0519 22.0569 30.6342C22.4746 30.2164 23.0158 30.0076 23.6803 30.0076C24.3449 30.0076 24.8765 30.2164 25.2753 30.6342C25.693 31.0519 25.9018 31.593 25.9018 32.2576C25.9018 32.9031 25.693 33.4443 25.2753 33.881C24.8575 34.2987 24.3259 34.5076 23.6803 34.5076Z" fill="white"/>
        </svg>
      `,
    },
  };

  function ensureStyles() {
    if (document.getElementById("dc-toast-style")) return;
    const style = document.createElement("style");
    style.id = "dc-toast-style";
    style.textContent = toastStyles;
    document.head.appendChild(style);
  }

  function ensureWrapper() {
    let wrapper = document.querySelector(".dc-toast-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "dc-toast-wrapper";
      document.body.appendChild(wrapper);
    }
    return wrapper;
  }

  function readDismissedSet(key) {
    if (typeof localStorage === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : [];
      return new Set(arr.map((value) => String(value)));
    } catch (err) {
      console.warn("[DataCiteToasts] Failed to read dismissed set", err);
      return new Set();
    }
  }

  function writeDismissedSet(set, key) {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (err) {
      console.warn("[DataCiteToasts] Failed to persist dismissed set", err);
    }
  }

  function markToastDismissed(id, options) {
    if (!id || !options?.storageKey) return;
    const set =
      options._dismissedSet ||
      (options._dismissedSet = readDismissedSet(options.storageKey));
    const entry = String(id);
    if (set.has(entry)) return;
    set.add(entry);
    writeDismissedSet(set, options.storageKey);
  }

  function htmlDecode(str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || str;
  }

  function isActiveToast(acf, now) {
    const start = acf.toast_start_at
      ? new Date(acf.toast_start_at.replace(" ", "T"))
      : null;
    const end = acf.toast_end_at
      ? new Date(acf.toast_end_at.replace(" ", "T"))
      : null;
    if (start && now < start) return false;
    if (end && now > end) return false;
    return true;
  }

  function matchesSite(acf, site) {
    if (!site) return true;
    return (acf.toast_site || [])
      .map((s) => s.toLowerCase())
      .includes(site.toLowerCase());
  }

  function createToast(notice, options) {
    const {
      toast_type,
      toast_title,
      toast_message,
      toast_cta_enabled,
      toast_cta_label,
      toast_cta_url,
      toast_cta_target,
    } = notice.acf;
    const toast = document.createElement("div");
    toast.className = "dc-toast";
    toast.dataset.type = toast_type || "info";
    const toastId = notice.id;
    toast.dataset.toastId = toastId;

    const inner = document.createElement("div");
    inner.className = "dc-toast__inner";

    const dismissBtn = document.createElement("button");
    dismissBtn.className = "dc-toast__dismiss";
    dismissBtn.setAttribute("aria-label", "Dismiss notification");
    dismissBtn.innerHTML = "&times;";
    dismissBtn.addEventListener("click", () => dismissToast(toast, options));

    const content = document.createElement("div");
    content.className = "dc-toast__content";

    const icon = document.createElement("span");
    icon.className = "dc-toast__icon";
    const iconConfig =
      ICONS[(toast_type || "info").toLowerCase()] || ICONS.info;
    icon.style.backgroundColor = iconConfig.background;
    icon.style.width = `${iconConfig.width}px`;
    icon.style.height = `${iconConfig.height}px`;
    icon.innerHTML = iconConfig.svg;
    const iconSvg = icon.querySelector("svg");
    if (iconSvg) {
      iconSvg.setAttribute("aria-hidden", "true");
      iconSvg.setAttribute("focusable", "false");
    }

    const textWrap = document.createElement("div");
    textWrap.className = "dc-toast__text";

    const title = document.createElement("div");
    title.className = "dc-toast__title";
    title.textContent = toast_title;

    const body = document.createElement("div");
    body.className = "dc-toast__body";
    body.textContent = toast_message ? htmlDecode(toast_message) : "";

    textWrap.appendChild(title);
    textWrap.appendChild(body);

    if (toast_cta_enabled && toast_cta_label && toast_cta_url) {
      const toastTitleForAnalytics = (toast_title || "")
        .toString()
        .trim()
        .split(/\s+/)
        .join("+");
      const cta = document.createElement("a");
      cta.className =
        "dc-toast__cta plausible-event-name=Toast+CTA plausible-event-toasttitle=" + toastTitleForAnalytics;
      cta.href = toast_cta_url;
      cta.target = toast_cta_target || "_blank";
      cta.rel = "noopener noreferrer";
      cta.textContent = toast_cta_label;
      textWrap.appendChild(cta);
    }

    content.appendChild(icon);
    content.appendChild(textWrap);

    inner.appendChild(content);
    inner.appendChild(dismissBtn);

    toast.appendChild(inner);

    return toast;
  }

  function dismissToast(node, options) {
    if (!node || node.dataset.dismissed === "true") return;
    node.dataset.dismissed = "true";
    const toastId = node.dataset.toastId;
    markToastDismissed(toastId, options);
    setTimeout(() => node.remove(), 200);
  }

  async function fetchToasts(endpoint) {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Toast fetch failed (${res.status})`);
    return res.json();
  }

  async function init() {
    const options = { ...DEFAULTS, ...SCRIPT_OPTIONS };

    try {
      ensureStyles();
      const data = await fetchToasts(options.endpoint);
      const now = new Date();
      const dismissedSet = readDismissedSet(options.storageKey);
      options._dismissedSet = dismissedSet;
      const relevant = (Array.isArray(data) ? data : []).filter((item) => {
        if (!item?.acf) return false;
        if (!isActiveToast(item.acf, now)) return false;
        if (!matchesSite(item.acf, options.site)) return false;
        return !dismissedSet.has(String(item.id));
      });

      if (!relevant.length) return;

      const wrapper = ensureWrapper();

      relevant.forEach((notice) =>
        wrapper.appendChild(createToast(notice, options)),
      );
    } catch (err) {
      console.error("[DataCiteToasts]", err);
    }
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => init(), { once: true });
  } else {
    init();
  }
})();
