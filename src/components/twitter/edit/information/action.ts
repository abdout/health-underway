"use server";

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import type { InformationSchema } from './validation';
import { informationSchema } from './validation';

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
 * Create new information record (for editing, this is actually an update)
 */
export async function createInformation(
  prevState: ActionState,
  formData: InformationSchema | FormData
): Promise<ActionResult> {
  return updateInformation(prevState, formData);
}

// Read
export async function getInformation() {
  try {
    const user = await currentUser();
    if (!user?.id) return null;

    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        // Include doctor profile data
        doctor: {
          select: {
            contribute: true,
            bio: true,
            birthCountry: true,
            birthState: true,
            birthLocality: true,
            birthMonth: true,
            birthYear: true,
            currentLocality: true,
            currentCountry: true,
            currentState: true,
            currentAdminUnit: true,
            currentNeighborhood: true,
            originalLocality: true,
            originalCountry: true,
            educationLevel: true,
            institution: true,
            yearOfCompletion: true,
            currentOccupation: true,
            employmentSector: true,
            workplaceAddress: true,
            companyName: true,
            maritalStatus: true,
            gender: true,
            religion: true,
            nationalityId: true,
          }
        }
      }
    });

    if (!userData) return null;

    // Flatten the structure for backward compatibility
    return {
      name: userData.name,
      ...userData.doctor,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Update existing information record
 */
export async function updateInformation(
  prevState: ActionState,
  formData: InformationSchema | FormData
): Promise<ActionResult> {
  try {
    console.log('Server: updateInformation called with formData:', 
      formData instanceof FormData ? 'FormData object' : formData);
    
    // Authenticate user
    const user = await currentUser();
    if (!user?.id) {
      console.error('User not found or not authenticated');
      return { success: false, error: 'User not found or not authenticated' };
    }

    // Handle either FormData or direct object
    let processedData: InformationSchema;
    
    if (formData instanceof FormData) {
      // If it's FormData, extract the values
      const formObject: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      processedData = formObject as InformationSchema;
    } else {
      // If it's already an object
      processedData = formData;
    }

    // Validate form data
    const validatedData = informationSchema.safeParse(processedData);
    if (!validatedData.success) {
      console.error('Validation error:', validatedData.error);
      return { success: false, error: 'Invalid data provided' };
    }

    // Convert string values to numbers where needed
    const data = {
      ...validatedData.data,
      birthMonth: validatedData.data.birthMonth ? parseInt(validatedData.data.birthMonth.toString()) : null,
      birthYear: validatedData.data.birthYear ? parseInt(validatedData.data.birthYear.toString()) : null,
      studentYear: validatedData.data.studentYear ? parseInt(validatedData.data.studentYear.toString()) : null,
      yearOfCompletion: validatedData.data.yearOfCompletion ? parseInt(validatedData.data.yearOfCompletion.toString()) : null,
      bachelorCompletionYear: validatedData.data.bachelorCompletionYear ? parseInt(validatedData.data.bachelorCompletionYear.toString()) : null,
      masterCompletionYear: validatedData.data.masterCompletionYear ? parseInt(validatedData.data.masterCompletionYear.toString()) : null,
      phdCompletionYear: validatedData.data.phdCompletionYear ? parseInt(validatedData.data.phdCompletionYear.toString()) : null,
      professorCompletionYear: validatedData.data.professorCompletionYear ? parseInt(validatedData.data.professorCompletionYear.toString()) : null,
    };

    // Separate User and Doctor data
    const { name, fullname, ...doctorData } = data;

    // Update User basic info if provided
    if (name || fullname) {
      await db.user.update({
        where: { id: user.id },
        data: {
          name: name || undefined,
        }
      });
    }

    // Update Doctor profile
    await db.doctor.update({
      where: { userId: user.id },
      data: doctorData
    });

    // Revalidate paths
    revalidatePath('/dashboard/profile/edit/information');
    revalidatePath('/dashboard/profile');

    return { success: true };
  } catch (error) {
    console.error('Error updating information:', error);
    return { success: false, error: 'Failed to update information' };
  }
}

// Delete (Clear information)
export async function deleteInformation() {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: true };

    // Clear relevant doctor profile fields (don't delete the whole profile)
    await db.doctor.update({
      where: { userId: user.id },
      data: {
        contribute: null,
        bio: null,
        birthCountry: null,
        birthState: null,
        birthLocality: null,
        birthMonth: null,
        birthYear: null,
        currentLocality: null,
        currentCountry: null,
        currentState: null,
        currentAdminUnit: null,
        currentNeighborhood: null,
        originalLocality: null,
        originalCountry: null,
        educationLevel: null,
        institution: null,
        yearOfCompletion: null,
        currentOccupation: null,
        employmentSector: null,
        workplaceAddress: null,
        maritalStatus: null,
        gender: null,
        religion: null,
        nationalityId: null,
      }
    });

    revalidatePath("/dashboard/profile/edit");
    revalidatePath("/dashboard/profile");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
} 