'use client';

import { NewPasswordForm } from "@/components/auth/password/form";
import { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={null}>
      <NewPasswordForm />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';

export default NewPasswordPage;