"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: any[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
  };
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  };

  // preload once
  useEffect(() => {
    setLoading(true);
    Promise.all(
      images.map(
        (src) =>
          new Promise<string>((res, rej) => {
            const img = new Image();
            img.src = src;
            img.onload = () => res(src);
            img.onerror = rej;
          })
      )
    )
      .then((imgs) => {
        setLoadedImages(imgs);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load images", e);
        setLoading(false);
      });
  }, [images]);

  // keyboard nav + autoplay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    };
    window.addEventListener("keydown", onKey);

    let interval: NodeJS.Timeout;
    if (autoplay) interval = setInterval(handleNext, 5000);

    return () => {
      window.removeEventListener("keydown", onKey);
      clearInterval(interval);
    };
  }, [autoplay, images.length]);

  // ← HERE we import Variants and annotate:
  const slideVariants: Variants = {
    initial: { scale: 0, opacity: 0, rotateX: 45 },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0] },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: { duration: loading ? 1 : 1 },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: { duration: 1 },
    },
  };

  if (loadedImages.length === 0) return null;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {children}
      {overlay && (
        <div className={cn("absolute inset-0 z-40", overlayClassName)} />
      )}

      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={loadedImages[currentIndex]}
          className="absolute inset-0 h-full w-full object-cover object-center"
          initial="initial"
          animate="visible"
          exit={direction === "up" ? "upExit" : "downExit"}
          variants={slideVariants}
        />
      </AnimatePresence>
    </div>
  );
};
