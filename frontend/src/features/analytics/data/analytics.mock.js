export const analyticsMock = {
  visitors: {
    chart: [30, 45, 35, 70, 50, 65, 40],
    stats: {
      total: 1240,
      change: "+12%",
    },
  },

  sessions: {
    chart: [20, 35, 25, 60, 45, 55, 30],
    stats: {
      total: 890,
      change: "+5%",
    },
  },

  consent: {
    chart: [80, 82, 78, 85, 88, 90, 87],
    stats: {
      total: 87,
      change: "+3%",
    },
  },

  insights: [
    "User engagement increased compared to last period",
    "Consent acceptance rate improved steadily",
    "Peak activity recorded mid-week",
  ],

  breakdown: [
    { label: "Mobile", value: 68 },
    { label: "Desktop", value: 32 },
  ],
};