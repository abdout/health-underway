"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ContactSchema } from "./validation";

export type ActionState = {
  success: boolean;
  error: boolean;
};

// Create
export async function createContact(state: ActionState, data: ContactSchema) {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: true };

    // Check if doctor profile exists, create if not
    const existingDoctor = await db.doctor.findUnique({
      where: { userId: user.id }
    });

    if (existingDoctor) {
      // Update existing doctor profile
      await db.doctor.update({
        where: { userId: user.id },
        data: {
          phone: data.phone || null,
          whatsapp: data.whatsapp || null,
          twitter: data.twitter || null,
          facebook: data.facebook || null,
          linkedin: data.linkedin || null,
          telegram: data.telegram || null,
          instagram: data.instagram || null,
          tiktok: data.tiktok || null,
          onboardingStep: 2
        }
      });
    } else {
      // Create new doctor profile
      await db.doctor.create({
        data: {
          userId: user.id,
          phone: data.phone || null,
          whatsapp: data.whatsapp || null,
          twitter: data.twitter || null,
          facebook: data.facebook || null,
          linkedin: data.linkedin || null,
          telegram: data.telegram || null,
          instagram: data.instagram || null,
          tiktok: data.tiktok || null,
          onboardingStep: 2
        }
      });
    }

    revalidatePath("/onboarding");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
}

// Read
export async function getContact() {
  try {
    const user = await currentUser();
    if (!user?.id) return null;

    const doctorData = await db.doctor.findUnique({
      where: { userId: user.id },
      select: {
        phone: true,
        whatsapp: true,
        twitter: true,
        facebook: true,
        linkedin: true,
        telegram: true,
        instagram: true,
        tiktok: true,
      }
    });

    return doctorData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update
export async function updateContact(state: ActionState, data: ContactSchema) {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: true };

    // Ensure doctor profile exists
    await db.doctor.upsert({
      where: { userId: user.id },
      update: {
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        twitter: data.twitter || null,
        facebook: data.facebook || null,
        linkedin: data.linkedin || null,
        telegram: data.telegram || null,
        instagram: data.instagram || null,
        tiktok: data.tiktok || null
      },
      create: {
        userId: user.id,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        twitter: data.twitter || null,
        facebook: data.facebook || null,
        linkedin: data.linkedin || null,
        telegram: data.telegram || null,
        instagram: data.instagram || null,
        tiktok: data.tiktok || null
      }
    });

    revalidatePath("/onboarding");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
}

// Delete (Clear contact info)
export async function deleteContact() {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: true };

    await db.doctor.update({
      where: { userId: user.id },
      data: {
        phone: null,
        whatsapp: null,
        twitter: null,
        facebook: null,
        linkedin: null,
        telegram: null,
        instagram: null,
        tiktok: null,
      }
    });

    revalidatePath("/onboarding");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
}

// For form submission from non-JS clients
