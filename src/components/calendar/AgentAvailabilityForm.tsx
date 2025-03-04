
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AgentAvailability } from "@/types/visit";
import { useState } from "react";

interface AgentAvailabilityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (availability: Partial<AgentAvailability>) => void;
  availability?: AgentAvailability;
}

const AgentAvailabilityForm = ({ 
  isOpen, 
  onClose, 
  onSave, 
  availability 
}: AgentAvailabilityFormProps) => {
  const [formData, setFormData] = useState<Partial<AgentAvailability>>(
    availability || {
      agentName: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "18:00",
      status: "available",
      recurrent: false,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {availability ? "Modifier la disponibilité" : "Déclarer une nouvelle disponibilité"}
            </DialogTitle>
            <DialogDescription>
              {availability
                ? "Modifiez les détails de votre disponibilité"
                : "Déclarez vos créneaux de disponibilité pour les visites immobilières"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => 
                  handleSelectChange("status", value as 'available' | 'booked' | 'unavailable')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="booked">Réservé</SelectItem>
                  <SelectItem value="unavailable">Indisponible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="recurrent"
                checked={formData.recurrent}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("recurrent", checked === true)}
              />
              <Label htmlFor="recurrent">Récurrent</Label>
            </div>

            {formData.recurrent && (
              <div className="space-y-2">
                <Label htmlFor="recurrencePattern">Type de récurrence</Label>
                <Select
                  value={formData.recurrencePattern}
                  onValueChange={(value) => 
                    handleSelectChange("recurrencePattern", value as 'daily' | 'weekly' | 'monthly')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type de récurrence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgentAvailabilityForm;
