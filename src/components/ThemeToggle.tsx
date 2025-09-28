import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const glowColor = isDark ? '#2af6f7' : '#00cdee';

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 p-3 rounded-full backdrop-blur-sm z-50"
      style={{
        backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(144, 225, 249, 0.1)',
        border: `1px solid ${glowColor}50`,
        boxShadow: isDark 
          ? `0 0 20px ${glowColor}40`
          : `0 4px 16px rgba(0, 205, 238, 0.3)`,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDark ? (
          <Sun 
            size={20} 
            style={{ 
              color: glowColor,
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }} 
          />
        ) : (
          <Moon 
            size={20} 
            style={{ 
              color: glowColor,
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }} 
          />
        )}
      </motion.div>
    </motion.button>
  );
}