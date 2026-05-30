import { Link } from "react-router";
import {
  BarChart3,
  Brain,
  Bot,
  ChevronRight,
  Database,
  FileText,
  Folder,
  MessageSquarePlus,
  Settings2,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

const stats = [
  { label: "Активные проекты", value: "4", delta: "+1 за неделю", icon: Folder },
  { label: "Диалоги с ИИ", value: "27", delta: "+8 за неделю", icon: Bot },
  { label: "Объёмы данных", value: "12.4 ГБ", delta: "+2.1 ГБ за неделю", icon: Database },
  { label: "Экономия времени", value: "16 ч", delta: "+4 ч за неделю", icon: BarChart3 },
];

const activity = [
  { title: "Сводка по проекту «Нерикс»", type: "Чат", time: "10:42", icon: MessageSquarePlus },
  { title: "Анализ требований", type: "Проект · Альфа", time: "Вчера", icon: Folder },
  { title: "Исследование рынка ИИ", type: "Проект · Исследования", time: "Вчера", icon: Folder },
  { title: "Техническое задание v2.3", type: "Документ", time: "Пн", icon: FileText },
  { title: "План развития продукта", type: "Проект · Продукт", time: "Пн", icon: Folder },
];

const actions = [
  { title: "Новый чат", text: "Обсудите задачу с ИИ", to: "/workspace/chat", icon: MessageSquarePlus },
  { title: "Создать проект", text: "Структурируйте работу", to: "/workspace/projects", icon: Folder },
  { title: "Загрузить данные", text: "Импортируйте файлы", to: "/workspace/projects", icon: Upload },
  { title: "Создать документ", text: "Текст, отчёт или план", to: "/workspace/chat", icon: FileText },
  { title: "Шаблоны", text: "Готовые заготовки", to: "/workspace/chat", icon: Sparkles },
  { title: "Интеграции", text: "Подключите сервисы", to: "/workspace/settings", icon: Settings2 },
];

const mobileShortcuts = [
  { title: "Чат", text: "Сразу к ИИ", to: "/workspace/chat", icon: MessageSquarePlus },
  { title: "Проекты", text: "Рабочие задачи", to: "/workspace/projects", icon: Folder },
  { title: "Память", text: "Контекст Nerix", to: "/workspace/memory", icon: Brain },
  { title: "Настройки", text: "Тема и страна", to: "/workspace/settings", icon: Settings2 },
];

const resources = [
  { label: "Память", value: "6.2 ГБ / 16 ГБ", progress: 39 },
  { label: "Данные", value: "12.4 ГБ / 50 ГБ", progress: 25 },
  { label: "Запросы к ИИ", value: "1 248 / 5 000", progress: 25 },
];

export default function WorkspaceHome() {
  return (
    <div className="relative h-full overflow-y-auto bg-[#050505] p-5 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_8%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_55%_0%,rgba(255,255,255,0.05),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl space-y-5">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-medium text-white md:text-5xl">Добро пожаловать, Алексей</h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-400">
              Ваша интеллектуальная платформа для работы с данными, проектами и знаниями.
            </p>
          </div>
          <button className="hidden w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white md:inline-flex">
            <Settings2 className="h-4 w-4" strokeWidth={1.7} />
            Настроить обзор
          </button>
        </header>

        <section className="grid grid-cols-2 gap-3 md:hidden">
          {mobileShortcuts.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.to}
                className="min-h-28 rounded-2xl border border-white/10 bg-[#111111]/72 p-4 backdrop-blur-md transition-colors active:bg-white/10"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                  <Icon className="h-5 w-5 text-gray-200" strokeWidth={1.5} />
                </div>
                <span className="block text-sm font-medium text-white">{action.title}</span>
                <span className="mt-1 block text-xs text-gray-500">{action.text}</span>
              </Link>
            );
          })}
        </section>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="min-h-28 rounded-2xl border border-white/10 bg-[#111111]/70 p-4 backdrop-blur-md md:min-h-36 md:p-5">
                <div className="mb-4 flex items-center gap-2 text-xs text-gray-300 md:mb-6 md:text-sm">
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                  {stat.label}
                </div>
                <div className="text-2xl font-medium text-white md:text-3xl">{stat.value}</div>
                <div className="mt-2 text-xs text-gray-500 md:text-sm">{stat.delta}</div>
              </div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-2xl border border-white/10 bg-[#111111]/72 p-5 backdrop-blur-md">
            <h2 className="mb-4 text-lg font-medium text-white">Недавняя активность</h2>
            <div className="space-y-2">
              {activity.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to="/workspace/chat"
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3 transition-colors hover:border-white/15 hover:bg-white/5"
                  >
                    <Icon className="h-5 w-5 text-gray-300" strokeWidth={1.5} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-white">{item.title}</span>
                      <span className="block text-xs text-gray-500">{item.type}</span>
                    </span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </Link>
                );
              })}
            </div>
            <button className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 hover:bg-white/5">
              Показать всю активность
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111111]/72 p-5 backdrop-blur-md">
            <h2 className="mb-4 text-lg font-medium text-white">Быстрые действия</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.title}
                    to={action.to}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-white/20 hover:bg-white/5"
                  >
                    <Icon className="h-6 w-6 text-gray-200" strokeWidth={1.5} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-white">{action.title}</span>
                      <span className="block text-xs text-gray-500">{action.text}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-2xl border border-white/10 bg-[#111111]/72 p-5 backdrop-blur-md">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <ShieldCheck className="h-5 w-5 text-gray-200" strokeWidth={1.6} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Все системы работают стабильно</h2>
                <p className="text-sm text-gray-500">Последняя проверка: сегодня, 10:30</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {["Модель ИИ", "Хранилище", "Синхронизация", "Безопасность"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm text-gray-400">{item}</div>
                  <div className="mt-2 text-xs text-gray-500">● Онлайн</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111111]/72 p-5 backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Использование ресурсов</h2>
              <button className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 hover:bg-white/5">Подробнее</button>
            </div>
            <div className="space-y-4">
              {resources.map((item) => (
                <div key={item.label} className="grid grid-cols-[92px_1fr_42px] items-center gap-4 text-sm">
                  <span className="text-gray-300">{item.label}</span>
                  <span>
                    <span className="mb-1 block text-xs text-gray-500">{item.value}</span>
                    <span className="block h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-white/[0.55]" style={{ width: `${item.progress}%` }} />
                    </span>
                  </span>
                  <span className="text-right text-xs text-gray-500">{item.progress}%</span>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs text-gray-500">Лимиты обновятся через 18 дней</p>
          </div>
        </section>
      </div>
    </div>
  );
}
