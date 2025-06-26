import React from 'react';
import { NotificationList } from '@/components/notifications/NotificationList';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
  
export default async function NotificationsPage() {
  const session = await auth();
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/notifications");
  }
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">الإشعارات</h1>
        <p className="text-muted-foreground">عرض جميع الإشعارات الخاصة بك</p>
      </div>
      
      <div className="bg-card border rounded-lg shadow-sm">
        <NotificationList />
      </div>
    </div>
  );
} 