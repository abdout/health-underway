"use server";

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import type { PaediatricSchema } from './validation';
import { paediatricSchema } from './validation';

// Action result type
interface ActionResult {
  success: boolean;
  error?: string;
}

// ActionState for backwards compatibility
export type ActionState = {
  success: boolean;
  error: boolean;
  message?: string;
};

/**
 * Create new paediatric doctor record
 */
export async function createPaediatricDoctor(
  prevState: ActionState,
  formData: PaediatricSchema | FormData
): Promise<ActionResult> {
  try {
    console.log('Server: createPaediatricDoctor called with formData:', 
      formData instanceof FormData ? 'FormData object' : formData);
      
    // Authenticate user
    const user = await currentUser();
    if (!user?.id) {
      console.error('User not found or not authenticated');
      return { success: false, error: 'User not found or not authenticated' };
    }

    // In development, make sure a User record exists for the current session id to avoid FK violations
    if (process.env.NODE_ENV !== 'production') {
      await db.user.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          email: user.email ?? `${user.id}@local.dev`,
          name: user.name ?? 'Developer',
          role: 'USER',
        },
        update: {},
      });
    }

    // Handle either FormData or direct object
    let processedData: PaediatricSchema;
    
    if (formData instanceof FormData) {
      // If it's FormData, extract the values
      const formObject: Record<string, string | File | boolean | string[]> = {};
      
      // Handle arrays (qualifications and subspecialties)
      const qualifications: string[] = [];
      const subspecialties: string[] = [];
      
      formData.forEach((value, key) => {
        if (key === 'qualifications') {
          qualifications.push(value.toString());
        } else if (key === 'paediatricsSubspecialty') {
          subspecialties.push(value.toString());
        } else if (key === 'agreeToEmailPublication' || key === 'agreeToPhotoPublication') {
          formObject[key] = value === 'true';
        } else {
          formObject[key] = value;
        }
      });
      
      formObject.qualifications = qualifications;
      formObject.paediatricsSubspecialty = subspecialties;
      
      processedData = formObject as PaediatricSchema;
    } else {
      // If it's already an object
      processedData = formData;
    }

    // Validate form data
    const validatedData = paediatricSchema.safeParse(processedData);
    if (!validatedData.success) {
      console.error('Validation error:', validatedData.error);
      return { success: false, error: 'Invalid data provided' };
    }

    const data = validatedData.data;

    // Upsert paediatric doctor profile (create or update if already exists)
    await db.paediatricDoctor.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        fullNameEnglish: data.fullNameEnglish,
        fullNameArabic: data.fullNameArabic,
        namePrefix: data.namePrefix,
        stageOfCareer: data.stageOfCareer,
        placeOfBirth: data.placeOfBirth,
        dateOfBirth: data.dateOfBirth,
        originalHomeTownOrVillage: data.originalHomeTownOrVillage,
        personalEmail: data.personalEmail ?? '',
        agreeToEmailPublication: data.agreeToEmailPublication ?? false,
        universityOfPrimaryGraduation: data.universityOfPrimaryGraduation,
        countryOfUniversityOfPrimaryGraduation: data.countryOfUniversityOfPrimaryGraduation,
        yearOfGraduationFromMedicine: data.yearOfGraduationFromMedicine,
        awardsDuringPrimaryMedicalDegree: data.awardsDuringPrimaryMedicalDegree,
        qualifications: data.qualifications,
        otherQualification: data.otherQualification,
        otherQualifications: data.otherQualifications,
        paediatricsSubspecialty: data.paediatricsSubspecialty,
        otherSubspecialty: data.otherSubspecialty,
        subspecialtyCertified: data.subspecialtyCertified ?? '',
        subspecialtyDegreeName: data.subspecialtyDegreeName,
        currentPosition: data.currentPosition ?? '',
        currentInstitution: data.currentInstitution ?? '',
        countryOfWork: data.countryOfWork ?? '',
        academicPositionCurrentOrPast: data.academicPositionCurrentOrPast,
        pastCareerPositions: data.pastCareerPositions,
        scientificPapersPublished: data.scientificPapersPublished,
        booksEdited: data.booksEdited,
        chaptersEditedInPaediatricsBooks: data.chaptersEditedInPaediatricsBooks,
        majorCareerAchievement: data.majorCareerAchievement,
        recognitionOfServices: data.recognitionOfServices,
        secondNationality: data.secondNationality,
        agreeToPhotoPublication: data.agreeToPhotoPublication,
        hobbiesOrInterests: data.hobbiesOrInterests ?? [],
        nameOfSpouse: data.nameOfSpouse,
        workOfSpouse: data.workOfSpouse,
        childrenNamesAndStatus: data.childrenNamesAndStatus,
        specialOccasionOrRole: data.specialOccasionOrRole,
        extendedRequestFamilyPhoto: data.extendedRequestFamilyPhoto,
        scientificPapersFiles: Array.isArray(data.scientificPapersFiles)
          ? data.scientificPapersFiles.filter((v) => typeof v === 'string')
          : [],
        personalPhotos: Array.isArray(data.personalPhotos)
          ? data.personalPhotos.filter((v) => typeof v === 'string')
          : [],
        updatedCV: data.updatedCV,
      },
      update: {
        fullNameEnglish: data.fullNameEnglish,
        fullNameArabic: data.fullNameArabic,
        namePrefix: data.namePrefix,
        stageOfCareer: data.stageOfCareer,
        placeOfBirth: data.placeOfBirth,
        dateOfBirth: data.dateOfBirth,
        originalHomeTownOrVillage: data.originalHomeTownOrVillage,
        personalEmail: data.personalEmail ?? '',
        agreeToEmailPublication: data.agreeToEmailPublication ?? false,
        universityOfPrimaryGraduation: data.universityOfPrimaryGraduation,
        countryOfUniversityOfPrimaryGraduation: data.countryOfUniversityOfPrimaryGraduation,
        yearOfGraduationFromMedicine: data.yearOfGraduationFromMedicine,
        awardsDuringPrimaryMedicalDegree: data.awardsDuringPrimaryMedicalDegree,
        qualifications: data.qualifications,
        otherQualification: data.otherQualification,
        otherQualifications: data.otherQualifications,
        paediatricsSubspecialty: data.paediatricsSubspecialty,
        otherSubspecialty: data.otherSubspecialty,
        subspecialtyCertified: data.subspecialtyCertified ?? '',
        subspecialtyDegreeName: data.subspecialtyDegreeName,
        currentPosition: data.currentPosition ?? '',
        currentInstitution: data.currentInstitution ?? '',
        countryOfWork: data.countryOfWork ?? '',
        academicPositionCurrentOrPast: data.academicPositionCurrentOrPast,
        pastCareerPositions: data.pastCareerPositions,
        scientificPapersPublished: data.scientificPapersPublished,
        booksEdited: data.booksEdited,
        chaptersEditedInPaediatricsBooks: data.chaptersEditedInPaediatricsBooks,
        majorCareerAchievement: data.majorCareerAchievement,
        recognitionOfServices: data.recognitionOfServices,
        secondNationality: data.secondNationality,
        agreeToPhotoPublication: data.agreeToPhotoPublication,
        hobbiesOrInterests: data.hobbiesOrInterests ?? [],
        nameOfSpouse: data.nameOfSpouse,
        workOfSpouse: data.workOfSpouse,
        childrenNamesAndStatus: data.childrenNamesAndStatus,
        specialOccasionOrRole: data.specialOccasionOrRole,
        extendedRequestFamilyPhoto: data.extendedRequestFamilyPhoto,
        scientificPapersFiles: Array.isArray(data.scientificPapersFiles)
          ? data.scientificPapersFiles.filter((v) => typeof v === 'string')
          : [],
        personalPhotos: Array.isArray(data.personalPhotos)
          ? data.personalPhotos.filter((v) => typeof v === 'string')
          : [],
        updatedCV: data.updatedCV,
      },
    });

    // Revalidate paths
    revalidatePath('/paediatric');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    console.error('Error creating/updating paediatric doctor record:', error);
    return { success: false, error: error?.message || 'Failed to save paediatric doctor information' };
  }
}

