"use client";

import { useTranslations } from "next-intl";
import { useWater } from "@/lib/store";
import { StatsIcon, ArrowUp, TargetIcon, WaterDrop, HeartIcon } from "@/icons";
import { useState, useEffect } from "react";

export default function StatsPage() {
  const t = useTranslations();
  const { data, weeklyStats } = useWater();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const average =
    weeklyStats.reduce((acc, s) => acc + s.total, 0) / weeklyStats.length;

  const bestDay = weeklyStats.reduce(
    (best, s) => (s.total > best.total ? s : best),
    weeklyStats[0]
  );

  const maxVal = Math.max(...weeklyStats.map((s) => s.goal), 2000);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header
        className={`transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <StatsIcon size={24} className="text-brand-500" />
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            {t("stats.title")}
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {t("stats.thisWeek")}
        </p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={<WaterDrop size={18} />}
          label={t("stats.average")}
          value={`${Math.round(average)}`}
          unit={t("stats.ml")}
          delay={100}
          animateIn={animateIn}
        />
        <StatCard
          icon={<TargetIcon size={18} />}
          label={t("stats.total")}
          value={`${Math.round(average * 7)}`}
          unit={t("stats.ml")}
          delay={150}
          animateIn={animateIn}
        />
        <StatCard
          icon={<HeartIcon size={18} />}
          label={t("stats.bestDay")}
          value={`${Math.round(bestDay?.total || 0)}`}
          unit={t("tracker.ml")}
          delay={200}
          animateIn={animateIn}
        />
      </div>

      {/* Weekly Chart */}
      <div
        className={`glass-card rounded-3xl p-5 transition-all duration-500 delay-200 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
          {t("stats.weekly")}
        </h3>

        <div className="flex items-end justify-between gap-2 h-40">
          {weeklyStats.map((stat, i) => {
            const height = stat.total > 0 ? (stat.total / maxVal) * 100 : 0;
            const isToday = i === 6;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-[var(--color-text-muted)]">
                  {stat.total > 0 ? Math.round(stat.total / 100) / 10 + "L" : ""}
                </span>
                <div className="w-full flex justify-center" style={{ height: "100%" }}>
                  <div
                    className={`w-full max-w-[32px] rounded-xl transition-all duration-700 ease-out self-end ${
                      isToday
                        ? "bg-gradient-to-t from-brand-500 to-brand-300 shadow-sm shadow-brand-500/20"
                        : stat.total >= stat.goal
                        ? "bg-gradient-to-t from-green-500 to-green-300"
                        : stat.total > 0
                        ? "bg-gradient-to-t from-brand-400 to-brand-200"
                        : "bg-[var(--color-progress-track)]"
                    }`}
                    style={{
                      height: `${Math.max(height, 4)}%`,
                      alignSelf: "flex-end",
                    }}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isToday
                      ? "text-brand-500"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {stat.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress to Goal */}
      <div
        className={`glass-card rounded-3xl p-5 transition-all duration-500 delay-250 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TargetIcon size={16} className="text-brand-500" />
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              {t("stats.completion")}
            </h3>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            {Math.round((data.total / data.goal) * 100)}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-[var(--color-progress-track)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-700 ease-out"
            style={{ width: `${Math.min((data.total / data.goal) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  unit,
  delay,
  animateIn,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  delay: number;
  animateIn: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-2xl p-4 text-center transition-all duration-500 ${
        animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 mb-2">
        {icon}
      </div>
      <p className="text-lg font-bold text-[var(--color-text-primary)]">
        {value}
      </p>
      <p className="text-[10px] text-[var(--color-text-muted)]">{unit}</p>
      <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
        {label}
      </p>
    </div>
  );
}
