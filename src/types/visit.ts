
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
}
