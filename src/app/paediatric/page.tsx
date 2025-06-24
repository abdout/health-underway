import { Suspense } from "react";
import Form from "@/components/paediatric/form";
import { getPaediatricDoctor } from "@/components/paediatric/action";
import type { PaediatricSchema } from "@/components/paediatric/validation";
import Loading from "@/components/atom/loading";

export default async function PaediatricPage() {
  const paediatricData = await getPaediatricDoctor();
  
  // Transform paediatricData to replace null values with undefined and ensure type safety
  const transformedData: PaediatricSchema | undefined = paediatricData ? {
    ...Object.fromEntries(
      Object.entries(paediatricData).map(([key, value]) => [key, value === null ? undefined : value])
    )
  } as PaediatricSchema : undefined;
  
  return (
    <div className="w-full mx-auto">
      <Suspense fallback={<Loading />}>
        <Form 
          type={paediatricData ? "update" : "create"} 
          data={transformedData} 
        />
      </Suspense>
    </div>
  );
} 