
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CommonFormFields = () => {
  return (
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
    </>
  );
};

export default CommonFormFields;
