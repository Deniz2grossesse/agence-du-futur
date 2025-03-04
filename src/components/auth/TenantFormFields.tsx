
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

interface TenantFormFieldsProps {
  onChange: (data: any) => void;
}

const TenantFormFields = ({ onChange }: TenantFormFieldsProps) => {
  const [tenantData, setTenantData] = useState({
    income: 2000,
    job: "",
    employmentStatus: "cdi",
    desiredPropertyType: "apartment"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTenantData({ ...tenantData, [id]: value });
  };

  const handleRadioChange = (value: string) => {
    setTenantData({ ...tenantData, employmentStatus: value });
  };

  const handleSelectChange = (value: string) => {
    setTenantData({ ...tenantData, desiredPropertyType: value });
  };

  useEffect(() => {
    onChange(tenantData);
  }, [tenantData, onChange]);

  return (
    <>
      <div className="space-y-2 mb-4">
        <Label htmlFor="income">Revenu mensuel</Label>
        <Input 
          id="income" 
          type="number" 
          placeholder="2000" 
          value={tenantData.income}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="job">Profession</Label>
        <Input 
          id="job" 
          type="text" 
          placeholder="Développeur" 
          value={tenantData.job}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <Label>Situation</Label>
        <RadioGroup 
          value={tenantData.employmentStatus}
          onValueChange={handleRadioChange}
        >
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
      <div className="space-y-2 mb-4">
        <Label htmlFor="desiredPropertyType">Type de bien recherché</Label>
        <Select 
          value={tenantData.desiredPropertyType}
          onValueChange={handleSelectChange}
        >
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
