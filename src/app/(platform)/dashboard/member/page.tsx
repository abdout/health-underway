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
          countryOfMajorityPaediatricsTraining: true,
        },
      },
    },
  });

  // Flatten paediatricDoctor fields to top-level for table convenience
  const flattened = users.map((u) => ({
    ...u,
    applicationStatus: u.paediatricDoctor?.applicationStatus,
    onboardingStatus: u.paediatricDoctor?.onboardingStatus,
  }));

  return (
    <div className="container">
      <SiteHeading title="الأطباء المعتمدون" description="قائمة الأعضاء المقبولين" align="start" size="sm" />
      <AllUsers users={flattened} currentUserId={currentUserId ?? ""} />
    </div>
  );
} 