/**
 * Get paediatric doctor data
 */
export async function getPaediatricDoctor() {
  try {
    const user = await currentUser();
    if (!user?.id) return null;

    const paediatricData = await db.paediatricDoctor.findUnique({
      where: { userId: user.id }
    });

    return paediatricData;
  } catch (error) {
    console.error('Error fetching paediatric doctor data:', error);
    return null;
  }
}

/**
 * Update existing paediatric doctor record
 */
export async function updatePaediatricDoctor(
  prevState: ActionState,
  formData: PaediatricSchema | FormData
): Promise<ActionResult> {
  try {
    console.log('Server: updatePaediatricDoctor called with formData:', 
      formData instanceof FormData ? 'FormData object' : formData);
    
    // Authenticate user
    const user = await currentUser();
    if (!user?.id) {
      console.error('User not found or not authenticated');
      return { success: false, error: 'User not found or not authenticated' };
    }

    // In development, make sure a User record exists for the current session id to avoid FK violations
    if (process.env.NODE_ENV !== 'production') {
      await db.user.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          email: user.email ?? `${user.id}@local.dev`,
          name: user.name ?? 'Developer',
          role: 'USER',
        },
        update: {},
      });
    }

    // Handle either FormData or direct object
    let processedData: PaediatricSchema;
    
    if (formData instanceof FormData) {
      // If it's FormData, extract the values
      const formObject: Record<string, string | File | boolean | string[]> = {};
      
      // Handle arrays (qualifications and subspecialties)
      const qualifications: string[] = [];
      const subspecialties: string[] = [];
      
      formData.forEach((value, key) => {
        if (key === 'qualifications') {
          qualifications.push(value.toString());
        } else if (key === 'paediatricsSubspecialty') {
          subspecialties.push(value.toString());
        } else if (key === 'agreeToEmailPublication' || key === 'agreeToPhotoPublication') {
          formObject[key] = value === 'true';
        } else {
          formObject[key] = value;
        }
      });
      
      formObject.qualifications = qualifications;
      formObject.paediatricsSubspecialty = subspecialties;
      
      processedData = formObject as PaediatricSchema;
    } else {
      // If it's already an object
      processedData = formData;
    }

    // Validate form data
    const validatedData = paediatricSchema.safeParse(processedData);
    if (!validatedData.success) {
      console.error('Validation error:', validatedData.error);
      return { success: false, error: 'Invalid data provided' };
    }

    const data = validatedData.data;

    // Update paediatric doctor profile
    await db.paediatricDoctor.update({
      where: { userId: user.id },
      data: {
        fullNameEnglish: data.fullNameEnglish,
        fullNameArabic: data.fullNameArabic,
        namePrefix: data.namePrefix,
        stageOfCareer: data.stageOfCareer,
        placeOfBirth: data.placeOfBirth,
        dateOfBirth: data.dateOfBirth,
        originalHomeTownOrVillage: data.originalHomeTownOrVillage,
        personalEmail: data.personalEmail ?? '',
        agreeToEmailPublication: data.agreeToEmailPublication ?? false,
        universityOfPrimaryGraduation: data.universityOfPrimaryGraduation,
        countryOfUniversityOfPrimaryGraduation: data.countryOfUniversityOfPrimaryGraduation,
        yearOfGraduationFromMedicine: data.yearOfGraduationFromMedicine,
        awardsDuringPrimaryMedicalDegree: data.awardsDuringPrimaryMedicalDegree,
        qualifications: data.qualifications,
        otherQualification: data.otherQualification,
        otherQualifications: data.otherQualifications,
        paediatricsSubspecialty: data.paediatricsSubspecialty,
        otherSubspecialty: data.otherSubspecialty,
        subspecialtyCertified: data.subspecialtyCertified ?? '',
        subspecialtyDegreeName: data.subspecialtyDegreeName,
        currentPosition: data.currentPosition ?? '',
        currentInstitution: data.currentInstitution ?? '',
        countryOfWork: data.countryOfWork ?? '',
        academicPositionCurrentOrPast: data.academicPositionCurrentOrPast,
        pastCareerPositions: data.pastCareerPositions,
        scientificPapersPublished: data.scientificPapersPublished,
        booksEdited: data.booksEdited,
        chaptersEditedInPaediatricsBooks: data.chaptersEditedInPaediatricsBooks,
        majorCareerAchievement: data.majorCareerAchievement,
        recognitionOfServices: data.recognitionOfServices,
        secondNationality: data.secondNationality,
        agreeToPhotoPublication: data.agreeToPhotoPublication,
        hobbiesOrInterests: data.hobbiesOrInterests ?? [],
        nameOfSpouse: data.nameOfSpouse,
        workOfSpouse: data.workOfSpouse,
        childrenNamesAndStatus: data.childrenNamesAndStatus,
        specialOccasionOrRole: data.specialOccasionOrRole,
        extendedRequestFamilyPhoto: data.extendedRequestFamilyPhoto,
        scientificPapersFiles: Array.isArray(data.scientificPapersFiles)
          ? data.scientificPapersFiles.filter((v) => typeof v === 'string')
          : [],
        personalPhotos: Array.isArray(data.personalPhotos)
          ? data.personalPhotos.filter((v) => typeof v === 'string')
          : [],
        updatedCV: data.updatedCV,
      }
    });

    // Revalidate paths
    revalidatePath('/paediatric');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Error updating paediatric doctor record:', error);
    return { success: false, error: 'Failed to update paediatric doctor information' };
  }
}

/**
 * Delete paediatric doctor record
 */
export async function deletePaediatricDoctor() {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: 'User not found' };

    await db.paediatricDoctor.delete({
      where: { userId: user.id }
    });

    revalidatePath('/paediatric');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Error deleting paediatric doctor record:', error);
    return { success: false, error: 'Failed to delete paediatric doctor record' };
  }
} 