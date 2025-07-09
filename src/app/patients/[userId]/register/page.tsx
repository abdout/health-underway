// src/pages/patients/[userId]/register.tsx

import Image from "next/image";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/patient/form";
import { getUser } from "@/lib/actions/patient.actions";
import { getPatient } from "@/components/patient/action";

type SearchParamProps = {
  params: Promise<{
    userId: string;
  }>;
};

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (!user) {
    // Handle the case where the user is not found
    // You can redirect to a 404 page or display an error message
    redirect("/404"); // Redirect to a 404 page
    // Or return an error component:
    // return <div>User not found</div>;
  }

  if (patient) {
    redirect(`/patients/${userId}/new-appointment`);
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="max-w-[860px] mx-auto flex flex-col items-center justify-center py-10">
        

          {/* Since we've ensured user is not null, we can safely pass it */}
          <RegisterForm user={user} />

          
        </div>
      </section>

      
    </div>
  );
};

export default Register;
