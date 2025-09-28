import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { RoutePage } from './components/RoutePage';
import { HeaderWaves } from './components/HeaderWaves';
import { ThemeToggle } from './components/ThemeToggle';
import { ReportButton } from './components/ReportButton';

type PageType = 'landing' | 'mens-hostel' | 'academic-buildings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  // Initialize dark mode on first load
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleRouteSelect = (route: 'mens-hostel' | 'academic-buildings') => {
    setCurrentPage(route);
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Toggle - Always present */}
      <ThemeToggle />
      
      {/* Report Button - Always present */}
      <ReportButton />
      
      {/* Header Waves - Only on landing page */}
      {currentPage === 'landing' && <HeaderWaves />}
      
      {/* Main Content */}
      <div className="relative z-10">
        {currentPage === 'landing' && (
          <LandingPage onRouteSelect={handleRouteSelect} />
        )}
        
        {(currentPage === 'mens-hostel' || currentPage === 'academic-buildings') && (
          <RoutePage 
            route={currentPage} 
            onBack={handleBackToLanding} 
          />
        )}
      </div>
      
      {/* Additional ambient lighting effects for dark mode */}
      <div className="dark:block hidden">
        <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-radial from-teal-400/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-80 h-80 bg-gradient-radial from-cyan-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}