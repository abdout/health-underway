import { Icon } from "@iconify/react";
import { auth } from "../../../../auth";
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
    <div className="mr-2 md:mt-0 md:mr-10 flex flex-col h-full">
      {/* Banner for doctors */}
      <ApplicationStatusBanner />
      <SiteHeading title="Welcome!" description="to the Sudanese Paediatric Doctors Community Platform" align="start" size="md" />
      <div className='relative -mt-2 '>
        <p className='w-full md:w-4/5 pt-4'>Together, we strive to advance paediatric care for Sudanese children everywhere. This platform empowers collaboration, knowledge sharing, and professional growth for paediatricians, residents, and students of Sudanese origin worldwide.</p>
        <div className='flex flex-col md:flex-row justify-between items-center mt-8'>
          <div>
            <p className='-mt-2 mb-4 text-muted-foreground w-[80%] md:w-full'>Explore the links below for the user guide and help center 👇</p>
            <div className='flex gap-8 items-center '>
              <a href="/help/user-guide" className="hover:opacity-100 opacity-80 transition-opacity duration-200 text-foreground" title="User Guide">
                <Icon icon={"ph:book-fill"} height="60" />
              </a>
              <a href="/help/support" className="hover:opacity-100 opacity-80 transition-opacity duration-200 text-foreground" title="Help Center">
                <Icon icon={"ant-design:customer-service-filled"} height="60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}