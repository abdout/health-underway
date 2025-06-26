'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ReviewDialogProps } from './type';

export function LoadingState() {
  return (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
    </div>
  );
}

export function ErrorState({ error }: { error: string }) {
  const router = useRouter();
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8">An Error Occurred</h1>
      <p className="text-red-500 mb-4">{error}</p>
      <Button onClick={() => router.push('/paediatric')}>Return</Button>
    </div>
  );
}

export function SuccessDialog({ showDialog, setShowDialog, onClose }: ReviewDialogProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (showDialog) {
      const timer1 = setTimeout(() => setAnimate(true), 100);
      const timer2 = setTimeout(() => onClose(), 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
    setAnimate(false);
  }, [showDialog, onClose]);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md h-60" showCloseButton={false}>
        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative mb-4 flex items-center justify-center transition-all duration-500 ease-in-out ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
          >
            <div className={`absolute h-16 w-16 rounded-full bg-green-500 opacity-20`} />
            <div className="relative h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <DialogHeader className={`transition-all duration-500 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <DialogTitle className="font-heading text-center text-2xl" />
            <DialogDescription className="text-center text-xl pt-4">
              <strong>Thank you for submitting the profile</strong> <br /> Your profile will be reviewed shortly
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
} 