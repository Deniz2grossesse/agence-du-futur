
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CommonFormFieldsProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonFormFields = ({ formData, onChange }: CommonFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2 mb-4">
        <Label htmlFor="name">Nom complet</Label>
        <Input 
          id="name" 
          type="text" 
          required 
          value={formData.name} 
          onChange={onChange} 
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          required 
          value={formData.email} 
          onChange={onChange} 
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="password">Mot de passe</Label>
        <Input 
          id="password" 
          type="password" 
          required 
          value={formData.password} 
          onChange={onChange} 
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <Input 
          id="confirmPassword" 
          type="password" 
          required 
          value={formData.confirmPassword} 
          onChange={onChange} 
        />
      </div>
    </>
  );
};

export default CommonFormFields;
