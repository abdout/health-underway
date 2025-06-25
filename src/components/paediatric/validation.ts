import { z } from "zod";

export const paediatricSchema = z.object({
  // Basic Information
  fullNameEnglish: z.string()
    .min(2, { message: "Full name in English is required" })
    .regex(/^[a-zA-Z\s._-]+$/, { 
      message: "Full name can contain English letters, spaces, dots, underscores and hyphens" 
    }),
  fullNameArabic: z.string()
    .min(2, { message: "Full name in Arabic is required" })
    .regex(/^[\u0600-\u06FF\s._-]+$/, { 
      message: "Full name can contain Arabic letters, spaces, dots, underscores and hyphens" 
    }),
  namePrefix: z.string()
    .min(1, { message: "Name prefix is required" }),
  stageOfCareer: z.string()
    .min(1, { message: "Stage of career is required" }),
  
  // Personal Details
  placeOfBirth: z.string().optional(),
  dateOfBirth: z.string().optional(),
  originalHomeTownOrVillage: z.string().optional(),
  personalEmail: z.string()
    .email({ message: "Please enter a valid email address" }),
  agreeToEmailPublication: z.boolean()
    .default(false)
    .refine(val => val === true, { message: "You must agree to email publication" }),
  
  // Primary Education
  universityOfPrimaryGraduation: z.string()
    .min(1, { message: "University of primary graduation is required" }),
  countryOfUniversityOfPrimaryGraduation: z.string()
    .min(1, { message: "Country of university is required" }),
  yearOfGraduationFromMedicine: z.string()
    .min(1, { message: "Year of graduation is required" }),
  awardsDuringPrimaryMedicalDegree: z.string().optional(),
  
  // Post Graduate Education
  universityOfPostGraduation: z.string().optional(),
  countryOfUniversityOfPostGraduation: z.string().optional(),
  yearOfPostGraduation: z.string().optional(),
  awardsPostGraduate: z.string().optional(),
  otherQualifications: z.string().optional(),
  
  // Qualifications - Multiple checkboxes
  qualifications: z.array(z.string()).min(1, { message: "Please select at least one qualification" }),
  otherQualification: z.string().optional(),
  
  // Subspecialty - Multiple checkboxes
  paediatricsSubspecialty: z.array(z.string()).min(1, { message: "Please select at least one subspecialty" }),
  otherSubspecialty: z.string().optional(),
  
  // Certification
  subspecialtyCertified: z.string()
    .min(1, { message: "Please specify if you are subspecialty certified" }),
  subspecialtyDegreeName: z.string().optional(),
  
  // Career Information
  currentPosition: z.string().min(1, { message: "Position is required" }),
  currentInstitution: z.string().min(1, { message: "Institution is required" }),
  countryOfWork: z.string().min(1, { message: "Country is required" }),
  yearsInPosition: z.string().optional(),
  
  // Research and Publications
  scientificPapersPublished: z.string().optional(),
  booksEdited: z.string().optional(),
  chaptersEditedInPaediatricsBooks: z.string().optional(),
  majorCareerAchievement: z.string().optional(),
  recognitionOfServices: z.string().optional(),
  
  // Personal Information
  secondNationality: z.string().optional(),
  agreeToPhotoPublication: z.boolean().default(false),
  hobbiesOrInterests: z.array(z.string()).optional(),
  nameOfSpouse: z.string().optional(),
  workOfSpouse: z.string().optional(),
  childrenNamesAndStatus: z.string().optional(),
  specialOccasionOrRole: z.string().optional(),
  extendedRequestFamilyPhoto: z.string().optional(),
  
  // File uploads (optional - will be handled separately)
  scientificPapersFiles: z.array(z.any()).optional(),
  personalPhoto: z.any().optional(),
  updatedCV: z.any().optional(),
});

export type PaediatricSchema = z.infer<typeof paediatricSchema>; 