import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../i18n";

type ThemeSwitchProps = {
  className?: string;
  compact?: boolean;
};

export default function ThemeSwitch({ className = "", compact = false }: ThemeSwitchProps) {
  const { theme, setTheme, t } = useLanguage();
  const [flash, setFlash] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    if (!flash) return;
    const timeout = window.setTimeout(() => setFlash(false), 760);
    return () => window.clearTimeout(timeout);
  }, [flash]);

  const toggleTheme = () => {
    const nextTheme = isLight ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      setFlash(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/60 text-gray-300 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white ${
          compact ? "h-10 w-10" : "h-10 px-4 text-sm"
        } ${className}`}
        aria-label={t.settings.theme}
        aria-pressed={isLight}
      >
        {isLight ? <Sun className="h-4 w-4" strokeWidth={1.7} /> : <Moon className="h-4 w-4" strokeWidth={1.7} />}
        {!compact && <span>{isLight ? t.settings.lightTheme : t.settings.darkTheme}</span>}
      </button>

      <AnimatePresence>
        {flash && (
          <motion.div
            key="theme-sun-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-[90]"
            style={{
              background:
                "radial-gradient(circle at 78% 18%, rgba(255, 224, 125, 0.9) 0%, rgba(255, 224, 125, 0.35) 12%, rgba(255, 255, 255, 0.22) 28%, transparent 58%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
