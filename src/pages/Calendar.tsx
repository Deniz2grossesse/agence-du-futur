import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { Visit, AgentAvailability } from "@/types/visit";
import { toast } from "sonner";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import VisitForm from "@/components/calendar/VisitForm";
import VisitDetail from "@/components/calendar/VisitDetail";
import AgentAvailabilityForm from "@/components/calendar/AgentAvailabilityForm";
import { Button } from "@/components/ui/button";

const Calendar = () => {
  // État pour gérer la date courante du calendrier
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<AgentAvailability | null>(null);
  const [editingAvailability, setEditingAvailability] = useState<AgentAvailability | null>(null);
  
  // Simuler un rôle utilisateur (à remplacer par un contexte d'authentification)
  const [userRole, setUserRole] = useState<'agent-operator' | 'mobile-agent'>('agent-operator');
  
  // Données de démonstration pour les visites
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: 1,
      propertyId: 101,
      propertyTitle: "Appartement T3 Centre-ville",
      propertyAddress: "15 rue Victor Hugo, 69002 Lyon",
      clientName: "Sophie Martin",
      clientEmail: "sophie.martin@example.com",
      clientPhone: "06 12 34 56 78",
      agentName: "Jean Dupont",
      date: new Date().toISOString().split("T")[0], // Aujourd'hui
      time: "14:30",
      status: "confirmed",
      notes: "Cliente intéressée par la vue sur le Rhône.",
      mobileAgentId: 1,
      mobileAgentName: "Camille Roux"
    },
    {
      id: 2,
      propertyId: 102,
      propertyTitle: "Maison avec jardin",
      propertyAddress: "8 allée des Roses, 69005 Lyon",
      clientName: "Thomas Dubois",
      clientEmail: "thomas.dubois@example.com",
      clientPhone: "07 65 43 21 09",
      agentName: "Marie Laurent",
      date: new Date().toISOString().split("T")[0], // Aujourd'hui
      time: "10:00",
      status: "scheduled",
      notes: "Client recherche un jardin pour ses enfants."
    },
    {
      id: 3,
      propertyId: 103,
      propertyTitle: "Studio meublé",
      propertyAddress: "22 avenue Jean Jaurès, 69007 Lyon",
      clientName: "Julie Petit",
      clientEmail: "julie.petit@example.com",
      clientPhone: "06 98 76 54 32",
      agentName: "Jean Dupont",
      date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split("T")[0], // Dans 2 jours
      time: "16:00",
      status: "scheduled",
      notes: "Étudiante à la recherche d'un logement proche du campus."
    }
  ]);

  // Données de démonstration pour les disponibilités des agents
  const [availabilities, setAvailabilities] = useState<AgentAvailability[]>([
    {
      id: 1,
      agentId: 1,
      agentName: "Camille Roux",
      date: new Date().toISOString().split("T")[0], // Aujourd'hui
      startTime: "09:00",
      endTime: "18:00",
      status: "available",
      recurrent: true,
      recurrencePattern: "weekly"
    },
    {
      id: 2,
      agentId: 2,
      agentName: "Lucas Bernard",
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0], // Demain
      startTime: "10:00",
      endTime: "16:00",
      status: "available",
      recurrent: false
    }
  ]);

  // Fonctions pour naviguer entre les mois
  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  // Basculer entre les rôles (démo uniquement)
  const toggleUserRole = () => {
    setUserRole(prev => prev === 'agent-operator' ? 'mobile-agent' : 'agent-operator');
    toast.info(`Mode changé: ${userRole === 'agent-operator' ? 'Agent Mobile' : 'Agent Opérateur'}`);
  };

  // Gestion des visites
  const handleAddVisit = () => {
    setEditingVisit(null);
    setShowVisitForm(true);
  };

  const handleAddAvailability = () => {
    setEditingAvailability(null);
    setShowAvailabilityForm(true);
  };

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
  };

  const handleEditVisit = (visit: Visit) => {
    setEditingVisit(visit);
    setSelectedVisit(null);
    setShowVisitForm(true);
  };

  const handleDeleteVisit = (visitId: number) => {
    setVisits(prev => prev.filter(v => v.id !== visitId));
    toast.success("Visite supprimée avec succès");
  };

  const handleSaveVisit = (visitData: Partial<Visit>) => {
    if (editingVisit) {
      // Mise à jour d'une visite existante
      setVisits(prev => 
        prev.map(v => v.id === editingVisit.id ? { ...v, ...visitData } : v)
      );
      toast.success("Visite mise à jour avec succès");
    } else {
      // Ajout d'une nouvelle visite
      const newVisit: Visit = {
        id: Math.max(0, ...visits.map(v => v.id)) + 1,
        propertyId: Math.floor(Math.random() * 1000),
        ...visitData,
      } as Visit;
      
      setVisits(prev => [...prev, newVisit]);
      toast.success("Nouvelle visite planifiée avec succès");
    }
    
    setShowVisitForm(false);
    setEditingVisit(null);
  };

  // Gestion des disponibilités
  const handleSaveAvailability = (availabilityData: Partial<AgentAvailability>) => {
    if (editingAvailability) {
      // Mise à jour d'une disponibilité existante
      setAvailabilities(prev => 
        prev.map(a => a.id === editingAvailability.id ? { ...a, ...availabilityData } : a)
      );
      toast.success("Disponibilité mise à jour avec succès");
    } else {
      // Ajout d'une nouvelle disponibilité
      const newAvailability: AgentAvailability = {
        id: Math.max(0, ...availabilities.map(a => a.id)) + 1,
        agentId: 1, // À remplacer par l'ID de l'agent connecté
        ...availabilityData,
      } as AgentAvailability;
      
      setAvailabilities(prev => [...prev, newAvailability]);
      toast.success("Nouvelle disponibilité ajoutée avec succès");
    }
    
    setShowAvailabilityForm(false);
    setEditingAvailability(null);
  };

  // Obtenir les disponibilités transformées en visites pour l'affichage
  const getAvailabilitySlots = (): Visit[] => {
    return availabilities.map(a => ({
      id: a.id + 1000, // Pour éviter les conflits d'ID
      propertyId: 0,
      propertyTitle: "Disponibilité",
      propertyAddress: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      agentName: a.agentName,
      date: a.date,
      time: `${a.startTime} - ${a.endTime}`,
      status: "scheduled",
      isAvailabilitySlot: true,
      mobileAgentId: a.agentId,
      mobileAgentName: a.agentName
    }));
  };

  // Combiner les visites et les créneaux de disponibilité pour l'affichage
  const combinedVisitsAndAvailabilities = [
    ...visits,
    ...getAvailabilitySlots()
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between">
          <CalendarHeader 
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onAddVisit={handleAddVisit}
            onAddAvailability={handleAddAvailability}
            userRole={userRole}
          />
          <Button 
            variant="outline" 
            onClick={toggleUserRole}
            className="mt-2"
          >
            Changer de mode: {userRole === 'agent-operator' ? 'Agent Mobile' : 'Agent Opérateur'}
          </Button>
        </div>
        
        <CalendarGrid 
          currentDate={currentDate}
          visits={userRole === 'mobile-agent' 
            ? combinedVisitsAndAvailabilities.filter(v => v.isAvailabilitySlot || v.mobileAgentId === 1) 
            : combinedVisitsAndAvailabilities}
          onVisitClick={handleVisitClick}
        />
        
        {/* Modal de formulaire de visite */}
        <VisitForm 
          isOpen={showVisitForm}
          onClose={() => setShowVisitForm(false)}
          onSave={handleSaveVisit}
          visit={editingVisit || undefined}
        />
        
        {/* Modal de formulaire de disponibilité */}
        <AgentAvailabilityForm 
          isOpen={showAvailabilityForm}
          onClose={() => setShowAvailabilityForm(false)}
          onSave={handleSaveAvailability}
          availability={editingAvailability || undefined}
        />
        
        {/* Modal de détails de visite */}
        <VisitDetail 
          visit={selectedVisit}
          isOpen={!!selectedVisit}
          onClose={() => setSelectedVisit(null)}
          onEdit={handleEditVisit}
          onDelete={handleDeleteVisit}
        />
      </div>
    </Layout>
  );
};

export default Calendar;
