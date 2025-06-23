"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import type { ContactFormData } from "./schemas";

// Edit profile actions for User/Doctor schema

// Create or update doctor profile data
interface DoctorProfileData {
  [key: string]: string | number | boolean | Date | string[] | undefined;
}

export async function updateDoctorProfile(formData: DoctorProfileData) {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Unauthorized");

    // Update existing doctor profile (user should already have one)
    const updatedDoctor = await db.doctor.update({
      where: { userId: user.id },
      data: {
        ...formData,
        updatedAt: new Date()
      }
    });

    revalidatePath('/dashboard/profile/edit');
    revalidatePath('/dashboard/profile');
    return { success: true, doctor: updatedDoctor };
  } catch (error) {
    console.error("Doctor profile update error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateBasicUserInfo(userData: { name?: string; email?: string; phone?: string }) {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Unauthorized");

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        ...userData,
        updatedAt: new Date()
      }
    });

    revalidatePath('/dashboard/profile/edit');
    revalidatePath('/dashboard/profile');
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("User update error:", error);
    return { success: false, error: "Failed to update user info" };
  }
}

// Contact form action
export async function updateContactInfo(formData: ContactFormData) {
  return updateDoctorProfile(formData);
}

// Attachment form action  
export async function updateAttachments(attachmentData: { image?: string; cv?: string; portfolio?: string; additionalFile?: string }) {
  return updateDoctorProfile(attachmentData);
}

// Information form action
export async function updatePersonalInformation(infoData: any) {
  // Split data between User and Doctor models
  const { name, email, ...doctorData } = infoData;
  
  try {
    // Update user basic info if provided
    if (name || email) {
      await updateBasicUserInfo({ name, email });
    }
    
    // Update doctor profile
    return updateDoctorProfile(doctorData);
  } catch (error) {
    console.error("Personal information update error:", error);
    return { success: false, error: "Failed to update personal information" };
  }
}

// Education form action
export async function updateEducationInfo(educationData: any) {
  return updateDoctorProfile(educationData);
}

// Activity form action
export async function updateActivityInfo(activityData: any) {
  return updateDoctorProfile(activityData);
}

// Contribution form action
export async function updateContributionInfo(contributionData: any) {
  return updateDoctorProfile(contributionData);
}

// Fetch complete profile data for editing
export async function fetchProfileForEdit() {
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
        doctor: true
      }
    });

    if (!userData) {
      return { error: "User not found", data: null };
    }

    // Flatten the data structure for the components
    const flattenedData = {
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
    console.error('Error fetching profile for edit:', error);
    return { error: "Failed to fetch profile data", data: null };
  }
}
