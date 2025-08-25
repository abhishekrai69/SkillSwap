import React from 'react';
import { Search, Tag, X } from 'lucide-react';
import { availableTags } from '../services/mockData';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagsChange,
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    onSearchChange('');
    onTagsChange([]);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-6 mb-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search sessions by title or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Tags Filter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Filter by Tags
            </h3>
            {(searchTerm || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {selectedTags.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;