
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CommonFormFields from "./CommonFormFields";
import TenantFormFields from "./TenantFormFields";
import OwnerFormFields from "./OwnerFormFields";
import AgentOperatorFormFields from "./AgentOperatorFormFields";
import MobileAgentFormFields from "./MobileAgentFormFields";
import UserTypeSelector from "./UserTypeSelector";

interface RegisterFormProps {
  userType: string;
  setUserType: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLogin: () => void;
}

const RegisterForm = ({ userType, setUserType, onSubmit, onLogin }: RegisterFormProps) => {
  const [step, setStep] = useState(1);

  const renderUserTypeFields = () => {
    switch (userType) {
      case "tenant":
        return <TenantFormFields />;
      case "owner":
        return <OwnerFormFields />;
      case "agent-operator":
        return <AgentOperatorFormFields />;
      case "mobile-agent":
        return <MobileAgentFormFields />;
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
    <>
      <CommonFormFields />
      {renderUserTypeFields()}
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

export default RegisterForm;
