import { auth } from "@/auth";
import { db } from "@/lib/db";
import SiteHeading from "@/components/atom/site-heading";
import AllUsers from "@/components/membership/all";

export default async function LabPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  // Fetch all users from the database, including doctor profile data
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      onboarded: true,
      role: true,
      doctor: {
        select: {
          bio: true,
          currentCountry: true,
          currentLocality: true,
          onboardingStatus: true,
          applicationStatus: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container">
      <SiteHeading title="Membership" description="Manage Applications and Permissions" align="start" size="sm"/>
      <AllUsers users={users} currentUserId={currentUserId ?? ""} />
    </div>
  );
}
