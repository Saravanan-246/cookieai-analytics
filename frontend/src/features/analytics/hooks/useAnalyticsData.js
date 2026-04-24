import { useEffect, useState, useMemo } from "react";
import {
  getStats,
  getDevices,
  getCountries,
  getPages,
  getChartData,
} from "../services/analyticsApi";

import { useProjectStore } from "../../projects/store/projectStore";

export const useAnalyticsData = (metric, range, mode) => {
  const { selectedProject } = useProjectStore();

  const [raw, setRaw] = useState({
    chart: [],
    stats: {},
    devices: [],
    countries: [],
    pages: [],
  });

  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH FROM BACKEND */
  useEffect(() => {
    if (!selectedProject?.siteId) return;

    const load = async () => {
      try {
        setLoading(true);

        const siteId = selectedProject.siteId;

        const [stats, devices, countries, pages, chart] =
          await Promise.all([
            getStats(siteId),
            getDevices(siteId),
            getCountries(siteId),
            getPages(siteId),
            getChartData(siteId),
          ]);

        setRaw({
          stats,
          devices,
          countries,
          pages,
          chart,
        });

      } catch (err) {
        console.error("Analytics load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedProject, range, mode]);

  /* 🔥 DERIVED DATA */
  const computed = useMemo(() => {
    const key =
      metric === "pageviews"
        ? "pageviews"
        : metric === "bounce"
        ? "bounce"
        : "visitors";

    /* CHART */
    const chartData = (raw.chart || []).map((d, i) => ({
      day: i,
      value: d.value || 0,
    }));

    /* TOTAL */
    const total = raw.stats?.total || 0;

    /* CHANGE (basic for now) */
    const change = "0%"; // later compare previous range

    /* INSIGHTS (dynamic minimal) */
    const insights = [
      total > 0
        ? "Traffic is being recorded successfully"
        : "No traffic detected yet",

      raw.devices?.length > 0
        ? "Users are visiting from multiple devices"
        : "No device data yet",

      raw.countries?.length > 0
        ? "Visitors coming from different regions"
        : "No geo data yet",
    ];

    return {
      chartData,
      stats: {
        total,
        change,
      },
      insights,
      breakdown: raw.devices || [],
      devices: raw.devices || [],
      countries: raw.countries || [],
      pages: raw.pages || [],
    };
  }, [raw, metric]);

  return {
    ...computed,
    loading,
  };
};