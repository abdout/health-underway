import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProfileAbout, ProfileActivities } from "@/components/platform/profile";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";

export default async function ProfilePage({ params }: any) {
  const session = await auth();
  const { id } = params;
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/profile");
  }
  // Fetch user and paediatric doctor
  const user = await db.user.findUnique({
    where: { id },
    include: {
      paediatricDoctor: true,
    },
  });

  if (!user || !user.paediatricDoctor) {
    notFound();
  }

  const paed: any = user.paediatricDoctor;

  return (
    <div className="container py-8 space-y-6">
      <ProfileAbout
        user={{
          bio: paed.majorCareerAchievement ?? null,
          currentCountry: paed.countryOfWork || null,
          currentLocality: paed.originalHomeTownOrVillage || null,
          currentNeighborhood: null,
          email: user.email ?? null,
          whatsapp: null,
          fullname: user.name,
        }}
      />

      <ProfileActivities
        user={{
          partyMember: paed.partyMember ?? false,
          partyName: paed.partyName || null,
          unionMember: paed.unionMember || false,
          unionName: paed.unionName || null,
          ngoMember: paed.ngoMember ?? false,
          ngoName: paed.ngoName || null,
          ngoActivity: paed.ngoActivity || null,
          clubMember: paed.clubMember || false,
          clubName: paed.clubName ?? null,
          clubType: paed.clubType ?? null,
        }}
      />
    </div>
  );
} 