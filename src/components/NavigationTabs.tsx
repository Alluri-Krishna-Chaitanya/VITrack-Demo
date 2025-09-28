import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
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

  const tabs = [
    { id: 'mens-hostel', label: "Men's Hostel" },
    { id: 'academic-buildings', label: 'Academic Buildings' },
  ];

  const activeColor = isDark ? '#00dbdb' : '#00cdee';
  const inactiveColor = isDark ? '#ffffff' : '#324158';

  return (
    <motion.div 
      className="flex justify-center space-x-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative px-6 py-3 uppercase tracking-wide transition-all duration-300"
          style={{
            color: activeTab === tab.id ? activeColor : inactiveColor,
            fontSize: '0.875rem',
            fontWeight: '700',
            fontFamily: 'IBM Plex Sans, sans-serif',
            background: activeTab === tab.id && isDark 
              ? `linear-gradient(135deg, ${activeColor}20, ${activeColor}10)`
              : activeTab === tab.id && !isDark
              ? `linear-gradient(135deg, ${activeColor}15, ${activeColor}08)`
              : 'transparent',
            border: activeTab === tab.id 
              ? `1px solid ${activeColor}80`
              : isDark 
              ? '1px solid rgba(255, 255, 255, 0.2)'
              : '1px solid rgba(50, 65, 88, 0.2)',
            borderRadius: '0.5rem',
            textShadow: activeTab === tab.id && isDark 
              ? `0 0 10px ${activeColor}80` 
              : 'none',
            filter: activeTab === tab.id && isDark 
              ? `drop-shadow(0 0 15px ${activeColor}40)` 
              : 'none',
          }}
          whileHover={{
            scale: 1.05,
            filter: isDark 
              ? `drop-shadow(0 0 20px ${activeColor}60)` 
              : `drop-shadow(0 2px 8px rgba(0, 205, 238, 0.3))`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)`,
                filter: `drop-shadow(0 0 8px ${activeColor})`,
              }}
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}