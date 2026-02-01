interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl md:text-2xl" },
    lg: { icon: 40, text: "text-2xl md:text-3xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Microphone Icon */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Microphone head - rounded rectangle with gradient */}
        <defs>
          <linearGradient id="micGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="standGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>

        {/* Microphone body */}
        <rect
          x="14"
          y="6"
          width="20"
          height="26"
          rx="10"
          fill="url(#micGradient)"
        />

        {/* Microphone grille lines */}
        <line x1="18" y1="12" x2="30" y2="12" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        <line x1="18" y1="16" x2="30" y2="16" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        <line x1="18" y1="20" x2="30" y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        <line x1="18" y1="24" x2="30" y2="24" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />

        {/* Stand arc */}
        <path
          d="M10 28C10 36 16 42 24 42C32 42 38 36 38 28"
          stroke="url(#standGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Stand base */}
        <line x1="24" y1="42" x2="24" y2="46" stroke="url(#standGradient)" strokeWidth="3" strokeLinecap="round" />
        <line x1="18" y1="46" x2="30" y2="46" stroke="url(#standGradient)" strokeWidth="3" strokeLinecap="round" />

        {/* Highlight reflection */}
        <ellipse cx="19" cy="14" rx="2" ry="3" fill="white" fillOpacity="0.3" />
      </svg>

      {/* Text Logo */}
      {showText && (
        <div className={`font-sans ${text} flex items-center`}>
          <span className="font-light tracking-tight">The</span>
          <span className="mx-1 font-black tracking-tighter">MICROPHONE</span>
          <span className="font-medium">SET</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
