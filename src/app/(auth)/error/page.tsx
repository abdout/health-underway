'use client';

import { ErrorCard } from "@/components/auth/error-card";
import { Suspense } from "react";

const AuthErrorPage = () => {
  return (
    <Suspense fallback={null}>
      <ErrorCard />
    </Suspense>
  );
};
 
export default AuthErrorPage;

export const dynamic = 'force-dynamic';
