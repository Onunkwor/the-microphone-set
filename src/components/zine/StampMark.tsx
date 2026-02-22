interface StampMarkProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  rotate?: number;
  className?: string;
}

const sizeMap = {
  sm: "w-16 h-16 text-[9px]",
  md: "w-24 h-24 text-[11px]",
  lg: "w-32 h-32 text-sm",
};

export const StampMark = ({
  children,
  size = "md",
  rotate = 15,
  className = "",
}: StampMarkProps) => {
  return (
    <div
      className={`border-4 border-cutout-red rounded-full flex items-center justify-center font-typewriter uppercase text-cutout-red text-center leading-tight tracking-wider ${sizeMap[size]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
};

export default StampMark;
