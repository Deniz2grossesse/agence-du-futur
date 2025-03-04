
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const OwnerFormFields = () => {
  return (
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
};

export default OwnerFormFields;
