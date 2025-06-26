import { Suspense } from "react";
import PaediatricForm from "@/components/paediatric/form";
import { getPaediatricDoctor } from "@/components/paediatric/action";
import type { PaediatricSchema } from "@/components/paediatric/validation";
import Loading from "@/components/atom/loading";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PaediatricPage() {
  const session = await auth();
  
  if (!session) {
    // This should not happen due to middleware, but added as safety
    redirect("/login?callbackUrl=/paediatric");
  }
  return (
    <div className="min-h-screen">
      <PaediatricForm type="create" />
    </div>
  );
} 