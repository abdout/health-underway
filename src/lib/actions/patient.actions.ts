// src/services/users.service.ts

"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { CreateUserParams, RegisterUserParams } from "./patient-type";
import { parseStringify } from "../utils";
import { User, Patient } from "@prisma/client";

export const createUser = async (
  user: CreateUserParams
): Promise<User | null> => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      return existingUser;
    }

    const hashedPassword = user.password
      ? await bcrypt.hash(user.password, 10)
      : undefined;

    const newUser = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        phone: user.phone,
      },
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  console.log("getUser called with userId:", userId);
  
  if (!userId) {
    console.error("User ID is undefined or invalid");
    return null;
  }

  // Check what type of ID we're dealing with
  console.log("User ID length:", userId.length);
  console.log("User ID format check - contains hyphens:", userId.includes('-'));

  // First try without UUID validation to see if the user exists
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    console.log("getUser - Found user:", !!user);
    if (user) {
      console.log("getUser - User ID from DB:", user.id);
    }

    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Get patient by user ID
export const getPatient = async (userId: string): Promise<Patient | null> => {
  if (!userId) {
    console.error("User ID is required");
    return null;
  }

  // UUID validation for PostgreSQL
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(userId)) {
    console.error("Invalid User ID format:", userId);
    return null;
  }

  try {
    const patient = await db.patient.findFirst({
      where: { userId: userId },
    });

    return parseStringify(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return null;
  }
};

// Register a new patient
export const registerPatient = async (
  patientData: RegisterUserParams
): Promise<Patient | null> => {
  try {
    // Check if patient already exists for this user
    const existingPatient = await db.patient.findFirst({
      where: { userId: patientData.userId },
    });

    if (existingPatient) {
      throw new Error("Patient already registered for this user");
    }

    // Handle document upload if provided
    let documentUrl = null;
    if (patientData.identificationDocument) {
      // TODO: Implement document upload to Cloudinary
      // For now, we'll set it to null
      documentUrl = null;
    }

    const newPatient = await db.patient.create({
      data: {
        userId: patientData.userId,
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        birthDate: patientData.birthDate,
        gender: patientData.gender,
        address: patientData.address,
        occupation: patientData.occupation,
        emergencyContactName: patientData.emergencyContactName,
        emergencyContactNumber: patientData.emergencyContactNumber,
        primaryPhysician: patientData.primaryPhysician || "",
        insuranceProvider: patientData.insuranceProvider || "",
        insurancePolicyNumber: patientData.insurancePolicyNumber || "",
        allergies: patientData.allergies,
        currentMedication: patientData.currentMedication,
        familyMedicalHistory: patientData.familyMedicalHistory,
        pastMedicalHistory: patientData.pastMedicalHistory,
        identificationType: patientData.identificationType,
        identificationNumber: patientData.identificationNumber,
        identificationDocument: documentUrl,
        privacyConsent: patientData.privacyConsent,
      },
    });

    // Update user onboarded status
    await db.user.update({
      where: { id: patientData.userId },
      data: { onboarded: true },
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error registering patient:", error);
    return null;
  }
};

// Update patient information
export const updatePatient = async (
  patientId: string,
  patientData: Partial<RegisterUserParams>
): Promise<Patient | null> => {
  try {
    const updatedPatient = await db.patient.update({
      where: { id: patientId },
      data: {
        ...(patientData.name && { name: patientData.name }),
        ...(patientData.email && { email: patientData.email }),
        ...(patientData.phone && { phone: patientData.phone }),
        ...(patientData.birthDate && { birthDate: patientData.birthDate }),
        ...(patientData.gender && { gender: patientData.gender }),
        ...(patientData.address && { address: patientData.address }),
        ...(patientData.occupation && { occupation: patientData.occupation }),
        ...(patientData.emergencyContactName && { emergencyContactName: patientData.emergencyContactName }),
        ...(patientData.emergencyContactNumber && { emergencyContactNumber: patientData.emergencyContactNumber }),
        ...(patientData.primaryPhysician && { primaryPhysician: patientData.primaryPhysician }),
        ...(patientData.insuranceProvider && { insuranceProvider: patientData.insuranceProvider }),
        ...(patientData.insurancePolicyNumber && { insurancePolicyNumber: patientData.insurancePolicyNumber }),
        ...(patientData.allergies !== undefined && { allergies: patientData.allergies }),
        ...(patientData.currentMedication !== undefined && { currentMedication: patientData.currentMedication }),
        ...(patientData.familyMedicalHistory !== undefined && { familyMedicalHistory: patientData.familyMedicalHistory }),
        ...(patientData.pastMedicalHistory !== undefined && { pastMedicalHistory: patientData.pastMedicalHistory }),
        ...(patientData.identificationType !== undefined && { identificationType: patientData.identificationType }),
        ...(patientData.identificationNumber !== undefined && { identificationNumber: patientData.identificationNumber }),
        ...(patientData.privacyConsent !== undefined && { privacyConsent: patientData.privacyConsent }),
      },
    });

    return parseStringify(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    return null;
  }
};

// Get all patients (for admin)
export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const patients = await db.patient.findMany({
      orderBy: { createdAt: "desc" },
    });

    return parseStringify(patients);
  } catch (error) {
    console.error("Error fetching all patients:", error);
    return [];
  }
};

// Delete patient (for admin)
export const deletePatient = async (patientId: string): Promise<boolean> => {
  try {
    await db.patient.delete({
      where: { id: patientId },
    });

    return true;
  } catch (error) {
    console.error("Error deleting patient:", error);
    return false;
  }
};
