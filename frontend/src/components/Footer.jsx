const Footer = () => {
  return (
    <footer className="relative bg-[#05030a] text-white overflow-hidden">

      {/* 🔥 TOP SMOOTH BLEND (FIXED CUT) */}
      <div className="absolute -top-20 left-0 w-full h-32 
        bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_70%)] pointer-events-none" />

      {/* subtle glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="w-[400px] h-[140px] bg-violet-500/8 blur-[100px] rounded-full" />
      </div>

      {/* MAIN */}
      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-14 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

        {/* BRAND */}
        <div>
          <h2 className="text-base font-semibold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-violet-400">
              Cookie
            </span>
            <span className="ml-1 text-violet-400">AI</span>
          </h2>

          <p className="text-violet-200/60 text-xs leading-relaxed max-w-xs">
            Privacy-first cookie consent and analytics platform built for modern web applications.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="font-medium mb-2 text-white text-sm">Product</h3>
          <ul className="space-y-1.5 text-violet-200/60 text-xs">
            {["Consent", "Analytics", "Privacy"].map((item, i) => (
              <li key={i} className="hover:text-white transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-medium mb-2 text-white text-sm">Company</h3>
          <ul className="space-y-1.5 text-violet-200/60 text-xs">
            {["About", "Careers", "Contact"].map((item, i) => (
              <li key={i} className="hover:text-white transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-medium mb-2 text-white text-sm">Legal</h3>
          <ul className="space-y-1.5 text-violet-200/60 text-xs">
            {["Privacy Policy", "Terms", "Cookies"].map((item, i) => (
              <li key={i} className="hover:text-white transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 🔥 DIVIDER LINE (SOFT, NOT CUT) */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      {/* BOTTOM */}
      <div className="text-center text-violet-200/40 text-[11px] py-6">
        © {new Date().getFullYear()} CookieAI. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;