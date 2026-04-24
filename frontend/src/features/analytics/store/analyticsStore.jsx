import { createContext, useContext, useState, useCallback } from "react";

import {
  getStats,
  getDevices,
  getOS,
  getCountries,
  getPages,
  getReferrers,
  getChartData,
} from "../services/analyticsApi";

/* CONTEXT */
const AnalyticsContext = createContext(null);

/* PROVIDER */
export const AnalyticsProvider = ({ children }) => {
  const [data, setData] = useState({
    stats: {},
    devices: [],
    os: [],
    countries: [],
    pages: [],
    referrers: [],
    chartData: [],
  });

  const [loading, setLoading] = useState(false);

  /* LOAD ANALYTICS (REAL API) */
  const loadAnalytics = useCallback(async ({ siteId, range = "7d" }) => {
    if (!siteId) return;

    try {
      setLoading(true);

      const [
        stats,
        devices,
        os,
        countries,
        pages,
        referrers,
        chartData,
      ] = await Promise.all([
        getStats(siteId),
        getDevices(siteId),
        getOS(siteId),
        getCountries(siteId),
        getPages(siteId),
        getReferrers(siteId),
        getChartData(siteId, range),
      ]);

      setData({
        stats: stats || {},
        devices: devices || [],
        os: os || [],
        countries: countries || [],
        pages: pages || [],
        referrers: referrers || [],
        chartData: chartData || [],
      });

    } catch (err) {
      console.error("Analytics load failed:", err);

      /* SAFE FALLBACK */
      setData({
        stats: {},
        devices: [],
        os: [],
        countries: [],
        pages: [],
        referrers: [],
        chartData: [],
      });

    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        data,
        loading,
        loadAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

/* HOOK */
export const useAnalyticsStore = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error(
      "useAnalyticsStore must be used within <AnalyticsProvider>"
    );
  }

  return context;
};