import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface BusMotifProps {
  className?: string;
}

export function BusMotif({ className = '' }: BusMotifProps) {
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

  const primaryColor = isDark ? '#2af6f7' : '#0891b2';
  const secondaryColor = isDark ? '#00cdee' : '#0284c7';
  const glowColor = isDark ? '#87ffff' : '#0ea5e9';

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <motion.svg
        width="400"
        height="200"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${isDark ? 'opacity-20' : 'opacity-10'}`}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 1, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Bus Body */}
        <motion.rect
          x="50"
          y="50"
          width="300"
          height="100"
          rx="10"
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          style={{
            filter: `drop-shadow(0 0 20px ${glowColor}50)`,
          }}
        />
        
        {/* Bus Front */}
        <motion.path
          d="M50 60 L30 80 L30 140 L50 150"
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          style={{
            filter: `drop-shadow(0 0 15px ${glowColor}40)`,
          }}
        />
        
        {/* Windows */}
        <motion.rect
          x="70"
          y="70"
          width="40"
          height="30"
          rx="5"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        <motion.rect
          x="130"
          y="70"
          width="40"
          height="30"
          rx="5"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        />
        <motion.rect
          x="190"
          y="70"
          width="40"
          height="30"
          rx="5"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        />
        <motion.rect
          x="250"
          y="70"
          width="40"
          height="30"
          rx="5"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        />
        
        {/* Front Windshield */}
        <motion.path
          d="M30 80 L50 70 L50 100 L30 140"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.9 }}
        />
        
        {/* Wheels */}
        <motion.circle
          cx="100"
          cy="170"
          r="15"
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          style={{
            filter: `drop-shadow(0 0 10px ${glowColor}60)`,
          }}
        />
        <motion.circle
          cx="300"
          cy="170"
          r="15"
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          style={{
            filter: `drop-shadow(0 0 10px ${glowColor}60)`,
          }}
        />
        
        {/* Wheel Details */}
        <motion.circle
          cx="100"
          cy="170"
          r="8"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ 
            opacity: { duration: 0.5, delay: 2.3 },
            rotate: { duration: 4, delay: 2.3, repeat: Infinity, ease: "linear" }
          }}
        />
        <motion.circle
          cx="300"
          cy="170"
          r="8"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ 
            opacity: { duration: 0.5, delay: 2.4 },
            rotate: { duration: 4, delay: 2.4, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Door */}
        <motion.rect
          x="310"
          y="80"
          width="30"
          height="60"
          rx="5"
          stroke={primaryColor}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
        
        {/* Door Handle */}
        <motion.circle
          cx="335"
          cy="110"
          r="2"
          fill={primaryColor}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.8 }}
        />
        
        {/* Destination Sign */}
        <motion.rect
          x="60"
          y="55"
          width="80"
          height="10"
          rx="2"
          stroke={glowColor}
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 2, 
            delay: 3, 
            repeat: Infinity, 
            repeatDelay: 3 
          }}
          style={{
            filter: `drop-shadow(0 0 5px ${glowColor})`,
          }}
        />
      </motion.svg>
    </motion.div>
  );
}