"use client";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { WaterProvider } from "@/lib/store";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export default function Providers({ children, locale, messages }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="mahawa-theme"
        >
          <WaterProvider>
            <div className="min-h-screen">{children}</div>
          </WaterProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="mahawa-theme"
      >
        <WaterProvider>
          <div className="min-h-screen animate-fade-in">{children}</div>
        </WaterProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
