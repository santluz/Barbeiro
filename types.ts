
export type UserRole = 'CLIENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  activePlanId?: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
}

export interface BarberService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  cutsPerMonth: number;
  benefits: string[];
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  price: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
