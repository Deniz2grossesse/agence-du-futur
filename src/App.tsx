
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/users" element={<Users />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Routes des tableaux de bord spécifiques */}
          <Route path="/dashboard/tenant" element={<TenantDashboard />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/agent-operator" element={<AgentOperatorDashboard />} />
          <Route path="/dashboard/mobile-agent" element={<MobileAgentDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
