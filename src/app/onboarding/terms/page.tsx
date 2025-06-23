'use client';
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { SuccessToast, ErrorToast } from '@/components/atom/toast';

const TermsPage = () => {
    const [accepted, setAccepted] = useState(false);
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const handleCheckboxChange = (checked: boolean) => {
        setAccepted(checked);
        if (checked) {
            SuccessToast();
            router.push('/onboarding/attachment');
        }
    };

    // Export the form submission handler for the navigation system
    useEffect(() => {
        // Define a type for the window with our custom property
        interface CustomWindow extends Window {
            submitTermsForm?: () => void;
        }
        
        // Assign the function to the window object
        (window as CustomWindow).submitTermsForm = () => {
            if (!accepted) {
                ErrorToast("You must accept the terms to continue");
                return false;
            }
            return true;
        };
        
        // Cleanup function
        return () => {
            delete (window as CustomWindow).submitTermsForm;
        };
    }, [accepted]);

    return (
        <form ref={formRef} className='w-[80%] md:w-[50%] overflow-hidden flex flex-col items-center justify-center'>
            <p className='text-center text-lg justify-center hidden md:block'>
                Welcome to our platform. By proceeding with the onboarding process,{' '}<br />
                you agree to provide accurate information and follow our community guidelines.{' '}<br />
                We are committed to maintaining a safe and professional environment for all members.
            </p>
            <p className='text-center text-lg justify-center block md:hidden'>
                Welcome to our platform. By proceeding with the onboarding process, 
                you agree to provide accurate information and follow our community guidelines.
                We are committed to maintaining a safe and professional environment for all members.
            </p>
            <div className="flex items-center h-20 gap-2 pt-8">
                <Checkbox
                    id="terms"
                    checked={accepted}
                    onCheckedChange={handleCheckboxChange}
                />
                <label
                    htmlFor="terms"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Read the <Link href="/paper" className='text-blue-700'>Terms</Link> before starting
                </label>
            </div>
            <button id="submit-terms" type="submit" className="hidden" />
        </form>
    )
}

export default TermsPage;