// src/services/patients.service.ts

"use server";

import { db } from "@/lib/db";
import { RegisterUserParams } from "./type";
import { saveFile } from "../../lib/file";
import { parseStringify } from "../../lib/utils";

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  userId,
  ...patientData
}: RegisterUserParams) => {
  console.log("🏥 [registerPatient] Function called");
  console.log("🆔 [registerPatient] UserId:", userId);
  console.log("📄 [registerPatient] identificationDocument:", !!identificationDocument);
  console.log("📊 [registerPatient] patientData:", patientData);

  try {
    let fileUrl: string | null = null;

    if (identificationDocument) {
      console.log("📎 [registerPatient] Processing file upload...");
      try {
        // Save the identification document and get its URL or path
        fileUrl = await saveFile(identificationDocument);
        console.log("✅ [registerPatient] File uploaded successfully:", fileUrl);
      } catch (fileError) {
        console.warn("⚠️ [registerPatient] File upload failed, proceeding without document:", fileError);
        // Continue without file upload - make it optional
        fileUrl = null;
      }
    } else {
      console.log("📎 [registerPatient] No file to upload");
    }

    console.log("🔄 [registerPatient] Creating patient record in database...");
    console.log("🗃️ [registerPatient] Database data:", {
      userId,
      identificationDocument: fileUrl,
      ...patientData,
    });

    // Create new patient record
    const newPatient = await db.patient.create({
      data: {
        userId,
        identificationDocument: fileUrl,
        ...patientData,
      },
    });

    console.log("✅ [registerPatient] Patient created in database:", newPatient);
    
    const result = parseStringify(newPatient);
    console.log("📤 [registerPatient] Returning result:", result);
    
    return result;
  } catch (error) {
    console.error("❌ [registerPatient] Error occurred:", error);

    const err = error as Error;
    console.error("❌ [registerPatient] Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });

    throw err;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is undefined or invalid");
  }

  // Remove MongoDB-specific length validation - cuid() generates different lengths
  if (typeof userId !== 'string' || userId.trim().length === 0) {
    throw new Error("Invalid User ID format");
  }

  try {
    const patient = await db.patient.findFirst({
      where: { userId },
    });

    return parseStringify(patient);
  } catch (error) {
    console.error(
      `An error occurred while retrieving the patient details for userId "${userId}":`,
      error
    );
    throw error;
  }
};
