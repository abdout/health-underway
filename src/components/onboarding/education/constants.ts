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
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
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