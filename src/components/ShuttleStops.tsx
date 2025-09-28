import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface ShuttleStopsProps {
  route: 'mens-hostel' | 'academic-buildings';
}

export function ShuttleStops({ route }: ShuttleStopsProps) {
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

  const borderColor = isDark ? '#2af6f7' : '#0891b2';
  const glowColor = isDark ? '#87ffff' : '#0284c7';

  const mensHostelStops = [
    'Main Gate',
    'SMV',
    'H/J Block',
    'A Block',
    'C/D Block',
    'E Block',
    'K Block',
    'L Block',
    'M Block',
    'P Block',
    'N Block',
    'Q Block',
    'R Block'
  ];

  const academicStops = [
    'Main Gate',
    'SMV',
    'Technology Tower',
    "C/D Block (Ladies' Hostel)",
    "E/F Block (Ladies' Hostel)",
    'SJT',
    'Gandhi Block',
    'PRP',
    "G/H/J Block (Ladies' Hostel)"
  ];

  const stops = route === 'mens-hostel' ? mensHostelStops : academicStops;
  const title = route === 'mens-hostel' ? "Men's Hostel Stops" : "Academic Building Stops";

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {/* Section Title */}
      <motion.h2
        className="uppercase tracking-wider text-center mb-8"
        style={{
          color: isDark ? '#ffffff' : '#1e293b',
          fontSize: '1.5rem',
          fontWeight: '700',
          fontFamily: 'IBM Plex Sans, sans-serif',
          textShadow: isDark ? `0 0 20px ${glowColor}60` : `0 2px 4px rgba(8, 145, 178, 0.2)`,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {title}
      </motion.h2>

      {/* Stops Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        {stops.map((stop, index) => (
          <motion.div
            key={stop}
            className="p-4 rounded-xl transition-all duration-300 group"
            style={{
              backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${isDark ? `${borderColor}40` : 'rgba(8, 145, 178, 0.2)'}`,
              boxShadow: isDark 
                ? `0 4px 20px ${borderColor}20`
                : `0 2px 12px rgba(8, 145, 178, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 + (index * 0.1), duration: 0.5 }}
            whileHover={{
              scale: 1.02,
              boxShadow: isDark 
                ? `0 6px 25px ${borderColor}30`
                : `0 4px 20px rgba(8, 145, 178, 0.2), 0 2px 8px rgba(0, 0, 0, 0.08)`,
            }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="p-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: isDark ? 'rgba(42, 246, 247, 0.2)' : 'rgba(8, 145, 178, 0.1)',
                }}
              >
                <MapPin
                  size={16}
                  style={{
                    color: borderColor,
                    filter: `drop-shadow(0 0 8px ${glowColor}60)`,
                  }}
                />
              </div>
              
              <motion.span
                className="flex-1"
                style={{
                  color: isDark ? '#ffffff' : '#475569',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
                whileHover={{
                  color: borderColor,
                  textShadow: isDark ? `0 0 10px ${glowColor}60` : `0 0 8px rgba(8, 145, 178, 0.4)`,
                }}
                transition={{ duration: 0.2 }}
              >
                {stop}
              </motion.span>
              
              {/* Stop Number */}
              <motion.div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                style={{
                  backgroundColor: isDark ? 'rgba(42, 246, 247, 0.3)' : 'rgba(8, 145, 178, 0.15)',
                  color: borderColor,
                  fontWeight: '700',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
                whileHover={{
                  backgroundColor: isDark ? 'rgba(42, 246, 247, 0.5)' : 'rgba(8, 145, 178, 0.25)',
                  boxShadow: `0 0 10px ${borderColor}60`,
                }}
                transition={{ duration: 0.2 }}
              >
                {index + 1}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Route Description */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <p
          className="max-w-2xl mx-auto"
          style={{
            color: isDark ? '#ffffff90' : '#64748b',
            fontSize: '1rem',
            fontFamily: 'IBM Plex Sans, sans-serif',
            lineHeight: '1.6',
          }}
        >
          {route === 'mens-hostel' 
            ? "The Men's Hostel route connects all major hostel blocks with essential campus facilities, ensuring convenient transportation for residents."
            : "The Academic Buildings route provides efficient connectivity between the main academic blocks, libraries, and administrative centers across campus."
          }
        </p>
      </motion.div>
    </motion.div>
  );
}