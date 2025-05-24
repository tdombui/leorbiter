'use client';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';

interface DistanceLineProps {
  scrollYProgress: MotionValue<number>;
}

export default function DistanceLine({ scrollYProgress }: DistanceLineProps) {
  const lineHeight = useTransform(scrollYProgress, [0, 0.4], [0, 1150]);
  const slideUp = useTransform(scrollYProgress, [0.4, 0.6], [0, -500]);
  const distanceKm = useTransform(lineHeight, [0, 1000], [0, 800]);
  const [distanceLabel, setDistanceLabel] = useState('0 km / 0 mi');

  useEffect(() => {
    const unsubscribe = distanceKm.on('change', (latest) => {
      const km = Math.round(latest);
      const miles = Math.round(km * 0.621371); // Convert km to miles
      setDistanceLabel(`${km} km / ${miles} mi`);
    });
    return () => unsubscribe();
  }, [distanceKm]);

  return (
    <div className="relative w-full h-full flex justify-center" >
      <motion.div
        style={{ height: lineHeight, y: slideUp }}
        className="absolute top-[10vh] w-[2px] bg-white z-10 mt-24 pointer-events-none"
      >
        <motion.div
          style={{ y: lineHeight }}

          className="absolute left-full ml-2 flex items-center space-x-2"
        >
          <div className="w-6 h-[2px] bg-white" />
          <span className="text-sm text-white select-none">{distanceLabel}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
