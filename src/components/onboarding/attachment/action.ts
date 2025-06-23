"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { AttachmentSchema } from "./validation";

export type ActionState = {
  success: boolean;
  error: boolean;
};

// Create
export async function createAttachment(state: ActionState, data: AttachmentSchema) {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: true };

    // Create or update Doctor profile with attachment data
    await db.doctor.upsert({
      where: { userId: user.id },
      update: {
        cover: data.image || null,
        cv: data.cv || null,
        portfolio: data.portfolio || null,
        onboardingStep: 3
      },
      create: {
        userId: user.id,
        cover: data.image || null,
        cv: data.cv || null,
        portfolio: data.portfolio || null,
        onboardingStep: 3
      }
    });

    revalidatePath("/onboarding");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
}

// Read
export async function getAttachment() {
  try {
    const user = await currentUser();
    if (!user?.id) return null;

    const doctorData = await db.doctor.findUnique({
      where: { userId: user.id },
      select: {
        cover: true,
        cv: true,
        portfolio: true,
      }
    });

    return doctorData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update
export async function updateAttachment(_state: ActionState, data: AttachmentSchema) {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: true };

    await db.doctor.upsert({
      where: { userId: user.id },
      update: {
        cover: data.image || null,
        cv: data.cv || null,
        portfolio: data.portfolio || null,
      },
      create: {
        userId: user.id,
        cover: data.image || null,
        cv: data.cv || null,
        portfolio: data.portfolio || null,
      }
    });

    revalidatePath("/onboarding");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
}

// Delete
export async function deleteAttachment() {
  try {
    const user = await currentUser();
    if (!user?.id) return { success: false, error: true };

    await db.doctor.update({
      where: { userId: user.id },
      data: {
        cover: null,
        cv: null,
        portfolio: null,
      }
    });

    revalidatePath("/onboarding");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
} 