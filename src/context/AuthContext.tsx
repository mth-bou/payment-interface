import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as authLogin, User } from '@/services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<User | undefined>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setIsAuthenticated(true);
      setUsername(savedUsername);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const user = await authLogin(username, password);
      if (user) {
        setIsAuthenticated(true);
        setUsername(username);
        localStorage.setItem('username', username);
      }
      return user;
    } catch (error) {
      setError('An error occurred: ' + error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setError(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
