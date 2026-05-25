"use client";

import { useTranslations } from "next-intl";
import { ShopIcon, ExternalLink, CheckIcon, HeartIcon, ZapIcon, Droplets } from "@/icons";
import { useState, useEffect } from "react";

const products = [
  {
    name: "Ma Hawa Premium",
    subtitle: "Бутилированная вода премиум-класса",
    description: "Чистейшая природная вода, обогащенная минералами для максимальной гидратации",
    features: ["pH 7.4", "0.5L / 1L / 1.5L", "Стеклянная бутылка"],
    gradient: "from-brand-500 to-ocean-400",
    image: "premium",
    price: "2.50",
  },
  {
    name: "Ma Hawa Sparkling",
    subtitle: "Газированная вода",
    description: "Освежающая газированная вода с натуральными минералами",
    features: ["Натуральная газация", "Без сахара", "0.75L"],
    gradient: "from-cyan-400 to-blue-500",
    image: "sparkling",
    price: "3.00",
  },
];

export default function ShopPage() {
  const t = useTranslations();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header
        className={`transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <ShopIcon size={24} className="text-brand-500" />
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            {t("shop.title")}
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {t("shop.subtitle")}
        </p>
      </header>

      {/* Products */}
      <div className="space-y-4">
        {products.map((product, i) => (
          <div
            key={i}
            className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 ${
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${100 + i * 100}ms` }}
          >
            {/* Product Image Placeholder */}
            <div
              className={`h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white" />
                <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-white" />
                <div className="absolute top-12 right-12 w-16 h-16 rounded-full bg-white" />
              </div>
              <div className="relative flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Droplets size={48} className="text-white" />
                </div>
                <p className="text-white text-lg font-bold mt-2 drop-shadow-lg">
                  {product.name}
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {product.name}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {product.subtitle}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-1.5">
                {product.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <CheckIcon size={12} className="text-green-500 flex-shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-lg font-bold text-[var(--color-text-primary)]">
                    €{product.price}
                  </span>
                </div>
                <a
                  href="https://mahawa.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  {t("shop.order")}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learn More */}
      <div
        className={`text-center transition-all duration-500 delay-300 ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href="https://mahawa.ae"
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
