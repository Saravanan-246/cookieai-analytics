import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";

/* 🔥 ADD THIS */
import { AnalyticsProvider } from "./features/analytics/store/analyticsStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnalyticsProvider>
      <App />
    </AnalyticsProvider>
  </React.StrictMode>
);