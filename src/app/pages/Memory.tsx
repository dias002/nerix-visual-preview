import { Briefcase, Clock, Code2, Globe2, MoreHorizontal, Plus, Search, Settings2, Star, Target, User } from "lucide-react";

const tabs = ["Все", "Предпочтения", "Работа", "Проекты", "Факты", "Контекст", "Архив"];

const memories = [
  { title: "Предпочтение к структурированным ответам", text: "Пользователь предпочитает чёткие и структурированные ответы со списками и заголовками.", source: "Общие предпочтения", date: "20 мая 2025 г.", icon: User },
  { title: "Работает в продуктовой команде", text: "Пользователь работает в продуктовой команде и отвечает за планирование и аналитику.", source: "Из чата 18 мая", date: "18 мая 2025 г.", icon: Briefcase },
  { title: "Цель - запуск AI-ассистента", text: "Пользователь работает над запуском AI-ассистента для внутреннего использования в компании.", source: "Сводка по проекту «Нерикс»", date: "17 мая 2025 г.", icon: Target },
  { title: "Технический стек: Python, FastAPI, PostgreSQL", text: "Основной стек: Python, FastAPI для бэкенда, PostgreSQL для хранения данных, Redis для кеширования.", source: "Техническое задание", date: "15 мая 2025 г.", icon: Code2 },
  { title: "Интерес к автоматизации и AI", text: "Пользователь интересуется автоматизацией процессов и применением AI в продуктах.", source: "Из чата 10 мая", date: "10 мая 2025 г.", icon: Star },
  { title: "Часовой пояс: GMT+3", text: "Пользователь работает по московскому времени.", source: "Настройки пользователя", date: "8 мая 2025 г.", icon: Clock },
  { title: "Предпочитаемый язык - русский", text: "Пользователь предпочитает получать ответы на русском языке.", source: "Настройки пользователя", date: "8 мая 2025 г.", icon: Globe2 },
];

export default function Memory() {
  return (
    <div className="relative h-full overflow-y-auto bg-[#050505] p-5 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_94%_14%,rgba(255,255,255,0.13),transparent_28%),radial-gradient(circle_at_60%_0%,rgba(255,255,255,0.04),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-medium text-white md:text-4xl">Память</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 md:mt-4 md:text-base">
              Управляйте информацией, которую я запоминаю о вас и ваших предпочтениях. Это помогает давать более точные и персонализированные ответы.
            </p>
          </div>
          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <label className="relative w-full sm:w-auto">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input className="h-11 w-full rounded-xl border border-white/10 bg-[#111111]/80 px-4 pr-10 text-sm text-white outline-none placeholder:text-gray-600 focus:border-white/25 sm:w-64" placeholder="Поиск по памяти" />
            </label>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-gray-300 hover:bg-white/10">
              <Plus className="h-4 w-4" /> Добавить факт
            </button>
            <button className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 sm:flex">
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex flex-nowrap gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#111111]/60 p-2 backdrop-blur-md md:flex-wrap md:overflow-visible">
          {tabs.map((tab, index) => (
            <button key={tab} className={`shrink-0 rounded-xl px-3 py-2.5 text-xs transition-colors md:px-4 md:text-sm ${index === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              {tab}
            </button>
          ))}
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/68 backdrop-blur-md">
          {memories.map((memory, index) => {
            const Icon = memory.icon;
            return (
              <article key={memory.title} className={`relative grid gap-3 px-4 py-4 md:grid-cols-[52px_1.4fr_260px_150px_32px] md:items-center md:gap-4 md:px-5 md:py-5 ${index !== memories.length - 1 ? "border-b border-white/[0.08]" : ""}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 md:h-11 md:w-11">
                  <Icon className="h-5 w-5 text-gray-200" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="pr-8 text-base font-medium text-white md:pr-0 md:text-lg">{memory.title}</h2>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-500">{memory.text}</p>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">Источник</div>
                  <div className="mt-1 text-gray-300">{memory.source}</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">Обновлено</div>
                  <div className="mt-1 text-gray-300">{memory.date}</div>
                </div>
                <button className="absolute right-4 top-4 text-gray-500 hover:text-white md:static">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </article>
            );
          })}
        </section>

        <footer className="flex flex-col gap-3 rounded-b-2xl text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Показано 1-7 из 7</span>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-white/10 px-3 py-2 hover:text-white">‹</button>
            <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white">1</button>
            <button className="rounded-lg border border-white/10 px-3 py-2 hover:text-white">›</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
