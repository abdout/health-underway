'use client';
import { Exclamation } from "@/components/atom/icon";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <Exclamation className="h-6 w-6 text-destructive" />
      </div>
    </CardWrapper>
  );
};
