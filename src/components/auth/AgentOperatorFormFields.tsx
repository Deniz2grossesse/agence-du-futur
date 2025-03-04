
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AgentOperatorFormFields = () => {
  return (
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
      <div className="space-y-2">
        <Label htmlFor="managedProperties">Nombre de biens gérés</Label>
        <Input id="managedProperties" type="number" placeholder="0" />
      </div>
    </>
  );
};

export default AgentOperatorFormFields;
