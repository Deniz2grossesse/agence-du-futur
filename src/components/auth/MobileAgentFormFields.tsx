
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

const MobileAgentFormFields = () => {
  return (
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
      <div className="space-y-2">
        <Label>Visites virtuelles</Label>
        <RadioGroup defaultValue="yes">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="virtualYes" />
            <Label htmlFor="virtualYes">Disponible</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="virtualNo" />
            <Label htmlFor="virtualNo">Non disponible</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default MobileAgentFormFields;
