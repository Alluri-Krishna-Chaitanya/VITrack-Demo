import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function AnimatedWaves() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const waveColor = isDark ? '#2af6f7' : '#90e1f9';
  const waveOpacity = isDark ? 0.8 : 0.4;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Wave */}
      <motion.svg
        width="200%"
        height="200%"
        viewBox="0 0 1000 400"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          filter: `drop-shadow(0 0 20px ${waveColor}40) drop-shadow(0 0 40px ${waveColor}20)`,
        }}
      >
        <motion.path
          d="M0,200 Q250,50 500,200 T1000,200 L1000,400 L0,400 Z"
          fill="none"
          stroke={waveColor}
          strokeWidth="2"
          opacity={waveOpacity}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: waveOpacity,
            x: [-100, 100, -100],
          }}
          transition={{
            pathLength: { duration: 2 },
            opacity: { duration: 1 },
            x: { 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }
          }}
        />
      </motion.svg>

      {/* Secondary Wave */}
      <motion.svg
        width="200%"
        height="200%"
        viewBox="0 0 1000 400"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          filter: `drop-shadow(0 0 15px ${waveColor}30) drop-shadow(0 0 30px ${waveColor}15)`,
        }}
      >
        <motion.path
          d="M0,180 Q200,80 400,180 T800,180 Q900,120 1000,180 L1000,400 L0,400 Z"
          fill="none"
          stroke={waveColor}
          strokeWidth="1.5"
          opacity={waveOpacity * 0.7}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: waveOpacity * 0.7,
            x: [100, -100, 100],
          }}
          transition={{
            pathLength: { duration: 2.5, delay: 0.5 },
            opacity: { duration: 1, delay: 0.5 },
            x: { 
              duration: 10, 
              repeat: Infinity, 
              ease: "linear" 
            }
          }}
        />
      </motion.svg>

      {/* Tertiary Wave */}
      <motion.svg
        width="200%"
        height="200%"
        viewBox="0 0 1000 400"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          filter: `drop-shadow(0 0 10px ${waveColor}20) drop-shadow(0 0 20px ${waveColor}10)`,
        }}
      >
        <motion.path
          d="M0,220 Q300,100 600,220 T1200,220 L1200,400 L0,400 Z"
          fill="none"
          stroke={waveColor}
          strokeWidth="1"
          opacity={waveOpacity * 0.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: waveOpacity * 0.5,
            x: [-50, 150, -50],
          }}
          transition={{
            pathLength: { duration: 3, delay: 1 },
            opacity: { duration: 1, delay: 1 },
            x: { 
              duration: 12, 
              repeat: Infinity, 
              ease: "linear" 
            }
          }}
        />
      </motion.svg>

      {/* Floating dots for additional ambience */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: waveColor,
            boxShadow: `0 0 10px ${waveColor}, 0 0 20px ${waveColor}40`,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, waveOpacity * 0.3, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}