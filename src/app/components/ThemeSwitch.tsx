import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../i18n";

type ThemeSwitchProps = {
  className?: string;
  compact?: boolean;
};

export default function ThemeSwitch({ className = "", compact = false }: ThemeSwitchProps) {
  const { theme, setTheme, t } = useLanguage();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/60 text-gray-300 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white ${
        compact ? "h-10 w-10" : "h-10 px-4 text-sm"
      } ${className}`}
      aria-label={t.settings.theme}
      aria-pressed={isLight}
    >
      {isLight ? <Sun className="h-4 w-4" strokeWidth={1.7} /> : <Moon className="h-4 w-4" strokeWidth={1.7} />}
      {!compact && <span>{isLight ? t.settings.lightTheme : t.settings.darkTheme}</span>}
    </button>
  );
}
