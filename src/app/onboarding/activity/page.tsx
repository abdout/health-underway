import { currentUser } from "@/lib/auth";
import ActivityForm from "@/components/onboarding/activity/form";
import { Suspense } from "react";
import { db } from "@/lib/db";
import Loading from "@/components/atom/loading";

async function getActivityData() {
  try {
    const user = await currentUser();
    if (!user?.id) return null;

    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        doctor: {
          select: {
            partyMember: true,
            partyName: true,
            partyStartDate: true,
            partyEndDate: true,
            unionMember: true,
            unionName: true,
            unionStartDate: true,
            unionEndDate: true,
            ngoMember: true,
            ngoName: true,
            ngoActivity: true,
            clubMember: true,
            clubName: true,
            clubType: true,
            skills: true,
            interests: true,
          }
        }
      }
    });

    // Flatten the structure for the form component
    if (userData?.doctor) {
      return {
        id: userData.id,
        ...userData.doctor
      };
    }

    return userData;
  } catch (error) {
    console.error("Error fetching activity data:", error);
    return null;
  }
}

export default async function ActivityPage() {
  const userData = await getActivityData();
  
  if (!userData) {
    return null;
  }

  // Transform userData to ensure skills and interests are arrays
  // Check if userData has doctor property (not flattened) or is already flattened
  const isFlattened = 'partyMember' in userData;
  const doctorData = isFlattened ? userData : userData.doctor;
  
  const transformedUserData = {
    id: userData.id,
    partyMember: doctorData?.partyMember || false,
    partyName: doctorData?.partyName || null,
    partyStartDate: doctorData?.partyStartDate || null,
    partyEndDate: doctorData?.partyEndDate || null,
    unionMember: doctorData?.unionMember || false,
    unionName: doctorData?.unionName || null,
    unionStartDate: doctorData?.unionStartDate || null,
    unionEndDate: doctorData?.unionEndDate || null,
    ngoMember: doctorData?.ngoMember || false,
    ngoName: doctorData?.ngoName || null,
    ngoActivity: doctorData?.ngoActivity || null,
    clubMember: doctorData?.clubMember || false,
    clubName: doctorData?.clubName || null,
    clubType: doctorData?.clubType || null,
    skills: Array.isArray(doctorData?.skills) ? doctorData.skills : [],
    interests: Array.isArray(doctorData?.interests) ? doctorData.interests : [],
    // Add empty voluntary fields for the form
    voluntaryMember: false,
    voluntaryName: '',
    voluntaryRole: '',
    voluntaryStartDate: null,
    voluntaryEndDate: null
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Suspense fallback={<Loading />}>
        <ActivityForm user={transformedUserData} />
      </Suspense>
    </div>
  );
} 