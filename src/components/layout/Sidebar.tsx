
import { Link, useLocation } from "react-router-dom";
import { 
  Building2, Calendar, Home, MessageSquare, UsersIcon, LogIn, FileText, 
  UserCog, UserCircle, Car, LogOut, PieChart, UserIcon, Bell, MailOpen, 
  Building, DollarSign, Wrench, Settings, FileUp, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Structure complète de la navigation selon l'arborescence demandée
  const mainNavigation = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Biens Locatifs", icon: Building, path: "/rental-properties" },
    { name: "Locataires", icon: Users, path: "/tenants" },
    { name: "Paiements", icon: DollarSign, path: "/payments" },
    { name: "Travaux & Maintenance", icon: Wrench, path: "/maintenance" },
    { name: "Planning", icon: Calendar, path: "/calendar" },
    { name: "Documents", icon: FileText, path: "/documents" },
    { name: "Propriétaires", icon: Building2, path: "/owners" },
    { name: "Paramètres", icon: Settings, path: "/settings" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
    { name: "E-mail", icon: MailOpen, path: "/email" },
  ];

  // Filtrer la navigation en fonction du rôle utilisateur
  const filteredNavigation = isAuthenticated 
    ? mainNavigation.filter(item => {
        if (!user) return false;
        
        // Si l'utilisateur est un locataire, lui donner un accès limité
        if (user.role === 'tenant') {
          // Les locataires ne voient que leur dashboard, les propriétés à louer, 
          // leurs documents, le calendrier pour les visites, les notifications et les emails
          return ["/", "/rental-properties", "/documents", "/calendar", "/notifications", "/email"].includes(item.path);
        }
        
        // Pour les autres rôles, appliquer les filtres existants
        switch (item.path) {
          case "/settings":
          case "/users":
            return user.role === 'administrator';
          case "/owners":
            return user.role === 'administrator' || user.role === 'mobile-agent';
          case "/tenants":
            return user.role === 'administrator' || user.role === 'mobile-agent' || user.role === 'owner';
          default:
            return true;
        }
      })
    : mainNavigation.filter(item => ["/", "/rental-properties", "/notifications", "/email"].includes(item.path));

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col transition-all duration-300 ease-in-out bg-white border-r border-gray-200",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className={cn("font-semibold transition-all", expanded ? "opacity-100" : "opacity-0")}>
          RealEstate SaaS
        </h1>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={expanded ? "M15 19l-7-7 7-7" : "M9 19l7-7-7-7"}
            />
          </svg>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all",
              location.pathname === item.path
                ? "bg-primary text-white"
                : "hover:bg-gray-100",
              !expanded && "justify-center"
            )}
          >
            <item.icon className="w-6 h-6" />
            {expanded && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {isAuthenticated ? (
          <div className="flex flex-col space-y-2">
            {expanded && user && (
              <div className="mb-2">
                <div className="flex items-center space-x-2">
                  {getRoleIcon(user.role)}
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{getRoleFrenchLabel(user.role)}</p>
                  </div>
                </div>
              </div>
            )}
            <Button
              variant="outline"
              onClick={logout}
              className={cn(
                "flex items-center",
                !expanded && "justify-center"
              )}
            >
              <LogOut className="w-5 h-5" />
              {expanded && <span className="ml-2">Déconnexion</span>}
            </Button>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className={cn(
              "flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all mt-auto",
              location.pathname === "/auth/login"
                ? "bg-primary text-white"
                : "hover:bg-gray-100",
              !expanded && "justify-center"
            )}
          >
            <LogIn className="w-6 h-6" />
            {expanded && <span className="ml-3">Connexion</span>}
          </Link>
        )}
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

const getRoleIcon = (role: string) => {
  switch(role) {
    case 'administrator':
      return <UserCog className="w-6 h-6 text-purple-500" />;
    case 'mobile-agent':
      return <Car className="w-6 h-6 text-orange-500" />;
    case 'owner':
      return <Building2 className="w-6 h-6 text-green-500" />;
    case 'tenant':
      return <UserCircle className="w-6 h-6 text-blue-500" />;
    default:
      return <UserIcon className="w-6 h-6 text-gray-500" />;
  }
};

export default Sidebar;
