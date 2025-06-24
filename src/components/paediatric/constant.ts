import { Option } from "@/components/atom/auto-complete";

// Name prefixes
export const NAME_PREFIXES: Option[] = [
  { value: "professor", label: "Professor" },
  { value: "assistant_professor", label: "Assistant Professor" },
  { value: "associate_professor", label: "Associate Professor" },
  { value: "doctor", label: "Doctor" },
  { value: "doctor_surgeon", label: "Doctor \"Surgeon\"" },
  { value: "other", label: "Other" },
];

// Stage of Career options
export const CAREER_STAGES: Option[] = [
  { value: "established_consultant", label: "Established Consultant Position or equivalent if Academic Career" },
  { value: "established_specialist", label: "Established Specialist Position \"training Completed\"" },
  { value: "trainee", label: "Trainee \"Training in Progress\", including Academic Career" },
  { value: "other", label: "Other" },
];

// Countries for various fields
export const COUNTRIES: Option[] = [
  { value: "sudan", label: "Sudan" },
  { value: "saudi_arabia", label: "Saudi Arabia" },
  { value: "united_kingdom", label: "United Kingdom" },
  { value: "ireland", label: "Ireland" },
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "sweden", label: "Sweden" },
  { value: "france", label: "France" },
  { value: "turkey", label: "Turkey" },
  { value: "qatar", label: "Qatar" },
  { value: "malaysia", label: "Malaysia" },
  { value: "egypt", label: "Egypt" },
  { value: "australia", label: "Australia" },
  { value: "kuwait", label: "Kuwait" },
  { value: "bahrain", label: "Bahrain" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "other", label: "Other Country" },
];

// Qualifications and Degrees
export const QUALIFICATIONS: Option[] = [
  { value: "mbbs", label: "MBBS" },
  { value: "mrcp", label: "MRCP" },
  { value: "mrcpch", label: "MRCPCH" },
  { value: "frcp", label: "FRCP" },
  { value: "frcpch", label: "FRCPCH" },
  { value: "md_sudan", label: "MD SUDAN" },
  { value: "md_egypt", label: "MD EGYPT" },
  { value: "md_european", label: "MD EUROPEAN COUNTRY" },
  { value: "md_usa", label: "MD USA" },
  { value: "md_canada", label: "MD CANADA" },
  { value: "md_other", label: "MD OTHER COUNTRY" },
  { value: "dch_uk", label: "DCH UK" },
  { value: "dch_ireland", label: "DCH IRELAND" },
  { value: "arab_board", label: "ARAB BOARD PAEDIATRICS" },
  { value: "frcs", label: "FRCS" },
  { value: "md_surgery", label: "MD SURGERY" },
  { value: "msc_surgery", label: "MSc SURGERY" },
  { value: "msc_paediatrics", label: "MSc Paediatrics" },
  { value: "msc_paediatric_subspecialty", label: "MSc Paediatric subspecialty" },
  { value: "phd", label: "PhD" },
  { value: "mrcpi", label: "MRCPI" },
  { value: "frcsi", label: "FRCSI" },
  { value: "other", label: "Other" },
];

// Paediatrics Subspecialties
export const PAEDIATRIC_SUBSPECIALTIES: Option[] = [
  { value: "general_paediatrics", label: "General Paediatrics" },
  { value: "neonatology", label: "Neonatology" },
  { value: "gastroenterology", label: "Gastroenterology" },
  { value: "cardiology", label: "Cardiology" },
  { value: "nephrology", label: "Nephrology" },
  { value: "neurology", label: "Neurology" },
  { value: "neurodisability", label: "Paediatrics Neurodisability" },
  { value: "developmental", label: "Developmental Paediatrics" },
  { value: "metabolic", label: "Metabolic Medicine" },
  { value: "tropical_diseases", label: "Tropical Diseases or Infection" },
  { value: "haematology", label: "Haematology" },
  { value: "oncology", label: "Oncology" },
  { value: "behavioral", label: "Behavioral Paediatrics" },
  { value: "community", label: "Community Paediatrics" },
  { value: "pain_management", label: "Paediatrics Pain management" },
  { value: "pulmonology", label: "Pulmonology \"Respiratory Medicine\"" },
  { value: "endocrinology", label: "Endocrinology and Diabetes" },
  { value: "intensive_care", label: "Paediatric Intensive Care \"PICU\", Paediatric Critical Care" },
  { value: "dermatology", label: "Paediatric Dermatology" },
  { value: "emergency", label: "Paediatric Accident and Emergency" },
  { value: "hepatology", label: "Paediatric Hepatology" },
  { value: "rheumatology", label: "Paediatric Rheumatology" },
  { value: "allergy_immunology", label: "Paediatric Allergy and/or immunology" },
  { value: "general_surgery", label: "Paediatric General Surgery" },
  { value: "neurosurgery", label: "Paediatric Neurosurgery" },
  { value: "urology", label: "Paediatric Urology" },
  { value: "cardiac_surgery", label: "Paediatric Cardiac Surgery" },
  { value: "orthopaedic", label: "Orthopaedic Surgery" },
  { value: "dentistry", label: "Paediatrics Dentistry" },
  { value: "radiology", label: "Paediatrics Radiology" },
  { value: "ophthalmology", label: "Paediatrics Ophthalmology" },
  { value: "ent", label: "Paediatrics ENT" },
  { value: "physiotherapy", label: "Paediatric Physiotherapy" },
  { value: "clinical_genetics", label: "Paediatric Clinical Genetics" },
  { value: "palliative", label: "Paediatric Palliative Medicine" },
  { value: "mental_health", label: "Paediatric Mental Health" },
  { value: "clinical_pharmacology", label: "Paediatric Clinical Pharmacology" },
  { value: "audiology", label: "Paediatric Audiology" },
  { value: "anesthesia", label: "Paediatric Anesthesia" },
  { value: "other", label: "Other" },
];

