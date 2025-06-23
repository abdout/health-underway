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

    // Update Doctor profile with contact data
    await db.doctor.update({
      where: { userId: user.id },
      data: {
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        twitter: data.twitter || null,
        facebook: data.facebook || null,
        linkedin: data.linkedin || null,
        link: data.link || null,
        telegram: data.telegram || null,
        instagram: data.instagram || null,
        tiktok: data.tiktok || null,
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
        link: true,
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

    await db.doctor.update({
      where: { userId: user.id },
      data: {
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        twitter: data.twitter || null,
        facebook: data.facebook || null,
        linkedin: data.linkedin || null,
        link: data.link || null,
        telegram: data.telegram || null,
        instagram: data.instagram || null,
        tiktok: data.tiktok || null
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
        link: null,
        telegram: null,
        instagram: null,
        tiktok: null,
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

// For form submission from non-JS clients
