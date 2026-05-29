import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Briefcase,
  ChevronLeft,
  Code2,
  CreditCard,
  FileText,
  GraduationCap,
  History,
  Home,
  Image,
  Languages,
  Mic,
  Music,
  PanelLeftClose,
  PanelLeftOpen,
  Paperclip,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  User,
  Video,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Badge } from "./components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

const navItems = [
  { id: "home", label: "Главная", icon: Home },
  { id: "chat", label: "Чат", icon: Bot },
  { id: "history", label: "История", icon: History },
  { id: "agents", label: "Агенты", icon: Sparkles },
  { id: "memory", label: "Память", icon: FileText },
  { id: "balance", label: "Баланс", icon: Wallet },
  { id: "settings", label: "Настройки", icon: Settings },
];

const pageIds = ["landing", "about", ...navItems.map((item) => item.id)];

const categories = [
  { id: "general", title: "Общий помощник", icon: Bot, desc: "Быстрые ответы, планирование и повседневные задачи" },
  { id: "business", title: "Бизнес", icon: Briefcase, desc: "Документы, продажи, поддержка, аналитика" },
  { id: "code", title: "Код", icon: Code2, desc: "React, API, ревью, объяснение ошибок" },
  { id: "edu", title: "Учеба", icon: GraduationCap, desc: "Объяснения, тесты, конспекты, языки" },
  { id: "docs", title: "Документы", icon: FileText, desc: "Резюме, договоры, деловой стиль" },
  { id: "content", title: "Контент", icon: Sparkles, desc: "Идеи, тексты, сценарии, презентации" },
  { id: "images", title: "Изображения", icon: Image, desc: "Промпты, визуальные концепции, правки" },
  { id: "video", title: "Видео", icon: Video, desc: "Сценарии, раскадровки, монтажные планы" },
  { id: "music", title: "Музыка", icon: Music, desc: "Тексты, идеи, структура трека" },
];

const scenarios = [
  { id: "work", title: "Работа", text: "Письма, задачи, отчеты и документы без лишнего шума." },
  { id: "study", title: "Учеба", text: "Объяснить тему, подготовить тест или сделать краткий конспект." },
  { id: "biz", title: "Бизнес", text: "Продажи, поддержка, аналитика и отдельный агент под процессы." },
];

const memories = [
  "Предпочитает ответы на русском языке.",
  "Использует React и Tailwind для фронтенда.",
  "Просит объяснять без сложного жаргона.",
  "Работает над проектом Nerix.",
];

const countries = ["Kazakhstan", "Russia", "Uzbekistan", "Kyrgyzstan", "Azerbaijan", "Armenia", "Georgia", "Turkey", "UAE", "USA", "Germany", "Other countries"];

function SpaceDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(255,255,255,.9) 0 1px, transparent 1.6px), radial-gradient(circle at 82% 12%, rgba(255,255,255,.7) 0 1px, transparent 1.8px), radial-gradient(circle at 44% 72%, rgba(255,255,255,.45) 0 1px, transparent 1.7px)",
          backgroundSize: "280px 260px, 420px 360px, 520px 420px",
          animation: "stars 34s linear infinite",
        }}
      />
      <div className="absolute right-[-32%] top-[8%] h-[320px] w-[460px] opacity-70 md:right-[5%] md:top-[4%] md:h-[430px] md:w-[620px]">
        <div className="absolute left-1/2 top-1/2 z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_38%_32%,#4d4d4d,#191919_58%,#020202_76%)] shadow-[0_0_90px_rgba(255,255,255,.08)] md:h-80 md:w-80" style={{ animation: "planet 12s ease-in-out infinite" }} />
        <div className="absolute left-1/2 top-1/2 z-20 h-20 w-[390px] -translate-x-1/2 -translate-y-1/2 -rotate-[15deg] rounded-[50%] border border-white/18 md:h-28 md:w-[620px]" style={{ animation: "ring 16s ease-in-out infinite" }} />
        <div className="absolute left-1/2 top-1/2 z-0 h-24 w-[420px] -translate-x-1/2 -translate-y-1/2 -rotate-[15deg] rounded-[50%] border-[12px] border-white/[.035] md:h-32 md:w-[660px]" style={{ animation: "ring 18s ease-in-out infinite" }} />
      </div>
      <div className="absolute right-20 top-24 h-px w-24 rotate-[-25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent" style={{ animation: "meteor 5.5s ease-in-out infinite" }} />
      <div className="absolute right-[34%] top-[18%] h-px w-16 rotate-[-25deg] bg-gradient-to-r from-transparent via-white/35 to-transparent" style={{ animation: "meteor 7.5s ease-in-out infinite 1.2s" }} />
    </div>
  );
}

