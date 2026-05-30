import {
  ArrowDownUp,
  BarChart3,
  BookOpen,
  FileText,
  Filter,
  Folder,
  MoreVertical,
  Plus,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
} from "lucide-react";

const tabs = [
  ["Все проекты", "12"],
  ["Избранные", "3"],
  ["В работе", "7"],
  ["Завершённые", "3"],
  ["Архив", "2"],
];

const projects = [
  { title: "НейроАссистент", text: "Разработка интеллектуального ассистента на базе больших языковых моделей.", status: "В работе", progress: 65, files: 24, notes: 18, tasks: "12/18", updated: "Сегодня, 10:42", icon: Sparkles, favorite: false },
  { title: "Аналитика рынка ИИ", text: "Анализ текущих трендов и перспектив рынка искусственного интеллекта.", status: "В работе", progress: 40, files: 16, notes: 12, tasks: "7/15", updated: "Вчера, 18:35", icon: BarChart3, favorite: true },
  { title: "Техническое задание", text: "Подготовка технического задания для платформы NERIX.", status: "На ревью", progress: 80, files: 9, notes: 7, tasks: "10/12", updated: "2 дня назад", icon: FileText, favorite: false },
  { title: "Исследование конкурентов", text: "Изучение ключевых игроков и их продуктовых стратегий.", status: "В планировании", progress: 20, files: 7, notes: 5, tasks: "2/10", updated: "3 дня назад", icon: Target, favorite: false },
  { title: "База знаний", text: "Создание и структурирование внутренней базы знаний команды.", status: "В работе", progress: 55, files: 31, notes: 14, tasks: "9/20", updated: "5 дней назад", icon: BookOpen, favorite: false },
  { title: "Маркетинговая стратегия", text: "Планирование запуска и продвижения платформы NERIX.", status: "В планировании", progress: 15, files: 6, notes: 4, tasks: "1/8", updated: "6 дней назад", icon: Rocket, favorite: false },
  { title: "Безопасность и аудит", text: "Аудит безопасности и план улучшений инфраструктуры.", status: "На паузе", progress: 10, files: 5, notes: 3, tasks: "0/6", updated: "Неделю назад", icon: Shield, favorite: false },
  { title: "Интеграции и API", text: "Разработка и документирование интеграций с внешними сервисами.", status: "В работе", progress: 30, files: 12, notes: 6, tasks: "4/14", updated: "Неделю назад", icon: Sparkles, favorite: false },
];

export default function Projects() {
  return (
    <div className="relative h-full overflow-y-auto bg-[#050505] p-5 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_15%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_70%_0%,rgba(255,255,255,0.04),transparent_36%)]" />

      <div className="relative mx-auto max-w-7xl space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-medium text-white">Проекты</h1>
            <p className="mt-2 text-gray-400">Организуйте и управляйте своими проектами</p>
          </div>
          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <label className="relative w-full sm:w-auto">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-[#111111]/80 px-4 pr-10 text-sm text-white outline-none placeholder:text-gray-600 focus:border-white/25 sm:w-64"
                placeholder="Поиск по проектам"
              />
            </label>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-gray-300 hover:bg-white/10 sm:shrink-0">
                <Filter className="h-4 w-4" /> Фильтры
              </button>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-gray-300 hover:bg-white/10 sm:shrink-0">
                <ArrowDownUp className="h-4 w-4" /> Сортировка
              </button>
              <button className="col-span-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-black hover:bg-gray-200 sm:col-span-1 sm:shrink-0">
                <Plus className="h-4 w-4" /> Новый проект
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-nowrap gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#111111]/60 p-2 backdrop-blur-md md:flex-wrap md:overflow-visible">
          {tabs.map(([label, count], index) => (
            <button
              key={label}
              className={`shrink-0 rounded-xl px-3 py-2.5 text-xs transition-colors md:px-4 md:text-sm ${
                index === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {label} <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">{count}</span>
            </button>
          ))}
        </div>

        <section className="space-y-2">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article key={project.title} className="relative grid gap-4 rounded-2xl border border-white/10 bg-[#111111]/70 p-4 backdrop-blur-md transition-colors hover:border-white/[0.18] md:grid-cols-[32px_76px_minmax(260px,1fr)_180px_190px_130px_28px] md:items-center">
                <button className="hidden text-gray-500 hover:text-white md:block">
                  <Star className={`h-5 w-5 ${project.favorite ? "fill-white text-white" : ""}`} strokeWidth={1.5} />
                </button>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/25 md:h-16 md:w-16">
                  <Icon className="h-6 w-6 text-gray-200" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h2 className="pr-8 text-lg font-medium text-white md:pr-0">{project.title}</h2>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-gray-500">{project.text}</p>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-300">
                    <span className="mr-2 h-2 w-2 rounded-full bg-gray-300" />
                    {project.status}
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-white/60" style={{ width: `${project.progress}%` }} />
                    </span>
                    <span className="text-xs text-gray-400">{project.progress}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm text-gray-300">
                  <div><div className="text-xs text-gray-500">Файлы</div>{project.files}</div>
                  <div><div className="text-xs text-gray-500">Заметки</div>{project.notes}</div>
                  <div><div className="text-xs text-gray-500">Задачи</div>{project.tasks}</div>
                </div>
                <div className="text-sm text-gray-400">
                  <div className="text-xs text-gray-500">Обновлён</div>
                  {project.updated}
                </div>
                <button className="absolute right-4 top-4 text-gray-500 hover:text-white md:static">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </article>
            );
          })}
        </section>

        <footer className="flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Показано 1-8 из 12 проектов</span>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-white/10 px-3 py-2 hover:text-white">‹</button>
            <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white">1</button>
            <button className="rounded-lg border border-white/10 px-3 py-2 hover:text-white">2</button>
            <button className="rounded-lg border border-white/10 px-3 py-2 hover:text-white">›</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
