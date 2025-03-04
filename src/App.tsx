
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Properties from "./pages/Properties";
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
