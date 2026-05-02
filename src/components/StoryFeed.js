import React, { useState } from 'react';
import { Filter, TrendingUp, Clock, Tag } from 'lucide-react';
import StoryCard from './StoryCard';
import { categories } from '../data/sampleStories';
import { formatDistanceToNow } from 'date-fns';

function StoryFeed({ stories, onLike, onComment }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedStory, setExpandedStory] = useState(null);

  const filteredStories = selectedCategory === 'All' 
    ? stories 
    : stories.filter(s => s.category === selectedCategory);

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'popular') return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-horror-dark p-4 rounded-lg border border-horror-blood/20">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-horror-red" />
          <span className="text-gray-300 font-medium">Filter:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-horror-darker text-gray-300 px-3 py-1.5 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('newest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
              sortBy === 'newest'
                ? 'bg-horror-red text-white'
                : 'bg-horror-darker text-gray-400 hover:text-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            Newest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
              sortBy === 'popular'
                ? 'bg-horror-red text-white'
                : 'bg-horror-darker text-gray-400 hover:text-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Popular
          </button>
        </div>
      </div>

      {/* Stories Count */}
      <p className="text-horror-muted text-sm">
        Showing {sortedStories.length} {sortedStories.length === 1 ? 'story' : 'stories'}
        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
      </p>

      {/* Stories Grid */}
      {sortedStories.length > 0 ? (
        <div className="grid gap-6">
          {sortedStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              isExpanded={expandedStory === story.id}
              onToggle={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
              onLike={() => onLike(story.id)}
              onComment={(comment) => onComment(story.id, comment)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-horror-muted text-lg">No stories found in this category...</p>
          <p className="text-horror-blood text-sm mt-2">The darkness is silent here.</p>
        </div>
      )}
    </div>
  );
}

export default StoryFeed;
