import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { routing } from "./routing";

const SUPPORTED = routing.locales as readonly string[];

function pickLocale(input?: string | null): string {
  if (!input) return routing.defaultLocale;
  const raw = input.toLowerCase();
  if ((SUPPORTED as readonly string[]).includes(raw)) return raw;
  const head = raw.split(",")[0]?.split("-")[0];
  if (head && (SUPPORTED as readonly string[]).includes(head)) return head;
  return routing.defaultLocale;
}

export default getRequestConfig(async ({ locale: urlLocale }) => {
  // Start with URL locale (from [locale] segment), fall back to default
  let locale: string = pickLocale(urlLocale);

  try {
    // Cookie overrides URL locale when set
    const fromCookie = cookies().get("mahawa-locale")?.value;
    if (fromCookie && (SUPPORTED as readonly string[]).includes(fromCookie.toLowerCase())) {
      locale = fromCookie.toLowerCase();
    }
  } catch {}

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Asia/Dubai",
  };
});
