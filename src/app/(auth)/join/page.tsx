'use client';

import { RegisterForm } from "@/components/auth/join/form";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
 
export default RegisterPage;

export const dynamic = 'force-dynamic';