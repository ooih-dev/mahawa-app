"use client";

// Re-export from the canonical store (store.tsx is always tracked in git).
// This alias exists so imports from @/lib/water-store continue to work
// regardless of whether the bundler resolves ./store to .ts or .tsx.
export {
  useWater,
  WaterProvider,
} from "./store";
