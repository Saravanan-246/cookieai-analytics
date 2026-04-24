import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* FORMAT DAY LABEL */
const formatDay = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();

  const diff =
    (today.setHours(0, 0, 0, 0) -
      new Date(date).setHours(0, 0, 0, 0)) /
    (1000 * 60 * 60 * 24);

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const ChartView = ({ data = [], loading = false }) => {
  const chartData = Array.isArray(data) ? data : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          Visitors
        </h3>
      </div>

      {/* STATES */}
      {loading ? (
        <div className="h-[260px] flex items-center justify-center text-xs text-zinc-500">
          Loading chart...
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-[260px] flex items-center justify-center text-xs text-zinc-500">
          No chart data yet
        </div>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>

              {/* GRID */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

              {/* X AXIS */}
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatDay(value)}
              />

              {/* Y AXIS */}
              <YAxis
                stroke="rgba(255,255,255,0.2)"
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />

              {/* TOOLTIP */}
              <Tooltip
                contentStyle={{
                  background: "#0a0715",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${value}`, "Visitors"]}
                labelFormatter={(label) => formatDay(label)}
              />

              {/* LINE */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* FOOT */}
      <div className="mt-4 text-[10px] text-zinc-500">
        Daily visitor trend
      </div>

    </div>
  );
};

export default ChartView;