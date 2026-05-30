import { useRef, useState, type ChangeEvent, type ReactNode, type RefObject } from "react";
import {
  ArrowUp,
  BarChart3,
  ChevronDown,
  Copy,
  FileText,
  Globe2,
  ListChecks,
  Mic,
  Paperclip,
  Plus,
  Search,
  Settings2,
  ShieldAlert,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

const quickActions = ["Подвести итог", "Сформулировать задачи", "Найти риски", "Предложить улучшения", "Экспортировать"];

const timeline = [
  ["Завершить модуль аналитики и отчётов", "до 30 мая"],
  ["Добавить визуализации и дашборды", "до 13 июня"],
  ["Провести закрытое бета-тестирование", "до 27 июня"],
  ["Подготовить документацию и релиз", "до 11 июля"],
];

const scenarioCards = [
  { title: "Сводка встречи", text: "Получите краткую выжимку ключевых решений и задач по встрече.", icon: FileText },
  { title: "Черновик предложения", text: "Подготовьте структуру предложения для клиента или партнёра.", icon: Sparkles },
  { title: "Генерация идей", text: "Придумайте креативные идеи и подходы для вашего проекта или задачи.", icon: Target },
  { title: "Планирование проекта", text: "Создайте план работ с этапами, сроками и распределением ресурсов.", icon: ListChecks },
];

type Mode = "summary" | "new";

export default function Chat() {
  const [mode, setMode] = useState<Mode>("summary");
  const [inputValue, setInputValue] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const names = Array.from(event.target.files ?? []).map((file) => file.name);
    setAttachedFiles((current) => [...current, ...names].slice(0, 4));
    event.target.value = "";
  };

  const handleSend = () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;
    setMode("summary");
    setInputValue("");
    setAttachedFiles([]);
  };

  if (mode === "new") {
    return (
      <div className="relative flex h-full flex-col overflow-hidden bg-[#050505]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_32%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_35%_55%,rgba(255,255,255,0.06),transparent_32%)]" />
        <header className="relative z-10 flex h-14 items-center justify-between border-b border-white/10 px-4 md:h-16 md:px-6">
          <button className="flex min-w-0 items-center gap-2 text-base font-medium text-white md:text-lg">
            <span className="truncate">Новый разговор</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 hover:bg-white/10 md:px-4 md:text-sm" onClick={() => setMode("summary")}>
            История разговоров
          </button>
        </header>

        <main className="relative z-10 flex flex-1 flex-col items-center overflow-y-auto px-4 pb-4 pt-7 text-center md:justify-center md:px-6 md:pb-28 md:pt-0">
          <h1 className="text-3xl font-medium text-white md:text-5xl">С чего начнём?</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400 md:mt-5 md:text-base">
            Опишите задачу, задайте вопрос или выберите один из готовых сценариев, чтобы я мог помочь вам быстрее.
          </p>

          <button className="mt-6 flex w-full max-w-xl items-center justify-between rounded-2xl border border-white/10 bg-[#151515]/80 p-4 text-left backdrop-blur-md md:mt-10">
            <span>
              <span className="block text-xs text-gray-500">Модель</span>
              <span className="mt-2 flex items-center gap-3 text-white">
                <Globe2 className="h-5 w-5" />
                Нерикс 1.0
              </span>
              <span className="mt-1 block text-xs text-gray-500 md:text-sm">Аналитика, рассуждения и работа с контекстом.</span>
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          <div className="mt-5 grid w-full max-w-5xl grid-cols-2 gap-3 md:mt-8 md:grid-cols-4 md:gap-4">
            {scenarioCards.map((card) => {
              const Icon = card.icon;
              return (
                <button key={card.title} onClick={() => setInputValue(card.title)} className="min-h-32 rounded-2xl border border-white/10 bg-[#151515]/78 p-4 text-left backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/5 md:min-h-52 md:p-5">
                  <Icon className="mb-5 h-5 w-5 text-gray-200 md:mb-10 md:h-6 md:w-6" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-white md:text-lg">{card.title}</h3>
                  <p className="mt-3 hidden text-sm leading-relaxed text-gray-500 md:block">{card.text}</p>
                </button>
              );
            })}
          </div>
        </main>

        <ChatInput
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          attachedFiles={attachedFiles}
          onAttach={() => fileInputRef.current?.click()}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#050505]">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#080808]/86 px-4 backdrop-blur-md md:h-16 md:px-6">
        <button className="flex min-w-0 items-center gap-2 text-sm font-medium text-white md:text-lg">
          <span className="truncate">Сводка по проекту «Нерикс»</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => setMode("new")} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">
            <Plus className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">
            <Search className="h-4 w-4" />
          </button>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <label className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input className="h-10 w-56 rounded-xl border border-white/10 bg-[#151515] px-4 pr-10 text-sm text-white outline-none placeholder:text-gray-600" placeholder="Поиск по чату" />
          </label>
          <button onClick={() => setMode("new")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white hover:bg-white/10">
            <Plus className="h-4 w-4" /> Новый чат
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">
            <Settings2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-7">
        <div className="mx-auto max-w-4xl space-y-5 md:space-y-7">
          <MessageRow avatar="A" name="Вы" time="10:32">
            Привет, Нерикс! Подготовь, пожалуйста, краткую сводку по проекту «Нерикс»: цель, ключевые функции, текущий статус и следующие шаги.
          </MessageRow>

          <AssistantCard />

          <MessageRow avatar="A" name="Вы" time="10:33">
            Отлично! Можешь добавить ориентировочные сроки по следующим шагам?
          </MessageRow>

          <div className="grid grid-cols-[32px_1fr] gap-3 md:grid-cols-[42px_1fr] md:gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 md:h-9 md:w-9">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-3 text-sm">
                <span className="font-medium text-white">Нерикс</span>
                <span className="text-gray-500">10:33</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#151515]/86 p-4 text-sm leading-relaxed text-gray-300">
                Конечно. Вот ориентировочный план:
                <div className="mt-3 max-w-lg space-y-2">
                  {timeline.map(([task, date]) => (
                    <div key={task} className="grid gap-1 rounded-xl border border-white/[0.08] bg-black/20 p-3 sm:grid-cols-[1fr_auto] sm:gap-6">
                      <span>{task}</span>
                      <span className="text-gray-500">{date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-nowrap justify-start gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
            {quickActions.map((action, index) => (
              <button key={action} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                {index === 0 && <ListChecks className="h-4 w-4" />}
                {index === 2 && <ShieldAlert className="h-4 w-4" />}
                {action}
              </button>
            ))}
          </div>
        </div>
      </main>

      <ChatInput
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSend}
        attachedFiles={attachedFiles}
        onAttach={() => fileInputRef.current?.click()}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
      />
    </div>
  );
}

function MessageRow({ avatar, name, time, children }: { avatar: string; name: string; time: string; children: string }) {
  return (
    <div className="grid grid-cols-[32px_1fr] gap-3 md:grid-cols-[42px_1fr] md:gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 text-sm text-white md:h-9 md:w-9">{avatar}</div>
      <div>
        <div className="mb-2 flex items-center gap-3 text-sm">
          <span className="font-medium text-white">{name}</span>
          <span className="text-gray-500">{time}</span>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-300">{children}</p>
      </div>
    </div>
  );
}

function AssistantCard() {
  return (
    <div className="grid grid-cols-[32px_1fr] gap-3 md:grid-cols-[42px_1fr] md:gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 md:h-9 md:w-9">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div>
        <div className="mb-2 flex items-center gap-3 text-sm">
          <span className="font-medium text-white">Нерикс</span>
          <span className="text-gray-500">10:32</span>
        </div>
        <article className="rounded-2xl border border-white/10 bg-[#151515]/86 p-4 text-sm leading-relaxed text-gray-300 shadow-2xl md:p-5">
          <p>Конечно, Алексей. Вот краткая сводка по проекту «Нерикс»:</p>
          <div className="mt-4 space-y-3 border-t border-white/10 pt-4 md:space-y-4">
            <InfoBlock icon={Target} title="Цель">
              Создать интеллектуального AI-ассистента, который помогает командам и специалистам принимать решения, автоматизировать задачи и работать с информацией быстрее.
            </InfoBlock>
            <InfoBlock icon={Settings2} title="Ключевые функции">
              • Умный чат с контекстом и памятью<br />
              • Работа с проектами и документами<br />
              • Анализ данных и генерация инсайтов<br />
              • Интеграции и API для расширения возможностей
            </InfoBlock>
            <InfoBlock icon={BarChart3} title="Текущий статус">
              Разработка в активной фазе. Завершены ядро чат-модуля, управление контекстом и базовые интеграции. Ведётся работа над анализом данных и визуализациями.
            </InfoBlock>
            <InfoBlock icon={Sparkles} title="Следующие шаги">
              • Завершить модуль аналитики и отчётов<br />
              • Добавить визуализации и дашборды<br />
              • Провести закрытое бета-тестирование<br />
              • Подготовить документацию и релиз
            </InfoBlock>
          </div>
          <div className="mt-4 flex items-center gap-3 text-gray-500">
            <Copy className="h-4 w-4" />
            <ThumbsUp className="h-4 w-4" />
            <ThumbsDown className="h-4 w-4" />
            <span className="ml-auto text-xs">10:32</span>
          </div>
        </article>
      </div>
    </div>
  );
}

function InfoBlock({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 flex items-center gap-2 text-sm font-medium text-white">
        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.7} />
        {title}
      </h3>
      <p>{children}</p>
    </div>
  );
}

function ChatInput({
  inputValue,
  onInputChange,
  onSend,
  attachedFiles,
  onAttach,
  fileInputRef,
  onFileChange,
}: {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  attachedFiles: string[];
  onAttach: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <footer className="shrink-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent px-3 pb-3 pt-3 md:px-6 md:pb-4 md:pt-5">
      <div className="mx-auto max-w-4xl">
        {attachedFiles.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachedFiles.map((file) => (
              <span key={file} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{file}</span>
            ))}
          </div>
        )}
        <div className="rounded-[22px] border border-white/10 bg-[#151515]/92 p-2.5 backdrop-blur-md md:p-3">
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={onFileChange} />
          <textarea
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSend();
              }
            }}
            placeholder="Спросите что угодно..."
            rows={1}
            className="block min-h-9 w-full resize-none bg-transparent px-1 text-sm text-white outline-none placeholder:text-gray-600 md:min-h-[48px]"
          />
          <div className="mt-2 flex items-center gap-2">
            <button onClick={onAttach} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-300 hover:bg-white/5 hover:text-white md:h-9 md:w-9"><Paperclip className="h-5 w-5" /></button>
            <button className="hidden h-8 w-8 items-center justify-center rounded-full text-gray-300 hover:bg-white/5 hover:text-white sm:flex md:h-9 md:w-9"><Globe2 className="h-5 w-5" /></button>
            <button className="hidden h-8 w-8 items-center justify-center rounded-full text-gray-300 hover:bg-white/5 hover:text-white sm:flex md:h-9 md:w-9"><Settings2 className="h-5 w-5" /></button>
            <span className="flex-1" />
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white md:h-10 md:w-10"><Mic className="h-5 w-5" /></button>
            <button onClick={onSend} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 md:h-10 md:w-10">
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] leading-snug text-gray-500 md:text-xs">Нерикс может допускать ошибки. Проверяйте важную информацию.</p>
      </div>
    </footer>
  );
}
