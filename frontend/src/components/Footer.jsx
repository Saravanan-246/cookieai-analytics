import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-gray-100 overflow-hidden">

      {/* ===== SOFT BACKGROUND GLOW ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-violet-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-indigo-100/40 blur-[120px] rounded-full" />
      </div>

      {/* ===== MAIN ===== */}
      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold mb-3 tracking-tight">
            <span className="text-[#202124]">Cookie</span>
            <span className="ml-1 text-violet-600">AI</span>
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Privacy-first analytics platform built for modern products.  
            Fast, simple, and designed for clarity.
          </p>
        </div>

        {/* PRODUCT */}
        <FooterCol
          title="Product"
          items={["Analytics", "Consent", "Integrations"]}
        />

        {/* COMPANY */}
        <FooterCol
          title="Company"
          items={["About", "Careers", "Contact"]}
        />

        {/* LEGAL */}
        <FooterCol
          title="Legal"
          items={["Privacy Policy", "Terms", "Cookies"]}
        />

      </div>

      {/* ===== DIVIDER ===== */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px w-full bg-gray-100" />
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} CookieAI. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;

/* ===== REUSABLE COLUMN ===== */
const FooterCol = ({ title, items }) => (
  <div>
    <h3 className="text-sm font-semibold text-[#202124] mb-4">
      {title}
    </h3>

    <ul className="space-y-2 text-sm text-gray-500">
      {items.map((item, i) => (
        <li
          key={i}
          className="hover:text-violet-600 transition cursor-pointer"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);