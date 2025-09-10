'use client';

import { NewVerificationForm } from "@/components/auth/verification/form";
import { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={null}>
      <NewVerificationForm />
    </Suspense>
  );
}

export default NewVerificationPage;

export const dynamic = 'force-dynamic';