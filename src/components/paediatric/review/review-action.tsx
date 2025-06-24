import { Button, buttonVariants } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ReviewActionsProps {
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
}

export function ReviewActions({ isSubmitting, onSubmit }: ReviewActionsProps) {
  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <Button onClick={onSubmit} disabled={isSubmitting} size="lg">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          'Submit Profile'
        )}
      </Button>
      <Link
        href="/paediatric"
        className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'ml-4')}
      >
        Edit
      </Link>
    </div>
  );
} 