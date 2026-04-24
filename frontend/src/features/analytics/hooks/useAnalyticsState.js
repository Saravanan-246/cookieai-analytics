import { useState, useEffect } from "react";
import { useProjectStore } from "../../projects/store/projectStore";

/* DEFAULTS */
const DEFAULTS = {
  metric: "visitors",
  range: "7d",
  mode: "Production",
};

export const useAnalyticsState = () => {
  const { selectedProject } = useProjectStore();

  const storageKey = selectedProject?.siteId
    ? `analytics_state_${selectedProject.siteId}`
    : "analytics_state_default";

  const [metric, setMetric] = useState(DEFAULTS.metric);
  const [range, setRange] = useState(DEFAULTS.range);
  const [mode, setMode] = useState(DEFAULTS.mode);

  /* LOAD STATE (SAFE) */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;

      const parsed = JSON.parse(saved);

      setMetric(parsed.metric || DEFAULTS.metric);
      setRange(parsed.range || DEFAULTS.range);
      setMode(parsed.mode || DEFAULTS.mode);

    } catch (err) {
      console.warn("Failed to load analytics state");
    }
  }, [storageKey]);

  /* SAVE STATE */
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ metric, range, mode })
      );
    } catch (err) {
      console.warn("Failed to save analytics state");
    }
  }, [metric, range, mode, storageKey]);

  /* RESET STATE (VERY USEFUL) */
  const resetState = () => {
    setMetric(DEFAULTS.metric);
    setRange(DEFAULTS.range);
    setMode(DEFAULTS.mode);
  };

  return {
    metric,
    setMetric,

    range,
    setRange,

    mode,
    setMode,

    resetState,
  };
};