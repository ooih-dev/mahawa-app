"use client";

import { useTranslations } from "next-intl";
import { useWater } from "@/lib/store";
import ProgressRing from "@/components/ProgressRing";
import WaterGlass from "@/components/WaterGlass";
import {
  WaterDrop,
  FireIcon,
  PlusIcon,
  ClockIcon,
  CheckIcon,
  TargetIcon,
  ZapIcon,
} from "@/icons";
import { useState, useEffect } from "react";

const quickAddAmounts = [100, 250, 500];

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
    <div className="space-y-6">
      {/* Header */}
      <header
        className={`text-center transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <WaterDrop size={28} className="text-brand-500" />
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            {t("app.title")}
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {t("app.subtitle")}
        </p>
      </header>

      {/* Streak */}
      <div
        className={`glass-card rounded-3xl p-4 transition-all duration-500 delay-100 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <FireIcon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                {t("tracker.streakTitle")}
              </p>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">
                {streak}{" "}
                <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                  {t("tracker.streak")}
                </span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--color-text-muted)]">
              {t("tracker.dailyGoal")}
            </p>
            <p className="text-lg font-bold text-brand-500">
              {data.total}{" "}
              <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                {t("tracker.ml")}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Progress Card */}
      <div
        className={`glass-card rounded-3xl p-6 text-center transition-all duration-500 delay-150 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {isGoalReached && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-sm font-medium animate-scale-in">
            <CheckIcon size={16} />
            {t("tracker.goalReached")}
          </div>
        )}

        <div className="relative flex justify-center">
          <ProgressRing progress={progress} size={160} strokeWidth={10} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <TargetIcon size={24} className="text-brand-500 mb-1" />
            <span className="text-2xl font-bold text-[var(--color-text-primary)]">
              {Math.round(progress)}%
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {data.total} / {data.goal} {t("tracker.ml")}
            </span>
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] mt-5 mb-4">
          {isGoalReached
            ? t("tracker.goalReachedDesc")
            : t("tracker.tapToAdd")}
        </p>

        {/* Water Glass */}
        <div className="flex justify-center relative">
          {rippleId && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full border-2 border-brand-300 animate-ripple" />
            </div>
          )}
          <WaterGlass onClick={() => handleAddWater(250)} />
        </div>
      </div>

      {/* Quick Add */}
      <div
        className={`glass-card rounded-3xl p-4 transition-all duration-500 delay-200 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <ZapIcon size={16} className="text-brand-500" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {t("tracker.quickAdd")}
          </h3>
        </div>
        <div className="flex gap-3">
          {quickAddAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAddWater(amount)}
              className="flex-1 py-3 rounded-2xl text-sm font-medium transition-all duration-200 bg-[var(--color-accent-light)] text-brand-600 hover:bg-brand-200 dark:hover:bg-brand-800 hover:shadow-soft active:scale-95"
            >
              <PlusIcon size={14} className="inline mr-1" />
              {amount} {t("tracker.ml")}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div
        className={`glass-card rounded-3xl p-4 transition-all duration-500 delay-250 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <ClockIcon size={16} className="text-brand-500" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {t("tracker.schedule")}
          </h3>
        </div>
        <div className="space-y-1">
          {data.schedule.map((slot, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
                slot.completed
                  ? "bg-green-50 dark:bg-green-950/20"
                  : "hover:bg-[var(--color-bg-card-secondary)]"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  slot.completed
                    ? "bg-green-500 text-white shadow-sm shadow-green-500/30"
                    : "border-2 border-[var(--color-border)]"
                }`}
              >
                {slot.completed && <CheckIcon size={14} />}
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)] w-10">
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
