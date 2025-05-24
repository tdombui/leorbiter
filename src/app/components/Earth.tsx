'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';

export default function Earth() {
  const { scrollYProgress } = useScroll();  // Remove container ref

  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <motion.svg
      style={{ scale, y }}
      width="800"
      height="800"
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
    >
      <circle cx="150" cy="150" r="150" className="fill-sky-800" />
    </motion.svg>
  );
}
