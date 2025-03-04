
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

const AccessDenied = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Accès refusé</h1>
        <p className="text-gray-600 mb-6">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
          {user && (
            <span className="block mt-2">
              Votre compte est de type <strong>{getRoleFrenchLabel(user.role)}</strong>.
            </span>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/')} variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Button>
          <Button onClick={logout}>
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

const getRoleFrenchLabel = (role: string): string => {
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

export default AccessDenied;
