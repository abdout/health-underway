// import TwitterProfile from '@/components/twitter/profile'
// import React from 'react'
// import { auth } from "@/auth";
// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";

// export default async function Page({ params }: { params: { id: string } }) {
//   const session = await auth();
//   if (!session) {
//     redirect("/login?callbackUrl=/dashboard/profile");
//   }
//   const { id } = params;
//   // Fetch the doctor/user by id
//   const user = await db.user.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       image: true,
//       role: true,
//       paediatricDoctor: {
//         select: {
//           applicationStatus: true,
//           onboardingStatus: true,
//           currentPosition: true,
//           countryOfWork: true,
//           qualifications: true,
//           stageOfCareer: true,
//           universityOfPrimaryGraduation: true,
//         },
//       },
//     },
//   });
//   if (!user) {
//     return <div className="container py-10">Doctor not found.</div>;
//   }
//   // Flatten paediatricDoctor fields
//   const doctorData = {
//     ...user,
//     applicationStatus: user.paediatricDoctor?.applicationStatus,
//     onboardingStatus: user.paediatricDoctor?.onboardingStatus,
//     currentPosition: user.paediatricDoctor?.currentPosition,
//     countryOfWork: user.paediatricDoctor?.countryOfWork,
//     qualifications: user.paediatricDoctor?.qualifications,
//     stageOfCareer: user.paediatricDoctor?.stageOfCareer,
//     universityOfPrimaryGraduation: user.paediatricDoctor?.universityOfPrimaryGraduation,
//   };
//   return (
//     <TwitterProfile doctor={doctorData} />
//   )
// }

// export const dynamic = 'force-dynamic';

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page