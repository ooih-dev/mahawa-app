"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { GlobeIcon, CheckIcon } from "@/icons";

const LOCALES = ["ru", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  ar: "العربية",
};

const localeFlags: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  ar: "AR",
};

const langLabel: Record<string, string> = {
  ru: "Язык",
  en: "Language",
  ar: "اللغة",
};

function setLocaleCookie(loc: Locale) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `mahawa-locale=${loc}; path=/; max-age=${oneYear}; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const switchTo = (loc: Locale) => {
    setLocaleCookie(loc);
    setIsOpen(false);
    startTransition(() => {
      const segments = pathname.split("/").filter(Boolean);
      // Navigate without locale prefix — middleware will redirect
      // to the correct locale path based on the cookie we just set.
      const rest = segments.slice(1).join("/");
      const newPath = rest ? `/${rest}` : `/`;
      router.push(newPath);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-ghost flex items-center gap-2 w-full"
      >
        <GlobeIcon size={18} />
        <span className="flex-1 text-left">
          {langLabel[locale] || "Language"}
        </span>
        <span className="text-sm font-medium text-brand-500 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-lg">
          {localeFlags[locale] || locale}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-[9999] w-48 max-h-60 overflow-y-auto rounded-2xl overflow-hidden glass-card border border-[var(--color-border)] animate-scale-in">
            {LOCALES.map((loc) => {
              const isSelected = locale === loc;
              return (
                <button
                  key={loc}
                  onClick={() => switchTo(loc)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                    isSelected
                      ? "bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card-secondary)]"
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {localeFlags[loc]}
                  </span>
                  <span className="flex-1 text-left">{localeNames[loc]}</span>
                  {isSelected && <CheckIcon size={16} className="text-brand-500" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
