import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import AppointmentDashboard from "@/components/appointment/dashbord";
import AppointmentBookingSection from "@/components/appointment/booking-section";

const AppointmentPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/appointment");
  }

  // Check if user is a patient
  // if (session.user.role !== "PATIENT") {
  //   redirect("/not-authorized"); // or show an error
  // }

  // Fetch the patient record for this user (userId is unique in Patient model)
  const patient = await db.patient.findUnique({
    where: { userId: session.user.id }
  });

  // // If no patient record, redirect or show error
  // if (!patient) {
  //   redirect("/not-authorized"); // or show an error
  // }

  // // Check onboarding status
  // if (!patient.onboarded) {
  //   redirect("/onboarding"); // or your onboarding route
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AppointmentDashboard />
      {/* <AppointmentBookingSection session={session} /> */}
    </div>
  );
};

export default AppointmentPage;
