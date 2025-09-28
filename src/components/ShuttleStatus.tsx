import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Bus, Users, Clock, Wifi } from 'lucide-react';

interface ShuttleStatusProps {
  activeTab: string;
}

export function ShuttleStatus({ activeTab }: ShuttleStatusProps) {
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

  const borderColor = isDark ? '#2af6f7' : '#00cdee';
  const bgColor = isDark ? 'rgba(2, 5, 13, 0.6)' : 'rgba(247, 248, 250, 0.8)';
  const textColor = isDark ? '#ffffff' : '#324158';

  // Mock shuttle data based on active tab (removed ETA, status, occupancy as requested)
  const shuttles = activeTab === 'mens-hostel'
    ? [
        { id: 'VIT-001', route: "Men's Hostel Route", driver: 'Rajesh Kumar' },
        { id: 'VIT-003', route: "Men's Hostel Route", driver: 'Suresh Patel' },
      ]
    : [
        { id: 'VIT-002', route: 'Academic Buildings Route', driver: 'Priya Sharma' },
        { id: 'VIT-004', route: 'Academic Buildings Route', driver: 'Amit Singh' },
      ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Shuttle Status Panel */}
      <motion.div
        className="rounded-xl p-6"
        style={{
          backgroundColor: bgColor,
          boxShadow: isDark 
            ? `0 0 20px ${borderColor}30, inset 0 0 15px rgba(42, 246, 247, 0.05)`
            : `0 4px 16px rgba(0, 205, 238, 0.15), inset 0 0 15px rgba(144, 225, 249, 0.05)`,
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <Bus
            size={20}
            style={{
              color: borderColor,
              filter: `drop-shadow(0 0 8px ${borderColor})`,
            }}
          />
          <h3
            className="uppercase tracking-wider"
            style={{
              color: textColor,
              fontSize: '1rem',
              fontWeight: '700',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            Active Shuttles
          </h3>
        </div>

        <div className="space-y-4">
          {shuttles.map((shuttle, index) => (
            <div
              key={shuttle.id}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(144, 225, 249, 0.1)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-mono"
                  style={{
                    color: borderColor,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  {shuttle.id}
                </span>
                <div className="flex items-center space-x-1">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: '#00ff00',
                      boxShadow: '0 0 6px #00ff00',
                    }}
                  />
                  <Wifi size={14} style={{ color: '#00ff00' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div
                  className="text-sm"
                  style={{ 
                    color: textColor,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  Route: {shuttle.route}
                </div>
                <div
                  className="text-sm"
                  style={{ 
                    color: isDark ? '#ffffff90' : '#324158AA',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  Driver: {shuttle.driver}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats Panel */}
      <motion.div
        className="rounded-xl p-6"
        style={{
          backgroundColor: bgColor,
          boxShadow: isDark 
            ? `0 0 20px ${borderColor}30, inset 0 0 15px rgba(42, 246, 247, 0.05)`
            : `0 4px 16px rgba(0, 205, 238, 0.15), inset 0 0 15px rgba(144, 225, 249, 0.05)`,
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <Clock
            size={20}
            style={{
              color: borderColor,
              filter: `drop-shadow(0 0 8px ${borderColor})`,
            }}
          />
          <h3
            className="uppercase tracking-wider"
            style={{
              color: textColor,
              fontSize: '1rem',
              fontWeight: '700',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            Service Info
          </h3>
        </div>

        <motion.div
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(144, 225, 249, 0.1)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
        >
          <div
            className="text-3xl mb-2"
            style={{
              color: borderColor,
              fontWeight: '700',
              fontFamily: 'IBM Plex Sans, sans-serif',
              textShadow: isDark ? `0 0 10px ${borderColor}80` : 'none',
            }}
          >
            {shuttles.length}
          </div>
          <div
            className="text-sm uppercase tracking-wide"
            style={{ 
              color: isDark ? '#ffffff90' : '#324158AA',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            Active Shuttles
          </div>
        </motion.div>

        <motion.div
          className="mt-4 p-3 rounded-lg text-center"
          style={{
            backgroundColor: isDark ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 200, 0, 0.1)',
            border: '1px solid rgba(0, 255, 0, 0.3)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.6 }}
        >
          <div
            className="text-sm"
            style={{ 
              color: '#00ff00',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            All systems operational
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}