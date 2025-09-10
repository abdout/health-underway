import { Icon } from "@iconify/react";
import { auth } from "@/auth";
import SiteHeading from '@/components/atom/site-heading';
import ApplicationStatusBanner from '@/components/paediatric/ApplicationStatusBanner';
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }
  return (
    <div className="mr-2 mt-10 md:mt-0 md:mr-10 flex flex-col h-full">
      {/* Banner for doctors */}
      <ApplicationStatusBanner />
      <SiteHeading title="مرحبا بيك" description='في منصة الحركة الوطنية للبناء والتنمية' align='start' size='md'/>
      <div className='relative -mt-2 '>
        <p className='w-full md:w-4/5 pt-4'>لن يصيب المجد كف واحد - إيماناً بسحر العمل الجماعي، نسعى من خلال هذه المنصة إلى أتمتة أعمال الحركة  وامتلاك ادوات تنسيق وتعاون افضل. ساهم في خلق تجربة جديدة من الكفاءة والتنظيم.</p>
        <div className='flex flex-col md:flex-row justify-between items-center mt-8'>
          <div>
            <p className='-mt-2 mb-4 text-muted-foreground w-[80%] md:w-full'>استكشف الروابط أدناه للدليل المستخدم ومركز المساعدة👇</p>
            <div className='flex gap-8 items-center'>
              <Icon icon={"ph:book-fill"} height="60" className="opacity-80 hover:opacity-100 transition-opacity duration-200" />
              <Icon icon={"ant-design:customer-service-filled"} height="60" className="opacity-80 hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}