
export interface Visit {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  agentName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  mobileAgentId?: number;
  mobileAgentName?: string;
  isAvailabilitySlot?: boolean;  // Indique si c'est un créneau de disponibilité d'agent mobile
  automaticallyAssigned?: boolean; // Indique si la visite a été attribuée automatiquement
  confirmationSent?: boolean; // Indique si la confirmation a été envoyée
  reminderSent?: boolean; // Indique si le rappel a été envoyé
}

export interface AgentAvailability {
  id: number;
  agentId: number;
  agentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'unavailable';
  recurrent?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  location?: { // Pour la géolocalisation de l'agent
    latitude: number;
    longitude: number;
  };
}
