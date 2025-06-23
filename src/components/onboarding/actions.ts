"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { onboardingRoutes } from "./types";
import type { ContactFormData } from "./schemas";

// Create or update doctor profile data
interface DoctorProfileData {
  [key: string]: string | number | boolean | Date | string[] | undefined;
}

export async function updateDoctorProfile(formData: DoctorProfileData) {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Unauthorized");

    // Check if doctor profile exists
    const existingDoctor = await db.doctor.findUnique({
      where: { userId: user.id }
    });

    let updatedDoctor;
    if (existingDoctor) {
      // Update existing doctor profile
      updatedDoctor = await db.doctor.update({
        where: { userId: user.id },
        data: {
          ...formData,
          onboardingStatus: "IN_PROGRESS",
          updatedAt: new Date()
        }
      });
    } else {
      // Create new doctor profile
      updatedDoctor = await db.doctor.create({
        data: {
          userId: user.id,
          ...formData,
          onboardingStatus: "PENDING",
          onboardingStep: 1
        }
      });
    }

    revalidatePath('/onboarding');
    return { success: true, doctor: updatedDoctor };
  } catch (error) {
    console.error("Doctor profile update error:", error);
    return { success: false, error: "Failed to update doctor profile" };
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

    revalidatePath('/onboarding');
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

// Terms acceptance action
export async function acceptTerms(oathAcknowledged: boolean) {
  return updateDoctorProfile({ oathAcknowledged });
}
