import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { Visit, AgentAvailability } from "@/types/visit";
import { toast } from "sonner";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import AgentAvailabilityForm from "@/components/calendar/AgentAvailabilityForm";
import { Button } from "@/components/ui/button";
import VisitManager from "@/components/calendar/VisitManager";
import { sendVisitNotifications } from "@/utils/visitAssignment";

const Calendar = () => {
  // État pour gérer la date courante du calendrier
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
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

  // Effet pour envoyer des notifications automatiques pour les visites à venir
  useEffect(() => {
    // Mettre à jour les visites avec des notifications automatiques
    const updatedVisits = visits.map(visit => sendVisitNotifications(visit));
    setVisits(updatedVisits);
  }, [currentDate]); // Se déclenche lorsque la date change

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

  // Gestion des formulaires
  const handleAddVisit = () => {
    // Cette fonction est maintenant gérée par VisitManager
    document.dispatchEvent(new CustomEvent('add-visit'));
  };

  const handleAddAvailability = () => {
    setEditingAvailability(null);
    setShowAvailabilityForm(true);
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

  // Filtrer les visites selon le rôle
  const filteredVisits = userRole === 'mobile-agent' 
    ? combinedVisitsAndAvailabilities.filter(v => v.isAvailabilitySlot || v.mobileAgentId === 1) 
    : combinedVisitsAndAvailabilities;

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
          visits={filteredVisits}
          onVisitClick={(visit) => {
            if (visit.isAvailabilitySlot) return;
            document.dispatchEvent(new CustomEvent('visit-click', { detail: visit }));
          }}
        />
        
        <VisitManager 
          visits={visits}
          availabilities={availabilities}
          onVisitChange={setVisits}
          userRole={userRole}
        />
        
        {/* Modal de formulaire de disponibilité */}
        <AgentAvailabilityForm 
          isOpen={showAvailabilityForm}
          onClose={() => setShowAvailabilityForm(false)}
          onSave={handleSaveAvailability}
          availability={editingAvailability || undefined}
        />
      </div>
    </Layout>
  );
};

export default Calendar;
