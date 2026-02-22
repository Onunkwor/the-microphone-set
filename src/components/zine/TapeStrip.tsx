interface TapeStripProps {
  rotate?: number;
  className?: string;
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right";
}

const positionMap = {
  "top-left": "top-[-10px] left-4",
  "top-right": "top-[-10px] right-4",
  "top-center": "top-[-10px] left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-[-10px] left-4",
  "bottom-right": "bottom-[-10px] right-4",
};

export const TapeStrip = ({
  rotate = 2,
  className = "",
  position = "top-center",
}: TapeStripProps) => {
  return (
    <div
      className={`absolute w-16 h-5 bg-cutout-yellow/70 z-10 ${positionMap[position]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
};

export default TapeStrip;
