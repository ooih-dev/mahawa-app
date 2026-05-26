"use client";

import { useTranslations } from "next-intl";
import { ShopIcon, ExternalLink, HeartIcon } from "@/icons";
import { useState, useEffect } from "react";

type Product = {
  name: string;
  handle: string;
  price: string;
  image: string;
  tag?: string;
};

const products: Product[] = [
  {
    name: "Still Water 330ML Aluminium Bottle — 24 Pack",
    handle: "ma-hawa-still-water-330ml-aluminium-bottles-24-bottles-pack",
    price: "47.00",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/WhatsAppImage2026-01-14at3.06.12PM.jpg?v=1768389606&width=600",
    tag: "Still",
  },
  {
    name: "Sparkling Water 330ML Aluminium Bottle — 24 Pack",
    handle: "ma-hawa-sparkling-water-330ml-aluminium-bottles-24-bottles-pack",
    price: "50.00",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/WhatsAppImage2026-01-14at3.05.57PM_1.jpg?v=1768389068&width=600",
    tag: "Sparkling",
  },
  {
    name: "H2 — Ultra-Pure Hydrogen-Activated 450ml — 24 Pack",
    handle:
      "ma-hawa-h2-ultra-pure-hydrogen-activated-water-450ml-aluminium-bottle-24-cans-packk",
    price: "240.00",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/WhatsAppImage2026-01-09at2.11.46PM.jpg?v=1768223007&width=600",
    tag: "H2",
  },
  {
    name: "Still Water 330ml Can — 24 Pack",
    handle: "ma-hawa-still-water-330ml-can-24-cans-pack",
    price: "29.60",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/WhatsAppImage2025-11-17at3.17.23PM.jpg?v=1763378981&width=600",
    tag: "Cans",
  },
  {
    name: "Sparkling Water 330ml Can — 24 Pack",
    handle: "ma-hawa-sparkling-water-330ml-can-24-cans-pack",
    price: "32.00",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/WhatsApp_Image_2025-11-17_at_3.17.35_PM_1.jpg?v=1763378673&width=600",
    tag: "Cans",
  },
  {
    name: "Soft Facial Tissues (2 Ply × 150 Sheets) — Pack of 5",
    handle: "ma-hawa-soft-facial-tissues-2-ply-150-sheets-pack-of-5",
    price: "15.00",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/ChatGPTImageMay26_2025_03_23_54PMcopy.jpg?v=1748259420&width=600",
    tag: "Tissues",
  },
  {
    name: "Premium Sparkling Water 750ml — 6 Pack",
    handle: "ma-hawa-premium-sparkling-water-750ml-6-pack",
    price: "33.60",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/Sparkling_750.MAIN2.jpg?v=1755581856&width=600",
    tag: "Premium",
  },
  {
    name: "Premium Sparkling Water 330ml — 12 Pack",
    handle: "ma-hawa-premium-sparkling-water-330ml-12-pack",
    price: "38.40",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/f_bb88d6a0-4bc8-4dd8-89d2-0487811f8ee5.jpg?v=1736508140&width=600",
    tag: "Premium",
  },
  {
    name: "Premium Sparkling Water 250ml — 12 Pack",
    handle: "ma-hawa-premium-sparkling-water-250ml-12-pack",
    price: "33.60",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/f.jpg?v=1736508109&width=600",
    tag: "Premium",
  },
  {
    name: "Premium Still Water 750ml — 6 Pack",
    handle: "ma-hawa-premium-still-water-750ml-6-pack",
    price: "28.80",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/f_9ec1ec7f-05de-4efe-b73a-90ebad57eed0.jpg?v=1736508402&width=600",
    tag: "Premium",
  },
  {
    name: "Premium Still Water 330ml — 12 Pack",
    handle: "ma-hawa-premium-still-water-330ml-12-pack",
    price: "28.80",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/Botlle330sprklcopy2.jpg?v=1736508294&width=600",
    tag: "Premium",
  },
  {
    name: "Premium Still Water 250ml — 12 Pack",
    handle: "ma-hawa-premium-still-water-250ml-12-pack",
    price: "27.00",
    image:
      "https://cdn.shopify.com/s/files/1/0912/1700/2775/files/STILL_250.MAIN_3af7240c-34b6-4aa3-baa9-eebb40c4597a.jpg?v=1755583051&width=600",
    tag: "Premium",
  },
];

const SHOP_BASE = "https://shop.mahawa.ae/products/";

export default function ShopPage() {
  const t = useTranslations();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="space-y-5">
      <header
        className={`transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <ShopIcon size={20} className="text-brand-500" />
          <h1 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
            {t("shop.title")}
          </h1>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">
          {t("shop.subtitle")}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product, i) => (
          <a
            key={product.handle}
            href={`${SHOP_BASE}${product.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-0.5 ${
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${80 + i * 50}ms` }}
          >
            <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-card-secondary)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.onerror = null;
                  el.style.display = 'none';
                  const parent = el.parentElement;
                  if (parent && !parent.querySelector('.img-fallback')) {
                    const fb = document.createElement('div');
                    fb.className = 'img-fallback absolute inset-0 flex flex-col items-center justify-center gap-1 text-[var(--color-text-muted)]';
                    fb.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span class="text-[10px]">No image</span>';
                    parent.appendChild(fb);
                  }
                }}
              />
              {product.tag && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/85 backdrop-blur text-brand-700 shadow-sm">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="p-3 space-y-1.5">
              <h3 className="text-[12px] font-medium text-[var(--color-text-primary)] leading-snug line-clamp-2 min-h-[2.4em]">
                {product.name}
              </h3>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                  AED {product.price}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-brand-600 font-medium">
                  {t("shop.order")}
                  <ExternalLink size={11} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div
        className={`text-center transition-all duration-500 delay-300 ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href="https://shop.mahawa.ae/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-sm"
        >
          <HeartIcon size={16} />
          {t("shop.learnMore")}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
