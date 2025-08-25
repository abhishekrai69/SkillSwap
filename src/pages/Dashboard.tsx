import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import SessionCard from '../components/SessionCard';
import SearchFilters from '../components/SearchFilters';
import toast from 'react-hot-toast';
import { TrendingUp, Users, BookOpen, Search } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { sessions, bookSession, searchTerm, setSearchTerm, selectedTags, setSelectedTags } = useApp();

  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      // Don't show user's own sessions
      if (session.tutorName === user?.name) return false;
      
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        session.skillTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.tutorName.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => session.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [sessions, searchTerm, selectedTags, user?.name]);

  const handleBookSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session || !user) return;

    if (user.credits < session.creditCost) {
      toast.error('Insufficient credits!');
      return;
    }

    const success = bookSession(sessionId);
    if (success) {
      updateUser({ credits: user.credits - session.creditCost });
      toast.success(`Session booked! You now have ${user.credits - session.creditCost} credits.`);
    }
  };

  const stats = [
    {
      icon: BookOpen,
      label: 'Available Sessions',
      value: filteredSessions.filter(s => !s.isBooked).length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Users,
      label: 'Total Tutors',
      value: new Set(sessions.map(s => s.tutorId)).size,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      label: 'Sessions This Week',
      value: sessions.length,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.05)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Discover amazing skills from our community of learners and teachers.
          </p>
        </div>

        {/* Stats Cards */}
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

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />

        {/* Sessions Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available Sessions {filteredSessions.length > 0 && `(${filteredSessions.length})`}
          </h2>
          
          {filteredSessions.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-600">
                Try adjusting your search filters or check back later for new sessions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onBook={handleBookSession}
                  canBook={user ? user.credits >= session.creditCost : false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;