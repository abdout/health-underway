import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default async function ApplicationStatusBanner() {
  const user = await currentUser();
  if (!user?.id) return null;

  const profile = await db.paediatricDoctor.findUnique({
    where: { userId: user.id },
    select: {
      applicationStatus: true,
    },
  });

  if (!profile) return null;

  const status = profile.applicationStatus as string;

  let color = "bg-gray-200 text-gray-700";
  let title = "";
  let description = "";

  switch (status) {
    case "PENDING":
      color = "bg-blue-100 text-blue-700";
      title = "Application Under Review";
      description = "Your membership application has been received and is being reviewed by our team.";
      break;
    case "APPROVED":
      color = "bg-green-100 text-green-700";
      title = "Congratulations! Approved";
      description = "Your application has been approved. You now have full access to all member benefits.";
      break;
    case "REJECTED":
      color = "bg-red-100 text-red-700";
      title = "Sorry, Application Rejected";
      description = "Unfortunately, your membership application was not accepted at this time.";
      break;
  }

  return (
    <Alert className={`${color} border-0 fixed top-0 left-0 w-full h-10 z-50 flex items-center px-6 shadow-md`}>
      <AlertTitle className="flex items-center gap-2 text-base">
        <Badge variant="outline">{status}</Badge> {title}
      </AlertTitle>
      <AlertDescription className="ml-4 text-sm">{description}</AlertDescription>
    </Alert>
  );
} 