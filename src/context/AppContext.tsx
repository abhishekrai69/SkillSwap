import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, AppContextType } from '../types';
import { mockSessions } from '../services/mockData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // Load sessions from localStorage or use mock data
    const savedSessions = localStorage.getItem('skillswap_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    } else {
      setSessions(mockSessions);
      localStorage.setItem('skillswap_sessions', JSON.stringify(mockSessions));
    }
  }, []);

  const addSession = (sessionData: Omit<Session, 'id' | 'createdAt'>) => {
    const newSession: Session = {
      ...sessionData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('skillswap_sessions', JSON.stringify(updatedSessions));
  };

  const bookSession = (sessionId: string): boolean => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session || session.isBooked) return false;

    const updatedSessions = sessions.map(s => 
      s.id === sessionId ? { ...s, isBooked: true } : s
    );
    setSessions(updatedSessions);
    localStorage.setItem('skillswap_sessions', JSON.stringify(updatedSessions));
    return true;
  };

  const value: AppContextType = {
    sessions,
    addSession,
    bookSession,
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};