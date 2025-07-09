'use server';

import { db } from '@/lib/db';

export interface PaperResponse {
  scientificPapersFiles: string[];
  doctorName?: string;
}

/**
 * Fetch all scientific papers from all paediatric doctors
 */
export async function getAllPapers(): Promise<PaperResponse[]> {
  try {
    const doctors = await db.paediatricDoctor.findMany({
      select: {
        scientificPapersFiles: true,
        fullNameEnglish: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });

    return doctors.map(doctor => ({
      scientificPapersFiles: doctor.scientificPapersFiles,
      doctorName: doctor.fullNameEnglish || doctor.user?.name || 'Unknown Doctor'
    }));
  } catch (error) {
    console.error('Error fetching papers:', error);
    throw new Error('Failed to fetch papers');
  }
}

/**
 * Get papers by doctor ID
 */
export async function getPapersByDoctorId(doctorId: string): Promise<PaperResponse | null> {
  try {
    const doctor = await db.paediatricDoctor.findUnique({
      where: { id: doctorId },
      select: {
        scientificPapersFiles: true,
        fullNameEnglish: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });

    if (!doctor) return null;

    return {
      scientificPapersFiles: doctor.scientificPapersFiles,
      doctorName: doctor.fullNameEnglish || doctor.user?.name || 'Unknown Doctor'
    };
  } catch (error) {
    console.error('Error fetching doctor papers:', error);
    throw new Error('Failed to fetch doctor papers');
  }
}
