import React from 'react';
import { useNavigate } from 'react-router-dom';
import GhostCursor from '../components/GhostCursor';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ghost Cursor - Custom Settings */}
      <GhostCursor
        color="#d8c9ca"
        brightness={1.5}
        edgeIntensity={0}
        trailLength={30}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.08}
        bloomRadius={0.4}
        bloomThreshold={0.05}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
        zIndex={5}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 blood-splatter opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 blood-splatter opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <button
          onClick={() => navigate('/app')}
          className="font-horror horror-text tracking-wider"
          style={{ fontSize: '6rem' }}
        >
          SUFFER
        </button>
      </div>

      {/* Fog Effect */}
      <div className="fog"></div>
    </div>
  );
}

export default LandingPage;
