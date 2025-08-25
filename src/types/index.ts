export interface User {
  id: string;
  name: string;
  email: string;
  skillTags: string[];
  credits: number;
  avatar?: string;
}

export interface Session {
  id: string;
  tutorId: string;
  tutorName: string;
  skillTitle: string;
  description: string;
  duration: number;
  creditCost: number;
  tags: string[];
  createdAt: Date;
  isBooked?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, skillTags: string[]) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface AppContextType {
  sessions: Session[];
  addSession: (session: Omit<Session, 'id' | 'createdAt'>) => void;
  bookSession: (sessionId: string) => boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}