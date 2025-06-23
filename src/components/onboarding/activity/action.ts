"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ActivitySchema } from "./validation";

export type ActionState = {
  success: boolean;
  error: boolean;
  message?: string;
};

// Process and submit the activity form data to Doctor model
export async function submitActivityForm(prevState: ActionState, formData: ActivitySchema): Promise<ActionState> {
  try {
    console.log("Starting activity form submission");
    
    // Basic validation
    if (!formData) {
      console.error("Form data is missing");
      return { success: false, error: true, message: "Form data is missing" };
    }
    
    // Log the form data for debugging
    console.log("Processing form data:", JSON.stringify(formData, null, 2));
    
    // Get current user (required for any update)
    const user = await currentUser();
    
    if (!user?.id) {
      console.error("User not authenticated");
      return { success: false, error: true, message: "User not authenticated" };
    }
    
    console.log("User found:", user.id);
    
    try {
      // Prepare data for Doctor model
      const doctorData = {
        // Party information
        partyMember: Boolean(formData.partyMember),
        partyName: formData.partyName || null,
        partyStartDate: formData.partyStartDate ? new Date(formData.partyStartDate) : null,
        partyEndDate: formData.partyEndDate ? new Date(formData.partyEndDate) : null,
        
        // Union information
        unionMember: Boolean(formData.unionMember),
        unionName: formData.unionName || null,
        unionStartDate: formData.unionStartDate ? new Date(formData.unionStartDate) : null,
        unionEndDate: formData.unionEndDate ? new Date(formData.unionEndDate) : null,
        
        // NGO information
        ngoMember: Boolean(formData.ngoMember),
        ngoName: formData.ngoName || null,
        ngoActivity: formData.ngoActivity || null,
        
        // Club information
        clubMember: Boolean(formData.clubMember),
        clubName: formData.clubName || null,
        clubType: formData.clubType || null,
        
        // Skills and interests
        skills: Array.isArray(formData.skills) ? formData.skills : [],
        interests: Array.isArray(formData.interests) ? formData.interests : [],
        
        // Update onboarding step
        onboardingStep: 3
      };
      
      console.log("Updating doctor profile with activity data");
      
      // Create or update Doctor profile with activity data
      await db.doctor.upsert({
        where: { userId: user.id },
        update: doctorData,
        create: {
          userId: user.id,
          ...doctorData,
        }
      });
      
      console.log("Update successful");
      revalidatePath("/onboarding");
      return { success: true, error: false };
    } catch (dbError: unknown) {
      console.error("Database error:", dbError);
      const errorMessage = dbError instanceof Error 
        ? dbError.message 
        : "Unknown database error";
      return { success: false, error: true, message: errorMessage };
    }
  } catch (error: unknown) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error";
    return { 
      success: false, 
      error: true, 
      message: errorMessage 
    };
  }
}

// Read activity data from Doctor model
export async function getActivity() {
  try {
    const user = await currentUser();
    if (!user?.id) return null;

    const doctorData = await db.doctor.findUnique({
      where: { userId: user.id },
      select: {
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
        skills: true,
        interests: true,
      }
    });

    return doctorData;
  } catch (error) {
    console.error(error);
    return null;
  }
} 