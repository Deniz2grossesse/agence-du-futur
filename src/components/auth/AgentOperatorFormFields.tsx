
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AgentOperatorFormFieldsProps {
  onChange: (data: any) => void;
}

const AgentOperatorFormFields = ({ onChange }: AgentOperatorFormFieldsProps) => {
  const [agentData, setAgentData] = useState({
    agency: "",
    licenseNumber: "",
    specialization: "residential",
    managedProperties: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAgentData({ ...agentData, [id]: value });
  };

  const handleRadioChange = (value: string) => {
    setAgentData({ ...agentData, specialization: value });
  };

  useEffect(() => {
    onChange(agentData);
  }, [agentData, onChange]);

  return (
    <>
      <div className="space-y-2 mb-4">
        <Label htmlFor="agency">Nom de l'agence</Label>
        <Input 
          id="agency" 
          type="text" 
          value={agentData.agency}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="licenseNumber">Numéro de carte professionnelle</Label>
        <Input 
          id="licenseNumber" 
          type="text" 
          value={agentData.licenseNumber}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label>Spécialisation</Label>
        <RadioGroup 
          value={agentData.specialization}
          onValueChange={handleRadioChange}
        >
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
      <div className="space-y-2 mb-4">
        <Label htmlFor="managedProperties">Nombre de biens gérés</Label>
        <Input 
          id="managedProperties" 
          type="number" 
          placeholder="0" 
          value={agentData.managedProperties}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default AgentOperatorFormFields;
