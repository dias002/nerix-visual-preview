import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { ArrowLeft, Brain, CircleUser, Clock3, CreditCard, Home, MessageSquare, PanelLeftClose, PanelLeftOpen, Settings, Users, Zap } from "lucide-react";
import CountryGate from "./CountryGate";
import ThemeSwitch from "./ThemeSwitch";
import { useLanguage } from "../i18n";

export default function WorkspaceLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t, theme } = useLanguage();

  const navItems = [
    { path: "/workspace", icon: Home, label: t.nav.home },
    { path: "/workspace/chat", icon: MessageSquare, label: t.nav.chat },
    { path: "/workspace/history", icon: Clock3, label: t.nav.history },
    { path: "/workspace/agents", icon: Users, label: t.nav.agents },
    { path: "/workspace/memory", icon: Brain, label: t.nav.memory },
    { path: "/workspace/balance", icon: CreditCard, label: t.nav.balance },
    { path: "/workspace/settings", icon: Settings, label: t.nav.settings },
  ];

  const isActive = (path: string) => {
    if (path === "/workspace") {
      return location.pathname === "/workspace" || location.pathname === "/workspace/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-black text-white">
      <CountryGate />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-30 flex flex-col transition-[width] duration-300 ${
          collapsed ? "w-20" : "w-20 md:w-64"
        }`}
        style={{
          backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.82)" : "#000000",
          borderRight: theme === "light" ? "1px solid rgba(16, 20, 28, 0.12)" : "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(18px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-2 px-4 py-8 md:px-6">
          <Link to="/" className="block min-w-0 text-xl font-medium text-white text-center transition-colors hover:text-gray-300 md:text-left">
            <span className={collapsed ? "inline" : "md:hidden"}>N</span>
            <span className={`${collapsed ? "hidden" : "hidden md:inline"}`}>{t.product}</span>
          </Link>
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white md:inline-flex ${
              collapsed ? "mx-auto" : ""
            }`}
            aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" strokeWidth={1.7} /> : <PanelLeftClose className="h-4 w-4" strokeWidth={1.7} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                      ${collapsed ? "" : "md:justify-start"}
                      ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className={`${collapsed ? "hidden" : "hidden md:inline"} text-sm font-medium`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-2 px-3 pb-3">
          <div className={`flex ${collapsed ? "justify-center" : "justify-center md:justify-start"}`}>
            <ThemeSwitch compact />
          </div>
          <Link
            to="/"
            className={`flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-gray-500 transition-colors hover:bg-white/5 hover:text-white ${
              collapsed ? "" : "md:justify-start"
            }`}
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            <span className={`${collapsed ? "hidden" : "hidden md:inline"} text-sm font-medium`}>{t.nav.start}</span>
          </Link>
        </div>

        {/* Footer / Profile */}
        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center justify-center gap-3 py-2 md:px-2 ${collapsed ? "" : "md:justify-start"}`}>
            <div className="relative">
              <CircleUser className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className={`${collapsed ? "hidden" : "hidden md:block"} flex-1 min-w-0`}>
              <p className="text-sm font-medium text-white truncate">{t.common.user}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Zap className="w-3 h-3" />
                <span>{t.common.tokens}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`relative z-10 flex h-screen flex-1 flex-col overflow-hidden transition-[margin] duration-300 ${
        collapsed ? "ml-20" : "ml-20 md:ml-64"
      }`}>
        <Outlet />
      </main>
    </div>
  );
}
