import { Option } from "@/components/atom/auto-complete";

// Countries data for both location and birthdate components
export const COUNTRIES: Option[] = [
  { value: "sudan", label: "Sudan" },
  { value: "egypt", label: "Egypt" },
  { value: "saudi_arabia", label: "Saudi Arabia" },
  { value: "jordan", label: "Jordan" },
  { value: "libya", label: "Libya" },
  { value: "south_sudan", label: "South Sudan" },
  { value: "eritrea", label: "Eritrea" },
  { value: "yemen", label: "Yemen" },
];

// States/provinces by country
export const STATES: Record<string, Option[]> = {
  "sudan": [
    { value: "khartoum_state", label: "Khartoum State" },
    { value: "river_nile", label: "River Nile" },
    { value: "kassala", label: "Kassala" }
  ],
  "egypt": [
    { value: "cairo_gov", label: "Cairo Governorate" },
    { value: "alexandria_gov", label: "Alexandria Governorate" },
    { value: "luxor_gov", label: "Luxor Governorate" }
  ],
  "saudi_arabia": [
    { value: "riyadh_province", label: "Riyadh Province" },
    { value: "makkah_province", label: "Makkah Province" },
    { value: "eastern_province", label: "Eastern Province" }
  ],
  "jordan": [
    { value: "amman_gov", label: "Amman Governorate" },
    { value: "zarqa_gov", label: "Zarqa Governorate" },
    { value: "irbid_gov", label: "Irbid Governorate" }
  ],
  "libya": [
    { value: "tripoli_gov", label: "Tripoli Governorate" },
    { value: "benghazi_gov", label: "Benghazi Governorate" },
    { value: "misrata_gov", label: "Misrata Governorate" }
  ],
  "south_sudan": [
    { value: "central_equatoria", label: "Central Equatoria State" },
    { value: "jonglei", label: "Jonglei State" },
    { value: "unity", label: "Unity State" }
  ],
  "eritrea": [
    { value: "maekel", label: "Maekel Region" },
    { value: "anseba", label: "Anseba Region" },
    { value: "gash_barka", label: "Gash-Barka Region" }
  ],
  "yemen": [
    { value: "sanaa_gov", label: "Sana'a Governorate" },
    { value: "aden_gov", label: "Aden Governorate" },
    { value: "taiz_gov", label: "Taiz Governorate" }
  ]
};

// Localities (larger city areas) by state
export const LOCALITIES: Record<string, Option[]> = {
  "khartoum_state": [
    { value: "khartoum_locality", label: "Khartoum Locality" },
    { value: "omdurman_locality", label: "Omdurman Locality" },
    { value: "bahri_locality", label: "Bahri Locality" }
  ],
  "river_nile": [
    { value: "atbara_locality", label: "Atbara Locality" },
    { value: "damar_locality", label: "Damar Locality" },
    { value: "shendi_locality", label: "Shendi Locality" }
  ],
  "cairo_gov": [
    { value: "cairo_east", label: "East Cairo" },
    { value: "cairo_west", label: "West Cairo" },
    { value: "cairo_central", label: "Central Cairo" }
  ],
  "riyadh_province": [
    { value: "riyadh_city_area", label: "Riyadh City Area" },
    { value: "diriyah_area", label: "Diriyah Area" },
    { value: "kharj_area", label: "Kharj Area" }
  ],
};

// Admin units (smaller administrative divisions) by locality - Used only in location component
export const ADMIN_UNITS: Record<string, Option[]> = {
  "khartoum_locality": [
    { value: "khartoum_downtown", label: "Downtown Khartoum" },
    { value: "khartoum_east", label: "East Khartoum" },
    { value: "khartoum_south", label: "South Khartoum" }
  ],
  "omdurman_locality": [
    { value: "omdurman_central", label: "Central Omdurman" },
    { value: "omdurman_north", label: "North Omdurman" },
    { value: "karari", label: "Karari" }
  ],
  "cairo_east": [
    { value: "nasr_city", label: "Nasr City" },
    { value: "heliopolis", label: "Heliopolis" },
    { value: "maadi", label: "Maadi" }
  ],
  "riyadh_city_area": [
    { value: "olaya_district", label: "Olaya District" },
    { value: "malaz_district", label: "Malaz District" },
    { value: "sulaimaniyah_district", label: "Sulaimaniyah District" }
  ],
};

// Neighborhoods by admin unit - Used only in location component
export const NEIGHBORHOODS: Record<string, Option[]> = {
  "khartoum_downtown": [
    { value: "almogran", label: "Almogran" },
    { value: "riyadh_khartoum", label: "Riyadh" },
    { value: "alshaheed", label: "Alshaheed" }
  ],
  "khartoum_east": [
    { value: "alsahafa", label: "Alsahafa" },
    { value: "burri", label: "Burri" },
    { value: "almamoura", label: "Almamoura" }
  ],
  "nasr_city": [
    { value: "first_zone", label: "First Zone" },
    { value: "seventh_zone", label: "Seventh Zone" },
    { value: "eighth_zone", label: "Eighth Zone" }
  ],
  "olaya_district": [
    { value: "olaya_north", label: "North Olaya" },
    { value: "olaya_center", label: "Central Olaya" },
    { value: "olaya_south", label: "South Olaya" }
  ],
};

