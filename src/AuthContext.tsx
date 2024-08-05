import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJwtToken from './utils/decodeJwtToken';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(
          'http://10.0.2.2:8080/api/auth/validate-token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
          },
        );
        const data = await response.json();
        if (data.isValid) {
          setUser(decodeJwtToken(token));
        } else {
          await AsyncStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setUser(decodeJwtToken(token));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout, loading}}>
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
