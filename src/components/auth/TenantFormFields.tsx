
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TenantFormFields = () => {
  return (
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
      <div className="space-y-2">
        <Label htmlFor="lookingFor">Type de bien recherché</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez le type de bien" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Appartement</SelectItem>
            <SelectItem value="house">Maison</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default TenantFormFields;
