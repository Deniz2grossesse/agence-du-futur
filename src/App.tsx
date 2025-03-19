
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Properties from "./pages/Properties";
import RentalProperties from "./pages/RentalProperties";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Users from "./pages/Users";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Applications from "./pages/Applications";
import TenantDashboard from "./pages/dashboards/TenantDashboard";
import OwnerDashboard from "./pages/dashboards/OwnerDashboard";
import AgentOperatorDashboard from "./pages/dashboards/AgentOperatorDashboard";
import MobileAgentDashboard from "./pages/dashboards/MobileAgentDashboard";
import AccessDenied from "./pages/AccessDenied";
import Notifications from "./pages/Notifications";

// Nouvelles pages dans le plan du site
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Maintenance from "./pages/Maintenance";
import Documents from "./pages/Documents";
import Owners from "./pages/Owners";
import Settings from "./pages/Settings";

// Page temporaire pour les routes en développement
const UnderDevelopment = ({ pageName }: { pageName: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{pageName}</h1>
    <p className="mt-4">Cette page est en cours de développement.</p>
  </div>
);

const Email = () => <UnderDevelopment pageName="E-mail" />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            
            {/* Routes accessibles à tous */}
            <Route path="/rental-properties" element={<RentalProperties />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/email" element={<Email />} />

            {/* Nouvelles routes selon l'arborescence du site */}
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/owners" element={<Owners />} />
            <Route path="/settings" element={<Settings />} />

            {/* Routes protégées pour tous les utilisateurs authentifiés */}
            <Route element={<ProtectedRoute allowedRoles={['administrator', 'mobile-agent', 'owner', 'tenant']} />}>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/messages" element={<Messages />} />
            </Route>

            {/* Routes pour Administrateur (Agent Opérateur) */}
            <Route element={<ProtectedRoute allowedRoles={['administrator']} />}>
              <Route path="/users" element={<Users />} />
              <Route path="/dashboard/agent-operator" element={<AgentOperatorDashboard />} />
            </Route>

            {/* Routes pour Agent Mobile */}
            <Route element={<ProtectedRoute allowedRoles={['mobile-agent']} />}>
              <Route path="/dashboard/mobile-agent" element={<MobileAgentDashboard />} />
            </Route>

            {/* Routes pour Propriétaire */}
            <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
              <Route path="/dashboard/owner" element={<OwnerDashboard />} />
            </Route>

            {/* Routes pour Locataire */}
            <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
              <Route path="/dashboard/tenant" element={<TenantDashboard />} />
            </Route>

            {/* Routes partagées entre plusieurs rôles */}
            <Route element={<ProtectedRoute allowedRoles={['administrator', 'owner', 'tenant']} />}>
              <Route path="/applications" element={<Applications />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['administrator', 'owner', 'tenant']} />}>
              <Route path="/properties" element={<Properties />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
