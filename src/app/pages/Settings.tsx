import type { ReactNode } from "react";
import { Bell, ChevronRight, Info, Lock, Palette, Shield, User, UserCircle, type LucideIcon } from "lucide-react";
import LanguageSwitch from "../components/LanguageSwitch";
import ThemeSwitch from "../components/ThemeSwitch";
import { useLanguage } from "../i18n";

const toggles = [
  ["Уведомления в приложении", true],
  ["Уведомления по электронной почте", true],
  ["Еженедельная сводка", false],
  ["Звук уведомлений", true],
];

const privacy = ["Управление данными", "История запросов", "Экспорт данных", "Удалить аккаунт"];
const appInfo = [["Версия приложения", "1.4.2"], ["Сборка", "2024.05.27.1021"], ["Условия использования", ""], ["Политика конфиденциальности", ""]];

export default function Settings() {
  const { country, setCountry, countries } = useLanguage();

  return (
    <div className="relative h-full overflow-y-auto bg-[#050505] p-5 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_96%_10%,rgba(255,255,255,0.13),transparent_28%),radial-gradient(circle_at_75%_0%,rgba(255,255,255,0.04),transparent_36%)]" />
      <div className="relative mx-auto max-w-6xl space-y-5">
        <header>
          <h1 className="text-3xl font-medium text-white">Настройки</h1>
          <p className="mt-2 text-gray-400">Управляйте параметрами приложения, чтобы настроить NERIX под себя.</p>
        </header>

        <SettingsSection icon={User} title="Профиль" text="Управление личными данными и настройками аккаунта.">
          <button className="flex w-full items-center justify-between gap-4 text-left">
            <span className="flex min-w-0 items-center gap-4">
              <UserCircle className="h-12 w-12 text-gray-300" strokeWidth={1.4} />
              <span className="min-w-0">
                <span className="block truncate text-base font-medium text-white">Алексей Иванов</span>
                <span className="block truncate text-sm text-gray-500">alexey.ivanov@nerix.ai</span>
              </span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-gray-500" />
          </button>
        </SettingsSection>

        <SettingsSection icon={Palette} title="Внешний вид" text="Настройте тему, размер шрифта и другие параметры интерфейса.">
          <div className="space-y-4">
            <SettingRow label="Тема">
              <ThemeSwitch />
            </SettingRow>
            <SettingRow label="Размер шрифта">
              <Segmented options={["A-", "Средний", "A+"]} active="Средний" />
            </SettingRow>
            <SettingRow label="Плотность интерфейса">
              <Segmented options={["Компактно", "Средне", "Свободно"]} active="Средне" />
            </SettingRow>
            <SettingRow label="Язык">
              <LanguageSwitch />
            </SettingRow>
            <SettingRow label="Страна и валюта">
              <div className="flex flex-wrap justify-end gap-2">
                {countries.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setCountry(option.code)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      country === option.code ? "border-white/20 bg-white text-black" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {option.symbol} {option.label}
                  </button>
                ))}
              </div>
            </SettingRow>
          </div>
        </SettingsSection>

        <SettingsSection icon={Bell} title="Уведомления" text="Настройте, какие уведомления вы хотите получать.">
          <div className="divide-y divide-white/[0.08]">
            {toggles.map(([label, enabled]) => (
              <SettingRow key={label as string} label={label as string}>
                <Toggle enabled={Boolean(enabled)} />
              </SettingRow>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection icon={Lock} title="Конфиденциальность" text="Управляйте данными и уровнем конфиденциальности.">
          <div className="divide-y divide-white/[0.08]">
            {privacy.map((item) => (
              <button key={item} className="flex w-full items-center justify-between py-3 text-sm text-gray-300 hover:text-white">
                {item}
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </button>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection icon={Info} title="О приложении" text="Информация о версии и юридическая информация.">
          <div className="divide-y divide-white/[0.08]">
            {appInfo.map(([label, value]) => (
              <button key={label} className="flex w-full items-center justify-between py-3 text-sm text-gray-300 hover:text-white">
                <span>{label}</span>
                {value ? <span className="text-gray-500">{value}</span> : <ChevronRight className="h-4 w-4 text-gray-500" />}
              </button>
            ))}
          </div>
        </SettingsSection>

        <p className="flex items-center justify-center gap-2 py-4 text-xs text-gray-500">
          <Shield className="h-4 w-4" />
          Ваши данные защищены и используются только для улучшения сервиса.
        </p>
      </div>
    </div>
  );
}

function SettingsSection({ icon: Icon, title, text, children }: { icon: LucideIcon; title: string; text: string; children: ReactNode }) {
  return (
    <section className="grid gap-5 rounded-2xl border border-white/10 bg-[#111111]/72 p-4 backdrop-blur-md md:grid-cols-[360px_1fr] md:p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 md:h-12 md:w-12">
          <Icon className="h-5 w-5 text-gray-200" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-white">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{text}</p>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}

function SettingRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <span className="text-sm text-gray-400">{label}</span>
      {children}
    </div>
  );
}

function Segmented({ options, active }: { options: string[]; active: string }) {
  return (
    <div className="inline-flex flex-wrap justify-end rounded-xl border border-white/10 bg-black/20 p-1">
      {options.map((option) => (
        <button key={option} className={`rounded-lg px-3 py-1.5 text-xs ${option === active ? "bg-white/[0.12] text-white" : "text-gray-500 hover:text-white"}`}>
          {option}
        </button>
      ))}
    </div>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <button className={`flex h-6 w-11 items-center rounded-full border border-white/10 p-0.5 transition-colors ${enabled ? "justify-end bg-white" : "justify-start bg-white/10"}`}>
      <span className={`h-5 w-5 rounded-full ${enabled ? "bg-black" : "bg-gray-500"}`} />
    </button>
  );
}
