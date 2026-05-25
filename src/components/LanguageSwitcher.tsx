"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition, useState } from "react";
import { GlobeIcon, CheckIcon } from "@/icons";
import { routing } from "@/i18n/routing";

const localeNames: Record<string, string> = {
  ru: "Русский",
  en: "English",
  ar: "العربية",
};

const localeFlags: Record<string, string> = {
  ru: "RU",
  en: "EN",
  ar: "AR",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("profile");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-ghost flex items-center gap-2 w-full"
      >
        <GlobeIcon size={18} />
        <span className="flex-1 text-left">{t("language")}</span>
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
          <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-2xl overflow-hidden glass-card border border-[var(--color-border)] animate-scale-in">
            {routing.locales.map((loc) => {
              const isSelected = locale === loc;
              return (
                <button
                  key={loc}
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => {
                      router.replace(pathname, { locale: loc });
                      setIsOpen(false);
                    });
                  }}
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
