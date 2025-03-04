
import { useState } from "react";
import { Visit, AgentAvailability } from "@/types/visit";
import { toast } from "sonner";
import VisitForm from "@/components/calendar/VisitForm";
import VisitDetail from "@/components/calendar/VisitDetail";
import { sendVisitNotifications } from "@/utils/visitAssignment";

interface VisitManagerProps {
  visits: Visit[];
  availabilities: AgentAvailability[];
  onVisitChange: (visits: Visit[]) => void;
  userRole: 'agent-operator' | 'mobile-agent';
}

const VisitManager = ({ visits, availabilities, onVisitChange, userRole }: VisitManagerProps) => {
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);

  // Gestion des visites
  const handleAddVisit = () => {
    setEditingVisit(null);
    setShowVisitForm(true);
  };

  const handleVisitClick = (visit: Visit) => {
    // Si c'est un créneau de disponibilité, on n'affiche pas les détails
    if (visit.isAvailabilitySlot) return;
    
    // Sinon, on affiche les détails de la visite
    setSelectedVisit(visit);
  };

  const handleEditVisit = (visit: Visit) => {
    setEditingVisit(visit);
    setSelectedVisit(null);
    setShowVisitForm(true);
  };

  const handleDeleteVisit = (visitId: number) => {
    onVisitChange(visits.filter(v => v.id !== visitId));
    toast.success("Visite supprimée avec succès");
  };

  const handleSaveVisit = (visitData: Partial<Visit>) => {
    if (editingVisit) {
      // Mise à jour d'une visite existante
      const updatedVisits = visits.map(v => 
        v.id === editingVisit.id 
          ? { ...v, ...visitData } as Visit
          : v
      );
      
      // Envoyer des notifications pour la visite mise à jour
      const updatedVisit = updatedVisits.find(v => v.id === editingVisit.id);
      if (updatedVisit) {
        sendVisitNotifications(updatedVisit);
      }
      
      onVisitChange(updatedVisits);
      toast.success("Visite mise à jour avec succès");
    } else {
      // Ajout d'une nouvelle visite
      const newVisit: Visit = {
        id: Math.max(0, ...visits.map(v => v.id)) + 1,
        propertyId: Math.floor(Math.random() * 1000),
        ...visitData,
      } as Visit;
      
      // Envoyer automatiquement une confirmation
      const notifiedVisit = sendVisitNotifications(newVisit);
      
      onVisitChange([...visits, notifiedVisit]);
      toast.success("Nouvelle visite planifiée avec succès");
    }
    
    setShowVisitForm(false);
    setEditingVisit(null);
  };

  return (
    <>
      {/* Modal de formulaire de visite */}
      <VisitForm 
        isOpen={showVisitForm}
        onClose={() => setShowVisitForm(false)}
        onSave={handleSaveVisit}
        visit={editingVisit || undefined}
        availabilities={availabilities}
      />
      
      {/* Modal de détails de visite */}
      <VisitDetail 
        visit={selectedVisit}
        isOpen={!!selectedVisit}
        onClose={() => setSelectedVisit(null)}
        onEdit={handleEditVisit}
        onDelete={handleDeleteVisit}
      />
    </>
  );
};

export default VisitManager;
