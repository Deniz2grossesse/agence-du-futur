
import { useState, useEffect } from "react";
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

interface MobileAgentFormFieldsProps {
  onChange: (data: any) => void;
}

const MobileAgentFormFields = ({ onChange }: MobileAgentFormFieldsProps) => {
  const [agentData, setAgentData] = useState({
    zone: "",
    availability: "full",
    transportType: "car",
    virtualVisitAvailable: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAgentData({ ...agentData, [id]: value });
  };

  const handleSelectChange = (value: string) => {
    setAgentData({ ...agentData, availability: value });
  };

  const handleTransportChange = (value: string) => {
    setAgentData({ ...agentData, transportType: value });
  };

  const handleVirtualVisitChange = (value: string) => {
    setAgentData({ ...agentData, virtualVisitAvailable: value === "yes" });
  };

  useEffect(() => {
    onChange(agentData);
  }, [agentData, onChange]);

  return (
    <>
      <div className="space-y-2 mb-4">
        <Label htmlFor="zone">Zone géographique</Label>
        <Input 
          id="zone" 
          type="text" 
          placeholder="Paris" 
          value={agentData.zone}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="availability">Disponibilités</Label>
        <Select 
          value={agentData.availability}
          onValueChange={handleSelectChange}
        >
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
      <div className="space-y-2 mb-4">
        <Label>Type de transport</Label>
        <RadioGroup 
          value={agentData.transportType}
          onValueChange={handleTransportChange}
        >
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
      <div className="space-y-2 mb-4">
        <Label>Visites virtuelles</Label>
        <RadioGroup 
          value={agentData.virtualVisitAvailable ? "yes" : "no"}
          onValueChange={handleVirtualVisitChange}
        >
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
