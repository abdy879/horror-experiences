import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Ghost, Plus, BookOpen, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CircularGallery from '../components/CircularGallery';
import StoryForm from '../components/StoryForm';
import LightRays from '../components/LightRays';
// StoryModal removed - now using separate page
import { sampleStories } from '../data/sampleStories';

function MainApp() {
  const navigate = useNavigate();
  const [stories, setStories] = useState(() => {
    // Load all sample stories without removing or filtering any
    // Add default votes if not present
    const allStories = sampleStories.map(story => ({
      ...story,
      votes: story.votes || { experienced: 0, fake: 0, couldBeTrue: 0 }
    }));
    
    // Save all stories to localStorage
    localStorage.setItem('horrorStories', JSON.stringify(allStories));
    
    return allStories;
  });

  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  // Modal removed - stories now open in separate page
  const [languageFilter, setLanguageFilter] = useState('all');
  const [centeredStoryIndex, setCenteredStoryIndex] = useState(0);
  const galleryRef = useRef(null);
  const lastKeyTime = useRef(0);

  useEffect(() => {
    localStorage.setItem('horrorStories', JSON.stringify(stories));
  }, [stories]);

  const addStory = (newStory) => {
    const story = {
      id: Date.now(),
      ...newStory,
      likes: 0,
      comments: [],
      votes: { experienced: 0, fake: 0, couldBeTrue: 0 },
      timestamp: new Date().toISOString(),
    };

    setStories([story, ...stories]);
    setShowForm(false);
  };

  const addComment = (storyId, comment) => {
    setStories(
      stories.map((story) => {
        if (story.id === storyId) {
          return {
            ...story,
            comments: [
              ...story.comments,
              {
                id: Date.now(),
                text: comment,
                author: 'Anonymous',
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return story;
      })
    );
  };

  const likeStory = (storyId) => {
    setStories(
      stories.map((story) =>
        story.id === storyId
          ? { ...story, likes: story.likes + 1 }
          : story
      )
    );
  };

  // handleLike and handleComment moved to StoryPage

  const filteredStories = useMemo(() => {
    if (languageFilter === 'all') return stories;
    return stories.filter(
      (story) => story.language === languageFilter
    );
  }, [stories, languageFilter]);

  const galleryItems = useMemo(() => {
    return filteredStories.map((story) => ({
      image: '/default-story-card.jpg',
      text: story.title,
      storyId: story.id,
    }));
  }, [filteredStories]);

  // Global keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only work on /app page and when not typing in inputs
      if (!window.location.pathname.includes('/app')) return;
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      // Debounce: prevent rapid-fire key presses (300ms between presses)
      const now = Date.now();
      if (now - lastKeyTime.current < 300) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        lastKeyTime.current = now;
        setCenteredStoryIndex(prev => {
          const newIndex = Math.max(0, prev - 1);
          galleryRef.current?.scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        lastKeyTime.current = now;
        setCenteredStoryIndex(prev => {
          const newIndex = Math.min(galleryItems.length - 1, prev + 1);
          galleryRef.current?.scrollToItem(newIndex);
          return newIndex;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryItems.length]);

  return (
    <div className="min-h-screen bg-horror-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 blood-splatter opacity-30"></div>
        <div className="absolute top-40 right-20 w-96 h-96 blood-splatter opacity-20"></div>
        <div className="absolute bottom-40 left-1/4 w-48 h-48 blood-splatter opacity-25"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-horror-blood/30 bg-horror-darker/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="p-2 text-horror-muted hover:text-horror-red transition-colors rounded"
              title="Back to Landing"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Language Filter */}
            <select
              value={languageFilter}
              onChange={(e) => {
                e.stopPropagation();
                setLanguageFilter(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              className="font-horror bg-horror-darker text-gray-100 px-4 py-2 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none text-sm"
            >
              <option value="all">All Languages</option>
              <option value="english">English</option>
              <option value="roman-urdu">Roman Urdu</option>
            </select>

            <button
              onClick={() => setShowForm(!showForm)}
              className="font-horror flex items-center gap-2 px-4 py-2 bg-horror-red hover:bg-horror-blood text-white rounded transition-all duration-300 horror-card glitch-hover"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">
                Share Experience
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-4">
        {showForm ? (
          <StoryForm
            onSubmit={addStory}
            onCancel={() => setShowForm(false)}
          />
        ) : activeTab === 'rules' ? (
          <div className="max-w-2xl mx-auto">
            <div className="horror-card bg-horror-dark rounded-lg p-8">
              <h2 className="font-horror text-3xl text-horror-red mb-6 text-glow">
                Enter at Your Own Risk
              </h2>

              <div className="space-y-4 text-gray-300 font-body">
                <p className="flex items-start gap-3">
                  <span className="text-horror-red font-bold">
                    1.
                  </span>
                  <span>
                    Be respectful of others' experiences. These are
                    real fears people are sharing.
                  </span>
                </p>

                <p className="flex items-start gap-3">
                  <span className="text-horror-red font-bold">
                    2.
                  </span>
                  <span>
                    No graphic content, gore, or explicit violence.
                    Psychological horror only.
                  </span>
                </p>

                <p className="flex items-start gap-3">
                  <span className="text-horror-red font-bold">
                    3.
                  </span>
                  <span>
                    Keep stories believable. The best horror feels
                    like it could happen to anyone.
                  </span>
                </p>

                <p className="flex items-start gap-3">
                  <span className="text-horror-red font-bold">
                    4.
                  </span>
                  <span>
                    Trigger warnings are appreciated for sensitive
                    topics.
                  </span>
                </p>

                <p className="flex items-start gap-3">
                  <span className="text-horror-red font-bold">
                    5.
                  </span>
                  <span>
                    Don't break character in comments. Maintain the
                    atmosphere.
                  </span>
                </p>
              </div>

              <div className="mt-8 p-4 bg-horror-red/10 border border-horror-red/30 rounded">
                <p className="text-horror-accent text-sm text-center italic">
                  "We do not own the darkness. We merely give it a
                  place to speak."
                </p>
              </div>
            </div>
          </div>
        ) : galleryItems.length === 0 ? (
          <div
            style={{
              height: '450px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="text-center">
              <p className="font-horror text-2xl text-horror-red text-glow mb-2">
                No Stories Found
              </p>
              <p className="text-horror-muted text-sm">
                The darkness is silent in this tongue...
              </p>
            </div>
          </div>
        ) : (
          <div style={{ height: '450px', position: 'relative' }}>
            {/* Light Rays Effect */}
            <div className="absolute inset-0 z-0">
              <LightRays
                raysOrigin="top-center"
                raysColor="#ff0000"
                raysSpeed={0.5}
                lightSpread={1.2}
                rayLength={2.0}
                followMouse={true}
                mouseInfluence={0.15}
                fadeDistance={1.5}
              />
            </div>
            <CircularGallery
              ref={galleryRef}
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
              font="bold 30px Creepster"
              onCardClick={(item, index) => {
                if (index !== undefined) {
                  setCenteredStoryIndex(index);
                }
                navigate(`/story/${item.storyId}`);
              }}
            />
          </div>
        )}
      </main>

      {/* Fog Effect */}
      <div className="fog"></div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-horror-blood/20 bg-horror-darker py-6 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-horror-muted text-sm font-body">
            Once you enter, you can never truly leave...
          </p>
        </div>
      </footer>

      {/* Story Modal removed - now using separate page */}
    </div>
  );
}

export default MainApp;