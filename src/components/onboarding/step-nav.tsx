'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';
import { useFormContext } from './form-context';
// import BackButton from './back-button';  // Import the BackButton component

// Arrow Right Icon Component
const ArrowRightIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className={className}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7"/>
  </svg>
);

// Define the icons for each step with filled and outline variants
const StepIcons = {
  attachment: (className: string, filled: boolean = false) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={filled ? "0" : "1.5"}
        d="M6 15V9a6 6 0 1 1 12 0v8a4 4 0 1 1-8 0V9a2 2 0 1 1 4 0v8"
      />
    </svg>
  ),
  contact: (className: string, filled: boolean = false) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth={filled ? "0" : "1.5"}
      />
      <path 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={filled ? "0" : "1.5"}
        d="M12 1v6m0 10v6m11-7h-6M6 12H0"
      />
    </svg>
  ),
  information: (className: string, filled: boolean = false) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth={filled ? "0" : "1.5"}
      />
      {!filled && (
        <>
          <path d="M12 16v-4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"/>
          <path d="M12 8h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2"/>
        </>
      )}
      {filled && (
        <>
          <path d="M12 16v-4" fill="white" stroke="white" strokeLinecap="round" strokeWidth="1.5"/>
          <circle cx="12" cy="8" r="1" fill="white"/>
        </>
      )}
    </svg>
  ),
  education: (className: string, filled: boolean = false) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={filled ? "0" : "1.5"}
        d="M22 10v6M2 10l10-5 10 5-10 5z"
      />
      <path 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={filled ? "0" : "1.5"}
        d="M6 12v5c3 0 5-1 8-1s5 1 8 1v-5"
      />
    </svg>
  ),
  activity: (className: string, filled: boolean = false) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={filled ? "0" : "1.5"}
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      />
      <circle 
        cx="9" 
        cy="7" 
        r="4" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth={filled ? "0" : "1.5"}
      />
      <path 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={filled ? "0" : "1.5"}
        d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      />
    </svg>
  )
};

const steps = [
  // { title: 'Terms', route: 'terms', link: '/onboarding/terms' },
  { title: 'Attachments', route: 'attachment', link: '/onboarding/attachment', icon: 'attachment' },
  { title: 'Contact', route: 'contact', link: '/onboarding/contact', icon: 'contact' },
  { title: 'Information', route: 'information', link: '/onboarding/information', icon: 'information' },
  { title: 'Education', route: 'education', link: '/onboarding/education', icon: 'education' },
  { title: 'Activity', route: 'activity', link: '/onboarding/activity', icon: 'activity' },
];

