// src/lib/actions/type.ts

import { Status } from '@prisma/client';

export type CreateAppointmentParams = {
  patientId: string;
  userId: string;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string; // Changed from 'note?: string' to 'note: string'
};

export type UpdateAppointmentParams = {
  userId: string;
  appointmentId: string;
  timeZone: string;
  appointment: Partial<AppointmentUpdateData>;
  type: 'schedule' | 'cancel';
};

// Add the missing UpdateAppointmentInput type that's used in appointment.actions.ts
export type UpdateAppointmentInput = UpdateAppointmentParams;

type AppointmentUpdateData = {
  schedule?: Date;
  status?: Status;
  primaryPhysician?: string;
  reason?: string;
  note?: string;
  cancellationReason?: string | null;
};
