// React and routing imports
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// Component imports
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * 404 Not Found page component
 * Displays when a user attempts to access a non-existent route
 */
const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 error for analytics/monitoring
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FFFBE6] dark:bg-black text-black dark:text-white">
      <div className="absolute inset-0 z-0 magic-grid opacity-30"></div>
      <Navbar />
      
      <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="glass-effect rounded-xl p-12 text-center max-w-md mx-auto">
          <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
          <p className="text-2xl text-gray-300 mb-6">Oops! Page not found</p>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-axis-neon-blue to-axis-neon-purple hover:from-axis-neon-purple hover:to-axis-neon-pink text-black font-medium px-6 py-3 rounded-lg transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
