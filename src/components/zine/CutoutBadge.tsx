interface CutoutBadgeProps {
  children: React.ReactNode;
  color?: "red" | "ink" | "yellow";
  rotate?: string;
  className?: string;
  dashed?: boolean;
}

const colorMap = {
  red: "bg-cutout-red text-paper",
  ink: "bg-ink text-paper",
  yellow: "bg-cutout-yellow text-ink",
};

export const CutoutBadge = ({
  children,
  color = "red",
  rotate = "-1.5",
  className = "",
  dashed = true,
}: CutoutBadgeProps) => {
  return (
    <span
      className={`inline-block ${colorMap[color]} px-4 py-1 font-typewriter text-sm uppercase tracking-wider relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {dashed && (
        <span className="absolute inset-[-2px] border-2 border-dashed border-ink/20 pointer-events-none" />
      )}
      {children}
    </span>
  );
};

export default CutoutBadge;
