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
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      {/* Floating music notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10 dark:opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
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
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 w-full max-w-7x">
          {/* Text Section */}
          <div className="flex-1 order-2 lg:order-1">
            <span className="flex flex-wrap justify-center lg:justify-start p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-1 lg:text-4xl xl:text-5xl">
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
            <div className="relative">
              <ImagesSlider
                className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[500px] lg:w-[400px] lg:h-[520px] xl:w-[500px] xl:h-[650px] rounded-[8px]"
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
                className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
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
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};
