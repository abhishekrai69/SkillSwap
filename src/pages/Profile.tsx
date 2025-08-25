import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import SessionCard from '../components/SessionCard';
import { User, Mail, Tag, BookOpen, Trophy, Edit2, Save, X } from 'lucide-react';
import { availableTags } from '../services/mockData';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { sessions } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    skillTags: user?.skillTags || [],
  });

  const userSessions = sessions.filter(session => session.tutorId === user?.id);
  const bookedSessions = sessions.filter(session => 
    session.isBooked && session.tutorId !== user?.id
  );

  const handleTagToggle = (tag: string) => {
    setEditForm(prev => ({
      ...prev,
      skillTags: prev.skillTags.includes(tag)
        ? prev.skillTags.filter(t => t !== tag)
        : [...prev.skillTags, tag]
    }));
  };

  const handleSave = () => {
    if (editForm.skillTags.length === 0) {
      toast.error('Please select at least one skill tag');
      return;
    }

    updateUser({
      name: editForm.name,
      skillTags: editForm.skillTags,
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      skillTags: user?.skillTags || [],
    });
    setIsEditing(false);
  };

  const totalCreditsEarned = userSessions
    .filter(s => s.isBooked)
    .reduce((total, s) => total + s.creditCost, 0);

  const stats = [
    {
      icon: BookOpen,
      label: 'Sessions Posted',
      value: userSessions.length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Trophy,
      label: 'Credits Earned',
      value: totalCreditsEarned,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: User,
      label: 'Sessions Taken',
      value: bookedSessions.length,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.04),transparent_50%)]"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-bl from-violet-200/15 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-purple-200/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                )}
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Your Skills
            </label>
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        editForm.skillTags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {editForm.skillTags.length > 0 && (
                  <p className="text-sm text-gray-600">
                    Selected: {editForm.skillTags.length} skills
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user?.skillTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sessions Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posted Sessions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Posted Sessions ({userSessions.length})
            </h2>
            {userSessions.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions posted yet</h3>
                <p className="text-gray-600">Start sharing your knowledge with the community!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userSessions.map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    canBook={false}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Booked Sessions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sessions You've Booked ({bookedSessions.length})
            </h2>
            {bookedSessions.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions booked yet</h3>
                <p className="text-gray-600">Explore the dashboard to find interesting sessions!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookedSessions.map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    canBook={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;