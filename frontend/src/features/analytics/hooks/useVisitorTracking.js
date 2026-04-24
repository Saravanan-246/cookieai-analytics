import { useEffect, useRef } from "react";
import { useProjectStore } from "../../projects/store/projectStore";

const API = import.meta.env.VITE_API_URL;

/* DEVICE */
const getDevice = () => {
  const ua = navigator.userAgent;

  if (/bot|crawl|spider/i.test(ua)) return "Bot";
  if (/tablet/i.test(ua)) return "Tablet";
  if (/mobile/i.test(ua)) return "Mobile";
  return "Desktop";
};

/* OS */
const getOS = () => {
  const ua = navigator.userAgent;

  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad/i.test(ua)) return "iOS";
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "Mac OS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown";
};

/* VISITOR ID (PERSISTENT) */
const getVisitorId = () => {
  let id = localStorage.getItem("visitorId");

  if (!id) {
    id = "v_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("visitorId", id);
  }

  return id;
};

export const useVisitorTracking = (path) => {
  const { selectedProject } = useProjectStore();

  const sessionStart = useRef(Date.now());
  const hasSessionStarted = useRef(false);
  const lastPath = useRef(null);

  useEffect(() => {
    if (!selectedProject?.siteId || !path) return;

    const siteId = selectedProject.siteId;
    const visitorId = getVisitorId();

    /* BASE PAYLOAD */
    const basePayload = {
      siteId,
      visitorId,
      device: getDevice(),
      os: getOS(),
      referrer: document.referrer || "direct",
    };

    /* SEND FUNCTION */
    const send = async (type, extra = {}) => {
      try {
        const payload = {
          ...basePayload,
          type,
          page: path,
          timestamp: new Date().toISOString(),
          ...extra,
        };

        await fetch(`${API}/api/analytics/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Tracking failed:", err);
      }
    };

    /* SESSION START (once) */
    if (!hasSessionStarted.current) {
      hasSessionStarted.current = true;
      send("session_start");
    }

    /* PAGE VIEW (avoid duplicate same path) */
    if (lastPath.current !== path) {
      lastPath.current = path;
      send("page_view");
    }

    /* SESSION END */
    const handleUnload = () => {
      const duration = Math.floor(
        (Date.now() - sessionStart.current) / 1000
      );

      const payload = {
        ...basePayload,
        type: "session_end",
        page: path,
        duration,
        timestamp: new Date().toISOString(),
      };

      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(payload)], {
            type: "application/json",
          });

          navigator.sendBeacon(
            `${API}/api/analytics/track`,
            blob
          );
        }
      } catch (err) {
        console.error("Beacon failed:", err);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [path, selectedProject]);
};