// Subspecialty Certification options
export const SUBSPECIALTY_CERTIFIED_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "in-progress", label: "In Progress" },
  { value: "not-applicable", label: "Not Applicable" }
];

// Extended Request Family Photo options
export const FAMILY_PHOTO_OPTIONS: Option[] = [
  { value: "yes", label: "Yes. Please send by email" },
  { value: "no", label: "No" },
];

// Generate years for graduation (last 50 years to next 5 years)
export const generateGraduationYears = (): Option[] => {
  const currentYear = new Date().getFullYear();
  const years: Option[] = [];
  
  for (let year = currentYear + 5; year >= currentYear - 50; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  
  return years;
};

// Common universities (can be expanded)
export const UNIVERSITIES: Option[] = [
  { value: "university-of-khartoum", label: "University of Khartoum" },
  { value: "university-of-gezira", label: "University of Gezira" },
  { value: "university-of-blue-nile", label: "University of Blue Nile" },
  { value: "university-of-kassala", label: "University of Kassala" },
  { value: "university-of-red-sea", label: "University of Red Sea" },
  { value: "university-of-dongola", label: "University of Dongola" },
  { value: "university-of-nyala", label: "University of Nyala" },
  { value: "university-of-al-fashir", label: "University of Al-Fashir" },
  { value: "university-of-sennar", label: "University of Sennar" },
  { value: "university-of-west-kordofan", label: "University of West Kordofan" },
  { value: "ahfad-university", label: "Ahfad University for Women" },
  { value: "national-ribat-university", label: "National Ribat University" },
  { value: "university-of-medical-sciences", label: "University of Medical Sciences and Technology" },
  { value: "cairo-university", label: "Cairo University" },
  { value: "ain-shams-university", label: "Ain Shams University" },
  { value: "alexandria-university", label: "Alexandria University" },
  { value: "al-azhar-university", label: "Al-Azhar University" },
  { value: "king-saud-university", label: "King Saud University" },
  { value: "king-abdulaziz-university", label: "King Abdulaziz University" },
  { value: "university-of-dammam", label: "University of Dammam" },
  { value: "harvard-university", label: "Harvard University" },
  { value: "johns-hopkins-university", label: "Johns Hopkins University" },
  { value: "university-of-pennsylvania", label: "University of Pennsylvania" },
  { value: "stanford-university", label: "Stanford University" },
  { value: "university-of-california", label: "University of California" },
  { value: "university-of-oxford", label: "University of Oxford" },
  { value: "university-of-cambridge", label: "University of Cambridge" },
  { value: "imperial-college-london", label: "Imperial College London" },
  { value: "university-college-london", label: "University College London" },
  { value: "university-of-edinburgh", label: "University of Edinburgh" },
  { value: "university-of-glasgow", label: "University of Glasgow" },
  { value: "university-of-toronto", label: "University of Toronto" },
  { value: "mcgill-university", label: "McGill University" },
  { value: "university-of-british-columbia", label: "University of British Columbia" },
  { value: "university-of-sydney", label: "University of Sydney" },
  { value: "university-of-melbourne", label: "University of Melbourne" },
  { value: "other", label: "Other" }
];

// Positions
export const POSITIONS: Option[] = [
  { value: "consultant", label: "Consultant" },
  { value: "senior_registrar", label: "Senior Registrar" },
  { value: "registrar", label: "Registrar" },
  { value: "senior_house_officer", label: "Senior House Officer" },
  { value: "house_officer", label: "House Officer" },
  { value: "professor", label: "Professor" },
  { value: "associate_professor", label: "Associate Professor" },
  { value: "assistant_professor", label: "Assistant Professor" },
  { value: "lecturer", label: "Lecturer" },
  { value: "other", label: "Other" },
];

// Places of Training
export const PLACES_OF_TRAINING: Option[] = [
  { value: "sudan", label: "Sudan" },
  { value: "saudi_arabia", label: "Saudi Arabia" },
  { value: "united_kingdom", label: "United Kingdom" },
  { value: "ireland", label: "Ireland" },
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "other", label: "Other" },
];

// Academic Ranks
export const ACADEMIC_RANKS: Option[] = [
  { value: "professor", label: "Professor" },
  { value: "associate_professor", label: "Associate Professor" },
  { value: "assistant_professor", label: "Assistant Professor" },
  { value: "lecturer", label: "Lecturer" },
  { value: "senior_lecturer", label: "Senior Lecturer" },
  { value: "clinical_professor", label: "Clinical Professor" },
  { value: "visiting_professor", label: "Visiting Professor" },
  { value: "emeritus_professor", label: "Emeritus Professor" },
  { value: "none", label: "None" },
  { value: "other", label: "Other" },
];

// Marital Status Options
export const MARITAL_STATUS_OPTIONS: Option[] = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "other", label: "Other" },
];

// Form field groups for better organization
export const FORM_SECTIONS = {
  BASIC_INFO: "Basic Information",
  PERSONAL_DETAILS: "Personal Details", 
  EDUCATION: "Education & Qualifications",
  SUBSPECIALTY: "Subspecialty & Certification",
  CAREER: "Career Information",
  RESEARCH: "Research & Publications",
  PERSONAL: "Personal & Family Information",
}; 