// Server actions for membership application status and onboarding status
"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notifyApplicationApproved, notifyApplicationRejected } from "@/components/notifications/action";

// Approve application: sets applicationStatus to "APPROVED"
export async function approveApplication(userId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // First check if the paediatric doctor record exists
    const doctorRecord = await db.paediatricDoctor.findUnique({
      where: { userId }
    });

    // Get user data to create basic record if needed
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (!doctorRecord) {
      // Create a basic paediatric doctor record
      await db.paediatricDoctor.create({
        data: {
          userId,
          fullNameEnglish: user.name || "Unknown",
          fullNameArabic: user.name || "Unknown",
          namePrefix: "Dr.",
          stageOfCareer: "Other",
          personalEmail: user.email || "",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "Unknown",
          countryOfUniversityOfPrimaryGraduation: "Unknown",
          yearOfGraduationFromMedicine: new Date().getFullYear().toString(),
          qualifications: [],
          paediatricsSubspecialty: [],
          subspecialtyCertified: "No",
          currentPosition: "Unknown",
          currentInstitution: "Unknown",
          countryOfWork: "Unknown",
          applicationStatus: "APPROVED",
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
        }
      });
    } else {
      // Update existing record
      await db.paediatricDoctor.update({
        where: { userId },
        data: {
          applicationStatus: "APPROVED",
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
        },
      });
    }

    // Promote user role to MEMBER if not already
    await db.user.update({
      where: { id: userId },
      data: { role: UserRole.MEMBER },
    });

    // Send notification to applicant
    if (user) {
      await notifyApplicationApproved(user.name || "", user.id);
    }

    revalidatePath('/dashboard/membership');
    return { success: true };
  } catch (error) {
    console.error("Error in approveApplication:", error);
    return { error: "Failed to approve application" };
  }
}

// Reject application: sets applicationStatus to "REJECTED"
export async function rejectApplication(userId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  await db.paediatricDoctor.update({
    where: { userId },
    data: {
      applicationStatus: "REJECTED",
      reviewedBy: session.user.id,
      reviewedAt: new Date(),
    },
  });

  // Send rejection notification
  const applicant = await db.user.findUnique({ where: { id: userId } });
  if (applicant) {
    await notifyApplicationRejected(applicant.name || "", applicant.id);
  }
  revalidatePath('/dashboard/membership');
  return { success: true };
}

// Redo application: sets applicationStatus back to "PENDING"
export async function redoApplication(userId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  await db.paediatricDoctor.update({
    where: { userId },
    data: {
      applicationStatus: "PENDING",
      reviewedBy: null,
      reviewedAt: null,
    },
  });
  revalidatePath('/dashboard/membership');
  return { success: true };
}

// Set onboarding status (optional, for completeness)
export async function setOnboardingStatus(userId: string, status: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  await db.paediatricDoctor.update({
    where: { userId },
    data: {
      onboardingStatus: status,
    },
  });
  return { success: true };
}

// Set user role
export async function updateUserRole(userId: string, role: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };
  try {
    await db.user.update({
      where: { id: userId },
      data: { role: role as UserRole },
    });
    revalidatePath('/dashboard/membership');
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role" };
  }
}
