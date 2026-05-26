"use client";

import { useTranslations } from "next-intl";
import { useWater } from "@/lib/water-store";
import WaterGlass from "@/components/WaterGlass";
import {
  WaterDrop,
  FireIcon,
  PlusIcon,
  ClockIcon,
  CheckIcon,
  ZapIcon,
} from "@/icons";
import { useState, useEffect } from "react";

const quickAddAmounts = [100, 250, 500];
const GLASS_SIZE = 250;

export default function TrackerPage() {
  const t = useTranslations();
  const { data, addWater, getProgress, streak } = useWater();
  const progress = getProgress();
  const [animateIn, setAnimateIn] = useState(false);
  const [rippleId, setRippleId] = useState<number | null>(null);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleAddWater = (amount: number) => {
    addWater(amount);
    setRippleId(Date.now());
    setTimeout(() => setRippleId(null), 600);
  };

  const isGoalReached = data.total >= data.goal;

  return (
    <div className="space-y-5">
      <header
        className={`text-center transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mahawa-icon.svg"
            alt="Ma Hawa"
            className="h-10 w-10"
          />
          <h1 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
            {t("app.title")}
          </h1>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">
          {t("app.subtitle")}
        </p>
      </header>

      <div
        className={`glass-card rounded-3xl p-6 text-center transition-all duration-500 delay-100 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {isGoalReached && (
          <div className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-xs font-medium animate-scale-in">
            <CheckIcon size={14} />
            {t("tracker.goalReached")}
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="relative">
            {rippleId && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-28 h-28 rounded-full border-2 border-brand-300/70 animate-ripple" />
              </div>
            )}
            <WaterGlass
              progress={progress}
              onClick={() => handleAddWater(GLASS_SIZE)}
            />
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-[var(--color-text-primary)] tabular-nums">
              {data.total}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              / {data.goal} {t("tracker.ml")}
            </span>
          </div>

          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            {Math.round(progress)}% · {t("tracker.tapToAdd")}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-[var(--color-bg-card-secondary)] px-3 py-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-sm shadow-orange-500/20 shrink-0">
              <FireIcon size={16} className="text-white" />
            </div>
            <div className="text-left leading-tight min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                {t("tracker.streakTitle")}
              </p>
              <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                {streak} <span className="text-xs font-normal text-[var(--color-text-secondary)]">{t("tracker.streak")}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-[var(--color-bg-card-secondary)] px-3 py-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-sm shadow-brand-500/20 shrink-0">
              <WaterDrop size={16} className="text-white" />
            </div>
            <div className="text-left leading-tight min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                {t("tracker.dailyGoal")}
              </p>
              <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                {data.goal} <span className="text-xs font-normal text-[var(--color-text-secondary)]">{t("tracker.ml")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`glass-card rounded-3xl p-4 transition-all duration-500 delay-150 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <ZapIcon size={14} className="text-brand-500" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {t("tracker.quickAdd")}
          </h3>
        </div>
        <div className="flex gap-2">
          {quickAddAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAddWater(amount)}
              className="flex-1 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 bg-[var(--color-accent-light)] text-brand-600 hover:bg-brand-200 dark:hover:bg-brand-800 hover:shadow-soft active:scale-95"
            >
              <PlusIcon size={13} className="inline mr-1" />
              {amount} {t("tracker.ml")}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`glass-card rounded-3xl p-4 transition-all duration-500 delay-200 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <ClockIcon size={14} className="text-brand-500" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {t("tracker.schedule")}
          </h3>
        </div>
        <div className="space-y-1">
          {data.schedule.map((slot, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200 ${
                slot.completed
                  ? "bg-green-50 dark:bg-green-950/20"
                  : "hover:bg-[var(--color-bg-card-secondary)]"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  slot.completed
                    ? "bg-green-500 text-white shadow-sm shadow-green-500/30"
                    : "border-2 border-[var(--color-border)]"
                }`}
              >
                {slot.completed && <CheckIcon size={12} />}
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)] w-10 tabular-nums">
                {slot.time}
              </span>
              <span
                className={`text-sm flex-1 ${
                  slot.completed
                    ? "text-green-600 dark:text-green-400 line-through opacity-70"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {t("tracker." + (slot.completed ? "completed" : "expected"))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
