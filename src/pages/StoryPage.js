import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Clock, User, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ScrollReveal from '../components/ScrollReveal';

function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userVotes, setUserVotes] = useState({});
  const scrollContainerRef = useRef(null);

  // Load user votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('userVotes');
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes));
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('horrorStories');
    const stories = saved ? JSON.parse(saved) : [];
    const foundStory = stories.find(s => s.id === parseInt(id));
    if (foundStory) {
      setStory(foundStory);
    } else {
      navigate('/app');
    }
  }, [id, navigate]);

  // Auto-format story content
  const formatContent = (content) => {
    if (!content) return '';
    
    return content
      // Remove excessive whitespace
      .replace(/\n{3,}/g, '\n\n')
      // Fix multiple spaces
      .replace(/[ \t]+/g, ' ')
      // Ensure proper line breaks after periods
      .replace(/\. ([A-Z])/g, '.\n\n$1')
      // Remove leading/trailing whitespace
      .trim();
  };

  // Handle share - copy link to clipboard
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    if (!isLiked && story) {
      const saved = localStorage.getItem('horrorStories');
      const stories = saved ? JSON.parse(saved) : [];
      const updatedStories = stories.map(s => 
        s.id === story.id ? { ...s, likes: s.likes + 1 } : s
      );
      localStorage.setItem('horrorStories', JSON.stringify(updatedStories));
      setStory({ ...story, likes: story.likes + 1 });
      setIsLiked(true);
    }
  };

  // Handle voting on story credibility
  const handleVote = (voteType) => {
    if (!story || userVotes[story.id]) return; // Already voted

    const saved = localStorage.getItem('horrorStories');
    const stories = saved ? JSON.parse(saved) : [];
    
    // Initialize votes if not present
    const currentVotes = story.votes || { experienced: 0, fake: 0, couldBeTrue: 0 };
    
    const updatedStories = stories.map(s => {
      if (s.id === story.id) {
        return {
          ...s,
          votes: {
            ...currentVotes,
            [voteType]: currentVotes[voteType] + 1
          }
        };
      }
      return s;
    });

    localStorage.setItem('horrorStories', JSON.stringify(updatedStories));
    
    // Update user votes
    const newUserVotes = { ...userVotes, [story.id]: voteType };
    localStorage.setItem('userVotes', JSON.stringify(newUserVotes));
    setUserVotes(newUserVotes);
    
    // Update local story state
    setStory({
      ...story,
      votes: {
        ...currentVotes,
        [voteType]: currentVotes[voteType] + 1
      }
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && story) {
      const comment = {
        id: Date.now(),
        text: newComment.trim(),
        author: 'Anonymous',
        timestamp: new Date().toISOString(),
      };
      
      const saved = localStorage.getItem('horrorStories');
      const stories = saved ? JSON.parse(saved) : [];
      const updatedStories = stories.map(s => 
        s.id === story.id ? { ...s, comments: [...s.comments, comment] } : s
      );
      localStorage.setItem('horrorStories', JSON.stringify(updatedStories));
      setStory({ ...story, comments: [...story.comments, comment] });
      setNewComment('');
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-horror-black flex items-center justify-center">
        <p className="text-horror-muted font-horror text-xl">Loading...</p>
      </div>
    );
  }

  const formattedContent = formatContent(story.content);

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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/app')}
            className="flex items-center gap-2 text-horror-muted hover:text-horror-red transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-horror">Back to Stories</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-140px)] overflow-y-auto" ref={scrollContainerRef}>
        <article className="horror-card bg-horror-dark rounded-lg overflow-hidden">
          {/* Story Header */}
          <div className="p-8 border-b border-horror-blood/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-horror-muted text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDistanceToNow(new Date(story.timestamp), { addSuffix: true })}
              </span>
            </div>
            
            <h1 className="font-horror text-4xl text-gray-100 text-glow mb-4">
              {story.title}
            </h1>
            
            <div className="flex items-center gap-2 text-horror-muted">
              <User className="w-5 h-5" />
              <span>by <span className="text-gray-400">{story.author}</span></span>
            </div>
          </div>

          {/* Story Content with ScrollReveal */}
          <div className="p-8">
            <ScrollReveal
              scrollContainerRef={scrollContainerRef}
              enableBlur={true}
              baseOpacity={0.1}
              baseRotation={1}
              blurStrength={6}
              containerClassName="text-gray-300 font-body leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere min-h-[60vh]"
              textClassName="text-lg"
              rotationEnd="bottom center"
              wordAnimationEnd="bottom center"
            >
              {formattedContent}
            </ScrollReveal>

            {/* Voting Section */}
            <div className="mt-12 pt-8 border-t border-horror-blood/20">
              <p className="text-horror-muted text-sm mb-4 font-horror">What do you think of this story?</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'experienced', label: 'I have experienced the same', color: 'bg-green-600 hover:bg-green-700' },
                  { key: 'fake', label: 'Fake', color: 'bg-red-600 hover:bg-red-700' },
                  { key: 'couldBeTrue', label: 'Could be true', color: 'bg-yellow-600 hover:bg-yellow-700' }
                ].map(({ key, label, color }) => {
                  const votes = story.votes || { experienced: 0, fake: 0, couldBeTrue: 0 };
                  const count = votes[key];
                  const hasVoted = userVotes[story.id] === key;
                  const userHasVoted = !!userVotes[story.id];
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleVote(key)}
                      disabled={userHasVoted}
                      className={`px-4 py-2 rounded text-white text-sm font-medium transition-all ${
                        hasVoted 
                          ? 'ring-2 ring-white ' + color.replace('hover:', '')
                          : userHasVoted
                            ? 'opacity-50 cursor-not-allowed bg-gray-600'
                            : color
                      }`}
                    >
                      {label} ({count})
                    </button>
                  );
                })}
              </div>
              {userVotes[story.id] && (
                <p className="text-horror-accent text-xs mt-3 italic">
                  You voted: "{
                    userVotes[story.id] === 'experienced' ? 'I have experienced the same' :
                    userVotes[story.id] === 'fake' ? 'Fake' : 'Could be true'
                  }"
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 bg-horror-darker/50 border-t border-horror-blood/10 flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${
                isLiked ? 'text-horror-red' : 'text-gray-400 hover:text-horror-red'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              <span>{story.likes}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-2 transition-colors ${
                showComments ? 'text-horror-accent' : 'text-gray-400 hover:text-horror-accent'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
              <span>{story.comments.length}</span>
            </button>

            <button 
              onClick={handleShare}
              className={`flex items-center gap-2 transition-colors ml-auto ${
                copied ? 'text-green-500' : 'text-gray-400 hover:text-gray-200'
              }`}
              title={copied ? 'Link copied!' : 'Share story'}
            >
              {copied ? <Check className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="px-8 py-6 bg-horror-darker border-t border-horror-blood/10">
              {story.comments.length > 0 && (
                <div className="space-y-4 mb-6">
                  <h3 className="font-horror text-xl text-gray-100 mb-4">Comments</h3>
                  {story.comments.map(comment => (
                    <div key={comment.id} className="bg-horror-dark/50 rounded p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-horror-red font-medium">{comment.author}</span>
                        <span className="text-horror-muted text-xs">
                          {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-300 break-words overflow-wrap-anywhere">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmitComment} className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts... if you dare"
                  className="flex-1 bg-horror-dark text-gray-100 px-4 py-3 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none focus:ring-1 focus:ring-horror-red/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-horror-red hover:bg-horror-blood text-white rounded transition-colors font-horror"
                >
                  Comment
                </button>
              </form>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-horror-blood/20 bg-horror-darker py-6 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-horror-muted text-sm font-body">
            Once you enter, you can never truly leave...
          </p>
        </div>
      </footer>
    </div>
  );
}

export default StoryPage;
