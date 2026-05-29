import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useLanguage, type ThemeMode } from "../i18n";

type ThemeSwitchProps = {
  className?: string;
  compact?: boolean;
};

type ThemeTransition = {
  id: number;
  nextTheme: ThemeMode;
  x: number;
  y: number;
  radius: number;
};

export default function ThemeSwitch({ className = "", compact = false }: ThemeSwitchProps) {
  const { theme, setTheme, t } = useLanguage();
  const [transition, setTransition] = useState<ThemeTransition | null>(null);
  const isLight = theme === "light";

  useEffect(() => {
    if (!transition) return;
    const timeout = window.setTimeout(() => setTransition(null), 1100);
    return () => window.clearTimeout(timeout);
  }, [transition]);

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isLight ? "dark" : "light";
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const x = event.clientX || viewportWidth * 0.82;
    const y = event.clientY || viewportHeight * 0.1;
    const radius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

    setTransition({
      id: Date.now(),
      nextTheme,
      x,
      y,
      radius,
    });
    setTheme(nextTheme);
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
        {transition && <ThemeTransitionOverlay key={transition.id} transition={transition} />}
      </AnimatePresence>
    </>
  );
}

function ThemeTransitionOverlay({ transition }: { transition: ThemeTransition }) {
  const toLight = transition.nextTheme === "light";
  const background = toLight
    ? "linear-gradient(145deg, #dfeeff 0%, #f6fbff 52%, #ffffff 100%)"
    : "radial-gradient(circle at 50% 30%, #161616 0%, #050505 48%, #000000 100%)";
  const shadow = toLight
    ? "0 0 90px rgba(255, 214, 98, 0.82), 0 0 220px rgba(255, 234, 170, 0.52)"
    : "0 0 80px rgba(210, 222, 238, 0.28), 0 0 180px rgba(120, 140, 170, 0.18)";
  const celestialPosition = toLight
    ? { left: "78vw", top: "18vh" }
    : { left: "76vw", top: "20vh" };

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      initial={{ opacity: 1, clipPath: `circle(0px at ${transition.x}px ${transition.y}px)` }}
      animate={{ opacity: [1, 1, 0], clipPath: `circle(${transition.radius + 180}px at ${transition.x}px ${transition.y}px)` }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, times: [0, 0.78, 1], ease: [0.2, 0.8, 0.2, 1] }}
      style={{ background }}
    >
      <motion.div
        className="absolute rounded-full"
        initial={{
          left: transition.x,
          top: transition.y,
          opacity: 0,
          scale: 0.22,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          ...celestialPosition,
          opacity: [0, 1, 1, 0],
          scale: [0.22, 1.08, 1, 0.9],
          x: "-50%",
          y: "-50%",
        }}
        transition={{ duration: 1, times: [0, 0.34, 0.74, 1], ease: "easeOut" }}
        style={{
          width: toLight ? 150 : 128,
          height: toLight ? 150 : 128,
          background: toLight
            ? "radial-gradient(circle at 38% 34%, #fff6c8 0%, #ffd75f 42%, #f8b83f 72%, rgba(248, 184, 63, 0) 100%)"
            : "radial-gradient(circle at 36% 34%, #f7fbff 0%, #c9d3e1 42%, #7f8a9a 78%, rgba(127, 138, 154, 0) 100%)",
          boxShadow: shadow,
        }}
      >
        {!toLight && (
          <div
            className="absolute rounded-full"
            style={{
              inset: "7% -4% 0 32%",
              background: "rgba(0, 0, 0, 0.78)",
              filter: "blur(1px)",
            }}
          />
        )}
      </motion.div>

      {toLight ? <SunRays /> : <NightParticles />}
    </motion.div>
  );
}

function SunRays() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.7, 0] }}
      transition={{ duration: 1, times: [0, 0.45, 1], ease: "easeOut" }}
      style={{
        background:
          "radial-gradient(circle at 78% 18%, rgba(255, 238, 175, 0.7) 0%, rgba(255, 238, 175, 0.2) 18%, transparent 46%), linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.34) 46%, transparent 62%)",
      }}
    />
  );
}

function NightParticles() {
  const particles = Array.from({ length: 22 }, (_, index) => ({
    id: index,
    left: `${12 + ((index * 37) % 78)}vw`,
    top: `${8 + ((index * 29) % 72)}vh`,
    size: 1 + (index % 3),
    delay: index * 0.018,
  }));

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white"
          initial={{ opacity: 0, y: 8, scale: 0.4 }}
          animate={{ opacity: [0, 0.85, 0], y: [-8, 0, -16], scale: [0.4, 1, 0.7] }}
          transition={{ duration: 0.95, delay: particle.delay, ease: "easeOut" }}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 10px rgba(255,255,255,0.9)",
          }}
        />
      ))}
    </div>
  );
}
