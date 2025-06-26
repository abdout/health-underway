import { PaediatricSchema } from "./validation";

// Sample data to quickly populate the Paediatric Doctor form while developing / debugging.
// NOTE: This data is **ONLY** meant for local development – do **NOT** persist it to production.
export const samplePaediatricData: PaediatricSchema = {
  // Basic Information
  fullNameEnglish: "John Doe",
  fullNameArabic: "جون دو",
  namePrefix: "doctor",
  stageOfCareer: "trainee",

  // Personal Details
  placeOfBirth: "Khartoum",
  dateOfBirth: "1990-01-01",
  originalHomeTownOrVillage: "Omdurman",
  personalEmail: "john.doe@example.com",
  agreeToEmailPublication: true,

  // Education – Primary
  universityOfPrimaryGraduation: "university-of-khartoum",
  countryOfUniversityOfPrimaryGraduation: "sudan",
  yearOfGraduationFromMedicine: "2014",
  awardsDuringPrimaryMedicalDegree: "Best Student Award",

  // Education – Post-graduate
  universityOfPostGraduation: "university-of-khartoum",
  countryOfUniversityOfPostGraduation: "sudan",
  yearOfPostGraduation: "2018",
  awardsPostGraduate: "Research Fellowship",
  otherQualifications: "",

  // Qualifications
  qualifications: ["mbbs", "mrcpch"],
  otherQualification: "",

  // Sub-specialties
  paediatricsSubspecialty: ["general_paediatrics", "cardiology"],
  otherSubspecialty: "",

  // Certification
  subspecialtyCertified: "yes",
  subspecialtyDegreeName: "Cardiology Fellowship",

  // Career Information
  currentPosition: "consultant",
  currentInstitution: "Khartoum Children Hospital",
  countryOfWork: "sudan",
  yearsInPosition: "3",
  academicPositionCurrentOrPast: "Assistant Professor",
  pastCareerPositions: "Resident Doctor (2014-2016)",

  // Research & Publications
  scientificPapersPublished: "Pediatric Cardiology Study 2019",
  booksEdited: "Pediatric Reference Handbook",
  chaptersEditedInPaediatricsBooks: "Chapter on Cardiology",
  majorCareerAchievement: "Developed a new cardiac screening protocol",
  recognitionOfServices: "Health Ministry Award 2021",

  // Personal Information
  secondNationality: "canada",
  agreeToPhotoPublication: true,
  hobbiesOrInterests: ["reading", "football"],
  nameOfSpouse: "Jane Doe",
  workOfSpouse: "Nurse",
  childrenNamesAndStatus: "Jack (5), Jill (3)",
  specialOccasionOrRole: "Family Day Organiser",
  extendedRequestFamilyPhoto: "yes",

  // File uploads – pre-populated with a placeholder where possible
  scientificPapersFiles: [
    "https://res.cloudinary.com/demo/raw/upload/sample.pdf"
  ],
  personalPhotos: [
    "https://res.cloudinary.com/demo/image/upload/w_300,h_300,c_fill,g_face/sample.jpg"
  ],
  updatedCV: "https://res.cloudinary.com/demo/raw/upload/sample_cv.pdf",
}; 