import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

const SUPPORTED = routing.locales as readonly string[];

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale reads X-NEXT-INTL-LOCALE header set by middleware
  let locale: string = routing.defaultLocale;

  try {
    const resolved = await requestLocale;
    if (resolved && (SUPPORTED as readonly string[]).includes(resolved)) {
      locale = resolved;
    }
  } catch {}

  // Cookie overrides when user explicitly chose a locale
  try {
    const fromCookie = cookies().get("mahawa-locale")?.value;
    if (
      fromCookie &&
      (SUPPORTED as readonly string[]).includes(fromCookie.toLowerCase())
    ) {
      locale = fromCookie.toLowerCase();
    }
  } catch {}

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Asia/Dubai",
  };
});
