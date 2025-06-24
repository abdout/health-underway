'use server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Fetch paediatric doctor data for review page
export async function fetchPaediatricDoctorForReview() {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { error: 'Unauthorized', data: null } as const;
    }

    const data = await db.paediatricDoctor.findUnique({
      where: { userId: user.id },
    });

    if (!data) {
      return { error: 'No paediatric doctor profile found', data: null } as const;
    }

    return { error: null, data } as const;
  } catch (e) {
    console.error('fetchPaediatricDoctorForReview error', e);
    return { error: 'Failed to fetch data', data: null } as const;
  }
}

// Mark profile as submitted (placeholder implementation – expand as needed)
export async function submitPaediatricDoctorProfile() {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { success: false, error: 'Unauthorized' } as const;
    }

    // You may want to update a status column here. For now we just revalidate caches.
    revalidatePath('/paediatric');
    revalidatePath('/dashboard');

    return { success: true, error: null } as const;
  } catch (e) {
    console.error('submitPaediatricDoctorProfile error', e);
    return { success: false, error: 'Submission failed' } as const;
  }
} 