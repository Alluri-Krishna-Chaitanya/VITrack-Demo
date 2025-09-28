import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

export function ReportButton() {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState('');

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
  const bgColor = isDark ? 'rgba(2, 5, 13, 0.9)' : 'rgba(247, 248, 250, 0.95)';
  const textColor = isDark ? '#ffffff' : '#324158';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (report.trim()) {
      // Here you would typically send the report to your backend
      console.log('Report submitted:', report);
      setReport('');
      setIsOpen(false);
      // You could add a success toast notification here
    }
  };

  return (
    <>
      {/* Report Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full backdrop-blur-sm z-50"
        style={{
          backgroundColor: isDark ? 'rgba(42, 246, 247, 0.15)' : 'rgba(144, 225, 249, 0.15)',
          border: `2px solid ${borderColor}60`,
          boxShadow: isDark 
            ? `0 0 25px ${borderColor}40`
            : `0 8px 32px rgba(0, 205, 238, 0.3)`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <MessageCircle 
          size={24} 
          style={{ 
            color: borderColor,
            filter: `drop-shadow(0 0 8px ${borderColor})`,
          }} 
        />
      </motion.button>

      {/* Report Modal */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-md rounded-xl p-6"
            style={{
              backgroundColor: bgColor,
              border: `2px solid ${borderColor}60`,
              boxShadow: isDark 
                ? `0 0 30px ${borderColor}40, inset 0 0 20px rgba(42, 246, 247, 0.1)`
                : `0 8px 32px rgba(0, 205, 238, 0.2), inset 0 0 20px rgba(144, 225, 249, 0.1)`,
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3
                className="uppercase tracking-wider"
                style={{
                  color: textColor,
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                Report an Issue
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-opacity-20"
                style={{
                  color: textColor,
                  backgroundColor: 'transparent',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{
                    color: isDark ? '#ffffff90' : '#324158AA',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  Describe the issue (2-3 lines)
                </label>
                <textarea
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-lg resize-none"
                  style={{
                    backgroundColor: isDark ? 'rgba(42, 246, 247, 0.1)' : 'rgba(144, 225, 249, 0.1)',
                    border: `1px solid ${borderColor}40`,
                    color: textColor,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    outline: 'none',
                  }}
                  placeholder="e.g., Shuttle VIT-001 is running late on Men's Hostel route..."
                  maxLength={200}
                />
                <div
                  className="text-xs mt-1 text-right"
                  style={{
                    color: isDark ? '#ffffff60' : '#324158AA',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  {report.length}/200
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 px-4 rounded-lg transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${borderColor}40`,
                    color: textColor,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!report.trim()}
                  className="flex-1 py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: report.trim() 
                      ? (isDark ? 'rgba(42, 246, 247, 0.2)' : 'rgba(0, 205, 238, 0.2)')
                      : 'rgba(128, 128, 128, 0.2)',
                    border: `1px solid ${report.trim() ? borderColor : '#808080'}60`,
                    color: report.trim() ? borderColor : '#808080',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    cursor: report.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Send size={16} />
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}