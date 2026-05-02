import React, { useState, useRef } from 'react';
import { X, Heart, MessageCircle, Share2, Clock, User, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ScrollReveal from './ScrollReveal';

function StoryModal({ story, onClose, onLike, onComment }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const scrollContainerRef = useRef(null);

  if (!story) return null;

  const handleLike = () => {
    if (!isLiked) {
      onLike();
      setIsLiked(true);
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(newComment.trim());
      setNewComment('');
    }
  };

  const categoryColors = {
    'Supernatural': 'text-purple-400 border-purple-400/30',
    'Urban': 'text-gray-400 border-gray-400/30',
    'Haunted': 'text-horror-accent border-horror-accent/30',
    'Technological': 'text-cyan-400 border-cyan-400/30',
    'Children': 'text-yellow-400 border-yellow-400/30',
    'Creature': 'text-green-400 border-green-400/30',
    'Psychological': 'text-pink-400 border-pink-400/30',
    'True Crime': 'text-red-400 border-red-400/30',
    'Cursed Objects': 'text-orange-400 border-orange-400/30',
    'Rituals': 'text-indigo-400 border-indigo-400/30',
  };

  const colorClass = categoryColors[story.category] || 'text-gray-400 border-gray-400/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="horror-card bg-horror-dark rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-horror-dark/95 backdrop-blur-sm p-6 border-b border-horror-blood/20 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-horror-muted text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(new Date(story.timestamp), { addSuffix: true })}
              </span>
            </div>
            <h2 className="font-horror text-3xl text-gray-100 text-glow mb-2">
              {story.title}
            </h2>
            <div className="flex items-center gap-2 text-horror-muted text-sm">
              <User className="w-4 h-4" />
              <span>by <span className="text-gray-400">{story.author}</span></span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-horror-red transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content with ScrollReveal Animation */}
        <div className="p-6" ref={scrollContainerRef}>
          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.2}
            baseRotation={2}
            blurStrength={8}
            containerClassName="text-gray-300 font-body leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere"
            textClassName="text-lg"
            rotationEnd="center center"
            wordAnimationEnd="center center"
          >
            {story.content}
          </ScrollReveal>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-horror-darker/50 border-t border-horror-blood/10 flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? 'text-horror-red' : 'text-gray-400 hover:text-horror-red'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{story.likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 transition-colors ${
              showComments ? 'text-horror-accent' : 'text-gray-400 hover:text-horror-accent'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{story.comments.length}</span>
          </button>

          <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors ml-auto">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="px-6 py-4 bg-horror-darker border-t border-horror-blood/10">
            {story.comments.length > 0 && (
              <div className="space-y-4 mb-4">
                {story.comments.map(comment => (
                  <div key={comment.id} className="bg-horror-dark/50 rounded p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-horror-red text-sm font-medium">{comment.author}</span>
                      <span className="text-horror-muted text-xs">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 bg-horror-dark text-gray-300 px-4 py-2 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-horror-red/80 hover:bg-horror-red disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryModal;
