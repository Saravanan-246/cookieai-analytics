import React, { useEffect, useState } from "react";
import { useAnalyticsState } from "./hooks/useAnalyticsState";
import { useAnalyticsStore } from "./store/analyticsStore";
import { useProjectStore } from "../projects/store/projectStore";
import socket from "../../services/socket";
import { useNavigate } from "react-router-dom"; // ✅ ADDED

/* COMPONENTS */
import TopBar from "./components/TopBar";
import MetricsTabs from "./components/MetricsTabs";
import ChartView from "./components/ChartView";
import InsightsPanel from "./components/InsightsPanel";
import BreakdownPanel from "./components/BreakdownPanel";
import DevicesCard from "./components/device/DevicesCard";
import OSCard from "./components/device/OSCard";
import CountriesCard from "./components/geo/CountriesCard";
import PagesTable from "./components/tables/PagesTable";
import ReferrersTable from "./components/tables/ReferrersTable";
import StatMiniCard from "./widgets/StatMiniCard";
import { formatNumber } from "./utils/formatters";

/* EMPTY DATA */
const EMPTY = {
  stats: { total: 0, change: "0%" },
  chartData: [],
  insights: [],
  breakdown: [],
  countries: [],
  devices: [],
  os: [],
  pages: [],
  referrers: [],
};

const AnalyticsPage = () => {
  const state = useAnalyticsState();
  const { selectedProject } = useProjectStore();
  const store = useAnalyticsStore();
  const navigate = useNavigate(); // ✅ ADDED

  const data = selectedProject ? store?.data : EMPTY;
  const loadAnalytics = store?.loadAnalytics;

  const [liveEvents, setLiveEvents] = useState([]);

  /* LOAD DATA */
  useEffect(() => {
    if (!selectedProject?.siteId || !loadAnalytics) return;

    loadAnalytics({
      metric: state.metric,
      range: state.range,
      mode: state.mode,
      siteId: selectedProject.siteId,
    });
  }, [state.metric, state.range, state.mode, selectedProject]);

  /* SOCKET */
  useEffect(() => {
    if (!selectedProject?.siteId) return;

    const siteId = selectedProject.siteId;

    socket.emit("join-site", siteId);

    socket.on("analytics:update", (event) => {
      setLiveEvents((prev) => [event, ...prev]);
    });

    return () => socket.off("analytics:update");
  }, [selectedProject]);

  const liveVisitors = selectedProject ? liveEvents.length : 0;

  return (
    <section className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-28 pb-20">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                Live Analytics
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              {selectedProject?.name || "Select a project to view data"}
            </p>
          </div>

          <TopBar
            mode={state.mode}
            setMode={state.setMode}
            range={state.range}
            setRange={state.setRange}
            project={selectedProject?.name || "Select project"}
            projectUrl={selectedProject?.url}
          />
        </header>

        {/* 🔥 FIXED EMPTY STATE */}
        {!selectedProject && (
          <div className="mb-6 p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-300 font-medium">
                No project selected
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Create or choose a project to start tracking analytics
              </p>
            </div>

            <button
              onClick={() => navigate("/projects")} // ✅ FIXED
              className="px-4 py-2 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition"
            >
              Go to Projects
            </button>
          </div>
        )}

        {/* TABS */}
        <div className="mb-8 p-1 bg-zinc-900/40 border border-zinc-800/50 rounded-xl inline-flex">
          <MetricsTabs active={state.metric} setActive={state.setMetric} />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatMiniCard
            label="Live Visitors"
            value={formatNumber(liveVisitors)}
            change="Live"
          />
          <StatMiniCard
            label="Total Visitors"
            value={formatNumber(data?.stats?.total || 0)}
            change={data?.stats?.change}
          />
          <StatMiniCard label="Bounce Rate" value="--" />
          <StatMiniCard label="Session Duration" value="--" />
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8">
            <ChartView data={data?.chartData || []} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <InsightsPanel insights={data?.insights || []} />
            <BreakdownPanel data={data?.breakdown || []} />
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <CountriesCard data={data?.countries || []} />
          <DevicesCard data={data?.devices || []} />
          <OSCard data={data?.os || []} />
        </div>

        {/* TABLES */}
        <div className="grid lg:grid-cols-2 gap-6">
          <PagesTable data={data?.pages || []} />
          <ReferrersTable data={data?.referrers || []} />
        </div>

      </div>
    </section>
  );
};

export default AnalyticsPage;