import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainApp = lazy(() => import('./pages/MainApp'));
const StoryPage = lazy(() => import('./pages/StoryPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-horror-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-horror-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-horror-muted font-horror">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
