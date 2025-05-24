'use client';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface SatelliteProps {
  scrollYProgress: MotionValue<number>;
}

export default function Satellite({ scrollYProgress }: SatelliteProps) {
  const y = useTransform(scrollYProgress, [0.1, 0.5], [800, 0]); 
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.1, 2]);
    return (
    <motion.div
      style={{ y, opacity, scale }}
      className="mx-auto block w-[400px] h-auto "
    >
      <video
        src="/webm/starlink.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto"
      />
    </motion.div>
  );
}
