"use client";

import * as React from "react";

// Stub I18nProvider used by any legacy code; real i18n is provided by next-intl.
export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default I18nProvider;
