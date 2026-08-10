import React from 'react';

// Icon emblem: Calla Lily + Letter P + Branch + Starburst + Framing Arc with Double Side Dots
export const PetalorahLogoIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Deep Royal Navy Blue for main Serif P */}
        <linearGradient id="navyP" x1="60" y1="30" x2="220" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#224785" />
          <stop offset="50%" stopColor="#143063" />
          <stop offset="100%" stopColor="#0A1D3F" />
        </linearGradient>

        {/* Petal Blooming Calla Lily Gradient */}
        <linearGradient id="callaLily" x1="120" y1="40" x2="220" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E2EEFF" />
          <stop offset="60%" stopColor="#80B0F8" />
          <stop offset="90%" stopColor="#2A59A8" />
          <stop offset="100%" stopColor="#143063" />
        </linearGradient>

        {/* Branch & Leaves Gradient */}
        <linearGradient id="leafGrad" x1="60" y1="80" x2="120" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6DA1F7" />
          <stop offset="100%" stopColor="#1D4380" />
        </linearGradient>

        {/* Soft Glow filter */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Framing Delicate Circular Arc */}
      <path
        d="M 40,150 A 110,110 0 1,1 260,150 A 110,110 0 1,1 40,150"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.5"
      />

      {/* Stacked Side Dots (Left & Right) */}
      <circle cx="32" cy="145" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="32" cy="155" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="268" cy="145" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="268" cy="155" r="2.5" fill="currentColor" opacity="0.8" />

      {/* 2. Left Botanical Branch with Leaves and Berries */}
      <g opacity="0.95">
        {/* Branch stem */}
        <path
          d="M 115,185 C 95,155 78,118 92,72"
          fill="none"
          stroke="url(#leafGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Berry stems */}
        <path d="M 92,72 L 78,63 M 88,86 L 73,81 M 91,102 L 76,98 M 98,118 L 84,116" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" />
        {/* Berries */}
        <circle cx="76" cy="62" r="3" fill="#6DA1F7" />
        <circle cx="71" cy="80" r="3.5" fill="#427EDC" />
        <circle cx="74" cy="97" r="3" fill="#2A59A8" />
        <circle cx="82" cy="115" r="2.5" fill="#1D4380" />

        {/* Branch Leaves */}
        <path d="M 92,72 C 75,76 68,90 78,102 C 86,92 90,82 92,72 Z" fill="url(#leafGrad)" />
        <path d="M 96,102 C 80,108 76,124 88,134 C 94,124 97,114 96,102 Z" fill="url(#leafGrad)" />
      </g>

      {/* 3. Main Serif Royal Blue Letter 'P' */}
      <path
        d="M 96,40
           H 185
           C 225,40 245,68 245,102
           C 245,138 215,162 175,162
           H 135
           V 185
           C 135,220 178,232 202,215
           C 215,206 218,190 208,180
           C 198,170 182,176 178,190
           C 172,210 148,212 132,198
           C 120,188 120,172 120,150
           V 58
           H 96
           Z"
        fill="url(#navyP)"
      />

      {/* Top Left Serif Bar Accent */}
      <path d="M 90,40 H 125 V 46 H 90 Z" fill="url(#navyP)" />

      {/* 4. Blooming Calla Lily Petal Inside P */}
      <path
        d="M 135,162
           C 125,128 128,82 148,60
           C 170,36 210,48 222,78
           C 232,105 212,138 175,158
           C 152,168 138,165 135,162 Z"
        fill="url(#callaLily)"
      />

      {/* Calla Lily Petal Fine Veins */}
      <g stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <path d="M 138,158 Q 160,118 192,68" />
        <path d="M 142,159 Q 172,128 210,90" />
        <path d="M 148,160 Q 180,138 218,112" />
        <path d="M 138,138 Q 158,108 178,82" />
        <path d="M 136,118 Q 150,95 168,78" />
      </g>

      {/* Petal Inner Shadow & Depth Curve */}
      <path
        d="M 135,162 C 142,135 158,102 182,78 C 172,98 160,130 135,162 Z"
        fill="#143063"
        opacity="0.35"
      />

      {/* 5. Four-point Sparkle Star on Right */}
      <path
        d="M 252,152 L 255,160 L 263,163 L 255,166 L 252,174 L 249,166 L 241,163 L 249,160 Z"
        fill="#5B8DEF"
        filter="url(#softGlow)"
      />
    </svg>
  );
};

// Full Brand Lockup: Logo Emblem + "Petalorah" (with heart in 'o') + Leaf Ornament + Subtitles
export const PetalorahFullLogo: React.FC<{
  className?: string;
  theme?: 'dark' | 'light';
  showSubtitles?: boolean;
}> = ({ className = "w-72", theme = 'dark', showSubtitles = true }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#122A54]';
  const subtextColor = theme === 'dark' ? 'text-white/70' : 'text-[#122A54]/80';
  const mutedTextColor = theme === 'dark' ? 'text-white/50' : 'text-[#122A54]/60';
  const lineColor = theme === 'dark' ? 'bg-white/20' : 'bg-[#122A54]/25';

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* 1. Main Emblem Icon */}
      <PetalorahLogoIcon className="w-28 h-28 sm:w-32 sm:h-32 text-blue-400 mb-1" />

      {/* 2. "Petalorah" Brand Wordmark with Heart inside the 'o' */}
      <div className={`flex items-center justify-center font-serif text-3xl sm:text-4xl tracking-tight font-normal ${textColor}`}>
        <span>Petal</span>
        {/* Letter 'o' with heart inside */}
        <span className="relative inline-flex items-center justify-center mx-[0.5px]">
          o
          <svg
            viewBox="0 0 24 24"
            className="absolute w-2.5 h-2.5 text-blue-400 fill-current"
            style={{ top: '52%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
        <span>rah</span>
      </div>

      {showSubtitles && (
        <>
          {/* 3. Ornament Divider with 3-Leaf Lotus/Clover in Center */}
          <div className="flex items-center justify-center gap-3 w-56 my-2.5">
            <div className={`h-[1px] flex-1 ${lineColor}`} />
            {/* 3-leaf motif */}
            <svg className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C10.5 5 9 8.5 12 12C15 8.5 13.5 5 12 2Z" />
              <path d="M12 12C8.5 10.5 5 9 2 12C5 15 8.5 13.5 12 12Z" />
              <path d="M12 12C15.5 13.5 19 15 22 12C19 9 15.5 10.5 12 12Z" />
            </svg>
            <div className={`h-[1px] flex-1 ${lineColor}`} />
          </div>

          {/* 4. Subtitle: "HANDMADE WITH LOVE" */}
          <span className={`text-[11px] sm:text-[12px] font-mono tracking-[0.25em] uppercase font-medium ${subtextColor}`}>
            Handmade With Love
          </span>

          {/* 5. Categories Tagline */}
          <span className={`text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase mt-1 ${mutedTextColor}`}>
            Flowers • Miniatures • Keychains • Gifts
          </span>
        </>
      )}
    </div>
  );
};
