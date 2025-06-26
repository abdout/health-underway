"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchPaediatricDoctorByUserId } from "@/components/paediatric/review/action";
import { ReviewContainer } from "@/components/membership/review-container";
import Loading from "@/components/atom/loading";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LabUserReviewPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;
  const [userData, setUserData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchPaediatricDoctorByUserId(userId);
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setUserData(result.data as any);
        }
      } catch (error) {
        setError("حدث خطأ أثناء تحميل البيانات");
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) loadUserData();
  }, [userId]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="relative py-24">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-6 right-9 z-10 rounded-full"
          onClick={() => router.back()}
          aria-label="رجوع"
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
        <Alert variant="destructive" className="max-w-xl mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative py-24">
      {/* Back arrow icon button in the top corner */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-6 right-9 z-10 rounded-full"
        onClick={() => router.back()}
        aria-label="رجوع"
      >
        <ArrowRight className="w-6 h-6" />
      </Button>
      
      <ReviewContainer userData={userData} isSubmitting={false} handleSubmit={async () => {}} />
    </div>
  );
}
