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

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [step, setStep] = useState(1);

  const renderTenantFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="income">Revenu mensuel</Label>
        <Input id="income" type="number" placeholder="2000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="job">Profession</Label>
        <Input id="job" type="text" placeholder="Développeur" />
      </div>
    </>
  );

  const renderOwnerFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="properties">Nombre de biens</Label>
        <Input id="properties" type="number" placeholder="1" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="siret">Numéro SIRET (si applicable)</Label>
        <Input id="siret" type="text" />
      </div>
    </>
  );

  const renderAgentFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="agency">Nom de l'agence</Label>
        <Input id="agency" type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="license">Numéro de carte professionnelle</Label>
        <Input id="license" type="text" />
      </div>
    </>
  );

  const renderMobileAgentFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="zone">Zone géographique</Label>
        <Input id="zone" type="text" placeholder="Paris" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="availability">Disponibilités</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choisir vos disponibilités" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Temps plein</SelectItem>
            <SelectItem value="part">Temps partiel</SelectItem>
            <SelectItem value="weekend">Week-ends uniquement</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>
            {step === 1
              ? "Créez votre compte en quelques étapes"
              : "Complétez votre profil"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {step === 1 ? (
              <>
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
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </>
            ) : (
              <>
                {userType === "tenant" && renderTenantFields()}
                {userType === "owner" && renderOwnerFields()}
                {userType === "agent" && renderAgentFields()}
                {userType === "mobile-agent" && renderMobileAgentFields()}
              </>
            )}
            <div className="flex flex-col space-y-4">
              {step === 1 ? (
                <Button
                  type="button"
                  onClick={() => userType && setStep(2)}
                  className="w-full"
                >
                  Suivant
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full"
                  >
                    Retour
                  </Button>
                  <Button type="submit" className="w-full">
                    S'inscrire
                  </Button>
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/auth/login")}
              >
                Déjà inscrit ? Se connecter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;