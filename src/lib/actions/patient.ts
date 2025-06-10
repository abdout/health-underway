// src/services/patients.service.ts

"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { PatientFormValidation } from "@/lib/validation";

// REGISTER PATIENT
export const registerPatient = async (
  patientData: z.infer<typeof PatientFormValidation> & { userId: string }
) => {
  try {
    // Create new patient record
    const newPatient = await db.patient.create({
      data: {
        ...patientData,
      },
    });

    return newPatient;
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    throw error;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is undefined or invalid");
  }

  if (userId.length !== 24) {
    throw new Error("Invalid User ID format");
  }

  try {
    const patient = await db.patient.findFirst({
      where: { userId },
    });

    return patient;
  } catch (error) {
    console.error(
      `An error occurred while retrieving the patient details for userId "${userId}":`,
      error
    );
    throw error;
  }
};
