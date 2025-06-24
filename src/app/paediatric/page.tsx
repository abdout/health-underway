import { Suspense } from "react";
import PaediatricForm from "@/components/paediatric/form";
import { getPaediatricDoctor } from "@/components/paediatric/action";
import type { PaediatricSchema } from "@/components/paediatric/validation";
import Loading from "@/components/atom/loading";

export default function PaediatricPage() {
  return (
    <div className="min-h-screen">
      <PaediatricForm type="create" />
    </div>
  );
} 