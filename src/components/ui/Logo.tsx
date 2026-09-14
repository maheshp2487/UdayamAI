import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  tagline?: string;
  contained?: boolean;
  className?: string;
}

export function Logo({
  size = 'md',
  showTagline = true,
  tagline = 'Turn Raw Ideas into Bank-Approved Business',
  contained = true,
  className = '',
}: LogoProps) {
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const aiBadgeSizes = {
    sm: 'text-[10px] px-1 py-0.2',
    md: 'text-xs px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
  };

  const containerPadding = {
    sm: 'px-2 py-1',
    md: 'px-2.5 py-1.5',
    lg: 'px-3.5 py-2',
  };

  return (
    <div
      className={`inline-flex items-center gap-2.5 transition-all duration-200 ${
        contained
          ? `${containerPadding[size]} rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border border-amber-200/90 shadow-2xs hover:border-amber-400 hover:shadow-xs`
          : ''
      } ${className}`}
    >
      {/* Contained Emblem: Sunrise (Udayam) + AI Spark */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-xl overflow-hidden shadow-xs ring-1 ring-amber-300/60`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Rich Radial/Linear Amber Gradient Background */}
          <defs>
            <linearGradient id="udayamBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="45%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="sunGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
            <linearGradient id="aiSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>

          {/* Shield Base */}
          <rect width="36" height="36" rx="9" fill="url(#udayamBgGrad)" />

          {/* Subtle geometric grid line */}
          <circle cx="18" cy="20" r="11" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Sunrise Rays (Udayam / Rising Dawn) */}
          <path d="M18 5 L18 8.5" stroke="url(#sunGoldGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 8 L13 11" stroke="url(#sunGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M25 8 L23 11" stroke="url(#sunGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 14 L9.5 15.5" stroke="url(#sunGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M30 14 L26.5 15.5" stroke="url(#sunGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />

          {/* Dynamic 'U' Curve (Upward Enterprise Lift) */}
          <path
            d="M10.5 14.5 C10.5 24.5, 25.5 24.5, 25.5 14.5"
            stroke="url(#sunGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Rising Sun Core Disc */}
          <path
            d="M13 20 C13 16.5, 23 16.5, 23 20 Z"
            fill="url(#sunGoldGrad)"
            opacity="0.95"
          />

          {/* AI Spark Star at Sunrise Center */}
          <path
            d="M18 10.5 L19.2 13.2 L22 14.2 L19.2 15.2 L18 18 L16.8 15.2 L14 14.2 L16.8 13.2 Z"
            fill="url(#aiSparkGrad)"
          />
        </svg>
      </div>

      {/* Contained Brand Text & Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center space-x-1.5 leading-none">
          <span className={`font-extrabold ${textSizes[size]} tracking-tight text-slate-900`}>
            Udayam
          </span>
          <span
            className={`font-black font-mono ${aiBadgeSizes[size]} rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-2xs tracking-wider`}
          >
            AI
          </span>
        </div>
        {showTagline && (
          <span className="text-[10.5px] text-amber-900/80 font-semibold tracking-normal mt-0.5 line-clamp-1">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
}
