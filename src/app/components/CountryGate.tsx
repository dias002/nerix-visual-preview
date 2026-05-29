import { Globe2 } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";

export default function CountryGate() {
  const { t, countries, country, setCountry, countryConfirmed } = useLanguage();

  if (countryConfirmed) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0A0A0A]/95 p-5 shadow-2xl"
      >
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300">
            <Globe2 className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">{t.settings.chooseCountry}</h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">{t.settings.countryHint}</p>
          </div>
        </div>

        <div className="space-y-2">
          {countries.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => setCountry(option.code)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                country === option.code
                  ? "border-white/25 bg-white text-black"
                  : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:text-white"
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs opacity-70">
                {option.currency} · {option.symbol}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
