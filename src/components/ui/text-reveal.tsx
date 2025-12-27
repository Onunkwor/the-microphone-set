"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";
import type { FC } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ImagesSlider } from "./images-slider";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");
  const images = [
    "/merch1.jpg",
    "/merch2.png",
    "/merch3.png",
    "/merch4.jpg",
    "/merch5.jpg",
    "/merch6.jpg",
    "/merch7.png",
  ];

  return (
    <div ref={targetRef} className={cn("relative z-0 lg:h-[100vh] mt-[100px]", className)}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#3b82f6]/5 rounded-full blur-[150px]" />
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl text-[#3b82f6]"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>

      <div className="sticky top-0 mx-auto flex h-[50%] w-full justify-center items-center bg-transparent px-4 py-8 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-7xl">
          {/* Text Section */}
          <div className="flex-1 order-2 lg:order-1">
            <span className="flex flex-wrap justify-center lg:justify-start p-5 text-2xl font-bold text-gray-300 md:p-8 md:text-3xl lg:p-1 lg:text-4xl xl:text-5xl">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </span>
          </div>

          {/* Image Section */}
          <div className="flex-1 order-1 lg:order-2 flex justify-center relative">
            <div className="relative group">
              {/* Decorative frame - top left */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#3b82f6]/30 rounded-tl-lg" />
              {/* Decorative frame - bottom right */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#3b82f6]/30 rounded-br-lg" />

              <ImagesSlider
                className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[500px] lg:w-[400px] lg:h-[520px] xl:w-[500px] xl:h-[650px] rounded-2xl shadow-2xl"
                images={images}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -80,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="z-50 flex flex-col justify-center items-center object-cover"
                ></motion.div>
              </ImagesSlider>

              {/* Pulse effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-[#3b82f6]/20 via-[#60a5fa]/20 to-[#3b82f6]/20 rounded-2xl -z-10"
                animate={{
                  scale: [1, 1.03, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Subtle glow behind image */}
              <div className="absolute inset-0 bg-[#3b82f6]/10 rounded-2xl blur-xl -z-20 scale-110" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className="text-gray-900 dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
};