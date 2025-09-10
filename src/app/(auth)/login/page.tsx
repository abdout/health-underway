'use client';

import { LoginForm } from "@/components/auth/login/form";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
 
export default LoginPage;

export const dynamic = 'force-dynamic';