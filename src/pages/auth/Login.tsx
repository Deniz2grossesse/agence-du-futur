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

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

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
          <form className="space-y-4">
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
                  <SelectItem value="agent">Agent Immobilier</SelectItem>
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
              <Button type="submit" className="w-full">
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