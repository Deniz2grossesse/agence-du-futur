
import { Visit, AgentAvailability } from "@/types/visit";
import { toast } from "sonner";

// Fonction pour trouver un agent disponible pour une visite
export const findAvailableAgent = (
  availabilities: AgentAvailability[],
  visit: Partial<Visit>
): AgentAvailability | null => {
  // Vérifier que la visite a une date et une heure
  if (!visit.date || !visit.time) {
    return null;
  }

  // Filtrer les disponibilités pour cette date
  const availabilitiesForDate = availabilities.filter(
    (a) => a.date === visit.date && a.status === 'available'
  );

  if (availabilitiesForDate.length === 0) {
    return null;
  }

  // Simuler un algorithme basé sur l'heure de la visite
  // Dans un cas réel, on comparerait aussi la géolocalisation, etc.
  const visitHour = parseInt(visit.time.split(':')[0]);
  
  // Trouver une disponibilité qui couvre l'heure de la visite
  const matchingAvailability = availabilitiesForDate.find((a) => {
    const startHour = parseInt(a.startTime.split(':')[0]);
    const endHour = parseInt(a.endTime.split(':')[0]);
    return visitHour >= startHour && visitHour < endHour;
  });

  return matchingAvailability || null;
};

// Fonction pour attribuer automatiquement un agent à une visite
export const autoAssignAgentToVisit = (
  visit: Partial<Visit>,
  availabilities: AgentAvailability[]
): Partial<Visit> => {
  const availableAgent = findAvailableAgent(availabilities, visit);
  
  if (!availableAgent) {
    toast.error("Aucun agent disponible pour cette visite");
    return visit;
  }

  // Attribuer l'agent à la visite
  return {
    ...visit,
    mobileAgentId: availableAgent.agentId,
    mobileAgentName: availableAgent.agentName,
    automaticallyAssigned: true
  };
};

// Fonction pour envoyer automatiquement des notifications (simulée)
export const sendVisitNotifications = (visit: Visit): Visit => {
  // Simule l'envoi d'une confirmation
  if (!visit.confirmationSent) {
    console.log(`Confirmation envoyée pour la visite ${visit.id}`);
    toast.success(`Confirmation envoyée à ${visit.clientName}`);
    visit.confirmationSent = true;
  }

  // Simule l'envoi d'un rappel
  const visitDate = new Date(visit.date);
  const today = new Date();
  const diffTime = Math.abs(visitDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1 && !visit.reminderSent) {
    console.log(`Rappel envoyé pour la visite ${visit.id}`);
    toast.info(`Rappel envoyé à ${visit.clientName} pour la visite de demain`);
    visit.reminderSent = true;
  }

  return visit;
};
