
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success(`Connexion réussie en tant que ${getUserTypeLabel(userType)}`);
    
    // Redirection vers le tableau de bord correspondant au type d'utilisateur
    switch(userType) {
      case "tenant":
        navigate("/dashboard/tenant");
        break;
      case "owner":
        navigate("/dashboard/owner");
        break;
      case "agent-operator":
        navigate("/dashboard/agent-operator");
        break;
      case "mobile-agent":
        navigate("/dashboard/mobile-agent");
        break;
      default:
        navigate("/");
    }
  };

  const getUserTypeLabel = (type: string) => {
    switch(type) {
      case 'tenant':
        return 'Locataire';
      case 'owner':
        return 'Propriétaire';
      case 'agent-operator':
        return 'Agent Opérateur';
      case 'mobile-agent':
        return 'Agent Mobile';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="userType">Type d'utilisateur</Label>
              <Select
                value={userType}
                onValueChange={setUserType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre profil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">Locataire</SelectItem>
                  <SelectItem value="owner">Propriétaire</SelectItem>
                  <SelectItem value="agent-operator">Agent Opérateur</SelectItem>
                  <SelectItem value="mobile-agent">Agent Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemple@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" />
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={!userType}>
                Se connecter
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/auth/register")}
              >
                Créer un compte
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