// Birth months with English names - Used only in birthdate component
export const BIRTH_MONTHS: Option[] = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" }
];

// Generate birth years (100 years from current year) - Helper function for birthdate component
export const generateBirthYears = (): Option[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });
};

import { Item } from "./select-popover";

export const INFORMATION_FIELDS = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'fullname', label: 'Full Name', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  { name: 'birthMonth', label: 'Birth Month', type: 'number' },
  { name: 'birthYear', label: 'Birth Year', type: 'number' },
  { name: 'birthCountry', label: 'Birth Country', type: 'text' },
  { name: 'birthState', label: 'Birth State', type: 'text' },
  { name: 'birthLocality', label: 'Birth Locality', type: 'text' },
  { name: 'currentLocality', label: 'Current Locality', type: 'text' },
  { name: 'currentCountry', label: 'Current Country', type: 'text' },
  { name: 'currentState', label: 'Current State', type: 'text' },
  { name: 'currentAdminUnit', label: 'Current Admin Unit', type: 'text' },
  { name: 'currentNeighborhood', label: 'Current Neighborhood', type: 'text' },
  { name: 'originalLocality', label: 'Original Locality', type: 'text' },
  { name: 'originalCountry', label: 'Original Country', type: 'text' },
  { name: 'educationLevel', label: 'Education Level', type: 'text' },
  { name: 'institution', label: 'Institution', type: 'text' },
  { name: 'yearOfCompletion', label: 'Year of Completion', type: 'number' },
  { name: 'currentOccupation', label: 'Current Occupation', type: 'text' },
  { name: 'employmentSector', label: 'Employment Sector', type: 'text' },
  { name: 'workplaceAddress', label: 'Workplace Address', type: 'text' },
  { name: 'maritalStatus', label: 'Marital Status', type: 'text' },
  { name: 'gender', label: 'Gender', type: 'text' },
  { name: 'religion', label: 'Religion', type: 'text' },
  { name: 'nationalityId', label: 'Nationality ID', type: 'text' },
];

// Educational institutions
export const institutions: Item[] = [
  { label: 'University of Khartoum', value: 'khartoum_university' },
  { label: 'Cairo University', value: 'cairo_university' },
  { label: 'University of Science and Technology', value: 'science_tech_university' },
];

// Student years
export const studentYears: Item[] = [
  { value: '1', label: 'First' },
  { value: '2', label: 'Second' },
  { value: '3', label: 'Third' },
  { value: '4', label: 'Fourth' },
  { value: '5', label: 'Fifth' },
  { value: '6', label: 'Sixth' },
];

// Faculties
export const faculties: Item[] = [
  { label: 'Faculty of Medicine', value: 'medicine' },
  { label: 'Faculty of Engineering', value: 'engineering' },
  { label: 'Faculty of Science', value: 'science' },
  { label: 'Faculty of Law', value: 'law' },
];

// Majors by degree level
export const diplomaMajors: Item[] = [
  { label: 'Computer Science', value: 'computer_science' },
  { label: 'Engineering', value: 'engineering' },
];

export const bachelorMajors: Item[] = [
  { label: 'Computer Science', value: 'computer_science' },
  { label: 'Engineering', value: 'engineering' },
];

export const masterMajors: Item[] = [
  { label: 'Computer Science', value: 'computer_science' },
  { label: 'Engineering', value: 'engineering' },
];

export const phdMajors: Item[] = [
  { label: 'Computer Science', value: 'computer_science' },
  { label: 'Engineering', value: 'engineering' },
];

export const professorMajors: Item[] = [
  { label: 'Computer Science', value: 'computer_science' },
  { label: 'Engineering', value: 'engineering' },
];

// Occupations
export const diplomaOccupations: Item[] = [
  { label: 'Programmer', value: 'programmer' },
  { label: 'Engineer', value: 'engineer' },
];

export const bachelorOccupations: Item[] = [
  { label: 'Programmer', value: 'programmer' },
  { label: 'Engineer', value: 'engineer' },
];

export const masterOccupations: Item[] = [
  { label: 'Technical Manager', value: 'tech_manager' },
  { label: 'Senior Engineer', value: 'senior_engineer' },
];

export const phdOccupations: Item[] = [
  { label: 'Assistant Professor', value: 'assistant_professor' },
  { label: 'Researcher', value: 'researcher' },
];

export const professorOccupations: Item[] = [
  { label: 'University Professor', value: 'university_professor' },
  { label: 'College Dean', value: 'dean' },
];

// Academic ranks
export const academicRanks: Item[] = [
  { label: 'Professor', value: 'professor' },
  { label: 'Associate Professor', value: 'associate_professor' },
  { label: 'Assistant Professor', value: 'assistant_professor' },
];

// Generate completion years array
export const generateCompletionYears = (): Item[] => {
  const currentYear = new Date().getFullYear();
  const years: Item[] = [];
  for (let year = currentYear; year >= currentYear - 50; year--) {
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
};

// Generate future years for students
export const generateFutureYears = (): Item[] => {
  const currentYear = new Date().getFullYear();
  const years: Item[] = [];
  for (let year = currentYear; year <= currentYear + 10; year++) {
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
}; 