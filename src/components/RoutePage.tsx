import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LeafletMap } from './LeafletMap';
import { ShuttleStatus } from './ShuttleStatus';
import { ShuttleStops } from './ShuttleStops';

interface RoutePageProps {
  route: 'mens-hostel' | 'academic-buildings';
  onBack: () => void;
}

export function RoutePage({ route, onBack }: RoutePageProps) {
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
  const routeTitle = route === 'mens-hostel' ? "Men's Hostel Route" : "Academic Buildings Route";

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Back Button and Title */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 p-3 rounded-lg transition-all"
            style={{
              backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${isDark ? `${borderColor}60` : 'rgba(8, 145, 178, 0.3)'}`,
              color: isDark ? '#ffffff' : '#475569',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <ArrowLeft size={20} style={{ color: borderColor }} />
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: '600' }}>
              Back to Routes
            </span>
          </motion.button>

          <motion.h1
            className="uppercase tracking-wider"
            style={{
              color: isDark ? '#ffffff' : '#1e293b',
              fontSize: '1.5rem',
              fontWeight: '700',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {routeTitle}
          </motion.h1>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <LeafletMap route={route} />
          
          {/* Map Title */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h2
              className="uppercase tracking-wider"
              style={{
                color: isDark ? '#ffffff' : '#324158',
                fontSize: '1.25rem',
                fontWeight: '700',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Map
            </h2>
          </motion.div>
        </motion.div>

        {/* Shuttle Status */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <ShuttleStatus activeTab={route} />
        </motion.div>

        {/* Shuttle Stops */}
        <ShuttleStops route={route} />
      </motion.div>
    </div>
  );
}