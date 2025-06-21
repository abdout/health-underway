import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { auth } from "@/lib/auth";
import { formatDateTime } from "@/lib/utils";

const AppointmentSuccess = async ({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { appointmentId?: string };
}) => {
  const session = await auth();
  const { userId } = params;
  const appointmentId = searchParams.appointmentId;

  // Check authentication
  if (!session?.user || session.user.id !== userId) {
    redirect("/login");
  }

  if (!appointmentId) {
    redirect("/");
  }

  const appointment = await getAppointment(appointmentId);

  if (!appointment) {
    redirect("/");
  }

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/icons/calendar.svg"
              height={20}
              width={20}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/icons/calendar.svg"
              height={20}
              width={20}
              alt="calendar"
            />
            <p>Dr. {appointment.primaryPhysician}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default AppointmentSuccess; 