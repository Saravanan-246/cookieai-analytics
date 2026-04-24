(function () {
  /* =========================================
     CONFIG (AUTO FROM SCRIPT TAG)
  ========================================= */
  const script = document.currentScript;
  const SITE_ID = script?.getAttribute("data-site");
  const API = "http://localhost:5000/api/track";

  if (!SITE_ID) {
    console.warn("Tracker: data-site missing");
    return;
  }

  /* =========================================
     VISITOR ID (PERSISTENT)
  ========================================= */
  let visitorId = localStorage.getItem("v_id");

  if (!visitorId) {
    visitorId =
      "v_" +
      (crypto.randomUUID?.() ||
        Math.random().toString(36).slice(2, 12));

    localStorage.setItem("v_id", visitorId);
  }

  /* =========================================
     SESSION ID (PER TAB)
  ========================================= */
  let sessionId = sessionStorage.getItem("s_id");

  if (!sessionId) {
    sessionId = "s_" + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem("s_id", sessionId);
  }

  /* =========================================
     DEVICE + OS
  ========================================= */
  const getDevice = () => {
    const ua = navigator.userAgent;
    if (/bot|crawl|spider/i.test(ua)) return "Bot";
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  };

  const getOS = () => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad/i.test(ua)) return "iOS";
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "Mac OS";
    if (ua.includes("Linux")) return "Linux";
    return "Unknown";
  };

  /* =========================================
     CLEAN REFERRER
  ========================================= */
  const getReferrer = () => {
    try {
      if (!document.referrer) return "direct";
      const url = new URL(document.referrer);
      return url.hostname.replace("www.", "");
    } catch {
      return "direct";
    }
  };

  /* =========================================
     SAFE SEND
  ========================================= */
  const send = (payload) => {
    try {
      const body = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(API, blob);
      } else {
        fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        });
      }
    } catch {}
  };

  /* =========================================
     PAGE VIEW (NO DUPLICATES)
  ========================================= */
  let lastPath = null;

  const trackPage = () => {
    const path = window.location.pathname;

    if (path === lastPath) return;
    lastPath = path;

    send({
      siteId: SITE_ID,
      visitorId,
      sessionId,
      type: "page_view",
      page: path,
      referrer: getReferrer(),
      device: getDevice(),
      os: getOS(),
      timestamp: new Date().toISOString(),
    });

    sessionStart = Date.now();
  };

  /* =========================================
     SESSION TRACKING
  ========================================= */
  let sessionStart = Date.now();
  let sessionSent = false;

  const sendSession = () => {
    if (sessionSent) return;

    const duration = Math.floor((Date.now() - sessionStart) / 1000);
    if (duration < 2) return;

    sessionSent = true;

    send({
      siteId: SITE_ID,
      visitorId,
      sessionId,
      type: "session_end",
      duration,
      page: window.location.pathname,
      referrer: getReferrer(),
      timestamp: new Date().toISOString(),
    });
  };

  /* =========================================
     SPA SUPPORT (React / Vite / Next)
  ========================================= */
  const pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(this, arguments);
    setTimeout(trackPage, 0);
  };

  window.addEventListener("popstate", trackPage);

  /* =========================================
     EVENTS
  ========================================= */
  window.addEventListener("beforeunload", sendSession);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendSession();
    } else {
      sessionStart = Date.now();
      sessionSent = false;
    }
  });

  /* =========================================
     INIT
  ========================================= */
  trackPage();

})();