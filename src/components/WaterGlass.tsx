"use client";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function WaterGlass({ onClick, className = "" }: Props) {
  return (
    <button
      onClick={onClick}
      className={`group relative cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      aria-label="Add water"
    >
      <svg
        width="120"
        height="160"
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glass body */}
        <path
          d="M30 15 L25 130 C25 145 35 150 60 150 C85 150 95 145 95 130 L90 15 Z"
          fill="var(--color-bg-card)"
          stroke="var(--color-border)"
          strokeWidth="2"
          className="transition-colors duration-300"
        />
        {/* Glass highlight */}
        <path
          d="M40 20 L38 120"
          stroke="var(--color-border)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Water fill */}
        <path
          d="M33 110 L32 126 C32 140 42 146 60 146 C78 146 88 140 88 126 L87 110 Z"
          fill="url(#waterGrad)"
          opacity="0.85"
          className="transition-all duration-500"
        >
          <animate
            attributeName="opacity"
            values="0.7;0.85;0.7"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        {/* Water surface */}
        <ellipse
          cx="60"
          cy="110"
          rx="27"
          ry="4"
          fill="url(#waterGrad)"
          opacity="0.9"
        />
        {/* Bubbles */}
        <circle cx="50" cy="125" r="2" fill="white" opacity="0.3">
          <animate
            attributeName="cy"
            values="125;115;105"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="65" cy="130" r="1.5" fill="white" opacity="0.25">
          <animate
            attributeName="cy"
            values="130;118;108"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.25;0.1;0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="55" cy="135" r="1" fill="white" opacity="0.2">
          <animate
            attributeName="cy"
            values="135;122;112"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.05;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a8cff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#65b0e4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Ripple effect on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full border-2 border-brand-300 animate-ripple" />
      </div>
    </button>
  );
}
