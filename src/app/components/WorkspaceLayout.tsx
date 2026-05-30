import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Brain,
  ChevronDown,
  Clock3,
  CreditCard,
  Folder,
  Home,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Settings,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import CountryGate from "./CountryGate";
import ThemeSwitch from "./ThemeSwitch";
import { useLanguage } from "../i18n";

const recentItems = [
  { label: "Сводка по проекту...", meta: "10:42", icon: MessageSquare },
  { label: "Идеи для лендинга", meta: "Вчера", icon: MessageSquare },
  { label: "Анализ рынка ИИ", meta: "Вчера", icon: MessageSquare },
  { label: "План на неделю", meta: "Пн", icon: MessageSquare },
  { label: "Техническое задание", meta: "Пн", icon: Folder },
];

export default function WorkspaceLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, theme } = useLanguage();

  const navItems = [
    { path: "/workspace", icon: Home, label: t.nav.home },
    { path: "/workspace/chat", icon: MessageSquare, label: t.nav.chat },
    { path: "/workspace/projects", icon: Folder, label: t.nav.projects },
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
    <div className="min-h-svh overflow-hidden bg-black p-2 text-white md:min-h-screen md:p-3">
      <CountryGate />

      <header
        className="fixed left-2 right-2 top-2 z-40 flex h-12 items-center justify-between rounded-2xl border px-4 md:hidden"
        style={{
          backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.82)" : "rgba(3, 3, 3, 0.9)",
          borderColor: theme === "light" ? "rgba(16, 20, 28, 0.12)" : "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Link to="/workspace/chat" className="text-sm font-semibold tracking-[0.18em] text-white">
          NERIX
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSwitch compact className="h-9 w-9" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" strokeWidth={1.7} />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            aria-label="Закрыть меню"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside
            className="absolute right-2 top-2 bottom-2 flex w-[min(330px,calc(100vw-24px))] flex-col overflow-y-auto rounded-2xl border p-4"
            style={{
              backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.96)" : "rgba(5, 5, 5, 0.96)",
              borderColor: theme === "light" ? "rgba(16, 20, 28, 0.12)" : "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold tracking-[0.18em] text-white">NERIX</div>
                <div className="mt-1 text-xs text-gray-500">Рабочее пространство</div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex h-12 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${
                      active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Недавние</p>
                <Plus className="h-4 w-4 text-gray-500" />
              </div>
              <div className="space-y-1">
                {recentItems.slice(0, 4).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={index === 3 ? "/workspace/projects" : "/workspace/chat"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      <span className="text-xs text-gray-500">{item.meta}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-3">
                <UserCircle className="h-10 w-10 text-gray-300" strokeWidth={1.4} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">Алексей Иванов</div>
                  <div className="truncate text-xs text-gray-500">Профессиональный</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <aside
        className={`fixed left-2 top-2 bottom-2 z-30 hidden flex-col rounded-2xl border transition-[width] duration-300 md:left-3 md:top-3 md:bottom-3 md:flex ${
          collapsed ? "w-[76px]" : "w-[76px] md:w-[276px]"
        }`}
        style={{
          backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.78)" : "rgba(3, 3, 3, 0.86)",
          borderColor: theme === "light" ? "rgba(16, 20, 28, 0.12)" : "rgba(255, 255, 255, 0.11)",
          backdropFilter: "blur(22px)",
        }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-6">
          <Link to="/workspace" className="min-w-0 text-xl font-semibold tracking-[0.18em] text-white">
            <span className={collapsed ? "inline tracking-normal" : "md:hidden"}>N</span>
            <span className={`${collapsed ? "hidden" : "hidden md:inline"}`}>NERIX</span>
          </Link>
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition-colors hover:bg-white/5 hover:text-white md:inline-flex"
            aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" strokeWidth={1.6} /> : <PanelLeftClose className="h-4 w-4" strokeWidth={1.6} />}
          </button>
        </div>

        <nav className="px-3">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex h-11 items-center justify-center gap-3 rounded-xl px-3 text-sm transition-colors ${
                      collapsed ? "" : "md:justify-start"
                    } ${active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                  >
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={1.6} />
                    <span className={`${collapsed ? "hidden" : "hidden md:inline"} truncate`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`${collapsed ? "hidden" : "hidden md:block"} mt-10 flex-1 px-4`}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-gray-400">Недавние чаты</p>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white">
              <Plus className="h-4 w-4" strokeWidth={1.7} />
            </button>
          </div>
          <div className="space-y-1.5 border-t border-white/10 pt-3">
            {recentItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={index === 4 ? "/workspace/projects" : "/workspace/chat"}
                  className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm transition-colors ${
                    index === 0 && location.pathname.includes("/chat") ? "bg-white/[0.08] text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.meta}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto space-y-4 border-t border-white/10 p-4">
          <ThemeSwitch compact className={collapsed ? "mx-auto" : ""} />
          <button className={`flex w-full items-center justify-center gap-3 rounded-xl py-2.5 text-left ${collapsed ? "" : "md:justify-start"}`}>
            <UserCircle className="h-10 w-10 shrink-0 text-gray-300" strokeWidth={1.4} />
            <span className={`${collapsed ? "hidden" : "hidden md:block"} min-w-0 flex-1`}>
              <span className="block truncate text-sm font-medium text-white">Алексей Иванов</span>
              <span className="block truncate text-xs text-gray-500">Профессиональный</span>
            </span>
            <ChevronDown className={`${collapsed ? "hidden" : "hidden md:block"} h-4 w-4 text-gray-500`} />
          </button>
        </div>
      </aside>

      <main
        className={`relative z-10 mt-14 h-[calc(100svh-72px)] overflow-hidden rounded-2xl border border-white/10 transition-[margin] duration-300 md:mt-0 md:h-[calc(100vh-24px)] ${
          collapsed ? "ml-0 md:ml-[88px]" : "ml-0 md:ml-[288px]"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
