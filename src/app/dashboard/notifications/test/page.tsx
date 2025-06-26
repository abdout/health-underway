import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TestNotification } from "@/components/notifications/test-notification";

export default async function NotificationTestPage() {
  const session = await auth();
  if (!session || !['ADMIN', 'MEMBERSHIP'].includes(session.user.role as string)) {
    redirect("/login?callbackUrl=/dashboard/notifications/test");
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Test Notifications</h1>
        <p className="text-muted-foreground">Test and verify notification channels</p>
      </div>
      
      <div className="max-w-2xl">
        <TestNotification />
      </div>
    </div>
  );
} 