import { auth } from "@/auth";
import { db } from "@/lib/db";
import SiteHeading from "@/components/atom/site-heading";
import AllUsers from "@/components/membership/all";

export default async function LabPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  // Fetch all users from the database, including doctor profile data
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
  }));

  return (
    <div className="container">
      <SiteHeading title="Membership" description="Manage Applications and Permissions" align="start" size="sm"/>
      <AllUsers users={users} currentUserId={currentUserId ?? ""} />
    </div>
  );
}
