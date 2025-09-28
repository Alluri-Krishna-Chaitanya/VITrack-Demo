import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function HeaderWaves() {
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

  const waveColor = isDark ? '#2af6f7' : '#00cdee';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wave Layer 1 */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        animate={{
          x: [-1440, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ opacity: isDark ? 0.15 : 0.1 }}
      >
        <path
          d="M0,400 C360,300 720,500 1080,400 C1200,350 1320,450 1440,400 L1440,800 L0,800 Z"
          fill={`url(#wave1-${isDark ? 'dark' : 'light'})`}
        />
        <defs>
          <linearGradient id={`wave1-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={waveColor} stopOpacity="0" />
            <stop offset="50%" stopColor={waveColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={waveColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Wave Layer 2 */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        animate={{
          x: [-1440, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ opacity: isDark ? 0.1 : 0.08 }}
      >
        <path
          d="M0,350 C240,250 480,450 720,350 C960,250 1200,450 1440,350 L1440,800 L0,800 Z"
          fill={`url(#wave2-${isDark ? 'dark' : 'light'})`}
        />
        <defs>
          <linearGradient id={`wave2-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={waveColor} stopOpacity="0" />
            <stop offset="30%" stopColor={waveColor} stopOpacity="0.2" />
            <stop offset="70%" stopColor={waveColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={waveColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Wave Layer 3 */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        animate={{
          x: [-1440, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ opacity: isDark ? 0.08 : 0.06 }}
      >
        <path
          d="M0,450 C320,350 640,550 960,450 C1120,400 1280,500 1440,450 L1440,800 L0,800 Z"
          fill={`url(#wave3-${isDark ? 'dark' : 'light'})`}
        />
        <defs>
          <linearGradient id={`wave3-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={waveColor} stopOpacity="0" />
            <stop offset="40%" stopColor={waveColor} stopOpacity="0.15" />
            <stop offset="60%" stopColor={waveColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={waveColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Flowing line strings */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [-100, 100],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top: `${30 + i * 25}%`,
              left: 0,
              right: 0,
              background: `linear-gradient(90deg, transparent, ${waveColor}40, transparent)`,
              opacity: isDark ? 0.4 : 0.3,
            }}
            animate={{
              scaleX: [0, 1, 0],
              x: [-200, 200],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}