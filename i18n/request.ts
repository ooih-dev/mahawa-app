import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

const SUPPORTED = routing.locales as readonly string[];

export default getRequestConfig(async ({ locale: urlLocale }) => {
  // urlLocale comes from X-NEXT-INTL-LOCALE header set by middleware
  let locale: string =
    urlLocale && (SUPPORTED as readonly string[]).includes(urlLocale)
      ? urlLocale
      : routing.defaultLocale;

  try {
    // Cookie overrides URL locale when set
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
