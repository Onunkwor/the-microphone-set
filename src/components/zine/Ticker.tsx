interface TickerProps {
  items?: string[];
  className?: string;
}

const defaultItems = [
  "New Playlists Every Week",
  "Artist Interviews",
  "Genre Deep Dives",
  "Curated For You",
  "The Microphone Set",
];

export const Ticker = ({ items = defaultItems, className = "" }: TickerProps) => {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div
      className={`relative z-10 bg-ink text-paper py-3 overflow-hidden ${className}`}
    >
      <div className="flex gap-10 animate-ticker whitespace-nowrap font-typewriter text-[13px] uppercase tracking-[3px]">
        {repeatedItems.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-cutout-red">&#9733;</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
