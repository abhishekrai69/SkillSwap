import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { availableTags } from '../services/mockData';
import { Plus, Tag, Clock, Coins, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const PostSession: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addSession } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skillTitle: '',
    description: '',
    duration: 30,
    creditCost: 2,
    tags: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formData.tags.length === 0) {
      toast.error('Please select at least one tag');
      return;
    }

    setLoading(true);

    try {
      addSession({
        tutorId: user.id,
        tutorName: user.name,
        skillTitle: formData.skillTitle,
        description: formData.description,
        duration: formData.duration,
        creditCost: formData.creditCost,
        tags: formData.tags,
      });

      toast.success('Session posted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to post session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.02)_25%,rgba(16,185,129,0.02)_50%,transparent_50%,transparent_75%,rgba(16,185,129,0.02)_75%)] bg-[length:20px_20px]"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-bl from-emerald-200/20 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-teal-200/20 to-transparent rounded-full blur-2xl"></div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Plus className="h-8 w-8 text-purple-600" />
            Post a New Session
          </h1>
          <p className="text-gray-600">
            Share your knowledge and earn credits by teaching others.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skill Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Title
              </label>
              <input
                type="text"
                required
                value={formData.skillTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, skillTitle: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Guitar Basics for Beginners"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe what students will learn in your session..."
              />
            </div>

            {/* Duration and Credit Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration (minutes)
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Credit Cost
                </label>
                <select
                  value={formData.creditCost}
                  onChange={(e) => setFormData(prev => ({ ...prev, creditCost: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={1}>1 credit</option>
                  <option value={2}>2 credits</option>
                  <option value={3}>3 credits</option>
                  <option value={4}>4 credits</option>
                  <option value={5}>5 credits</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags (select at least one)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      formData.tags.includes(tag)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {formData.tags.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {formData.tags.join(', ')}
                </p>
              )}
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Session Preview
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {formData.skillTitle || 'Your Skill Title'}
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  {formData.description || 'Your session description will appear here...'}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>By {user?.name}</span>
                    <span>{formData.duration} min</span>
                  </div>
                  <span className="text-purple-600 font-medium">{formData.creditCost} credits</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || formData.tags.length === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? 'Posting...' : 'Post Session'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostSession;