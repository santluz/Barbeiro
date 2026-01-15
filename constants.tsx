
import { Barber, BarberService, Plan } from './types';

export const MOCK_SERVICES: BarberService[] = [
  {
    id: 's1',
    name: 'Corte Degradê',
    description: 'Corte moderno com transição suave nas laterais, acabamento impecável.',
    price: 45.00,
    duration: 40,
    image: 'https://picsum.photos/seed/cut1/400/300'
  },
  {
    id: 's2',
    name: 'Barba Terapia',
    description: 'Cuidado completo com toalha quente, óleos essenciais e modelagem.',
    price: 35.00,
    duration: 30,
    image: 'https://picsum.photos/seed/beard/400/300'
  },
  {
    id: 's3',
    name: 'Combo Gold',
    description: 'Cabelo + Barba + Lavagem especial com massagem capilar.',
    price: 70.00,
    duration: 60,
    image: 'https://picsum.photos/seed/combo/400/300'
  }
];

export const MOCK_BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Lucas Silva',
    specialty: 'Especialista em Degradê',
    avatar: 'https://i.pravatar.cc/150?u=lucas',
    rating: 4.9
  },
  {
    id: 'b2',
    name: 'Gabriel Santos',
    specialty: 'Mestre da Barba',
    avatar: 'https://i.pravatar.cc/150?u=gabriel',
    rating: 4.8
  },
  {
    id: 'b3',
    name: 'Mateus Oliveira',
    specialty: 'Cortes Clássicos',
    avatar: 'https://i.pravatar.cc/150?u=mateus',
    rating: 5.0
  }
];

export const MOCK_PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Essential',
    description: 'Para quem gosta de estar sempre alinhado.',
    price: 80.00,
    cutsPerMonth: 2,
    benefits: ['2 cortes inclusos', '10% desc. em produtos', 'Prioridade na agenda']
  },
  {
    id: 'p2',
    name: 'VIP Gold',
    description: 'A experiência completa mensal.',
    price: 150.00,
    cutsPerMonth: 4,
    benefits: ['Cortes ilimitados', 'Barba inclusa', 'Cerveja/Café cortesia', 'Kit mensal']
  }
];
