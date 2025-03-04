
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { Visit } from "@/types/visit";
import { toast } from "sonner";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import VisitForm from "@/components/calendar/VisitForm";
import VisitDetail from "@/components/calendar/VisitDetail";

const Calendar = () => {
  // État pour gérer la date courante du calendrier
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  
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
      notes: "Cliente intéressée par la vue sur le Rhône."
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

  // Fonctions pour naviguer entre les mois
  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  // Gestion des visites
  const handleAddVisit = () => {
    setEditingVisit(null);
    setShowVisitForm(true);
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

  return (
    <Layout>
      <div className="space-y-6">
        <CalendarHeader 
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onAddVisit={handleAddVisit}
        />
        
        <CalendarGrid 
          currentDate={currentDate}
          visits={visits}
          onVisitClick={handleVisitClick}
        />
        
        {/* Modal de formulaire de visite */}
        <VisitForm 
          isOpen={showVisitForm}
          onClose={() => setShowVisitForm(false)}
          onSave={handleSaveVisit}
          visit={editingVisit || undefined}
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
