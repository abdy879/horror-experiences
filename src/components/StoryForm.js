import React, { useState } from 'react';
import { X, AlertTriangle, Ghost, Skull, Eye, Languages } from 'lucide-react';

function StoryForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    language: 'english',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Every nightmare needs a name';
    if (!formData.author.trim()) newErrors.author = 'The darkness wants to know who you are';
    if (!formData.content.trim()) newErrors.content = 'Your story remains untold';
    if (formData.content.length < 100) newErrors.content = 'The spirits demand more details (minimum 100 characters)';
    return newErrors;
  };

  // Auto-format story content for neat display
  const formatContent = (content) => {
    return content
      // Remove excessive whitespace
      .replace(/\n{3,}/g, '\n\n')
      // Fix multiple spaces
      .replace(/[ \t]+/g, ' ')
      // Ensure proper line breaks after periods (if no existing break)
      .replace(/\.([A-Z])/g, '.\n\n$1')
      // Remove leading/trailing whitespace
      .trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Format content before submission
      const formattedData = {
        ...formData,
        content: formatContent(formData.content)
      };
      onSubmit(formattedData);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="horror-card bg-horror-dark rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-horror-blood/20 bg-horror-darker/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skull className="w-6 h-6 text-horror-red" />
              <h2 className="font-horror text-2xl text-gray-100">Share Your Terror</h2>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-horror-red transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Warning */}
        <div className="px-6 pt-4">
          <div className="bg-horror-red/10 border border-horror-red/30 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-horror-red flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-horror-red font-medium text-sm">Warning</p>
              <p className="text-gray-400 text-sm mt-1">
                Once shared, your story becomes part of the darkness. Others may read it, 
                and some things, once spoken, cannot be unsaid.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <Ghost className="w-4 h-4 text-horror-red" />
              Title of Your Nightmare
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What haunts you?"
              className="w-full bg-horror-darker text-gray-100 px-4 py-3 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none focus:ring-1 focus:ring-horror-red/50"
            />
            {errors.title && <p className="text-horror-red text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-horror-red" />
              Your Alias
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="How should we know you?"
              className="w-full bg-horror-darker text-gray-100 px-4 py-3 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none focus:ring-1 focus:ring-horror-red/50"
            />
            {errors.author && <p className="text-horror-red text-sm mt-1">{errors.author}</p>}
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4 text-horror-red" />
              Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full bg-horror-darker text-gray-100 px-4 py-3 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none focus:ring-1 focus:ring-horror-red/50"
            >
              <option value="english">English</option>
              <option value="roman-urdu">Roman Urdu</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-horror-red" />
              Your Experience
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              placeholder="Tell us what happened... Every detail matters. The darkness is listening."
              className="w-full bg-horror-darker text-gray-100 px-4 py-3 rounded border border-horror-blood/30 focus:border-horror-red focus:outline-none focus:ring-1 focus:ring-horror-red/50 resize-y"
            />
            <div className="flex justify-between mt-1">
              {errors.content ? (
                <p className="text-horror-red text-sm">{errors.content}</p>
              ) : (
                <span></span>
              )}
              <span className={`text-xs ${formData.content.length < 100 ? 'text-horror-muted' : 'text-green-500'}`}>
                {formData.content.length} / 100 minimum
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-horror-darker text-gray-400 rounded border border-horror-blood/30 hover:text-gray-200 hover:border-horror-blood/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-horror-red hover:bg-horror-blood disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-all horror-card font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Submit to the Void'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoryForm;
