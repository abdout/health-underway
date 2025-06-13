import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/password/form";

const NewPasswordPage = () => {
  return ( 
    <Suspense>
      <NewPasswordForm />
    </Suspense>
   );
}
 
export default NewPasswordPage;