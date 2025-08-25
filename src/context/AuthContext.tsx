import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('skillswap_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const existingUsers = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
    const foundUser = existingUsers.find((u: User) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('skillswap_user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, skillTags: string[]): Promise<boolean> => {
    const existingUsers = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
    const userExists = existingUsers.some((u: User) => u.email === email);
    
    if (userExists) {
      toast.error('User already exists');
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      skillTags,
      credits: 5, // Starting credits
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('skillswap_users', JSON.stringify(updatedUsers));
    localStorage.setItem('skillswap_user', JSON.stringify(newUser));
    
    setUser(newUser);
    toast.success(`Welcome to SkillSwap, ${name}!`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillswap_user');
    toast.success('Logged out successfully');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
    
    // Update in users array
    const existingUsers = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
    const updatedUsers = existingUsers.map((u: User) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('skillswap_users', JSON.stringify(updatedUsers));
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};