function LanguageSwitcher() {
  return <div className="flex rounded-full border border-white/10 bg-white/[.03] p-1">{["RU", "KZ", "EN"].map((l, i) => <button key={l} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-white text-black" : "text-white/55"}`} style={{ fontSize: 12 }}>{l}</button>)}</div>;
}

function Sidebar({ page, setPage, collapsed, setCollapsed }: { page: string; setPage: (v: string) => void; collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  return <aside className={`${collapsed ? "w-[76px]" : "w-[264px]"} hidden shrink-0 border-r border-white/10 bg-[#0A0A0A] p-4 transition-all md:flex md:flex-col`}>
    <div className={`mb-8 flex items-center ${collapsed ? "flex-col gap-3" : "justify-between"}`}>
      <button onClick={() => setPage("landing")} className={`flex items-center gap-3 ${collapsed ? "mx-auto" : ""}`}>
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white text-black"><Sparkles size={18}/></span>
        {!collapsed && <span className="tracking-[-0.03em]" style={{ fontSize: 22 }}>Nerix</span>}
      </button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="text-white/60 hover:bg-white/10 hover:text-white"
        aria-label={collapsed ? "Развернуть меню" : "Скрыть меню"}
        title={collapsed ? "Развернуть меню" : "Скрыть меню"}
      >
        {collapsed ? <PanelLeftOpen size={16}/> : <PanelLeftClose size={16}/>}
      </Button>
    </div>
    <nav className="space-y-1">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setPage(id)} title={collapsed ? label : undefined} className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 transition ${collapsed ? "justify-center" : ""} ${page === id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/[.06] hover:text-white"}`}><Icon size={18}/>{!collapsed && <span style={{ fontSize: 14 }}>{label}</span>}</button>)}</nav>
    <div className="mt-auto rounded-2xl border border-white/10 bg-white/[.03] p-3">{!collapsed && <><div className="mb-3 flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><User size={16}/></div><div><p>Алихан</p><p className="text-white/45" style={{ fontSize: 12 }}>12,450 tokens</p></div></div><div className="h-1.5 rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-white" /></div></>} {collapsed && <User className="mx-auto text-white/60" size={18}/>}</div>
  </aside>;
}

function MobileRail({ page, setPage }: { page: string; setPage: (v: string) => void }) {
  return <aside className="fixed bottom-0 left-0 top-0 z-40 flex w-[76px] flex-col items-center border-r border-white/10 bg-black px-3 py-5 md:hidden">
    <button onClick={() => setPage("landing")} className="mb-8 grid h-10 w-10 place-items-center rounded-xl bg-white text-black" aria-label="Nerix">
      <Sparkles size={18}/>
    </button>
    <nav className="flex flex-1 flex-col items-center gap-2">
      {navItems.map(({id, label, icon: Icon}) => <button key={id} onClick={() => setPage(id)} aria-label={label} className={`grid h-11 w-11 place-items-center rounded-xl ${page === id ? "bg-white/10 text-white" : "text-white/55"}`}><Icon size={18}/></button>)}
    </nav>
    <button onClick={() => setPage("landing")} className="grid h-11 w-11 place-items-center rounded-xl text-white/55" aria-label="На старт">
      <ArrowLeft size={18}/>
    </button>
  </aside>;
}

function AppDownloadStrip() { return <Card className="border-white/10 bg-white/[.03]"><CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"><div><p>Скачайте Nerix</p><p className="text-white/45" style={{ fontSize: 13 }}>Мобильное приложение для iOS и Android скоро доступно.</p></div><div className="flex gap-2"><Button variant="outline" className="border-white/15 bg-black text-white hover:bg-white/10">iOS</Button><Button variant="outline" className="border-white/15 bg-black text-white hover:bg-white/10">Android</Button></div></CardContent></Card>; }
function PromptChip({ children }: { children: string }) { return <button className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-white/70 hover:bg-white/10" style={{ fontSize: 14 }}>{children}</button>; }
function ChatInput() { return <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-2"><div className="flex items-end gap-2"><Button variant="ghost" size="icon" className="shrink-0 text-white/50 hover:bg-white/10"><Paperclip size={18}/></Button><Textarea rows={1} placeholder="Сообщение..." className="min-h-12 flex-1 resize-none border-0 bg-transparent text-white placeholder:text-white/35 focus-visible:ring-0"/><Button variant="ghost" size="icon" className="shrink-0 text-white/50 hover:bg-white/10"><Mic size={18}/></Button><Button size="icon" className="shrink-0 bg-white text-black hover:bg-white/90"><Send size={17}/></Button></div></div>; }

function Landing({ setPage }: { setPage: (v: string) => void }) { return <main className="relative min-h-screen overflow-hidden bg-black text-white"><SpaceDecor/><section className="relative mx-auto flex min-h-[820px] max-w-7xl flex-col px-5 py-6 md:min-h-[1100px] md:px-10"><header className="flex items-center justify-between"><button onClick={() => setPage("landing")} className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black"><Sparkles size={18}/></span><span style={{ fontSize: 24 }}>Nerix</span></button><LanguageSwitcher/></header><div className="grid flex-1 items-center gap-10 md:grid-cols-[1.05fr_.95fr]"><div className="max-w-3xl"><Badge className="mb-5 border-white/10 bg-white/[.05] text-white/70 hover:bg-white/[.05]">40+ ИИ-агентов для Казахстана и СНГ</Badge><h1 className="tracking-[-0.06em]" style={{ fontSize: "clamp(44px, 7vw, 96px)", lineHeight: .92 }}>Nerix подбирает ИИ-агента под вашу задачу</h1><p className="mt-6 max-w-2xl text-white/58" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.55 }}>Платформа для работы, учебы, бизнеса и личных задач. Вы описываете цель, а Nerix сам помогает выбрать подходящий формат агента.</p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={() => setPage("home")} className="h-12 rounded-xl bg-white px-7 text-black hover:bg-white/90">Войти</Button><Button onClick={() => setPage("about")} variant="outline" className="h-12 rounded-xl border-white/15 bg-black/30 px-7 text-white hover:bg-white/10">О проекте</Button></div></div><div className="rounded-3xl border border-white/10 bg-[#0A0A0A]/80 p-4 shadow-2xl backdrop-blur"><div className="rounded-2xl border border-white/10 bg-black p-4"><p className="mb-4 text-white/45" style={{ fontSize: 13 }}>Автомаршрутизация</p><div className="space-y-3">{["Понять задачу", "Выбрать формат", "Запустить агента"].map((x, i)=><div key={x} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black">{i+1}</span><span>{x}</span></div>)}</div></div></div></div><div className="grid gap-3 md:grid-cols-3">{[["40+","агентов разных форматов"],["3","среды: работа, учеба, бизнес"],["1","понятный чат для всех задач"]].map(([n,t])=><Card key={t} className="border-white/10 bg-white/[.03]"><CardContent className="p-5"><p style={{ fontSize: 36 }}>{n}</p><p className="text-white/50">{t}</p></CardContent></Card>)}</div></section></main>; }

function About({ setPage }: { setPage: (v: string) => void }) { return <Shell pageTitle="О проекте" leading={<Button onClick={() => setPage("landing")} variant="ghost" className="text-white/55 hover:bg-white/10 hover:text-white"><ChevronLeft size={17}/>На главную</Button>} trailing={<LanguageSwitcher/>}><div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 md:p-10"><SpaceDecor/><div className="relative max-w-3xl"><h1 className="tracking-[-0.04em]" style={{ fontSize: "clamp(34px,5vw,64px)", lineHeight: 1 }}>Nerix — не один чатбот, а рабочая среда с ИИ-агентами</h1><p className="mt-5 text-white/55" style={{ fontSize: 18, lineHeight: 1.55 }}>Платформа помогает работать с текстом, кодом, документами, изображениями, видео, музыкой и автоматизацией. Вы не выбираете модель вручную — Nerix распределяет задачу по подходящему агенту.</p></div></div><div className="mt-5 grid gap-4 md:grid-cols-4">{scenarios.concat({id:"personal", title:"Личные задачи", text:"Планы, письма, бытовые вопросы и аккуратные подсказки."}).map(s=><Card key={s.id} className="border-white/10 bg-white/[.03]"><CardContent className="p-5"><p>{s.title}</p><p className="mt-3 text-white/48" style={{ lineHeight: 1.45 }}>{s.text}</p></CardContent></Card>)}</div><div className="mt-5 grid gap-4 md:grid-cols-2"><Info title="Вы не выбираете вслепую" text="Nerix распределяет агентов по вашим задачам, чтобы вы не боялись выбрать неправильный инструмент."/><Info title="Можно создать ИИ-агента для бизнеса" text="Для компаний Nerix может стать отдельной средой с агентом, который знает процессы, документы и задачи бизнеса."/></div></Shell>; }
function Info({title,text}:{title:string;text:string}){return <Card className="border-white/10 bg-[#0A0A0A]"><CardContent className="p-6"><p style={{fontSize:24}}>{title}</p><p className="mt-3 text-white/50" style={{lineHeight:1.55}}>{text}</p></CardContent></Card>}

function Shell({ children, pageTitle, leading, trailing }: { children: React.ReactNode; pageTitle?: string; leading?: React.ReactNode; trailing?: React.ReactNode }) { return <div className="min-h-screen bg-black p-4 pb-8 text-white md:p-6"><div className="mx-auto max-w-6xl">{pageTitle && <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-3">{leading}<h1 className="tracking-[-0.04em]" style={{fontSize:34}}>{pageTitle}</h1></div>{trailing}</div>}{children}</div></div>; }

function WorkspaceHome({ setPage }: { setPage: (v:string)=>void }) { return <Shell><div className="grid min-h-[calc(100vh-48px)] place-items-center"><div className="w-full max-w-4xl"><div className="text-center"><h1 className="tracking-[-0.05em]" style={{fontSize:"clamp(38px,6vw,72px)",lineHeight:1}}>Чем я могу помочь?</h1><p className="mx-auto mt-4 max-w-xl text-white/50">Опишите задачу, а Nerix подскажет подходящий формат агента.</p><Button onClick={()=>setPage("chat")} className="mt-7 h-12 rounded-xl bg-white px-7 text-black hover:bg-white/90">Начать чат</Button></div><div className="mt-10 grid gap-4 md:grid-cols-3">{scenarios.map(s=><Card key={s.id} className="border-white/10 bg-[#0A0A0A]"><CardContent className="p-5"><p>{s.title}</p><p className="mt-2 text-white/45">{s.text}</p></CardContent></Card>)}</div><div className="mt-4"><AppDownloadStrip/></div></div></div></Shell>; }

function ChatPage() { return <div className="flex min-h-screen flex-col bg-black p-4 pb-40 text-white md:p-6 md:pb-28"><div className="flex items-center justify-between"><Button variant="outline" className="border-white/10 bg-[#0A0A0A] text-white hover:bg-white/10">Nerix Pro</Button><Button variant="outline" className="border-white/10 bg-[#0A0A0A] text-white hover:bg-white/10">Новый чат</Button></div><div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-start pb-44 pt-8 md:justify-center md:py-10"><div className="text-center"><div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[.04]"><Bot/></div><h1 className="tracking-[-0.04em]" style={{fontSize:"clamp(28px,5vw,44px)",lineHeight:1.1}}>Привет! Я Nerix. Чем могу помочь вам сегодня?</h1></div><div className="mt-7 flex flex-wrap justify-center gap-2">{["Составь план проекта","Объясни простыми словами","Помоги написать текст"].map(p=><PromptChip key={p}>{p}</PromptChip>)}</div><Card className="mt-7 border-white/10 bg-[#0A0A0A]"><CardContent className="p-4"><p className="mb-3 text-white/45" style={{fontSize:13}}>Избранные промпты</p><div className="grid gap-2 md:grid-cols-2">{["Сделай краткое резюме","Переведи на деловой стиль","Проверь логику и ошибки","Составь список задач"].map(p=><button key={p} className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-left text-white/70 hover:bg-white/10">{p}</button>)}</div></CardContent></Card></div><div className="fixed bottom-4 left-[92px] right-4 mx-auto max-w-3xl md:left-0 md:right-0 md:bottom-6"><ChatInput/><p className="mt-2 text-center text-white/35" style={{fontSize:12}}>Nerix может допускать ошибки. Проверяйте важную информацию.</p></div></div>; }
function AgentsPage() { const [selected,setSelected]=useState(categories[1]); return <Shell pageTitle="Агенты"><div className="grid gap-5 lg:grid-cols-[1fr_360px]"><div className="grid gap-3 md:grid-cols-2">{categories.map(a=><button key={a.id} onClick={()=>setSelected(a)}><Card className={`text-left ${selected.id===a.id?"border-white/35 bg-white/[.08] text-white":"border-white/10 bg-[#0A0A0A] text-white"}`}><CardContent className="p-5"><a.icon size={22}/><p className="mt-4">{a.title}</p><p className="mt-2 text-white/45">{a.desc}</p></CardContent></Card></button>)}</div><Card className="h-fit border-white/10 bg-[#0A0A0A]"><CardContent className="p-6"><Badge className="bg-white text-black">Рекомендация</Badge><h2 className="mt-5" style={{fontSize:28}}>{selected.title}</h2><p className="mt-3 text-white/50">Nerix может автоматически рекомендовать этого агента, когда ваша задача похожа на: «{selected.desc}».</p><Button className="mt-6 w-full bg-white text-black hover:bg-white/90">Запустить агента</Button></CardContent></Card></div></Shell>; }
function BalancePage(){return <Shell pageTitle="Баланс"><div className="grid gap-4 md:grid-cols-3">{[["12,450","текущий баланс"],["38,720","расход за месяц"],["420","средняя цена запроса"]].map(([n,t])=><Card key={t} className="border-white/10 bg-[#0A0A0A]"><CardContent className="p-5"><p style={{fontSize:34}}>{n}</p><p className="text-white/45">{t}</p></CardContent></Card>)}</div><div className="mt-5 grid gap-4 md:grid-cols-3">{[["Старт","2,900 ₸","Для знакомства"],["Работа","7,900 ₸","Оптимально каждый день"],["Pro","17,900 ₸","Для команд и бизнеса"]].map(p=><Card key={p[0]} className="border-white/10 bg-[#0A0A0A]"><CardContent className="p-5"><p>{p[0]}</p><p className="mt-4" style={{fontSize:32}}>{p[1]}</p><p className="text-white/45">{p[2]}</p><Button className="mt-5 w-full bg-white text-black hover:bg-white/90">Купить</Button></CardContent></Card>)}</div><Card className="mt-5 border-white/10 bg-[#0A0A0A]"><CardContent className="p-5"><p>История операций</p>{["Пакет Работа — 7,900 ₸","Запросы Nerix Pro — 420 токенов","Бонус за регистрацию — 1,000 токенов"].map((x,i)=><div key={x} className="mt-3 flex justify-between border-t border-white/10 pt-3 text-white/55"><span>{x}</span><span>{i===0?"Сегодня":"Вчера"}</span></div>)}</CardContent></Card></Shell>}
function MemoryPage(){return <Shell pageTitle="Память"><div className="flex gap-3"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-white/35" size={18}/><Input placeholder="Поиск в памяти" className="h-11 border-white/10 bg-[#0A0A0A] pl-10 text-white"/></div><Button variant="outline" className="border-white/15 bg-black text-white hover:bg-white/10">Очистить все</Button></div><div className="mt-5 grid gap-3">{memories.map(m=><Card key={m} className="border-white/10 bg-[#0A0A0A]"><CardContent className="flex items-center justify-between p-4"><span>{m}</span><Button variant="ghost" size="icon" className="text-white/40 hover:bg-white/10"><X size={16}/></Button></CardContent></Card>)}</div></Shell>}
function SettingsPage(){const rows=[["Profile","Профиль"],["Appearance","Внешний вид"],["Notifications","Уведомления"],["Language","Язык"],["Country","Страна"],["Security","Безопасность"]];return <Shell pageTitle="Настройки"><Card className="border-white/10 bg-[#0A0A0A]"><CardContent className="p-0">{rows.map(([key,label])=><div key={key} className="flex items-center justify-between border-b border-white/10 p-4 last:border-b-0"><div className="flex items-center gap-3"><Shield size={18} className="text-white/45"/><span>{label}</span></div>{key==="Language"?<Select defaultValue="Russian"><SelectTrigger className="w-36 border-white/10 bg-black text-white"><SelectValue/></SelectTrigger><SelectContent>{["Russian","Kazakh","English"].map(l=><SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>:key==="Country"?<Select defaultValue="Kazakhstan"><SelectTrigger className="w-40 border-white/10 bg-black text-white"><SelectValue/></SelectTrigger><SelectContent>{countries.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>:<span className="text-white/35">›</span>}</div>)}</CardContent></Card><p className="mt-4 text-white/45">Для страны подбираются платежи и доступные модели.</p></Shell>}

export default function App() {
  const getPageFromHash = () => {
    if (typeof window === "undefined") return "landing";
    const hashPage = window.location.hash.replace("#", "");
    return pageIds.includes(hashPage) ? hashPage : "landing";
  };
  const [page, setPageState] = useState(getPageFromHash);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("collapsed") === "1";
  });
  const setPage = (nextPage: string) => {
    setPageState(nextPage);
    if (typeof window !== "undefined") {
      window.location.hash = nextPage === "landing" ? "" : nextPage;
    }
  };
  useEffect(() => {
    const syncHash = () => setPageState(getPageFromHash());
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  const inWorkspace = !["landing", "about"].includes(page);
  const render = () => page === "landing" ? <Landing setPage={setPage}/> : page === "about" ? <About setPage={setPage}/> : page === "chat" ? <ChatPage/> : page === "agents" ? <AgentsPage/> : page === "balance" ? <BalancePage/> : page === "memory" ? <MemoryPage/> : page === "settings" ? <SettingsPage/> : <WorkspaceHome setPage={setPage}/>;
  return <div className="dark min-h-screen bg-black text-white"><style>{`@keyframes stars{from{transform:translate3d(0,0,0)}to{transform:translate3d(-80px,120px,0)}}@keyframes planet{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% + 16px))}}@keyframes ring{0%,100%{transform:translate(-50%,-50%) rotate(-15deg)}50%{transform:translate(-50%,calc(-50% + 8px)) rotate(-15deg)}}@keyframes meteor{0%,62%{opacity:0;transform:translate(0,0) rotate(-25deg)}74%{opacity:1}100%{opacity:0;transform:translate(-180px,90px) rotate(-25deg)}}`}</style>{inWorkspace ? <div className="flex"><Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed}/><main className="min-w-0 flex-1 pl-[76px] md:pl-0">{render()}</main><MobileRail page={page} setPage={setPage}/></div> : render()}</div>;
}
