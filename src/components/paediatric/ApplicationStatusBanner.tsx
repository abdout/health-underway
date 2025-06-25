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
      title = "قيد المراجعة";
      description = "تم استلام طلب العضوية وسيقوم فريق العضوية بمراجعته قريبًا.";
      break;
    case "SUBMITTED":
      color = "bg-blue-100 text-blue-700";
      title = "تم الإرسال";
      description = "تم تقديم طلبك وهو الآن في انتظار المراجعة.";
      break;
    case "APPROVED":
      color = "bg-green-100 text-green-700";
      title = "مبروك! تم القبول";
      description = "تمت الموافقة على طلبك. بإمكانك الآن الاستفادة من مزايا العضوية.";
      break;
    case "REJECTED":
      color = "bg-red-100 text-red-700";
      title = "عذراً، تم الرفض";
      description = "لم يتم قبول طلب العضوية الخاص بك في هذه المرحلة.";
      break;
  }

  return (
    <Alert className={`${color} border-0 my-4`}>
      <AlertTitle className="flex items-center gap-2">
        <Badge variant="outline">{status}</Badge> {title}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
} 