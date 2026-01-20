export interface PipelineConsultant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn: string;
  profileImage: string;
  role: string;
  location: string;
}

export const pipelineConsultants: PipelineConsultant[] = [
  {
    id: '1',
    firstName: 'Anna',
    lastName: 'Lindgren',
    email: 'anna.lindgren@email.se',
    phone: '+46 70 123 45 67',
    linkedIn: 'https://linkedin.com/in/annalindgren',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    role: 'Senior Utvecklare',
    location: 'Stockholm',
  },
  {
    id: '2',
    firstName: 'Erik',
    lastName: 'Johansson',
    email: 'erik.johansson@email.se',
    phone: '+46 70 234 56 78',
    linkedIn: 'https://linkedin.com/in/erikjohansson',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    role: 'Projektledare',
    location: 'Göteborg',
  },
  {
    id: '3',
    firstName: 'Maria',
    lastName: 'Svensson',
    email: 'maria.svensson@email.se',
    phone: '+46 70 345 67 89',
    linkedIn: 'https://linkedin.com/in/mariasvensson',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    role: 'UX Designer',
    location: 'Malmö',
  },
  {
    id: '4',
    firstName: 'Johan',
    lastName: 'Nilsson',
    email: 'johan.nilsson@email.se',
    phone: '+46 70 456 78 90',
    linkedIn: 'https://linkedin.com/in/johannilsson',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    role: 'DevOps Engineer',
    location: 'Stockholm',
  },
  {
    id: '5',
    firstName: 'Sofia',
    lastName: 'Andersson',
    email: 'sofia.andersson@email.se',
    phone: '+46 70 567 89 01',
    linkedIn: 'https://linkedin.com/in/sofiaandersson',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    role: 'Tech Lead',
    location: 'Uppsala',
  },
  {
    id: '6',
    firstName: 'Marcus',
    lastName: 'Berg',
    email: 'marcus.berg@email.se',
    phone: '+46 70 678 90 12',
    linkedIn: 'https://linkedin.com/in/marcusberg',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    role: 'Backend Utvecklare',
    location: 'Malmö',
  },
  {
    id: '7',
    firstName: 'Emma',
    lastName: 'Karlsson',
    email: 'emma.karlsson@email.se',
    phone: '+46 70 789 01 23',
    linkedIn: 'https://linkedin.com/in/emmakarlsson',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    role: 'Scrum Master',
    location: 'Stockholm',
  },
  {
    id: '8',
    firstName: 'Oscar',
    lastName: 'Eriksson',
    email: 'oscar.eriksson@email.se',
    phone: '+46 70 890 12 34',
    linkedIn: 'https://linkedin.com/in/oscareriksson',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    role: 'Frontend Utvecklare',
    location: 'Göteborg',
  },
];
