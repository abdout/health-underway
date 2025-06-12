import * as z from "zod";

// ---------------------------------------------
// User → basic patient contact details
// ---------------------------------------------
export const UserFormValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z
    .string()
    .min(5, { message: "Phone number is required" })
    .optional()
    .or(z.literal("")),
});

// ---------------------------------------------
// Patient registration form
// ---------------------------------------------
export const PatientFormValidation = z.object({
  // Personal
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  birthDate: z.date({ required_error: "Birth date is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  emergencyContactName: z.string().min(1, { message: "Emergency contact name is required" }),
  emergencyContactNumber: z.string().min(5, { message: "Emergency contact number is required" }),

  // Medical
  primaryPhysician: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),

  // Identification
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.any().optional(),

  privacyConsent: z.boolean().optional(),
  treatmentConsent: z.boolean().optional(),
  disclosureConsent: z.boolean().optional(),
});

// ---------------------------------------------
// Appointment helper – varies by form type
// ---------------------------------------------
export const appointmentBaseSchema = z.object({
  primaryPhysician: z.string().min(1, { message: "Doctor is required" }),
  schedule: z.date({ required_error: "Schedule is required" }),
  reason: z.string().max(500).optional(),
  note: z.string().max(1000).optional(),
  cancellationReason: z.string().max(500).optional(),
});

export function getAppointmentSchema(type: "create" | "schedule" | "cancel") {
  switch (type) {
    case "cancel":
      return appointmentBaseSchema.extend({
        cancellationReason: z.string().min(1, { message: "Cancellation reason is required" }),
      });
    case "schedule":
      return appointmentBaseSchema;
    default:
      // create
      return appointmentBaseSchema;
  }
} 