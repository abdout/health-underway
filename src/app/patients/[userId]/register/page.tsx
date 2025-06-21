import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/appointment/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { auth } from "@/lib/auth";

const Register = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const session = await auth();
  const { userId } = await params;

  // Debug logging
  console.log("Register page - Session user ID:", session?.user?.id);
  console.log("Register page - URL userId:", userId);

  // Check authentication
  if (!session?.user || session.user.id !== userId) {
    redirect("/login");
  }

  const user = await getUser(userId);
  console.log("Register page - getUser result:", user);

  if (!user) {
    console.log("Register page - No user found, redirecting to /");
    redirect("/");
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register; 