"use client";

type Props = {
  onClick: () => void;
  progress?: number; // 0-100, controls water fill height
  className?: string;
};

export default function WaterGlass({
  onClick,
  progress = 0,
  className = "",
}: Props) {
  const clamped = Math.max(0, Math.min(100, progress));
  // Glass interior runs y=18..146 (inside the body). Bottom is y=146.
  // Map progress (0..100%) to water top y position (146..18).
  const interiorTop = 18;
  const interiorBottom = 146;
  const interiorHeight = interiorBottom - interiorTop;
  const waterTopY = interiorBottom - (clamped / 100) * interiorHeight;
  const waterHeight = interiorBottom - waterTopY;

  return (
    <button
      onClick={onClick}
      className={`group relative cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      aria-label="Add water"
    >
      <svg
        width="160"
        height="200"
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="glassInterior">
            <path d="M44 18 L40 142 C40 152 50 156 80 156 C110 156 120 152 120 142 L116 18 Z" />
          </clipPath>
          <linearGradient id="waterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a8cff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#65b0e4" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Glass outer body */}
        <path
          d="M44 18 L40 142 C40 152 50 156 80 156 C110 156 120 152 120 142 L116 18 Z"
          fill="var(--color-bg-card-secondary)"
          fillOpacity="0.6"
          stroke="var(--color-border)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Water fill (clipped to glass interior) */}
        <g clipPath="url(#glassInterior)">
          <rect
            x="36"
            y={waterTopY}
            width="88"
            height={waterHeight}
            fill="url(#waterGrad)"
            style={{ transition: "y 700ms cubic-bezier(0.32,0.72,0,1), height 700ms cubic-bezier(0.32,0.72,0,1)" }}
          />
          {/* Wavy water surface */}
          {clamped > 0 && (
            <path
              d={`M36 ${waterTopY} Q60 ${waterTopY - 3}, 80 ${waterTopY} T124 ${waterTopY} L124 ${waterTopY + 6} L36 ${waterTopY + 6} Z`}
              fill="#65b0e4"
              fillOpacity="0.6"
              style={{ transition: "all 700ms cubic-bezier(0.32,0.72,0,1)" }}
            >
              <animate
                attributeName="opacity"
                values="0.5;0.85;0.5"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          )}
          {/* Bubbles when water is present */}
          {clamped > 5 && (
            <>
              <circle cx="64" cy={interiorBottom - 12} r="2.2" fill="white" opacity="0.45">
                <animate attributeName="cy" values={`${interiorBottom - 12};${waterTopY + 6}`} dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0.1;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="92" cy={interiorBottom - 8} r="1.8" fill="white" opacity="0.35">
                <animate attributeName="cy" values={`${interiorBottom - 8};${waterTopY + 6}`} dur="2.9s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0.08;0" dur="2.9s" repeatCount="indefinite" />
              </circle>
              <circle cx="76" cy={interiorBottom - 18} r="1.4" fill="white" opacity="0.3">
                <animate attributeName="cy" values={`${interiorBottom - 18};${waterTopY + 6}`} dur="3.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.05;0" dur="3.3s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </g>

        {/* Glass shine */}
        <path
          d="M50 24 L46 130"
          stroke="url(#glassShine)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M108 24 L108 60"
          stroke="url(#glassShine)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Glass rim */}
        <ellipse
          cx="80"
          cy="18"
          rx="36"
          ry="4"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Ripple on hover */}
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden
      >
        <span className="w-20 h-20 rounded-full border-2 border-brand-300/60 animate-ripple" />
      </span>
    </button>
  );
}
