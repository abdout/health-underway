'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserForReview, completeOnboarding, type UserReviewData } from '../../../components/onboarding/review/action';
import { 
  ErrorState, 
  SuccessDialog,
  ReviewContainer
} from '@/components/onboarding/review';
import Loading from '@/components/atom/loading';
import fireConfetti from '@/components/atom/confetti';
import { ModalProvider } from '@/components/atom/modal/context';

export default function ReviewPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchUserForReview();

        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setUserData(result.data);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("An error occurred while loading data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await completeOnboarding();

      if (result.success) {
        fireConfetti();
        setShowDialog(true);
      } else {
        setError(result.error || "An error occurred while completing registration");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      if (error instanceof Error) {
        console.error("Error stack:", error.stack);
      } else {
        console.error("Error details:", error);
      }
      setError("An error occurred while completing registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    router.push('/');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <ModalProvider>
      <ReviewContainer 
        userData={userData}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
      />
      
      <SuccessDialog 
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onClose={handleCloseDialog}
      />
    </ModalProvider>
  );
} 