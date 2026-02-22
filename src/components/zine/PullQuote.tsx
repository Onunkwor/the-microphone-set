interface PullQuoteProps {
  quote: string;
  author?: string;
  className?: string;
}

export const PullQuote = ({ quote, author, className = "" }: PullQuoteProps) => {
  return (
    <blockquote className={`relative py-6 px-8 ${className}`}>
      <span className="absolute top-0 left-0 font-display text-8xl text-cutout-red/30 leading-none select-none">
        &ldquo;
      </span>
      <p className="font-quote text-xl md:text-2xl italic text-ink/80 leading-relaxed relative z-10 pl-8">
        {quote}
      </p>
      {author && (
        <cite className="block mt-4 pl-8 font-typewriter text-sm uppercase tracking-wider text-ink/50 not-italic">
          &mdash; {author}
        </cite>
      )}
    </blockquote>
  );
};

export default PullQuote;
