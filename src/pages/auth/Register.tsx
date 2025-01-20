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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

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
      <div className="space-y-2">
        <Label>Situation</Label>
        <RadioGroup defaultValue="cdi">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cdi" id="cdi" />
            <Label htmlFor="cdi">CDI</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cdd" id="cdd" />
            <Label htmlFor="cdd">CDD</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="freelance" id="freelance" />
            <Label htmlFor="freelance">Freelance</Label>
          </div>
        </RadioGroup>
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
      <div className="space-y-2">
        <Label>Type de bien principal</Label>
        <RadioGroup defaultValue="apartment">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="apartment" id="apartment" />
            <Label htmlFor="apartment">Appartement</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="house" id="house" />
            <Label htmlFor="house">Maison</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="commercial" id="commercial" />
            <Label htmlFor="commercial">Local commercial</Label>
          </div>
        </RadioGroup>
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
      <div className="space-y-2">
        <Label>Spécialisation</Label>
        <RadioGroup defaultValue="residential">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="residential" id="residential" />
            <Label htmlFor="residential">Résidentiel</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="commercial" id="commercial" />
            <Label htmlFor="commercial">Commercial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="luxury" id="luxury" />
            <Label htmlFor="luxury">Luxe</Label>
          </div>
        </RadioGroup>
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
      <div className="space-y-2">
        <Label>Type de transport</Label>
        <RadioGroup defaultValue="car">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="car" id="car" />
            <Label htmlFor="car">Voiture</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="motorcycle" id="motorcycle" />
            <Label htmlFor="motorcycle">Moto/Scooter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public">Transport en commun</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inscription réussie !");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>
            {step === 1
              ? "Choisissez votre type de profil"
              : "Complétez vos informations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button
                  type="button"
                  onClick={() => userType && setStep(2)}
                  className="w-full"
                  disabled={!userType}
                >
                  Suivant
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" type="text" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>

                {userType === "tenant" && renderTenantFields()}
                {userType === "owner" && renderOwnerFields()}
                {userType === "agent" && renderAgentFields()}
                {userType === "mobile-agent" && renderMobileAgentFields()}

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
              </>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/auth/login")}
              className="w-full"
            >
              Déjà inscrit ? Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;