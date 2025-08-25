import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Coins, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`transition-colors ${
                isActive('/dashboard')
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/post-session"
              className={`transition-colors ${
                isActive('/post-session')
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Post Session
            </Link>
            <Link
              to="/profile"
              className={`transition-colors ${
                isActive('/profile')
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Profile
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-full">
              <Coins className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-700">{user.credits}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;