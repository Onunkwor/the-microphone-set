import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  size: number;
}

export const Confetti = () => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    // Generate random confetti particles
    const colors = ["#fbbf24", "#3b82f6", "#8b5cf6", "#f97316", "#ec4899", "#10b981"];
    const particleCount = 75;

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random X position across screen (percentage)
      y: -20, // Start above the viewport
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 4, // Random size between 4px and 12px
    }));

    setParticles(newParticles);

    // Remove particles after animation completes
    const timeout = setTimeout(() => {
      setParticles([]);
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
          initial={{
            y: -20,
            x: 0,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200, // Random horizontal drift
            rotate: particle.rotation + 360 * 3, // Spin 3 full rotations
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeIn",
            delay: Math.random() * 0.3, // Stagger the start times slightly
          }}
        />
      ))}
    </div>
  );
};
