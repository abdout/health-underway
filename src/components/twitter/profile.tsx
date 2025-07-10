import Image from "next/image"
import { MapPin, Mail, GraduationCap, Stethoscope, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import About, { AboutUserData } from "./about"
import Contribute from "./contribute"
import Issue from "./issue"
import { fetchPaediatricDoctorForReview } from '@/components/paediatric/review/action'
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
// Labels are now in English, no need for Arabic label utils

// Utility to extract main domain name from a URL
function extractDomainName(url: string): string {
  try {
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    const { hostname } = new URL(normalizedUrl);
    return hostname.replace(/^www\./, '').split('.')[0];
  } catch {
    return url;
  }
}

async function getUserImageAndCover(userId?: string, doctor?: any) {
  if (doctor) {
    // If doctor prop is provided, use its image fields if available
    return {
      image: doctor.image || null,
      cover: null // You can extend this if you add cover to doctor
    };
  }
  const user = await currentUser();
  if (!user?.id) return { image: null, cover: null };

  const userData = await db.user.findUnique({
    where: { id: user.id },
    select: {
      image: true,
      doctor: {
        select: {
          cover: true,
        }
      },
      paediatricDoctor: {
        select: {
          personalPhotos: true,
        }
      }
    }
  });

  return {
    image: userData?.image || userData?.paediatricDoctor?.personalPhotos[0] || null,
    cover: userData?.doctor?.cover || null
  };
}

export default async function TwitterProfile({ doctor }: { doctor?: any } = {}) {
  let userData: AboutUserData | null = null;
  let image: string | null = null;
  let cover: string | null = null;

  if (doctor) {
    // Build userData from doctor prop
    userData = {
      name: doctor.name,
      email: doctor.email,
      currentOccupation: doctor.currentPosition,
      currentLocality: doctor.countryOfWork,
      institution: doctor.universityOfPrimaryGraduation,
      qualifications: doctor.qualifications,
      paediatricsSubspecialty: doctor.paediatricsSubspecialty,
      // Add more mappings as needed
    };
    const imgResult = await getUserImageAndCover(doctor.id, doctor);
    image = imgResult.image;
    cover = imgResult.cover;
  } else {
    const { data: paediatricData } = await fetchPaediatricDoctorForReview();
    userData = paediatricData ? {
      name: paediatricData.fullNameEnglish || paediatricData.fullNameArabic,
      currentOccupation: paediatricData.currentPosition,
      currentLocality: paediatricData.originalHomeTownOrVillage,
      institution: paediatricData.universityOfPrimaryGraduation,
      qualifications: paediatricData.qualifications,
      paediatricsSubspecialty: paediatricData.paediatricsSubspecialty,
      ...paediatricData,
    } : null;
    const imgResult = await getUserImageAndCover();
    image = imgResult.image || (Array.isArray(paediatricData?.personalPhotos) && paediatricData.personalPhotos.length ? paediatricData.personalPhotos[0] : '/baby.jpg');
    cover = imgResult.cover;
  }

  const name = userData?.name || "Unknown";
  const occupation = userData?.currentOccupation || "Unknown";

  return (
    <div className="w-full max-w-2xl overflow-hidden">
      {/* Banner */}
      <div className="relative md:h-48 h-32 w-full bg-yellow-400">
        {cover && (
          <Image
            src={cover}
            alt="Cover image"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            quality={100}
          />
        )}
      </div>

      {/* Profile Section */}
      <div className="md:px-5 px-3">
        {/* Profile Picture and Edit Button */}
        <div className="flex justify-between items-start">
          <div className="relative -mt-12 md:-mt-16 md:h-32 md:w-32 h-24 w-24 overflow-hidden">
            <div className="relative h-full w-full md:border-4 border-[3px] border-background rounded-full overflow-hidden">
              <Image
                src={image || "/baby.jpg"}
                alt="Profile picture"
                fill
                sizes="128px"
                className="object-cover bg-[#f8f3e3]"
                quality={100}
              />
            </div>
          </div>
          <Link href="/dashboard/profile/edit">
            <Button variant="outline" size='sm' className="md:mt-4 mt-3 rounded-full border border-primary">
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Profile Info */}
        <div className="md:mt-3 mt-2 space-y-1 md:pr-2">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-[#5b7083]">@abdout</p>
          <p className="py-2">{occupation}</p>

          <div className="flex flex-wrap gap-x-4 text-[#5b7083] text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {userData?.currentLocality ? (
                <span>{userData.currentLocality}</span>
              ) : (
                <span>Not specified</span>
              )}
            </div>
            {/* Removed link section as 'link' is not part of AboutUserData */}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-3 relative">
        <Tabs defaultValue="about" className="-mx-3 md:mx-1">
          <div className="relative">
            <TabsList className="flex w-full h-auto bg-transparent border-0 p-0 shadow-none relative z-10">
              <TabsTrigger 
                value="about"
                className="flex-1 py-3 px-0 text-center rounded-none border-0 shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:bg-transparent text-[#5b7083] hover:text-foreground transition-colors font-medium"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="achievements"
                className="flex-1 py-3 px-0 text-center rounded-none border-0 shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:bg-transparent text-[#5b7083] hover:text-foreground  transition-colors font-medium"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="issue"
                className="flex-1 py-3 px-0 text-center rounded-none border-0 shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:bg-transparent text-[#5b7083] hover:text-foreground transition-colors font-medium"
              >
                Issues
              </TabsTrigger>
              <TabsTrigger 
                value="likes"
                className="flex-1 py-3 px-0 text-center rounded-none border-0 shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:bg-transparent text-[#5b7083] hover:text-foreground transition-colors font-medium"
              >
                Threads
              </TabsTrigger>
            </TabsList>
            
            {/* Full width divider line positioned at the bottom of tabs */}
            <div className="h-[1px] bg-border w-screen absolute bottom-0 left-1/2 right-1/2 -mx-[50vw]"></div>
          </div>
          
          <TabsContent value="about" className="">
            {/* <About userData={userData as AboutUserData} /> */}
            <div className="mt-4 space-y-2 px-5">
              {userData?.currentLocality && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={18} className="text-muted-foreground" />
                  <span>Lives in - {userData.currentLocality}</span>
                </div>
              )}
              {userData?.currentOccupation && (
                <div className="flex items-center gap-2 text-sm">
                  <Stethoscope size={18} className="text-muted-foreground" />
                  <span>{userData.currentOccupation}</span>
                </div>
              )}
              {userData?.institution && (
                <div className="flex items-center gap-2 text-sm">
                  <School size={18} className="text-muted-foreground" />
                  <span>University: {userData.institution}</span>
                </div>
              )}
              {userData?.qualifications && (
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap size={18} className="text-muted-foreground" />
                  <span>Qualifications: {userData.qualifications}</span>
                </div>
              )}
              {userData?.paediatricsSubspecialty && (
                <div className="flex items-center gap-2 text-sm">
                  <Stethoscope size={18} className="text-muted-foreground" />
                  <span>Subspecialty: {userData.paediatricsSubspecialty}</span>
                </div>
              )}
              {userData?.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={18} className="text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Contribute />
          </TabsContent>
          
          <TabsContent value="issue">
            <Issue />
          </TabsContent>
          
          <TabsContent value="likes" className="mt-6 text-center text-muted-foreground py-8">
            No threads yet
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
