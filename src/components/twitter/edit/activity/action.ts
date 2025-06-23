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

// Process and submit the activity form data for editing doctor profile
export async function submitActivityForm(prevState: ActionState, formData: ActivitySchema): Promise<ActionState> {
  try {
    console.log("Starting activity form submission for edit");
    
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
      // Update Doctor profile with activity data
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
      };
      
      console.log("Updating doctor profile with activity data");
      
      // Perform the database update
      const result = await db.doctor.update({
        where: { userId: user.id },
        data: doctorData,
        select: { id: true }
      });
      
      console.log("Update successful:", result.id);
      revalidatePath("/dashboard/profile/edit");
      revalidatePath("/dashboard/profile");
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