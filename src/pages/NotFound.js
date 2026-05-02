import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-horror-black flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 blood-splatter opacity-20"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 blood-splatter opacity-15"></div>
      </div>

      <div className="text-center relative z-10 max-w-lg">
        <Ghost className="w-24 h-24 text-horror-red mx-auto mb-6 animate-pulse" />
        
        <h1 className="font-horror text-6xl text-horror-red text-glow mb-4">
          404
        </h1>
        
        <h2 className="font-horror text-2xl text-gray-300 mb-4">
          Lost in the Darkness
        </h2>
        
        <p className="text-horror-muted mb-8 font-body">
          The page you seek has vanished into the void. Perhaps it was never meant to be found...
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-horror-darker hover:bg-horror-dark text-gray-300 rounded transition-colors horror-card"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={() => navigate('/app')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-horror-red hover:bg-horror-blood text-white rounded transition-colors horror-card"
          >
            <Home className="w-5 h-5" />
            <span>Return to Stories</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
