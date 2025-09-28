import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Header() {
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

  const glowColor = isDark ? '#87ffff' : '#00cdee';
  const subtitleColor = isDark ? '#ffffff' : '#324158';

  return (
    <motion.div 
      className="relative z-10 text-center py-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Main Title */}
      <motion.h1
        className="uppercase tracking-wider relative"
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: '900',
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 100 }}
      >
        <span
          style={{
            background: isDark 
              ? `linear-gradient(135deg, ${glowColor}, #00cdee, #1ee6e6)`
              : `linear-gradient(135deg, #00cdee, #90e1f9)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: isDark 
              ? `0 0 30px ${glowColor}60, 0 0 60px ${glowColor}40, 0 4px 8px rgba(0,0,0,0.5)`
              : `0 2px 4px rgba(0,0,0,0.1)`,
            filter: isDark ? `drop-shadow(0 0 40px ${glowColor}50)` : 'none',
          }}
        >
          VITRACKER
        </span>
      </motion.h1>

      {/* Special Guest Section */}
      <motion.div
        className="mt-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div
          className="uppercase tracking-[0.2em]"
          style={{
            color: isDark ? '#ffffff' : '#324158',
            fontSize: '1rem',
            fontWeight: '700',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          SHUTTLE STATUS
        </div>
        
        {/* Divider Lines */}
        <div className="flex items-center justify-center space-x-4 max-w-md mx-auto">
          <div 
            className="flex-1 h-px"
            style={{
              background: isDark 
                ? `linear-gradient(90deg, transparent, ${glowColor}80, transparent)`
                : `linear-gradient(90deg, transparent, #c9d2de, transparent)`,
            }}
          />
          <div
            className="px-4 py-2 border rounded"
            style={{
              borderColor: isDark ? glowColor : '#c9d2de',
              color: isDark ? '#ffffff' : '#324158',
              fontSize: '0.875rem',
              fontWeight: '600',
              fontFamily: 'IBM Plex Sans, sans-serif',
              backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(144, 225, 249, 0.1)',
            }}
          >
            LIVE TRACKING
          </div>
          <div 
            className="flex-1 h-px"
            style={{
              background: isDark 
                ? `linear-gradient(90deg, transparent, ${glowColor}80, transparent)`
                : `linear-gradient(90deg, transparent, #c9d2de, transparent)`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}