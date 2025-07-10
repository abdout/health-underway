import { auth } from "@/auth";
import { db } from "@/lib/db";
import SiteHeading from "@/components/atom/site-heading";
import AllUsers from "@/components/membership/all";

export default async function ApprovedMembersPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  // Fetch users whose paediatricDoctor applicationStatus is APPROVED
  const users = await db.user.findMany({
    where: {
      paediatricDoctor: {
        applicationStatus: "APPROVED",
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      paediatricDoctor: {
        select: {
          applicationStatus: true,
          onboardingStatus: true,
          currentPosition: true,
          countryOfWork: true,
          qualifications: true,
          stageOfCareer: true,
          universityOfPrimaryGraduation: true,
        },
      },
    },
  });

  // Flatten paediatricDoctor fields to top-level for table convenience
  const flattened = users.map((u) => ({
    ...u,
    applicationStatus: u.paediatricDoctor?.applicationStatus,
    onboardingStatus: u.paediatricDoctor?.onboardingStatus,
    currentPosition: u.paediatricDoctor?.currentPosition,
    countryOfWork: u.paediatricDoctor?.countryOfWork,
    qualifications: u.paediatricDoctor?.qualifications,
    stageOfCareer: u.paediatricDoctor?.stageOfCareer,
    universityOfPrimaryGraduation: u.paediatricDoctor?.universityOfPrimaryGraduation,
  }));

  return (
    <div className="container">
      <h2>Doctors</h2>
      <AllUsers users={flattened} currentUserId={currentUserId ?? ""} />
    </div>
  );
} 