
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserCircle, User, Building, UserCog, Car } from "lucide-react";

interface UserTypeSelectorProps {
  userType: string;
  setUserType: (value: string) => void;
  onContinue: () => void;
  onLogin: () => void;
}

const UserTypeSelector = ({ userType, setUserType, onContinue, onLogin }: UserTypeSelectorProps) => {
  return (
    <>
      <div className="space-y-4">
        <Label htmlFor="userType">Type d'utilisateur</Label>
        
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${userType === "tenant" ? "border-primary bg-primary/5" : "hover:bg-gray-50"}`}
            onClick={() => setUserType("tenant")}
          >
            <UserCircle className="h-10 w-10 mb-2 text-blue-500" />
            <span className="font-medium">Locataire</span>
            <span className="text-xs text-gray-500">Recherche de logement</span>
          </div>
          
          <div 
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${userType === "owner" ? "border-primary bg-primary/5" : "hover:bg-gray-50"}`}
            onClick={() => setUserType("owner")}
          >
            <Building className="h-10 w-10 mb-2 text-green-500" />
            <span className="font-medium">Propriétaire</span>
            <span className="text-xs text-gray-500">Gestion de biens</span>
          </div>
          
          <div 
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${userType === "administrator" ? "border-primary bg-primary/5" : "hover:bg-gray-50"}`}
            onClick={() => setUserType("administrator")}
          >
            <UserCog className="h-10 w-10 mb-2 text-purple-500" />
            <span className="font-medium">Administrateur</span>
            <span className="text-xs text-gray-500">Agent sur site</span>
          </div>
          
          <div 
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${userType === "mobile-agent" ? "border-primary bg-primary/5" : "hover:bg-gray-50"}`}
            onClick={() => setUserType("mobile-agent")}
          >
            <Car className="h-10 w-10 mb-2 text-orange-500" />
            <span className="font-medium">Agent Mobile</span>
            <span className="text-xs text-gray-500">Visites sur le terrain</span>
          </div>
        </div>
      </div>
      
      <Button
        type="button"
        onClick={onContinue}
        className="w-full mt-6"
        disabled={!userType}
      >
        Suivant
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={onLogin}
        className="w-full mt-4"
      >
        Déjà inscrit ? Se connecter
      </Button>
    </>
  );
};

export default UserTypeSelector;
