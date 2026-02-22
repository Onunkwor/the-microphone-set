interface GenreTagProps {
  label: string;
  rotate?: number;
  variant?: "outline" | "yellow" | "red" | "ink";
  onClick?: () => void;
  className?: string;
}

const variantMap = {
  outline: "border-2 border-ink bg-transparent text-ink",
  yellow: "border-2 border-cutout-yellow bg-cutout-yellow text-ink",
  red: "border-2 border-cutout-red bg-cutout-red text-paper",
  ink: "border-2 border-ink bg-ink text-paper",
};

export const GenreTag = ({
  label,
  rotate = 0,
  variant = "outline",
  onClick,
  className = "",
}: GenreTagProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-typewriter text-[13px] px-3.5 py-1.5 cursor-pointer transition-all duration-200 hover:rotate-0 hover:scale-105 hover:shadow-hard ${variantMap[variant]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {label}
    </button>
  );
};

export default GenreTag;
