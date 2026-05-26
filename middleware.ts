import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["ru", "en", "ar"];
const DEFAULT_LOCALE = "ru";

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get("mahawa-locale")?.value;
  if (cookie && LOCALES.includes(cookie)) return cookie;
  const accept = request.headers.get("accept-language") || "";
  for (const raw of accept.split(",")) {
    const tag = raw.split(";")[0].trim().split("-")[0].toLowerCase();
    if (LOCALES.includes(tag)) return tag;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip _next and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (LOCALES.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Redirect to localized path
  const locale = getLocale(request);
  const newPath = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon|apple-touch|android-chrome|mahawa-icon).*)"],
};
