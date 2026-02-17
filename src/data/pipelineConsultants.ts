export interface EducationEntry {
  type: string;
  label: string;
  field: string;
  institution: string;
}

export interface Reference {
  name: string;
  company: string;
  phone: string;
  relation: string;
}

export interface PipelineConsultant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn: string;
  profileImage: string;
  role: string;
  roles: Record<string, number>;
  location: string;
  skills: string[];
  availableFrom: string;
  bio: string;
  portfolio: string;
  isFullyAvailable: boolean;
  canWorkOnsite: boolean;
  hourlyRate: string;
  employmentType: 'freelancer' | 'employed';
  companyName: string;
  orgNumber?: string;
  hasEducation: boolean;
  educations: EducationEntry[];
  securityClearance: string;
  securityLevel?: string;
  references: Reference[];
  uploadedFiles: { name: string; type: 'cv' | 'certificate' | 'reference' }[];
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

const allSkills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C#', '.NET',
  'AWS', 'Azure', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL',
  'Vue', 'Angular', 'Next.js', 'Tailwind', 'Figma', 'Sketch', 'Git', 'CI/CD',
  'Agile', 'Scrum', 'REST API', 'Microservices', 'Redis', 'Elasticsearch'
];

const bios = [
  'Erfaren utvecklare med passion för clean code och agila metoder. Trivs i team och gillar att dela kunskap.',
  'Driven tekniker med fokus på skalbarhet och prestanda. Älskar att lösa komplexa problem.',
  'Kreativ problemlösare med starkt affärssinne. Brinner för användarupplevelse och modern teknik.',
  'Resultatorienterad med gedigen erfarenhet av stora projekt. Stark kommunikatör och teamspelare.',
  'Teknisk ledare med bred erfarenhet. Fokuserar på kvalitet och kontinuerlig förbättring.',
];

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

const getRandomSkills = (count: number): string[] => {
  const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomDate = (): string => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);
  return futureDate.toISOString().split('T')[0];
};

const hourlyRates = ['Under 500 kr', '500-650 kr', '651-800 kr', '801-950 kr', '951-1100 kr', '1101-1250 kr', '1251-1400 kr', '1400+ kr'];

const educationOptions = [
  { id: 'yh', label: 'YH-utbildning' },
  { id: 'kandidat', label: 'Kandidatexamen' },
  { id: 'master', label: 'Masterexamen/Civilingenjör' },
];

const institutions = ['KTH', 'Chalmers', 'Stockholms universitet', 'Lunds universitet', 'Uppsala universitet', 'Linköpings universitet'];
const fields = ['Datateknik', 'Systemvetenskap', 'Mjukvaruteknik', 'Informationsteknik', 'Interaktionsdesign', 'Industriell ekonomi'];
const companyNames = ['TechFlow AB', 'Nordic Code HB', 'DevHouse AB', 'CodeCraft AB', 'ByteWorks AB', 'PixelPulse AB'];
const relationOptions = ['Tidigare chef', 'Kollega', 'Kund'];

export const pipelineConsultants: PipelineConsultant[] = Array.from({ length: 40 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const emailName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const role = roles[i % roles.length];
  const isFreelancer = i % 3 !== 2;
  const hasEdu = i % 4 !== 3;
  const edu = educationOptions[i % educationOptions.length];
  
  return {
    id: String(i + 1),
    firstName,
    lastName,
    email: `${emailName}@email.se`,
    phone: `+46 70 ${String(100 + i).padStart(3, '0')} ${String(10 + i).padStart(2, '0')} ${String(20 + i).padStart(2, '0')}`,
    linkedIn: `https://linkedin.com/in/${emailName.replace('.', '')}`,
    profileImage: profileImages[i % profileImages.length],
    role,
    roles: { [role]: 2 + (i % 12) },
    location: locations[i % locations.length],
    skills: getRandomSkills(4 + Math.floor(Math.random() * 5)),
    availableFrom: getRandomDate(),
    bio: bios[i % bios.length],
    portfolio: `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.dev`,
    isFullyAvailable: i % 3 !== 1,
    canWorkOnsite: i % 4 !== 3,
    hourlyRate: hourlyRates[i % hourlyRates.length],
    employmentType: isFreelancer ? 'freelancer' : 'employed',
    companyName: isFreelancer ? companyNames[i % companyNames.length] : `Konsultbolaget ${lastName}`,
    orgNumber: isFreelancer ? `55${9100 + i}-${1000 + i}` : undefined,
    hasEducation: hasEdu,
    educations: hasEdu ? [{ type: edu.id, label: edu.label, field: fields[i % fields.length], institution: institutions[i % institutions.length] }] : [],
    securityClearance: i % 5 === 0 ? 'Ja' : 'Nej',
    securityLevel: i % 5 === 0 ? `Nivå ${(i % 3) + 1}` : undefined,
    references: [
      { name: `${firstNames[(i + 5) % firstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`, company: companyNames[(i + 1) % companyNames.length], phone: `+46 70 ${String(200 + i).padStart(3, '0')} 00 00`, relation: relationOptions[i % relationOptions.length] },
    ],
    uploadedFiles: [
      { name: `CV_${firstName}_${lastName}.pdf`, type: 'cv' as const },
      ...(i % 3 === 0 ? [{ name: `Certifikat_AWS.pdf`, type: 'certificate' as const }] : []),
    ],
  };
});
