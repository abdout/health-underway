import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/join/form";

const RegisterPage = () => {
  return ( 
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
 
export default RegisterPage;