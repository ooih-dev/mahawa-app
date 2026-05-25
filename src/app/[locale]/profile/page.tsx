"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  ProfileIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
  LockIcon,
  ShieldIcon,
  ChevronRight,
  ShareIcon,
  StarIcon,
  InfoIcon,
  TrashIcon,
} from "@/icons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useWater } from "@/lib/store";

export default function ProfilePage() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { clearData } = useWater();
  const [animateIn, setAnimateIn] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAnimateIn(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const settingsItems = [
    {
      icon: <BellIcon size={18} />,
      label: t("profile.notifications"),
      desc: t("profile.notificationsDesc"),
      right: (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="sr-only peer"
          />
          <div className="w-9 h-5 rounded-full peer peer-checked:bg-brand-500 bg-[var(--color-border)] transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:duration-200 peer-checked:after:translate-x-4" />
        </label>
      ),
    },
    {
      icon: <LockIcon size={18} />,
      label: t("profile.privacy"),
      desc: t("profile.privacyDesc"),
      right: <ChevronRight size={16} className="text-[var(--color-text-muted)]" />,
    },
    {
      icon: <ShieldIcon size={18} />,
      label: t("profile.security"),
      desc: t("profile.securityDesc"),
      right: <ChevronRight size={16} className="text-[var(--color-text-muted)]" />,
    },
  ];

  const appItems = [
    {
      icon: <StarIcon size={18} />,
      label: t("profile.rateUs"),
      right: <ChevronRight size={16} className="text-[var(--color-text-muted)]" />,
    },
    {
      icon: <ShareIcon size={18} />,
      label: t("profile.share"),
      right: <ChevronRight size={16} className="text-[var(--color-text-muted)]" />,
    },
    {
      icon: <InfoIcon size={18} />,
      label: t("profile.version"),
      right: (
        <span className="text-xs text-[var(--color-text-muted)]">1.0.0</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header
        className={`transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <ProfileIcon size={24} className="text-brand-500" />
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            {t("profile.title")}
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {t("profile.settings")}
        </p>
      </header>

      {/* Appearance */}
      <div
        className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 delay-100 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="px-5 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            {t("profile.appearance")}
          </h3>

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-3 py-2">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-bg-card-secondary)] flex items-center justify-center text-[var(--color-text-secondary)]">
              {isDark ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {isDark ? t("profile.darkMode") : t("profile.lightMode")}
              </p>
            </div>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isDark ? "bg-brand-500" : "bg-[var(--color-border)]"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 flex items-center justify-center ${
                  isDark ? "left-7" : "left-0.5"
                }`}
              >
                {isDark ? (
                  <MoonIcon size={12} className="text-brand-500" />
                ) : (
                  <SunIcon size={12} className="text-amber-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Language */}
      <div
        className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 delay-150 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="px-5 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            {t("profile.language")}
          </h3>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Settings */}
      <div
        className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 delay-200 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="px-5 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
            {t("profile.settings")}
          </h3>
          {settingsItems.map((item, i) => (
            <SettingsRow
              key={i}
              icon={item.icon}
              label={item.label}
              desc={item.desc}
              right={item.right}
            />
          ))}
        </div>
      </div>

      {/* App Info */}
      <div
        className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 delay-250 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="px-5 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
            {t("profile.about")}
          </h3>
          {appItems.map((item, i) => (
            <SettingsRow
              key={i}
              icon={item.icon}
              label={item.label}
              right={item.right}
            />
          ))}
        </div>
      </div>

      {/* Clear Data */}
      <div
        className={`transition-all duration-500 delay-300 ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {!showClearConfirm ? (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
          >
            <TrashIcon size={16} />
            {t("profile.clearData")}
          </button>
        ) : (
          <div className="glass-card rounded-3xl p-4">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3 text-center">
              {t("profile.clearDataConfirm")}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-2xl text-sm font-medium bg-[var(--color-bg-card-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-all duration-200"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={() => {
                  clearData();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-2xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
              >
                {t("common.confirm")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}

function SettingsRow({
  icon,
  label,
  desc,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[var(--color-border)] last:border-0">
      <div className="w-9 h-9 rounded-xl bg-[var(--color-bg-card-secondary)] flex items-center justify-center text-[var(--color-text-secondary)]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </p>
        {desc && (
          <p className="text-xs text-[var(--color-text-muted)] truncate">
            {desc}
          </p>
        )}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}
