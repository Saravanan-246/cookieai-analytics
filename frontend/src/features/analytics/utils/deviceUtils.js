/* 🔥 DEVICE TYPE */
export const getDeviceType = () => {
  const ua = navigator.userAgent.toLowerCase();

  if (/tablet|ipad/.test(ua)) return "Tablet";
  if (/mobile|android|iphone/.test(ua)) return "Mobile";
  return "Desktop";
};

/* 🔥 OPERATING SYSTEM */
export const getOS = () => {
  const ua = navigator.userAgent;

  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "MacOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";

  return "Unknown";
};

/* 🔥 BROWSER */
export const getBrowser = () => {
  const ua = navigator.userAgent;

  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";

  return "Unknown";
};

/* 🔥 FULL DEVICE INFO */
export const getDeviceInfo = () => {
  return {
    device: getDeviceType(),
    os: getOS(),
    browser: getBrowser(),
  };
};