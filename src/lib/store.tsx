"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type WaterEntry = {
  amount: number;
  timestamp: number;
};

type ScheduleSlot = {
  time: string;
  labelKey: string;
  completed: boolean;
};

type WaterData = {
  entries: WaterEntry[];
  schedule: ScheduleSlot[];
  total: number;
  goal: number;
  date: string;
};

type WeeklyStats = {
  day: string;
  total: number;
  goal: number;
};

type WaterContextType = {
  data: WaterData;
  addWater: (amount: number) => void;
  clearData: () => void;
  weeklyStats: WeeklyStats[];
  streak: number;
  getProgress: () => number;
};

const defaultSchedule: ScheduleSlot[] = [
  { time: "08:00", labelKey: "schedule.morning", completed: false },
  { time: "09:30", labelKey: "schedule.beforeMeal", completed: false },
  { time: "11:00", labelKey: "schedule.morning", completed: false },
  { time: "12:30", labelKey: "schedule.afterMeal", completed: false },
  { time: "14:00", labelKey: "schedule.afternoon", completed: false },
  { time: "15:30", labelKey: "schedule.afternoon", completed: false },
  { time: "17:00", labelKey: "schedule.evening", completed: false },
  { time: "19:00", labelKey: "schedule.evening", completed: false },
];

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function getDayLabel(index: number): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date();
  d.setDate(d.getDate() - (6 - index));
  return days[d.getDay()];
}

function getDefaultData(): WaterData {
  return {
    entries: [],
    schedule: defaultSchedule.map((s) => ({ ...s })),
    total: 0,
    goal: 2000,
    date: getTodayString(),
  };
}

const WaterContext = createContext<WaterContextType | null>(null);

export function WaterProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<WaterData>(getDefaultData);
  const [streak, setStreak] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("mahawa-water-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.date === getTodayString()) {
          setData(parsed);
        }
      } catch {}
    }

    const storedStreak = localStorage.getItem("mahawa-streak");
    if (storedStreak) {
      try {
        setStreak(parseInt(storedStreak, 10));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("mahawa-water-data", JSON.stringify(data));
    }
  }, [data, isClient]);

  const addWater = useCallback((amount: number) => {
    const today = getTodayString();
    setData((prev) => {
      if (prev.date !== today) {
        const wasGoalMet = prev.total >= prev.goal;
        const newStreak = wasGoalMet ? streak + 1 : 1;
        setStreak(newStreak);
        if (isClient) {
          localStorage.setItem("mahawa-streak", String(newStreak));
        }

        const newEntry = { amount, timestamp: Date.now() };
        const newTotal = amount;
        const newSchedule = defaultSchedule.map((s) => ({ ...s }));
        // Mark schedule slots based on rough time-of-day mapping
        const hour = new Date().getHours();
        const slotsToMark = Math.min(
          Math.floor(newTotal / 250),
          newSchedule.length
        );
        for (let i = 0; i < slotsToMark; i++) {
          newSchedule[i].completed = true;
        }

        return {
          entries: [newEntry],
          schedule: newSchedule,
          total: newTotal,
          goal: prev.goal,
          date: today,
        };
      }

      const newEntry = { amount, timestamp: Date.now() };
      const newTotal = prev.total + amount;
      const newSchedule = prev.schedule.map((s, i) => ({
        ...s,
        completed: i < Math.floor(newTotal / 250) && i < prev.schedule.length,
      }));

      return {
        ...prev,
        entries: [...prev.entries, newEntry],
        schedule: newSchedule,
        total: newTotal,
      };
    });
  }, [streak, isClient]);

  const clearData = useCallback(() => {
    setData(getDefaultData());
    setStreak(0);
    if (isClient) {
      localStorage.setItem("mahawa-water-data", JSON.stringify(getDefaultData()));
      localStorage.setItem("mahawa-streak", "0");
    }
  }, [isClient]);

  const getProgress = useCallback(() => {
    return Math.min((data.total / data.goal) * 100, 100);
  }, [data.total, data.goal]);

  const weeklyStats: WeeklyStats[] = (() => {
    const stats: WeeklyStats[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split("T")[0];
      // Try to load from localStorage for each day
      let dayTotal = 0;
      if (dateStr === data.date) {
        dayTotal = data.total;
      } else {
        try {
          const stored = localStorage.getItem("mahawa-water-data");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.date === dateStr) {
              dayTotal = parsed.total;
            }
          }
        } catch {}
      }
      stats.push({
        day: getDayLabel(i),
        total: dayTotal,
        goal: data.goal,
      });
    }
    return stats;
  })();

  return (
    <WaterContext.Provider
      value={{ data, addWater, clearData, weeklyStats, streak, getProgress }}
    >
      {children}
    </WaterContext.Provider>
  );
}

export function useWater() {
  const ctx = useContext(WaterContext);
  if (!ctx) throw new Error("useWater must be used within WaterProvider");
  return ctx;
}
