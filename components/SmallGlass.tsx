"use client";

type Props = {
  filled: boolean;
  onClick: () => void;
  index: number;
};

export default function SmallGlass({ filled, onClick, index }: Props) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
      aria-label={`Glass ${index + 1} ${filled ? "filled" : "empty"}`}
    >
      <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id={`smallInterior-${index}`}>
            <path d="M7 4 L6 33 C6 36 9 38 16 38 C23 38 26 36 26 33 L25 4 Z" />
          </clipPath>
          <linearGradient id={`smallGrad-${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a8cff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#65b0e4" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Outline */}
        <path
          d="M7 4 L6 33 C6 36 9 38 16 38 C23 38 26 36 26 33 L25 4 Z"
          fill="var(--color-bg-card-secondary)"
          fillOpacity="0.5"
          stroke="var(--color-border)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Fill */}
        <g clipPath={`url(#smallInterior-${index})`}>
          <rect
            x="3"
            y={filled ? 8 : 38}
            width="26"
            height={filled ? 30 : 0}
            fill={`url(#smallGrad-${index})`}
            style={{ transition: "y 500ms cubic-bezier(0.32,0.72,0,1), height 500ms cubic-bezier(0.32,0.72,0,1)" }}
          />
        </g>

        {/* Rim */}
        <ellipse cx="16" cy="4" rx="9" ry="1.5" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
