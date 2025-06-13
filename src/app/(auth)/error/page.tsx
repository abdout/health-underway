import { Suspense } from "react";
import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
  return ( 
    <Suspense>
      <ErrorCard />
    </Suspense>
  );
};
 
export default AuthErrorPage;
