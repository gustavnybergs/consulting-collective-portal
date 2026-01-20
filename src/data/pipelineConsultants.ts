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

export const roles = [
  'Fullstack Utvecklare',
  'Frontend Utvecklare',
  'Backend Utvecklare',
  'DevOps Engineer',
  'UX Designer',
  'UI Designer',
  'Projektledare',
  'Scrum Master',
  'Tech Lead',
  'Data Engineer',
  'Cloud Architect',
  'QA Engineer',
];

export const locations = ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Linköping', 'Lund'];

const firstNames = [
  'Anna', 'Erik', 'Maria', 'Johan', 'Sofia', 'Marcus', 'Emma', 'Oscar',
  'Lina', 'Gustav', 'Ida', 'Axel', 'Elin', 'Viktor', 'Sara', 'David',
  'Klara', 'Filip', 'Maja', 'Simon', 'Wilma', 'Lucas', 'Alice', 'Hugo',
  'Elsa', 'Leo', 'Freja', 'Nils', 'Saga', 'Emil', 'Astrid', 'Felix',
  'Vera', 'Adam', 'Alma', 'Oskar', 'Ebba', 'William', 'Molly', 'Alexander'
];

const lastNames = [
  'Lindgren', 'Johansson', 'Svensson', 'Nilsson', 'Andersson', 'Berg', 'Karlsson', 'Eriksson',
  'Larsson', 'Olsson', 'Persson', 'Pettersson', 'Gustafsson', 'Jonsson', 'Hansson', 'Bengtsson',
  'Lindqvist', 'Sandberg', 'Lindström', 'Bergström', 'Mattsson', 'Lundberg', 'Forsberg', 'Engström',
  'Eklund', 'Holmberg', 'Nyström', 'Löfgren', 'Söderberg', 'Hedlund', 'Sundberg', 'Norberg',
  'Sjöberg', 'Wallin', 'Lund', 'Björk', 'Bergman', 'Fransson', 'Holm', 'Samuelsson'
];

const profileImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502767089025-6572583495b9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
];

export const pipelineConsultants: PipelineConsultant[] = Array.from({ length: 40 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const emailName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  
  return {
    id: String(i + 1),
    firstName,
    lastName,
    email: `${emailName}@email.se`,
    phone: `+46 70 ${String(100 + i).padStart(3, '0')} ${String(10 + i).padStart(2, '0')} ${String(20 + i).padStart(2, '0')}`,
    linkedIn: `https://linkedin.com/in/${emailName.replace('.', '')}`,
    profileImage: profileImages[i % profileImages.length],
    role: roles[i % roles.length],
    location: locations[i % locations.length],
  };
});
