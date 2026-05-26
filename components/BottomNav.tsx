"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { WaterDrop, StatsIcon, ShopIcon, ProfileIcon } from "@/icons";

const navItems = [
  { href: "/", labelKey: "nav.tracker", Icon: WaterDrop },
  { href: "/stats", labelKey: "nav.stats", Icon: StatsIcon },
  { href: "/shop", labelKey: "nav.shop", Icon: ShopIcon },
  { href: "/profile", labelKey: "nav.profile", Icon: ProfileIcon },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2">
      <div
        className="mx-auto max-w-lg rounded-3xl px-2 py-1 backdrop-blur-xl"
        style={{
          backgroundColor: "var(--color-nav-bg)",
          boxShadow:
            "0 -1px 3px var(--color-card-shadow), 0 -8px 25px var(--color-card-shadow)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="flex items-center justify-around">
          {navItems.map(({ href, labelKey, Icon }) => {
            const isActive = pathname === href;
            return (
              <button
                key={href}
                onClick={() => router.push(href)}
                className="relative flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-200"
              >
                <div
                  className={`rounded-xl p-2 transition-all duration-200 ${
                    isActive
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-brand-500"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {t(labelKey as "nav.tracker")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
