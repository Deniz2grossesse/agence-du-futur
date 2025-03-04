
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'administrator' | 'mobile-agent' | 'owner' | 'tenant';
  properties: number;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  // Champs spécifiques au rôle
  // Propriétaire
  siret?: string;
  propertyType?: 'apartment' | 'house' | 'commercial';
  // Locataire
  income?: number;
  job?: string;
  employmentStatus?: 'cdi' | 'cdd' | 'freelance';
  desiredPropertyType?: 'apartment' | 'house' | 'studio';
  // Agent Mobile
  zone?: string;
  availability?: 'full' | 'part' | 'weekend';
  transportType?: 'car' | 'motorcycle' | 'public';
  virtualVisitAvailable?: boolean;
  // Agent Opérateur (Administrateur)
  agency?: string;
  licenseNumber?: string;
  specialization?: 'residential' | 'commercial' | 'luxury';
  managedProperties?: number;
}

export type UserRole = 'administrator' | 'mobile-agent' | 'owner' | 'tenant';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