// Map localStorage keys to form routes
const FORM_STORAGE_KEYS = {
  attachment: 'attachmentFormData',
  contact: 'contactFormData',
  information: 'informationFormData',
  education: 'educationFormData',
  activity: 'activityFormData',
};

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = path.basename(pathname);
  const { currentFormId } = useFormContext();

  // Track visited steps
  const [visitedSteps, setVisitedSteps] = useState<{ [key: string]: boolean }>({});
  // Track form completion status
  const [formStatus, setFormStatus] = useState<{ [key: string]: 'empty' | 'partial' | 'complete' }>({
    attachment: 'empty',
    contact: 'empty',
    information: 'empty',
    education: 'empty',
    activity: 'empty',
  });

  // Function to check form completion status
  const checkFormStatus = () => {
    console.log("Checking form completion status...");
    
    // Check attachment form
    try {
      const attachmentData = localStorage.getItem(FORM_STORAGE_KEYS.attachment);
      if (attachmentData) {
        const parsedData = JSON.parse(attachmentData);
        const fieldsWithValue = Object.entries(parsedData)
          .filter(([key, value]) => key !== 'id' && value && value !== '')
          .length;
        
        setFormStatus(prev => ({
          ...prev,
          attachment: fieldsWithValue > 0 ? 'complete' : 'partial'
        }));
      }
    } catch (e) {
      console.error('Error parsing attachment form data:', e);
    }

    // Check contact form - complete if at least 2 fields are filled
    try {
      const contactData = localStorage.getItem(FORM_STORAGE_KEYS.contact);
      if (contactData) {
        const parsedData = JSON.parse(contactData);
        const fieldsWithValue = Object.entries(parsedData)
          .filter(([key, value]) => key !== 'id' && value && value !== '')
          .length;
        
        setFormStatus(prev => ({
          ...prev,
          contact: fieldsWithValue >= 2 ? 'complete' : fieldsWithValue > 0 ? 'partial' : 'empty'
        }));
      }
    } catch (e) {
      console.error('Error parsing contact form data:', e);
    }

    // Check information form - complete if name and location are filled
    try {
      const infoData = localStorage.getItem(FORM_STORAGE_KEYS.information);
      if (infoData) {
        const parsedData = JSON.parse(infoData);
        const hasName = parsedData.fullname !== undefined && parsedData.fullname !== '';
        const hasLocation = 
          (parsedData.currentCountry !== undefined && parsedData.currentCountry !== '') ||
          (parsedData.currentState !== undefined && parsedData.currentState !== '') ||
          (parsedData.currentLocality !== undefined && parsedData.currentLocality !== '');
        
        setFormStatus(prev => ({
          ...prev,
          information: (hasName && hasLocation) ? 'complete' : (hasName || hasLocation) ? 'partial' : 'empty'
        }));
      }
    } catch (e) {
      console.error('Error parsing information form data:', e);
    }

    // Check education form - complete if any education level is filled
    try {
      const educationData = localStorage.getItem(FORM_STORAGE_KEYS.education);
      if (educationData) {
        const parsedData = JSON.parse(educationData);
        const hasEducation = parsedData.educationLevel !== undefined && parsedData.educationLevel !== '';
        
        setFormStatus(prev => ({
          ...prev,
          education: hasEducation ? 'complete' : 'partial'
        }));
      }
    } catch (e) {
      console.error('Error parsing education form data:', e);
    }

    // Check activity form - complete if at least one skill is filled
    try {
      const activityData = localStorage.getItem(FORM_STORAGE_KEYS.activity);
      if (activityData) {
        const parsedData = JSON.parse(activityData);
        const hasSkill = Array.isArray(parsedData.skills) && parsedData.skills.length > 0;
        
        setFormStatus(prev => ({
          ...prev,
          activity: hasSkill ? 'complete' : 'partial'
        }));
      }
    } catch (e) {
      console.error('Error parsing activity form data:', e);
    }
  };

  // Check form status initially and whenever localStorage changes
  useEffect(() => {
    // Initial status check
    checkFormStatus();
    
    // Create a storage event listener for cross-tab changes
    const handleStorageChange = (e: StorageEvent) => {
      // Only check if the change is to one of our form data keys
      const isFormDataKey = Object.values(FORM_STORAGE_KEYS).includes(e.key || '');
      if (isFormDataKey) {
        checkFormStatus();
      }
    };
    
    // Listen for changes to localStorage from other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Periodically check for changes that happen in the same tab
    // since those don't trigger the storage event
    const interval = setInterval(checkFormStatus, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Update visited steps when path changes
  useEffect(() => {
    // Map the current path to a route key
    let routeKey = currentPath;
    if (currentPath === 'information') routeKey = 'information';
    if (currentPath === 'activity') routeKey = 'activity';
    
    // Mark the current step as visited
    setVisitedSteps(prev => ({
      ...prev,
      [routeKey]: true
    }));
    
    // Re-check form status when path changes
    checkFormStatus();
  }, [currentPath]);

  // Update form status when the form changes (via currentFormId)
  useEffect(() => {
    checkFormStatus();
  }, [currentFormId]);

  return (
    <div className='flex flex-col'>
      {/* <BackButton currentStep={currentStep} /> */}
      <div className="w-full">
        <div className="relative flex flex-row items-center justify-between gap-1 lg:gap-2">
          {steps.map((step, index) => {
            const isActive = currentPath === step.route || 
              (currentPath === 'information' && step.route === 'information') ||
              (currentPath === 'activity' && step.route === 'activity');
            
            const isVisited = visitedSteps[step.route] || 
              (visitedSteps['information'] && currentPath === 'information') ||
              (visitedSteps['activity'] && currentPath === 'activity');
            
            const formState = formStatus[step.route];
            const isCompleted = formState === 'complete';
            const isPartial = formState === 'partial';
            
            // Enhanced color logic with filled styles
            const iconColorClass = clsx(
              'transition-colors duration-200',
              {
                'text-green-600': isCompleted && !isActive,
                'text-primary': isActive,
                'text-amber-500': isPartial && !isActive && !isCompleted,
                'text-muted-foreground': !isActive && !isCompleted && !isPartial,
              }
            );

            // Get the appropriate icon component for this step
            const IconComponent = StepIcons[step.icon as keyof typeof StepIcons];
            const isLastStep = index === steps.length - 1;

            return (
              <div key={step.link} className="flex items-center">
                <Link
                  href={step.link}
                  className={clsx(
                    "group z-20 flex flex-col items-center gap-1 p-2 rounded-lg",
                    "transition-all duration-200 focus:outline-none",
                    "hover:bg-muted/50 focus:bg-muted/50",
                    "min-w-[60px] lg:min-w-[80px]"
                  )}
                  prefetch={true}
                >
                  <div className={clsx(
                    'flex items-center justify-center transition-all duration-200',
                    iconColorClass,
                    'group-hover:text-primary group-focus:text-primary',
                    {
                      'scale-110': isActive,
                      'drop-shadow-md': isActive || isCompleted,
                    }
                  )}>
                    {IconComponent(
                      clsx('w-6 h-6 lg:w-7 lg:h-7'), 
                      isCompleted || isActive
                    )}
                  </div>
                  
                  {/* Step title */}
                  <span className={clsx(
                    'text-xs lg:text-sm font-medium text-center transition-colors duration-200',
                    {
                      'text-green-600': isCompleted && !isActive,
                      'text-primary': isActive,
                      'text-amber-600': isPartial && !isActive && !isCompleted,
                      'text-muted-foreground': !isActive && !isCompleted && !isPartial,
                    },
                    'group-hover:text-primary group-focus:text-primary'
                  )}>
                    {step.title}
                  </span>
                  
                  {/* Status indicator dot */}
                  <div className={clsx(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    {
                      'bg-green-500': isCompleted,
                      'bg-primary': isActive,
                      'bg-amber-400': isPartial && !isCompleted,
                      'bg-muted-foreground/30': !isActive && !isCompleted && !isPartial,
                    }
                  )} />
                </Link>
                
                {/* Arrow indicator between steps */}
                {!isLastStep && (
                  <div className="flex items-center justify-center px-1 lg:px-2">
                    <ArrowRightIcon 
                      className={clsx(
                        'transition-colors duration-200',
                        {
                          'text-green-500': isCompleted,
                          'text-primary/60': isActive,
                          'text-amber-400': isPartial && !isCompleted,
                          'text-muted-foreground/40': !isActive && !isCompleted && !isPartial,
                        }
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-full bg-muted rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-primary to-green-500 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(Object.values(formStatus).filter(status => status === 'complete').length / steps.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}