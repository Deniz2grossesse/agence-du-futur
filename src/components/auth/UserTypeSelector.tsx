
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface UserTypeSelectorProps {
  userType: string;
  setUserType: (value: string) => void;
  onContinue: () => void;
  onLogin: () => void;
}

const UserTypeSelector = ({ userType, setUserType, onContinue, onLogin }: UserTypeSelectorProps) => {
  return (
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
            <SelectItem value="agent-operator">Agent Opérateur</SelectItem>
            <SelectItem value="mobile-agent">Agent Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        onClick={onContinue}
        className="w-full"
        disabled={!userType}
      >
        Suivant
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onLogin}
        className="w-full"
      >
        Déjà inscrit ? Se connecter
      </Button>
    </>
  );
};

export default UserTypeSelector;
