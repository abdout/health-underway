'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { notifyNewApplication } from '@/lib/notification';
import { notifyOnboardingSubmission } from '@/components/notifications/action';

// Keep full UserReviewData type for component use
export type UserReviewData = {
  // User fields
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  
  // Doctor fields
  fullname?: string;
  whatsapp?: string;
  birthDate?: Date;
  birthCountry?: string;
  birthState?: string;
  birthLocality?: string;
  birthAdminUnit?: string;
  birthNeighborhood?: string;
  birthMonth?: number;
  birthYear?: number;
  contribute?: string;
  bio?: string;
  
  // Skills and Interests
  skills?: string[];
  interests?: string[];
  
  // Social Media
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  telegram?: string;
  instagram?: string;
  tiktok?: string;
  link?: string;
  
  // Current location
  currentCountry?: string;
  currentState?: string;
  currentLocality?: string;
  currentAdminUnit?: string;
  currentNeighborhood?: string;
  
  // Original location
  originalCountry?: string;
  originalState?: string;
  originalLocality?: string;
  originalAdminUnit?: string;
  originalNeighborhood?: string;
  
  // Personal details
  nationalityId?: string;
  maritalStatus?: string;
  gender?: string;
  religion?: string;
  
  // Education & Work
  educationLevel?: string;
  institution?: string;
  yearOfCompletion?: number;
  major?: string;
  studentYear?: number;
  
  // Bachelor's information
  bachelorInstitution?: string;
  bachelorMajor?: string;
  bachelorCompletionYear?: number;
  
  // Master's information
  masterInstitution?: string;
  masterMajor?: string;
  masterCompletionYear?: number;
  
  // PhD information
  phdInstitution?: string;
  phdMajor?: string;
  phdCompletionYear?: number;
  
  // Professor information
  professorInstitution?: string;
  professorMajor?: string;
  professorCompletionYear?: number;
  
  // Current occupation
  currentOccupation?: string;
  employmentSector?: string;
  workplaceAddress?: string;
  companyName?: string;
  
  // Student Details
  studentInstitution?: string;
  studentFaculty?: string;
  
  // Activities
  partyMember?: boolean;
  partyName?: string;
  partyStartDate?: Date;
  partyEndDate?: Date;
  
  unionMember?: boolean;
  unionName?: string;
  unionStartDate?: Date;
  unionEndDate?: Date;
  
  ngoMember?: boolean;
  ngoName?: string;
  ngoActivity?: string;
  
  clubMember?: boolean;
  clubName?: string;
  clubType?: string;
  
  // Emergency Contacts
  emergencyName1?: string;
  emergencyRelation1?: string;
  emergencyPhone1?: string;
  emergencyName2?: string;
  emergencyRelation2?: string;
  emergencyPhone2?: string;
  
  // Other
  referralSource?: string;
  acquaintanceName?: string;
  donationAmount?: number;
  donationDate?: Date;
  oathAcknowledged?: boolean;
  
  // Attachments
  image?: string;
  cv?: string;
  portfolio?: string;
  additionalFile?: string;
  
  // System fields
  onboardingStatus?: string;
  onboardingStep?: number;
  applicationStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * Server action to fetch complete user data for the review page
 */
export async function fetchUserForReview(): Promise<{ error: string | null, data: UserReviewData | null }> {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { error: "Unauthorized", data: null };
    }
    
    // Fetch user data along with doctor profile
    const userData = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        // User fields
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        
        // Include doctor profile
        doctor: {
          select: {
            // Personal info
            contribute: true,
            bio: true,
            cv: true,
            portfolio: true,
            cover: true,
            
            // Contact 
            whatsapp: true,
            twitter: true,
            facebook: true,
            linkedin: true,
            telegram: true,
            instagram: true,
            tiktok: true,
            link: true,
            
            // Birthday
            birthDate: true,
            birthCountry: true,
            birthState: true,
            birthLocality: true,
            birthAdminUnit: true,
            birthNeighborhood: true,
            birthMonth: true,
            birthYear: true,
            
            // Current Location
            currentCountry: true,
            currentState: true,
            currentLocality: true,
            currentAdminUnit: true,
            currentNeighborhood: true,
            
            // Original Location
            originalCountry: true,
            originalState: true,
            originalLocality: true,
            originalAdminUnit: true,
            originalNeighborhood: true,
            
            // Nationality
            nationalityId: true,
            maritalStatus: true,
            gender: true,
            religion: true,
            
            // Education & Work
            educationLevel: true,
            institution: true,
            yearOfCompletion: true,
            major: true,
            studentYear: true,
            
            // Bachelor's information
            bachelorInstitution: true,
            bachelorMajor: true,
            bachelorCompletionYear: true,
            
            // Master's information  
            masterInstitution: true,
            masterMajor: true,
            masterCompletionYear: true,
            
            // PhD information
            phdInstitution: true,
            phdMajor: true,
            phdCompletionYear: true,
            
            // Professor information
            professorInstitution: true,
            professorMajor: true,
            professorCompletionYear: true,
            
            currentOccupation: true,
            employmentSector: true,
            workplaceAddress: true,
            companyName: true,
            
            // Student Details
            studentInstitution: true,
            studentFaculty: true,
            
            // Activities 
            partyMember: true,
            partyName: true,
            partyStartDate: true,
            partyEndDate: true,
            
            unionMember: true,
            unionName: true,
            unionStartDate: true,
            unionEndDate: true,
            
            ngoMember: true,
            ngoName: true,
            ngoActivity: true,
            
            clubMember: true,
            clubName: true,
            clubType: true,
            
            // Skills and Interests
            skills: true,
            interests: true,
            
            // Emergency Contacts
            emergencyName1: true,
            emergencyRelation1: true,
            emergencyPhone1: true,
            emergencyName2: true,
            emergencyRelation2: true,
            emergencyPhone2: true,
            
            // Other
            referralSource: true,
            acquaintanceName: true,
            donationAmount: true,
            donationDate: true,
            oathAcknowledged: true,
            
            // Onboarding
            onboardingStatus: true,
            onboardingStep: true,
            
            // Application status
            applicationStatus: true,
            reviewedBy: true,
            reviewedAt: true,
            reviewNotes: true,
          }
        }
      }
    });

    if (!userData) {
      return { error: "User not found", data: null };
    }

    // Flatten the data structure for the component
    const flattenedData: UserReviewData = {
      // User fields
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      
      // Doctor fields (if doctor profile exists)
      ...userData.doctor,
    };

    return { error: null, data: flattenedData };
  } catch (error) {
    console.error('Error fetching user for review:', error);
    return { error: "Failed to fetch user data", data: null };
  }
}

/**
 * Server action to complete the onboarding process
 */
export async function completeOnboarding(): Promise<{ success: boolean, error: string | null }> {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Update user onboarded status
    await db.user.update({
      where: { id: user.id },
      data: { onboarded: true }
    });

    // Update doctor onboarding status
    await db.doctor.update({
      where: { userId: user.id },
      data: {
        onboardingStatus: "COMPLETED",
        applicationStatus: "PENDING" // Ready for admin review
      }
    });

    // Send notifications
    try {
      await notifyOnboardingSubmission(user.id);
      await notifyNewApplication(user.id);
    } catch (notificationError) {
      console.error('Notification error:', notificationError);
      // Don't fail the onboarding completion for notification errors
    }

    revalidatePath('/onboarding');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error completing onboarding:', error);
    return { success: false, error: "Failed to complete onboarding" };
  }
} 