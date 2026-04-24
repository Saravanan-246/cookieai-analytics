import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Wifi,
  Clock,
  Activity,
} from "lucide-react";

/* 🔥 smooth count */
const useCountUp = (value) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let start = display;
    let startTime = Date.now();

    const animate = () => {
      let progress = Math.min((Date.now() - startTime) / 600, 1);
      setDisplay(Math.floor(start + (value - start) * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  }, [value]);

  return display;
};

/* 🔥 ENHANCED GRAPH WITH HOVER TOOLTIP */
const Graph = ({ chartData }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const svgRef = useRef(null);

  const w = 800;
  const h = 280;
  const padding = { top: 40, right: 40, bottom: 60, left: 50 };
  const graphW = w - padding.left - padding.right;
  const graphH = h - padding.top - padding.bottom;

  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue || 1;

  // Generate smooth SVG path
  const getPath = () => {
    const step = graphW / (chartData.length - 1);
    let path = `M ${padding.left} ${padding.top + graphH - ((chartData[0] - minValue) / range) * graphH}`;

    for (let i = 1; i < chartData.length; i++) {
      const x = padding.left + i * step;
      const y = padding.top + graphH - ((chartData[i] - minValue) / range) * graphH;
      const prevX = padding.left + (i - 1) * step;
      const prevY = padding.top + graphH - ((chartData[i - 1] - minValue) / range) * graphH;
      const cx = (prevX + x) / 2;
      path += ` Q ${cx} ${prevY}, ${x} ${y}`;
    }
    return path;
  };

  const path = getPath();

  // Get dates for labels
  const getDateLabel = (i) => {
    const date = new Date();
    date.setHours(date.getHours() - (chartData.length - 1 - i));
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  // Handle hover
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.round(((x - padding.left) / graphW) * (chartData.length - 1));
    if (index >= 0 && index < chartData.length) {
      setHoveredIndex(index);
    }
  };

  const step = graphW / (chartData.length - 1);
  const hoveredX = hoveredIndex !== null ? padding.left + hoveredIndex * step : null;
  const hoveredY = hoveredIndex !== null 
    ? padding.top + graphH - ((chartData[hoveredIndex] - minValue) / range) * graphH
    : null;

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Define gradients and filters */}
        <defs>
          {/* Gradient for area */}
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>

          {/* Gradient for line */}
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={`h-grid-${i}`}
            x1={padding.left}
            y1={padding.top + ratio * graphH}
            x2={w - padding.right}
            y2={padding.top + ratio * graphH}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="2"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const value = minValue + ratio * range;
          return (
            <text
              key={`y-label-${i}`}
              x={padding.left - 12}
              y={padding.top + (1 - ratio) * graphH + 4}
              fontSize="11"
              fill="rgba(161,140,200,0.6)"
              textAnchor="end"
            >
              {Math.round(value)}
            </text>
          );
        })}

        {/* Area under curve */}
        <motion.path
          d={`${path} L ${w - padding.right} ${padding.top + graphH} L ${padding.left} ${padding.top + graphH} Z`}
          fill="url(#chartGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Main line with glow */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Data points */}
        {chartData.map((value, i) => {
          const x = padding.left + i * step;
          const y = padding.top + graphH - ((value - minValue) / range) * graphH;
          const isHovered = hoveredIndex === i;

          return (
            <motion.circle
              key={`point-${i}`}
              cx={x}
              cy={y}
              r={isHovered ? 5 : 2}
              fill={isHovered ? "#c7d2fe" : "#818cf8"}
              stroke="white"
              strokeWidth="1.5"
              opacity={isHovered ? 1 : 0.5}
              animate={{ r: isHovered ? 5 : 2 }}
              transition={{ duration: 0.2 }}
            />
          );
        })}

        {/* Hover line */}
        {hoveredX !== null && (
          <line
            x1={hoveredX}
            y1={padding.top}
            x2={hoveredX}
            y2={padding.top + graphH}
            stroke="rgba(167,139,250,0.3)"
            strokeWidth="1"
            strokeDasharray="3"
          />
        )}

        {/* X-axis labels */}
        {[0, Math.floor(chartData.length / 4), Math.floor(chartData.length / 2), Math.floor(3 * chartData.length / 4), chartData.length - 1].map((i) => {
          if (i >= chartData.length) return null;
          return (
            <text
              key={`x-label-${i}`}
              x={padding.left + (i / (chartData.length - 1)) * graphW}
              y={padding.top + graphH + 25}
              fontSize="11"
              fill="rgba(161,140,200,0.6)"
              textAnchor="middle"
            >
              {getDateLabel(i)}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && hoveredY !== null && (
        <motion.div
          className="absolute bg-gradient-to-br from-slate-900 to-slate-800 border border-indigo-500/40 rounded-lg px-3 py-2 pointer-events-none shadow-lg"
          style={{
            left: `calc(${(hoveredX / w) * 100}% - 50px)`,
            top: `${(hoveredY / h) * 100 - 10}%`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-white font-semibold text-sm">{Math.round(chartData[hoveredIndex])}</p>
          <p className="text-indigo-300 text-xs mt-1">{getDateLabel(hoveredIndex)}</p>
        </motion.div>
      )}
    </div>
  );
};

const DemoPage = () => {
  const [stats, setStats] = useState({
    users: 12482,
    live: 128,
    bounce: 32,
    time: 134,
    sessions: 8421,
  });

  const [chartData, setChartData] = useState(
    Array(10).fill(0).map((_, i) => 40 + Math.sin(i) * 10)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((p) => ({
        users: p.users + Math.floor(Math.random() * 8),
        live: Math.max(80, p.live + (Math.random() * 6 - 3)),
        bounce: 25 + Math.random() * 10,
        time: 120 + Math.floor(Math.random() * 60),
        sessions: p.sessions + Math.floor(Math.random() * 6),
      }));

      setChartData((p) => {
        const last = p[p.length - 1];
        const next =
          last +
          Math.sin(Date.now() / 800) * 4 +
          (Math.random() * 4 - 2);

        return [...p.slice(1), Math.max(30, Math.min(90, next))];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  /* 🔥 CURVED GRAPH */
  const getPath = useCallback(() => {
    const w = 400;
    const h = 160;
    const step = w / (chartData.length - 1);

    let path = `M 0 ${h - (chartData[0] / 100) * h}`;

    for (let i = 1; i < chartData.length; i++) {
      const x = i * step;
      const y = h - (chartData[i] / 100) * h;

      const prevX = (i - 1) * step;
      const prevY = h - (chartData[i - 1] / 100) * h;

      const cx = (prevX + x) / 2;

      path += ` Q ${cx} ${prevY}, ${x} ${y}`;
    }

    return path;
  }, [chartData]);

  return (
    <div className="min-h-screen bg-[#05030a] text-white px-6">

      {/* 🔥 TOP SPACING FIX */}
      <div className="max-w-7xl mx-auto pt-24 pb-12">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Real-time user analytics & tracking
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
          <Stat icon={<Users />} label="Live" value={stats.live} />
          <Stat icon={<TrendingUp />} label="Users" value={stats.users} />
          <Stat icon={<Wifi />} label="Bounce" value={stats.bounce} suffix="%" />
          <Stat icon={<Clock />} label="Time" value={stats.time} format={(v)=>`${Math.floor(v/60)}m`} />
          <Stat icon={<Activity />} label="Sessions" value={stats.sessions} />
        </div>

      </div>

      {/* 🔥 GRAPH SECTION (SEPARATE FRAME) */}
      <div className="max-w-7xl mx-auto pb-20">
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">

          <p className="text-sm text-zinc-400 mb-6">Traffic Flow</p>

          <svg viewBox="0 0 400 160" className="w-full h-[240px]">

            {/* grid */}
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={(i * 160) / 4}
                x2="400"
                y2={(i * 160) / 4}
                stroke="white"
                strokeOpacity="0.05"
              />
            ))}

            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d={`${getPath()} L 400 160 L 0 160 Z`}
              fill="url(#grad)"
              animate={{ d: `${getPath()} L 400 160 L 0 160 Z` }}
              transition={{ duration: 0.6 }}
            />

            <motion.path
              d={getPath()}
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />

          </svg>
        </div>
      </div>

      {/* 🔥 ANALYTICS GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 pb-20">

        {/* TOP PAGES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
        >
          <p className="text-sm font-semibold text-white mb-4">📄 Top Pages</p>
          <div className="space-y-3">
            {[
              { path: "/", visits: 2840 },
              { path: "/pricing", visits: 1240 },
              { path: "/docs", visits: 890 },
              { path: "/about", visits: 520 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 hover:text-white transition">{item.path}</span>
                <span className="font-semibold text-indigo-400">{item.visits}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* DEVICES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
        >
          <p className="text-sm font-semibold text-white mb-4">💻 Devices</p>
          <div className="space-y-3">
            {[
              { name: "Desktop", percent: 68, color: "bg-indigo-500" },
              { name: "Mobile", percent: 28, color: "bg-violet-500" },
              { name: "Tablet", percent: 4, color: "bg-blue-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">{item.name}</span>
                  <span className="font-semibold text-white">{item.percent}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LOCATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
        >
          <p className="text-sm font-semibold text-white mb-4">🌍 Top Locations</p>
          <div className="space-y-3">
            {[
              { country: "🇮🇳 India", visitors: "45%" },
              { country: "🇺🇸 USA", visitors: "28%" },
              { country: "🇬🇧 UK", visitors: "15%" },
              { country: "🇩🇪 Germany", visitors: "12%" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">{item.country}</span>
                <span className="font-semibold text-violet-400">{item.visitors}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

    </div>
  );
};

/* STAT CARD */
const Stat = ({ icon, label, value, suffix = "", format }) => {
  const v = useCountUp(value);

  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition">
      <div className="flex items-center gap-3 mb-2 text-zinc-400">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-2xl font-semibold">
        {format ? format(v) : `${v}${suffix}`}
      </p>
    </div>
  );
};

export default DemoPage;