import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MapContainerProps {
  activeTab: string;
}

export function MapContainer({ activeTab }: MapContainerProps) {
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
  const bgColor = isDark ? 'rgba(2, 5, 13, 0.8)' : 'rgba(247, 248, 250, 0.9)';

  // Mock shuttle positions
  const shuttlePositions = [
    { id: 1, x: 25, y: 30, route: 'mens-hostel' },
    { id: 2, x: 70, y: 60, route: 'academic-buildings' },
    { id: 3, x: 45, y: 80, route: 'mens-hostel' },
  ];

  // Mock stops based on active tab
  const stops = activeTab === 'mens-hostel' 
    ? [
        { id: 1, name: 'Block A Hostel', x: 20, y: 25 },
        { id: 2, name: 'Block B Hostel', x: 35, y: 40 },
        { id: 3, name: 'Mess Hall', x: 50, y: 75 },
        { id: 4, name: 'Main Gate', x: 80, y: 85 },
      ]
    : [
        { id: 1, name: 'Engineering Block', x: 30, y: 20 },
        { id: 2, name: 'Science Complex', x: 65, y: 35 },
        { id: 3, name: 'Library', x: 45, y: 55 },
        { id: 4, name: 'Admin Building', x: 75, y: 70 },
      ];

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <div
        className="relative rounded-2xl p-6 backdrop-blur-sm"
        style={{
          backgroundColor: bgColor,
          border: `2px solid ${borderColor}60`,
          boxShadow: isDark 
            ? `0 0 30px ${borderColor}40, inset 0 0 20px rgba(42, 246, 247, 0.1)`
            : `0 8px 32px rgba(0, 205, 238, 0.2), inset 0 0 20px rgba(144, 225, 249, 0.1)`,
        }}
      >
        {/* Map Area */}
        <div
          className="relative w-full h-96 rounded-xl overflow-hidden"
          style={{
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)',
            border: `1px solid ${borderColor}30`,
          }}
        >
          {/* Grid pattern for map appearance */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke={borderColor}
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Campus outline */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M50,50 Q200,30 350,80 Q380,120 340,180 Q280,220 200,200 Q120,190 80,150 Q40,100 50,50"
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          </svg>

          {/* Shuttle Stops */}
          {stops.map((stop) => (
            <div
              key={stop.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${stop.x}%`,
                top: `${stop.y}%`,
              }}
            >
              <div
                className="relative"
                style={{
                  filter: `drop-shadow(0 0 10px ${borderColor})`,
                }}
              >
                <MapPin
                  size={24}
                  style={{
                    color: borderColor,
                    fill: isDark ? 'rgba(42, 246, 247, 0.3)' : 'rgba(0, 205, 238, 0.3)',
                  }}
                />
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: isDark ? 'rgba(42, 246, 247, 0.9)' : 'rgba(0, 205, 238, 0.9)',
                    color: isDark ? '#000000' : '#ffffff',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  {stop.name}
                </div>
              </div>
            </div>
          ))}

          {/* Active Shuttles */}
          {shuttlePositions
            .filter(shuttle => shuttle.route === activeTab)
            .map((shuttle) => (
              <div
                key={shuttle.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${shuttle.x}%`,
                  top: `${shuttle.y}%`,
                }}
              >
                <div
                  className="relative"
                  style={{
                    filter: `drop-shadow(0 0 15px ${borderColor})`,
                  }}
                >
                  <Navigation
                    size={20}
                    style={{
                      color: '#ffffff',
                      fill: borderColor,
                    }}
                  />
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: '#00ff00',
                      boxShadow: '0 0 10px #00ff00',
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}