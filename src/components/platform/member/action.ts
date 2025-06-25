'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { notifyNewApplication } from '@/lib/notification';
import { member } from './type';

// Keep full UserReviewData type for component use
export type UserReviewData = {
  // All fields needed for the component...
  // Personal info
  name?: string;
  fullname?: string;
  email?: string;
  phone?: string;
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
  id?: string;
  role?: string;
  onboardingStatus?: string;
  onboardingStep?: number;
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
    
    // Fetch the PaediatricDoctor profile linked to this user
    const doctorData = await db.paediatricDoctor.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!doctorData) {
      return { error: "Doctor profile not found", data: null };
    }
    
    console.log("Raw doctor data from DB:", doctorData);
    
    // Convert null values to undefined to match the UserReviewData type
    const cleanedData: UserReviewData = Object.fromEntries(
      Object.entries(doctorData as Record<string, any>).map(([key, value]) => [key, value === null ? undefined : value])
    ) as UserReviewData;
    
    console.log("Cleaned doctor data:", cleanedData);
    
    return { error: null, data: cleanedData };
  } catch (error) {
    console.error("Error fetching user data for review:", error);
    return { error: "Error fetching user data", data: null };
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
    
    // Update onboarding status on the PaediatricDoctor profile
    await db.paediatricDoctor.update({
      where: { userId: user.id },
      data: {
        onboardingStatus: "COMPLETED",
        // Using a temporary workaround until Prisma schema is updated
        ...(process.env.NODE_ENV === 'production' ? {} : { applicationStatus: "PENDING" })
      }
    });
    
    // Fetch doctor profile for better notification details
    const doctorProfile = await db.paediatricDoctor.findUnique({
      where: { userId: user.id },
      select: {
        fullNameArabic: true,
        fullNameEnglish: true,
      }
    });
    
    // Get user details for notification
    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
      }
    });
    
    // Get all membership secretaries and admins for notification
    const secretaries = await db.user.findMany({
      where: { role: "MEMBERSHIP" },
      select: { 
        email: true,
      }
    });
    
    const admins = await db.user.findMany({
      where: { role: "ADMIN" },
      select: { 
        email: true,
      }
    });
    
    // Combine emails without duplicates
    const secretaryEmails = secretaries.map(sec => sec.email).filter(Boolean) as string[];
    const adminEmails = admins.map(admin => admin.email).filter(Boolean) as string[];
    const uniqueNotificationEmails = [...new Set([...secretaryEmails, ...adminEmails])];
    
    if (uniqueNotificationEmails.length > 0 && userData) {
      // Send notification about new application
      await notifyNewApplication(
        uniqueNotificationEmails,
        (doctorProfile?.fullNameArabic ?? doctorProfile?.fullNameEnglish ?? userData.name) || "User",
        userData.email,
        userData.phone,
        null // WhatsApp not available on PaediatricDoctor
      );
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return { success: false, error: "Failed to complete onboarding" };
  }
}

/**
 * Server action to fetch all members
 */
export async function fetchAllMembers(): Promise<{ error: string | null, data: member[] }> {
  try {
    // Fetch all paediatric doctors who have completed the onboarding process
    const doctors = await db.paediatricDoctor.findMany({
      where: {
        onboardingStatus: "COMPLETED",
      },
      include: {
        user: {
          select: {
            phone: true,
          },
        },
      },
    });

    // Transform the data to match the expected format
    const formattedMembers = doctors.map(doc => {
      return {
        _id: doc.userId,
        name: doc.fullNameArabic || doc.fullNameEnglish || "",
        dob: doc.dateOfBirth || "",
        address: doc.originalHomeTownOrVillage || "غير محدد",
        gender: "", // Gender not available on PaediatricDoctor
        rank: doc.currentPosition || "",
        interest: Array.isArray(doc.hobbiesOrInterests) ? doc.hobbiesOrInterests.join(", ") : "",
        skill: Array.isArray(doc.qualifications) ? doc.qualifications.join(", ") : (doc.otherQualification || ""),
        club: "", // Club name not available on PaediatricDoctor
        image: Array.isArray(doc.personalPhotos) && doc.personalPhotos.length ? doc.personalPhotos[0] : "",
        contact: {
          phone: doc.user?.phone || "",
          facebook: "",
          whatsapp: "",
        },
      };
    });

    return { error: null, data: formattedMembers };
  } catch (error) {
    console.error("Error fetching members:", error);
    return { error: "Failed to fetch members", data: [] };
  }
}

/**
 * Server action to delete a member
 */
export async function deleteMember(memberId: string): Promise<{ success: boolean, error: string | null }> {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    
    // Check if the current user has permission to delete members
    // Only membership secretaries and admins should be able to delete members
    const currentUserData = await db.user.findUnique({
      where: { id: user.id },
      select: { 
        role: true,
      }
    });
    
    if (!currentUserData || (currentUserData.role !== "ADMIN" && currentUserData.role !== "MEMBERSHIP")) {
      return { success: false, error: "Unauthorized: You don't have permission to delete members" };
    }
    
    // Delete the member
    const deletedUser = await db.user.delete({
      where: { id: memberId },
    });
    
    if (!deletedUser) {
      return { success: false, error: "Member not found" };
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting member:", error);
    return { success: false, error: "Failed to delete member" };
  }
} 