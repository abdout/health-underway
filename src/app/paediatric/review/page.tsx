'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchPaediatricDoctorForReview,
  submitPaediatricDoctorProfile,
} from '@/components/paediatric/review/action';
import {
  ReviewContainer,
  ErrorState,
  LoadingState,
  SuccessDialog,
} from '@/components/paediatric/review';
import fireConfetti from '@/components/atom/confetti';
import { ModalProvider } from '@/components/atom/modal/context';

export default function PaediatricReviewPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const result = await fetchPaediatricDoctorForReview();
      if (result.error) setError(result.error);
      else setData(result.data);
      setIsLoading(false);
    };
    load();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await submitPaediatricDoctorProfile();
    if (result.success) {
      fireConfetti();
      setShowDialog(true);
    } else {
      setError(result.error || 'Submission failed');
    }
    setIsSubmitting(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    router.push('/dashboard');
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <ModalProvider>
      <ReviewContainer data={data} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
      <SuccessDialog showDialog={showDialog} setShowDialog={setShowDialog} onClose={handleCloseDialog} />
    </ModalProvider>
  );
} 