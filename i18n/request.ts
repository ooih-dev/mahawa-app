import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

const SUPPORTED = routing.locales as readonly string[];

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale comes from the URL [locale] segment via
  // X-NEXT-INTL-LOCALE header — this is the PRIMARY source
  // for manual language switching.
  let locale: string = routing.defaultLocale;

  try {
    const resolved = await requestLocale;
    if (resolved && (SUPPORTED as readonly string[]).includes(resolved)) {
      locale = resolved;
    }
  } catch {}

  // Cookie is a FALLBACK only — when no locale in URL yet
  // (e.g. first visit to / before middleware redirect)
  if (locale === routing.defaultLocale) {
    try {
      const fromCookie = cookies().get("mahawa-locale")?.value;
      if (
        fromCookie &&
        (SUPPORTED as readonly string[]).includes(fromCookie.toLowerCase())
      ) {
        locale = fromCookie.toLowerCase();
      }
    } catch {}
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Asia/Dubai",
  };
});
