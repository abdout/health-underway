import { Suspense } from "react";
import PaediatricForm from "@/components/paediatric/form";
import { getPaediatricDoctor } from "@/components/paediatric/action";
import Loading from "@/components/atom/loading";

export default async function PaediatricEditPage() {
  const data = await getPaediatricDoctor();

  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <PaediatricForm type="update" data={data as any} />
      </Suspense>
    </div>
  );
} 