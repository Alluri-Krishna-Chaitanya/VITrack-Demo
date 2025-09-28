import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Bus, Users, Building2 } from 'lucide-react';
import { BusMotif } from './BusMotif';

interface LandingPageProps {
  onRouteSelect: (route: 'mens-hostel' | 'academic-buildings') => void;
}

export function LandingPage({ onRouteSelect }: LandingPageProps) {
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

  const glowColor = isDark ? '#2af6f7' : '#0891b2';
  const borderColor = isDark ? '#2af6f7' : '#0891b2';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Background Bus Motifs */}
      <BusMotif className="top-20 left-10 opacity-30 hidden lg:block" />
      <BusMotif className="bottom-20 right-10 opacity-25 hidden lg:block transform rotate-180" />
      <BusMotif className="top-1/2 left-1/4 opacity-20 hidden xl:block transform -translate-y-1/2 scale-75" />
      
      {/* Main Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="uppercase tracking-wider relative mb-8"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: '900',
            fontFamily: 'League Spartan, sans-serif',
            letterSpacing: '0.1em',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 100 }}
        >
          <span
            style={{
              color: isDark ? '#2af6f7' : '#0891b2',
              fontFamily: 'Orbitron, monospace',
              textShadow: isDark 
                ? `0 0 20px ${glowColor}80, 0 0 40px ${glowColor}60, 0 4px 8px rgba(0,0,0,0.7)`
                : `0 2px 8px rgba(8, 145, 178, 0.3), 0 4px 16px rgba(8, 145, 178, 0.2)`,
              filter: isDark 
                ? `drop-shadow(0 0 30px ${glowColor}50) drop-shadow(0 0 60px ${glowColor}30)` 
                : `drop-shadow(0 2px 4px rgba(8, 145, 178, 0.3))`,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            VITRACK
          </span>
        </motion.h1>

        <motion.div
          className="uppercase tracking-[0.2em]"
          style={{
            color: isDark ? '#ffffff' : '#475569',
            fontSize: '1.25rem',
            fontWeight: '700',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          SHUTTLE STATUS
        </motion.div>
      </motion.div>

      {/* Route Selection */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Men's Hostel Route */}
        <motion.button
          onClick={() => onRouteSelect('mens-hostel')}
          className="group relative p-8 rounded-2xl transition-all duration-300"
          style={{
            backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            border: `2px solid ${isDark ? `${borderColor}60` : 'rgba(8, 145, 178, 0.3)'}`,
            boxShadow: isDark 
              ? `0 0 30px ${borderColor}30`
              : `0 4px 24px rgba(8, 145, 178, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05)`,
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: isDark 
              ? `0 0 40px ${borderColor}50`
              : `0 12px 40px rgba(0, 205, 238, 0.3)`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div
              className="p-4 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(42, 246, 247, 0.2)' : 'rgba(8, 145, 178, 0.15)',
              }}
            >
              <Users
                size={48}
                style={{
                  color: borderColor,
                  filter: `drop-shadow(0 0 10px ${borderColor})`,
                }}
              />
            </div>
            
            <h2
              className="uppercase tracking-wider"
              style={{
                color: isDark ? '#ffffff' : '#1e293b',
                fontSize: '1.5rem',
                fontWeight: '700',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Men's Hostel
            </h2>
            
            <p
              className="text-center"
              style={{
                color: isDark ? '#ffffff90' : '#64748b',
                fontSize: '1rem',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Track shuttles between hostels and campus
            </p>
          </div>
        </motion.button>

        {/* Academic Buildings Route */}
        <motion.button
          onClick={() => onRouteSelect('academic-buildings')}
          className="group relative p-8 rounded-2xl transition-all duration-300"
          style={{
            backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            border: `2px solid ${isDark ? `${borderColor}60` : 'rgba(8, 145, 178, 0.3)'}`,
            boxShadow: isDark 
              ? `0 0 30px ${borderColor}30`
              : `0 4px 24px rgba(8, 145, 178, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05)`,
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: isDark 
              ? `0 0 40px ${borderColor}50`
              : `0 12px 40px rgba(0, 205, 238, 0.3)`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div
              className="p-4 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(42, 246, 247, 0.2)' : 'rgba(8, 145, 178, 0.15)',
              }}
            >
              <Building2
                size={48}
                style={{
                  color: borderColor,
                  filter: `drop-shadow(0 0 10px ${borderColor})`,
                }}
              />
            </div>
            
            <h2
              className="uppercase tracking-wider"
              style={{
                color: isDark ? '#ffffff' : '#1e293b',
                fontSize: '1.5rem',
                fontWeight: '700',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Academic Buildings
            </h2>
            
            <p
              className="text-center"
              style={{
                color: isDark ? '#ffffff90' : '#64748b',
                fontSize: '1rem',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Track shuttles between academic blocks
            </p>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}