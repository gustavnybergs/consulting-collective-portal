export interface Contract {
  id: string;
  projectNumber: string;
  role: string;
  startDate: string;
  endDate: string;
  workedHours: number;
  budget: number;
  status: 'active' | 'expiring' | 'completed';
  daysUntilExpiry?: number;
}

export interface Consultant {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  status: 'active' | 'available' | 'on-leave';
  utilization: number;
}

export interface Order {
  id: string;
  role: string;
  currency: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  description?: string;
  scope?: string;
  distance?: string;
  hourlyRate?: number;
}

export interface Assignment {
  id: string;
  projectNumber: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'active' | 'completed' | 'planned';
}

export const currentUser = {
  name: 'David Andersson',
  email: 'david@acme.se',
  company: 'Acme AB',
  avatar: '',
};

export const contracts: Contract[] = [
  {
    id: '1',
    projectNumber: 'PRJ-2024-001',
    role: 'Systemutvecklare',
    startDate: '2024-01-15',
    endDate: '2026-06-30',
    workedHours: 840,
    budget: 1200000,
    status: 'active',
  },
  {
    id: '2',
    projectNumber: 'PRJ-2024-002',
    role: 'Projektledare',
    startDate: '2024-03-01',
    endDate: '2026-02-01',
    workedHours: 320,
    budget: 450000,
    status: 'expiring',
    daysUntilExpiry: 12,
  },
  {
    id: '3',
    projectNumber: 'PRJ-2024-003',
    role: 'UX-designer',
    startDate: '2024-06-01',
    endDate: '2026-12-31',
    workedHours: 160,
    budget: 280000,
    status: 'active',
  },
  {
    id: '4',
    projectNumber: 'PRJ-2023-015',
    role: 'Scrum Master',
    startDate: '2023-09-01',
    endDate: '2026-02-15',
    workedHours: 560,
    budget: 520000,
    status: 'expiring',
    daysUntilExpiry: 26,
  },
];

export const consultants: Consultant[] = [
  {
    id: '1',
    name: 'Daniela Shannon',
    role: 'Senior Utvecklare',
    email: 'daniela@cc.se',
    status: 'active',
    utilization: 119,
  },
  {
    id: '2',
    name: 'Carmela McSmith',
    role: 'Tech Lead',
    email: 'carmela@cc.se',
    status: 'active',
    utilization: 107,
  },
  {
    id: '3',
    name: 'Eric Tuckerman',
    role: 'DevOps Engineer',
    email: 'eric@cc.se',
    status: 'active',
    utilization: 106,
  },
];

export const orders: Order[] = [
  {
    id: '1',
    role: 'Projektledare',
    currency: 'SEK',
    startDate: '2026-02-01',
    endDate: '2026-06-30',
    status: 'pending',
    description: 'Erfaren projektledare för digitalisering',
    scope: '100%',
    distance: '50%',
    hourlyRate: 1200,
  },
  {
    id: '2',
    role: 'Backend-utvecklare',
    currency: 'SEK',
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    status: 'active',
    description: 'Java/Spring utvecklare',
    scope: '80%',
    distance: '100%',
    hourlyRate: 1050,
  },
  {
    id: '3',
    role: 'UX-designer',
    currency: 'EUR',
    startDate: '2026-01-15',
    endDate: '2026-04-30',
    status: 'active',
    description: 'Designsystem och prototyper',
    scope: '60%',
    distance: '80%',
    hourlyRate: 95,
  },
];

export const assignments: Assignment[] = [
  {
    id: '1',
    projectNumber: 'PRJ-2024-001',
    client: 'Tractor Inc.',
    startDate: '2024-01-15',
    endDate: '2026-06-30',
    budget: 1200000,
    status: 'active',
  },
  {
    id: '2',
    projectNumber: 'PRJ-2024-002',
    client: 'Nordic Solutions',
    startDate: '2024-03-01',
    endDate: '2026-02-01',
    budget: 450000,
    status: 'active',
  },
  {
    id: '3',
    projectNumber: 'PRJ-2024-003',
    client: 'Tech Innovations AB',
    startDate: '2024-06-01',
    endDate: '2026-12-31',
    budget: 280000,
    status: 'active',
  },
  {
    id: '4',
    projectNumber: 'PRJ-2023-015',
    client: 'Global Finance',
    startDate: '2023-09-01',
    endDate: '2026-02-15',
    budget: 520000,
    status: 'active',
  },
  {
    id: '5',
    projectNumber: 'PRJ-2023-010',
    client: 'Retail Group',
    startDate: '2023-06-01',
    endDate: '2025-12-31',
    budget: 890000,
    status: 'completed',
  },
];

export const kpiData = {
  totalContracts: contracts.length,
  consultantsInDelivery: consultants.filter(c => c.status === 'active').length,
  contractsNeedingAttention: contracts.filter(c => c.status === 'expiring'),
  totalOrders: orders.length,
};
