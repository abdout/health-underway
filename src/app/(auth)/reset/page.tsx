'use client';

import { ResetForm } from "@/components/auth/reset/form";
import { Suspense } from "react";

const ResetPage = () => {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  );
}
 
export default ResetPage;

export const dynamic = 'force-dynamic';