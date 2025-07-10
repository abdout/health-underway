import { auth } from "@/auth";
import { db } from "@/lib/db";
import SiteHeading from "@/components/atom/site-heading";
import AllUsers from "@/components/membership/all";
import { redirect } from "next/navigation";

export default async function LabPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/membership");
  }
  // Fetch all users from the database, including paediatric doctor profile data
  const usersRaw = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      paediatricDoctor: {
        select: {
          onboardingStatus: true,
          applicationStatus: true,
          fullNameEnglish: true,
          universityOfPrimaryGraduation: true,
          countryOfUniversityOfPrimaryGraduation: true,
          currentInstitution: true,
          currentPosition: true,
          countryOfWork: true,
          currentCountry: true,
          originalHomeTownOrVillage: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const users = usersRaw.map((u) => ({
    ...u,
    name: u.name ?? u.paediatricDoctor?.fullNameEnglish ?? null,
    onboardingStatus: u.paediatricDoctor?.onboardingStatus,
    applicationStatus: u.paediatricDoctor?.applicationStatus,
    university: u.paediatricDoctor?.universityOfPrimaryGraduation ?? null,
    universityCountry: u.paediatricDoctor?.countryOfUniversityOfPrimaryGraduation ?? null,
    institution: u.paediatricDoctor?.currentInstitution ?? null,
    position: u.paediatricDoctor?.currentPosition ?? null,
    workCountry: u.paediatricDoctor?.countryOfWork ?? null,
    locality: u.paediatricDoctor?.originalHomeTownOrVillage ?? null,
    country: u.paediatricDoctor?.currentCountry ?? null,
  }));

  return (
    <div className="container">
      <SiteHeading title="Membership" description="Manage Applications and Permissions" align="start" size="sm"/>
      <AllUsers users={users} currentUserId={currentUserId ?? ""} />
    </div>
  );
}
