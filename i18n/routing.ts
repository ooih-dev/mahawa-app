export const routing = {
  locales: ["ru", "en", "ar"] as const,
  defaultLocale: "ru" as const,
};

export type Locale = (typeof routing.locales)[number];
