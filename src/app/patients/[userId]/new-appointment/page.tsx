import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/components/patient/action";

type AppointmentProps = {
  params: Promise<{
    userId: string;
  }>;
};

const Appointment = async ({ params }: AppointmentProps) => {
  const { userId } = await params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        
         

          <AppointmentForm
            patientId={patient?.id}
            userId={userId}
            type="create"
          />

        
      </section>

    </div>
  );
};

export default Appointment;
