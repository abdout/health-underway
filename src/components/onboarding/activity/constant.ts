export const CLUB_TYPES = [
  'sports',
  'cultural',
  'social',
  'artistic',
  'scientific',
  'other'
] as const;

export const SKILLS = [
  'programming',
  'graphic design',
  'photography',
  'content writing',
  'translation',
  'video editing',
  'project management',
  'digital marketing',
  'data analysis',
  'web design',
  'social media management',
  'event organization',
  'customer service',
  'training and education',
  'UX/UI design',
  'app development',
  'database management',
  'systems analysis',
  'cybersecurity',
  'artificial intelligence'
] as const;

export const INTERESTS = [
  'technology',
  'arts',
  'sports',
  'music',
  'reading',
  'writing',
  'travel',
  'photography',
  'cooking',
  'language learning',
  'volunteering',
  'environmental protection',
  'human development',
  'entrepreneurship',
  'science',
  'politics',
  'history',
  'culture',
  'education',
  'health and fitness'
] as const;

// Dropdown options for AutoComplete fields
export const PARTY_OPTIONS = [
  { value: "arab socialist baath party", label: "Arab Socialist Ba'ath Party" },
  { value: "syrian communist party", label: "Syrian Communist Party" },
  { value: "arab socialist union party", label: "Arab Socialist Union Party" },
  { value: "syrian social nationalist party", label: "Syrian Social Nationalist Party" },
  { value: "syrian communist party political bureau", label: "Syrian Communist Party (Political Bureau)" },
];

export const UNION_OPTIONS = [
  { value: "teachers union", label: "Teachers Union" },
  { value: "engineers union", label: "Engineers Union" },
  { value: "doctors union", label: "Doctors Union" },
  { value: "lawyers union", label: "Lawyers Union" },
  { value: "pharmacists union", label: "Pharmacists Union" },
  { value: "journalists union", label: "Journalists Union" },
  { value: "artists union", label: "Artists Union" },
  { value: "workers union", label: "Workers Union" },
];

export const NGO_OPTIONS = [
  { value: "syrian red crescent", label: "Syrian Red Crescent" },
  { value: "charity and goodwill society", label: "Charity and Goodwill Society" },
  { value: "syrian women organization", label: "Syrian Women Organization" },
  { value: "orphan care society", label: "Orphan Care Society" },
  { value: "sham charity foundation", label: "Sham Charity Foundation" },
  { value: "environmental protection society", label: "Environmental Protection Society" },
];

export const NGO_ACTIVITY_OPTIONS = [
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "relief", label: "Relief" },
  { value: "community development", label: "Community Development" },
  { value: "psychological support", label: "Psychological Support" },
  { value: "environmental protection", label: "Environmental Protection" },
  { value: "culture and arts", label: "Culture and Arts" },
  { value: "women empowerment", label: "Women Empowerment" },
];

export const CLUB_OPTIONS = [
  { value: "al jalaa sports club", label: "Al Jalaa Sports Club" },
  { value: "al wahda club", label: "Al Wahda Club" },
  { value: "tishreen club", label: "Tishreen Club" },
  { value: "al karama club", label: "Al Karama Club" },
  { value: "al ittihad club", label: "Al Ittihad Club" },
  { value: "hattin club", label: "Hattin Club" },
];

export const CLUB_TYPE_OPTIONS = [
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "volleyball", label: "Volleyball" },
  { value: "swimming", label: "Swimming" },
  { value: "tennis", label: "Tennis" },
  { value: "karate", label: "Karate" },
  { value: "judo", label: "Judo" },
  { value: "wrestling", label: "Wrestling" },
];

export const VOLUNTARY_OPTIONS = [
  { value: "red crescent", label: "Red Crescent" },
  { value: "scouts", label: "Scouts" },
  { value: "voluntary initiatives", label: "Voluntary Initiatives" },
  { value: "relief convoys", label: "Relief Convoys" },
  { value: "cleaning campaigns", label: "Cleaning Campaigns" },
  { value: "education and training", label: "Education and Training" },
];

export const VOLUNTARY_ROLE_OPTIONS = [
  { value: "volunteer", label: "Volunteer" },
  { value: "coordinator", label: "Coordinator" },
  { value: "team leader", label: "Team Leader" },
  { value: "trainer", label: "Trainer" },
  { value: "administrative assistant", label: "Administrative Assistant" },
  { value: "communication officer", label: "Communication Officer" },
];

export type ActivityFieldName = 
  | 'partyMember' | 'partyName' | 'partyStartDate' | 'partyEndDate'
  | 'unionMember' | 'unionName' | 'unionStartDate' | 'unionEndDate'
  | 'ngoMember' | 'ngoName' | 'ngoActivity'
  | 'clubMember' | 'clubName' | 'clubType'
  | 'voluntaryMember' | 'voluntaryName' | 'voluntaryRole' | 'voluntaryStartDate' | 'voluntaryEndDate'
  | 'skills' | 'interests';

type ActivityField = {
  name: ActivityFieldName;
  label: string;
  type: 'toggle' | 'text' | 'date' | 'textarea' | 'select';
  conditional?: ActivityFieldName;
  options?: readonly string[];
};

export const ACTIVITY_FIELDS: {
  political: ActivityField[];
  union: ActivityField[];
  social: ActivityField[];
  club: ActivityField[];
} = {
  political: [
    { name: 'partyMember' as const, label: 'Member of political party/movement', type: 'toggle' },
    { name: 'partyName' as const, label: 'Party/Movement name', type: 'text', conditional: 'partyMember' },
    { name: 'partyStartDate' as const, label: 'Start date', type: 'date', conditional: 'partyMember' },
    { name: 'partyEndDate' as const, label: 'End date', type: 'date', conditional: 'partyMember' },
  ],
  union: [
    { name: 'unionMember' as const, label: 'Member of union/student association', type: 'toggle' },
    { name: 'unionName' as const, label: 'Union/Association name', type: 'text', conditional: 'unionMember' },
    { name: 'unionStartDate' as const, label: 'Start date', type: 'date', conditional: 'unionMember' },
    { name: 'unionEndDate' as const, label: 'End date', type: 'date', conditional: 'unionMember' },
  ],
  social: [
    { name: 'ngoMember' as const, label: 'Member of organization/cultural group', type: 'toggle' },
    { name: 'ngoName' as const, label: 'Organization/Group name', type: 'text', conditional: 'ngoMember' },
    { name: 'ngoActivity' as const, label: 'Activity description', type: 'textarea', conditional: 'ngoMember' },
  ],
  club: [
    { name: 'clubMember' as const, label: 'Member of youth club', type: 'toggle' },
    { name: 'clubName' as const, label: 'Club name', type: 'text', conditional: 'clubMember' },
    { name: 'clubType' as const, label: 'Club type', type: 'select', options: CLUB_TYPES, conditional: 'clubMember' },
  ],
} as const; 