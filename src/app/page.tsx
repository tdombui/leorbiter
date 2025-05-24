'use client';
import React from 'react';
import { useRef } from 'react';
import { useScroll, useTransform, motion, useMotionTemplate, MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import DistanceLine from './components/DistanceLine';
import LeoSatellite from './components/LeoSatellite';
import GeoSatellite from './components/GeoSatellite';


export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const earthScale = useTransform(scrollYProgress, [0, 1], [1.1, 0]);
  const earthY = useTransform(scrollYProgress, [0, 1], [0, 4200]);
  // const satelliteOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  // const dropShadow = useMotionTemplate`drop-shadow(4px 7px 0 rgba(0, 0, 0, ${satelliteOpacity}))`;
  const dropShadowOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const blurAmount = useTransform(scrollYProgress, [0.2, 0.4], [8, 0]); // Starts blurry, clears as you scroll
  const combinedFilter = useMotionTemplate`
  drop-shadow(4px 7px 0 rgba(0, 0, 0, ${dropShadowOpacity}))
  blur(${blurAmount}px)
`;
  const promptScale = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const promptY = useTransform(scrollYProgress, [0, 1], [0, -3]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll">
      <section id="hero" className="relative h-screen snap-start flex flex-col items-center justify-center bg-neutral-950 text-white select-none">
        <motion.div
          style={{ scale: earthScale, y: earthY }}
          className="absolute w-[1200px] h-[1200px] bg-neutral-950 z-1"
        >
          <video
            src="/webm/output.webm"
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-[1200px] h-[1200px] object-contain"
          />
        </motion.div>

        <h1 className="text-8xl font-bold mb-4 z-10 sticky top-8 text-white"

          style={{
            fontFamily: '"Bebas Neue", sans-serif',

            textShadow: `
        0 0 4px #ffffff,
        0 0 40px #ffffff,
        0 0 40px #ffffff,
        0 0 40px #ffffff
      `
          }}>LOW
          <br />EARTH<br />ORBITER</h1>
        <p className="text-xl text-center max-w-xl relative z-10 text-white">
        </p>
        <motion.span
          className="absolute bottom-18 mt-8 mb-4 text-xl sm:text-base drop-shadow-xl select-none z-10"
          animate={{ y: [0, -3, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            y: promptY,
            scale: promptScale,
          }}
        >
          swipe down to float into space
        </motion.span>
        {/* Chevron with different amplitude and offset */}
        <motion.div
          className="absolute bottom-8 drop-shadow-lg z-10 select-none"
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.6,
            ease: "easeInOut",
            delay: 0.4,
          }}
          style={{
            y: promptY,
            scale: promptScale,
          }}
        >
          <ChevronDown size={42} />
        </motion.div>
      </section>
      {/* Section—Distance from Earth to LEO */}

      {/* Section—Filler to Enable Scrolling */}

      <section
        id="distance"
        className="relative w-screen mb-22 flex flex-col items-center justify-start bg-neutral-950 text-white"
      >
      </section>
      <section id="distance"
        className="relative w-screen h-[100vh] flex items-center justify-center bg-neutral-950  mb-22 text-white">  <div className='z-1'><h2 className="mt-8 text-4xl ml-24 center z-10 select-none font-bold" style={{
          textShadow: `
          0 0 1px #ffffff,
          0 0 10px #ffffff,
          0 0 20px #ffffff,
          0 0 20px #ffffff
        `
        }}>Distance from Earth to LEO</h2>  <p className="mt-8 text-lg max-w-md ml-24 z-10 select-none">
            Low Earth Orbit is roughly 160km to 2,000km (99 to 1,200 miles) above the Earth&#39;s surface.<br /><br />
            This makes it about 50x closer than Geostationary satellites, which orbit at 35,786km (22,236 miles).<br /><br />
            The closer proximity means signals can travel faster with less delay, improving real-time communication like video calls, gaming, and remote operations.
          </p></div>
        <DistanceLine scrollYProgress={scrollYProgress} />

      </section>

      {/* Section—Low Earth Orbit (LEO) */}
      <section id="leo" className="relative w-screen h-screen flex flex-col items-center justify-center z-11"
      >
        <div className="sticky top-0 z-0 mx-auto">
          <LeoSatellite scrollYProgress={scrollYProgress} /></div>

        <motion.h2
          className="text-6xl font-bold sticky top-8 select-none" style={{
            textShadow: `
          0 0 1px #ffffff,
          0 0 4px #ffffff,
          0 0 1px #ffffff,
          0 0 20px #ffffff
        `
          }}
        >  Low Earth Orbit (LEO)
          <motion.span
            className="absolute inset-0 text-6xl font-bold text-neutral-950 z-[-1] blur-xl pointer-events-none"
            style={{ filter: combinedFilter }}
          >Low Earth Orbit (LEO)
          </motion.span></motion.h2>

      </section>

      {/* LEO Intro Section */}
      <section id="leo-advantages" className="relative w-screen h-[80vh] flex flex-col items-center justify-start pt-8 overflow-hidden select-none z-10">
        <h2 className="text-5xl mb-4 font-bold "
          style={{
            textShadow: `
          0 0 1px #ffffff,
          0 0 4px #ffffff,
          0 0 1px #ffffff,
          0 0 20px #ffffff
        `
          }}>Advantages of LEO</h2>
        <p className="text-xl max-w-lg text-left">
          LEO satellites move extremely fast, completing a full orbit around Earth in about 90 to 120 minutes.

          Because they cover a smaller area per satellite, networks like Starlink use thousands of satellites working together to provide seamless global coverage.

          These satellites constantly hand off signals to each other as they orbit, creating a mesh network in the sky.</p>
      </section>

      {/* Geostationary Orbit (GEO) Section */}
      <section id="geo" className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden select-none "
      >
        <h2 className="text-6xl mt-[-40vh] mb-4 font-bold " style={{
          textShadow: `
          0 0 1px #ffffff,
          0 0 4px #ffffff,
          0 0 1px #ffffff,
          0 0 20px #ffffff
        `
        }}><br />Geostationary <br />Orbit (GEO) <br />Satellites</h2>

        <GeoSatellite scrollYProgress={scrollYProgress} />

      </section>

      {/* GEO Disadvantages Section */}
      <section id="geo-disadvantages" className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden select-none"
      >
        <h2 className="text-5xl mb-4 font-bold" style={{
          textShadow: `
          0 0 1px #ffffff,
          0 0 4px #ffffff,
          0 0 1px #ffffff,
          0 0 20px #ffffff
        `
        }}>Disadvantages of GEO</h2>
        <ul className="list-disc max-w-lg text-left">
          <li>Higher latency (500ms+)</li>
          <li>Fixed position, less flexibility</li>
          <li>Weather susceptibility over long distances</li>
        </ul>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden select-none"
      >
        <h2 className="text-5xl mb-4 font-bold" style={{
          textShadow: `
          0 0 1px #ffffff,
          0 0 4px #ffffff,
          0 0 1px #ffffff,
          0 0 20px #ffffff
        `
        }}>Why LEO is the Future</h2>
        <p className="text-center max-w-lg">
          Explore how Low Earth Orbit satellite networks like Starlink are redefining global connectivity.
        </p>
      </section>
    </div>
  );
}
