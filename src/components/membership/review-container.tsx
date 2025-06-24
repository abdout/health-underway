'use client';

import { ReviewActions } from '@/components/membership/review-action';
import { ReviewContainer as PaediatricReviewContainer } from '@/components/paediatric/review';

interface MembershipReviewContainerProps {
  userData: any | null; // Could be PaediatricDoctor or other
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
}

export function ReviewContainer({ userData, isSubmitting, handleSubmit }: MembershipReviewContainerProps) {
  const isPaediatric = userData && 'fullNameEnglish' in userData;

  return (
    <div className="min-h-screen -mt-10">
      <div className="max-w-7xl mx-auto px-4">
        {isPaediatric ? (
          <PaediatricReviewContainer data={userData} isSubmitting={isSubmitting} handleSubmit={handleSubmit} hideActions={true} />
        ) : (
          <div className="text-center text-muted-foreground py-12">No review available for this user.</div>
        )}

        {/* Admin Actions */}
        {userData?.id && (
          <ReviewActions isSubmitting={isSubmitting} onSubmit={handleSubmit} userId={userData.id} applicationStatus={userData?.applicationStatus || ''} />
        )}
      </div>
    </div>
  );
} 