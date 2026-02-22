import { useState } from "react";
import { Loader2 } from "lucide-react";
import { newsletterApi } from "@/services/api";

interface NewsletterFormProps {
  className?: string;
}

export const NewsletterForm = ({ className = "" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await newsletterApi.subscribe(email);
      setStatus({ type: "success", message: result.message });
      setEmail("");
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Failed to subscribe. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`relative bg-paper border-3 border-dashed border-ink p-8 md:p-10 max-w-2xl mx-auto ${className}`}
      style={{ transform: "rotate(-0.5deg)" }}
    >
      {/* Tape strips */}
      <div
        className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] left-8 z-10"
        style={{ transform: "rotate(-3deg)" }}
      />
      <div
        className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] right-8 z-10"
        style={{ transform: "rotate(2deg)" }}
      />

      <div className="text-center mb-6">
        <span className="inline-block bg-ink text-paper font-typewriter text-xs uppercase tracking-[3px] px-4 py-1.5 rotate-[-1deg] mb-4">
          Subscribe
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-ink mb-3">
          Stay In The Loop
        </h3>
        <p className="font-body text-ink/60 text-sm max-w-md mx-auto">
          Get weekly music insights, artist interviews, and playlist updates
          delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 bg-paper-white border-2 border-ink font-typewriter text-sm placeholder:text-ink/30 focus:outline-none focus:border-cutout-red transition-colors"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`font-typewriter text-sm uppercase tracking-wider px-6 py-3 border-3 transition-all duration-200 flex items-center justify-center gap-2 ${
              isSubmitting
                ? "bg-ink/50 text-paper/50 border-ink/50 cursor-not-allowed"
                : "bg-ink text-paper border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5"
            }`}
            style={{ transform: "rotate(-1deg)" }}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {status && (
          <p className={`font-typewriter text-xs text-center tracking-wider ${
            status.type === "success" ? "text-green-700" : "text-cutout-red"
          }`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default NewsletterForm;
