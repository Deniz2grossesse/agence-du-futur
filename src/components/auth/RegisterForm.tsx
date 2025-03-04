
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CommonFormFields from "./CommonFormFields";
import TenantFormFields from "./TenantFormFields";
import OwnerFormFields from "./OwnerFormFields";
import AgentOperatorFormFields from "./AgentOperatorFormFields";
import MobileAgentFormFields from "./MobileAgentFormFields";
import UserTypeSelector from "./UserTypeSelector";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  userType: string;
  setUserType: (value: string) => void;
  onLogin: () => void;
}

const RegisterForm = ({ userType, setUserType, onLogin }: RegisterFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [roleData, setRoleData] = useState({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRoleDataChange = (data: any) => {
    setRoleData({ ...roleData, ...data });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Préparer les données de l'utilisateur
    const userData = {
      ...formData,
      role: userType as UserRole,
      ...roleData
    };

    // Appeler la fonction d'inscription du contexte
    register(userData);
  };

  const renderUserTypeFields = () => {
    switch (userType) {
      case "tenant":
        return <TenantFormFields onChange={handleRoleDataChange} />;
      case "owner":
        return <OwnerFormFields onChange={handleRoleDataChange} />;
      case "administrator":
        return <AgentOperatorFormFields onChange={handleRoleDataChange} />;
      case "mobile-agent":
        return <MobileAgentFormFields onChange={handleRoleDataChange} />;
      default:
        return null;
    }
  };

  if (step === 1) {
    return (
      <UserTypeSelector 
        userType={userType}
        setUserType={setUserType}
        onContinue={() => setStep(2)}
        onLogin={onLogin}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <CommonFormFields formData={formData} onChange={handleInputChange} />
      {renderUserTypeFields()}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="w-full"
          disabled={isLoading}
        >
          Retour
        </Button>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onLogin}
        className="w-full mt-4"
        disabled={isLoading}
      >
        Déjà inscrit ? Se connecter
      </Button>
    </form>
  );
};

export default RegisterForm;
