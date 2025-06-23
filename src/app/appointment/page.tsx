import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { PatientForm } from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";

const AppointmentPage = async () => {
  // This page is now protected - user must be authenticated to access
  const session = await auth();
  
  if (!session) {
    // This should not happen due to middleware, but added as safety
    redirect("/auth/login?callbackUrl=/appointment");
  }

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="flex items-center justify-center gap-x-4 pb-4">
        <Image
          src="/assets/icons/logo-icon.svg"
          height={1000}
          width={1000}
          alt="logo"
          className="h-8 w-8"
        />
        <h1 className="text-24-bold text-dark-800">
          Book Appointment
        </h1>
      </div>

      {/* Welcome message for authenticated user */}
      <div className="mb-6 text-center">
        <p className="text-16-regular text-dark-600">
          Welcome back, {session.user?.name || session.user?.email}
        </p>
        <p className="text-14-regular text-dark-500">
          Let's book your appointment
        </p>
      </div>

      <PatientForm />

      <div className="text-14-regular flex justify-between pt-8">
        <Link href="/dashboard" className="text-green-500 hover:underline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AppointmentPage;
