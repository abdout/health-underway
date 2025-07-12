import { z } from "zod";

export const paediatricSchema = z.object({
  // Basic Information
  fullNameEnglish: z.string().optional(),
  fullNameArabic: z.string().optional(),
  namePrefix: z.string().optional(),
  stageOfCareer: z.string().optional(),
  
  // Personal Details
  placeOfBirth: z.string().optional(),
  dateOfBirth: z.string().optional(),
  originalHomeTownOrVillage: z.string().optional(),
  personalEmail: z.string().optional(),
  agreeToEmailPublication: z.boolean().optional(),
  
  // Primary Education
  universityOfPrimaryGraduation: z.string().optional(),
  countryOfUniversityOfPrimaryGraduation: z.string().optional(),
  yearOfGraduationFromMedicine: z.string().optional(),
  awardsDuringPrimaryMedicalDegree: z.string().optional(),
  
  // Post Graduate Education
  universityOfPostGraduation: z.string().optional(),
  countryOfUniversityOfPostGraduation: z.string().optional(),
  yearOfPostGraduation: z.string().optional(),
  awardsPostGraduate: z.string().optional(),
  otherQualifications: z.string().optional(),
  
  // Qualifications - Multiple checkboxes
  qualifications: z.array(z.string()).optional(),
  otherQualification: z.string().optional(),
  
  // Subspecialty - Multiple checkboxes
  paediatricsSubspecialty: z.array(z.string()).optional(),
  otherSubspecialty: z.string().optional(),
  
  // Certification
  subspecialtyCertified: z.string().optional(),
  subspecialtyDegreeName: z.string().optional(),
  
  // Career Information
  currentPosition: z.string().optional(),
  currentInstitution: z.string().optional(),
  countryOfWork: z.string().optional(),
  yearsInPosition: z.string().optional(),
  academicPositionCurrentOrPast: z.string().optional(),
  pastCareerPositions: z.string().optional(),
  
  // Research and Publications
  scientificPapersPublished: z.string().optional(),
  booksEdited: z.string().optional(),
  chaptersEditedInPaediatricsBooks: z.string().optional(),
  majorCareerAchievement: z.string().optional(),
  recognitionOfServices: z.string().optional(),
  
  // Personal Information
  secondNationality: z.string().optional(),
  agreeToPhotoPublication: z.boolean().optional(),
  hobbiesOrInterests: z.array(z.string()).optional(),
  nameOfSpouse: z.string().optional(),
  workOfSpouse: z.string().optional(),
  childrenNamesAndStatus: z.string().optional(),
  specialOccasionOrRole: z.string().optional(),
  extendedRequestFamilyPhoto: z.string().optional(),
  
  // File uploads (optional - will be handled separately)
  scientificPapersFiles: z.array(z.any()).optional(),
  personalPhotos: z.array(z.any()).optional(),
  updatedCV: z.any().optional(),
});

export type PaediatricSchema = z.infer<typeof paediatricSchema>;