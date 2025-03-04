
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OwnerFormFieldsProps {
  onChange: (data: any) => void;
}

const OwnerFormFields = ({ onChange }: OwnerFormFieldsProps) => {
  const [ownerData, setOwnerData] = useState({
    properties: 1,
    siret: "",
    propertyType: "apartment"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOwnerData({ ...ownerData, [id]: value });
  };

  const handleRadioChange = (value: string) => {
    setOwnerData({ ...ownerData, propertyType: value });
  };

  useEffect(() => {
    onChange(ownerData);
  }, [ownerData, onChange]);

  return (
    <>
      <div className="space-y-2 mb-4">
        <Label htmlFor="properties">Nombre de biens</Label>
        <Input 
          id="properties" 
          type="number" 
          placeholder="1" 
          value={ownerData.properties}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="siret">Numéro SIRET (si applicable)</Label>
        <Input 
          id="siret" 
          type="text" 
          value={ownerData.siret}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label>Type de bien principal</Label>
        <RadioGroup 
          value={ownerData.propertyType}
          onValueChange={handleRadioChange}
        >
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
