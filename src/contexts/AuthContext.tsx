
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => void;
  register: (userData: Partial<User>) => void;
  logout: () => void;
  isAuthorized: (allowedRoles: UserRole[]) => boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  // Simuler la vérification du token au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        localStorage.removeItem('user');
        setAuthState({ ...initialState, isLoading: false });
      }
    } else {
      setAuthState({ ...initialState, isLoading: false });
    }
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    // Simuler une connexion API
    setAuthState({ isLoading: true, user: null, isAuthenticated: false });
    
    // Simulation d'un délai de réseau
    setTimeout(() => {
      // Utilisateur simulé basé sur les rôles réels
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000),
        name: email.split('@')[0],
        email,
        role,
        properties: role === 'owner' ? 2 : 0,
        status: 'active',
        joinDate: new Date().toLocaleDateString('fr-FR')
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success(`Connexion réussie en tant que ${getRoleFrenchLabel(role)}`);
      
      // Redirection vers le tableau de bord correspondant
      navigateToDashboard(role);
    }, 1000);
  };

  const register = (userData: Partial<User>) => {
    // Simuler une inscription API
    setAuthState({ isLoading: true, user: null, isAuthenticated: false });
    
    // Simulation d'un délai de réseau
    setTimeout(() => {
      const role = userData.role as UserRole;
      
      // Création d'un utilisateur fictif
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000),
        name: userData.name || '',
        email: userData.email || '',
        role: role,
        properties: role === 'owner' ? (userData.properties || 0) : 0,
        status: 'active',
        joinDate: new Date().toLocaleDateString('fr-FR'),
        ...userData
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success(`Inscription réussie en tant que ${getRoleFrenchLabel(role)}`);
      
      // Redirection vers le tableau de bord correspondant
      navigateToDashboard(role);
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    toast.info('Déconnexion réussie');
    navigate('/auth/login');
  };

  const isAuthorized = (allowedRoles: UserRole[]) => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }
    return allowedRoles.includes(authState.user.role);
  };

  const navigateToDashboard = (role: UserRole) => {
    switch(role) {
      case 'administrator':
        navigate('/dashboard/agent-operator');
        break;
      case 'mobile-agent':
        navigate('/dashboard/mobile-agent');
        break;
      case 'owner':
        navigate('/dashboard/owner');
        break;
      case 'tenant':
        navigate('/dashboard/tenant');
        break;
      default:
        navigate('/');
    }
  };

  const getRoleFrenchLabel = (role: UserRole): string => {
    switch(role) {
      case 'administrator':
        return 'Administrateur';
      case 'mobile-agent':
        return 'Agent Mobile';
      case 'owner':
        return 'Propriétaire';
      case 'tenant':
        return 'Locataire';
      default:
        return role;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        isAuthorized
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
