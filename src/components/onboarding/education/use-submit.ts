import { useTransition } from "react";
import { UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { InformationSchema } from "./validation";
import { createInformation, updateInformation } from "./action";
import { getNextRoute } from '../utils';
import { ErrorToast, SuccessToast, showValidationErrorToast } from "@/components/atom/toast";

interface UseSubmitProps {
  handleSubmit: UseFormHandleSubmit<InformationSchema>;
  errors: FieldErrors<InformationSchema>;
  type: "create" | "update";
  setIsSubmitting?: (value: boolean) => void;
}

export function useSubmit({ 
  handleSubmit, 
  errors, 
  type, 
  setIsSubmitting 
}: UseSubmitProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Scroll to the first error field
  const scrollToFirstError = () => {
    // Get the first error field
    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) return;

    // Find the element with the error
    const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Handle form validation errors
  const handleValidationErrors = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return false;

    console.error('Form has validation errors:', errors);
    
    // Create a detailed error message in English
    let errorMessage = 'Please correct the following errors:';
    
    // Add specific field errors to the message
    errorFields.forEach(field => {
      const fieldError = errors[field as keyof typeof errors];
      if (fieldError) {
        // Map field names to English
        let englishFieldName = '';
        switch(field) {
          case 'fullName': englishFieldName = 'Full Name'; break;
          case 'birthCountry': englishFieldName = 'Birth Country'; break;
          case 'birthState': englishFieldName = 'Birth State'; break;
          case 'birthLocality': englishFieldName = 'Birth Locality'; break;
          case 'birthYear': englishFieldName = 'Birth Year'; break;
          case 'birthMonth': englishFieldName = 'Birth Month'; break;
          case 'currentCountry': englishFieldName = 'Current Country'; break;
          case 'currentState': englishFieldName = 'Current State'; break;
          case 'currentLocality': englishFieldName = 'Current Locality'; break;
          case 'currentAdminUnit': englishFieldName = 'Administrative Unit'; break;
          case 'currentNeighborhood': englishFieldName = 'Neighborhood'; break;
          case 'educationLevel': englishFieldName = 'Education Level'; break;
          case 'educationField': englishFieldName = 'Field of Study'; break;
          case 'educationSpecialization': englishFieldName = 'Specialization'; break;
          default: englishFieldName = field;
        }
        
        errorMessage += `\n• ${englishFieldName}`;
      }
    });
    
    // Show toast with detailed error message using showValidationErrorToast for consistent styling
    showValidationErrorToast(errorMessage);
    
    // Log all error fields to console
    errorFields.forEach(field => {
      const fieldError = errors[field as keyof typeof errors];
      if (fieldError) {
        console.error(`Field ${field} error:`, fieldError.message);
      }
    });
    
    // Scroll to the first error
    scrollToFirstError();
    
    return true;
  };

  // Handle the actual form submission
  const onSubmit = handleSubmit((formData: InformationSchema) => {
    console.log('Form submission triggered with data:', formData);
    
    // Check for validation errors
    if (handleValidationErrors()) {
      return;
    }
    
    // Ensure birthYear and birthMonth are strings before submission
    const processedFormData = {
      ...formData,
      birthYear: formData.birthYear?.toString() || '',
      birthMonth: formData.birthMonth?.toString() || ''
    };
    
    // Save to localStorage for persistence between page visits
    try {
      localStorage.setItem('informationFormData', JSON.stringify(processedFormData));
      console.log('Saved form data to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    
    startTransition(async () => {
      try {
        console.log('Starting form submission transition');
        if (setIsSubmitting) {
          console.log('Setting isSubmitting to true');
          setIsSubmitting(true);
        }
        
        const minimalData = {
          ...processedFormData,
        };

        console.log("Submitting minimal data:", minimalData);
        console.log('Form submission type:', type);

        if (type === "create") {
          console.log('Creating information...');
          try {
            const result = await createInformation({ success: false, error: false }, minimalData);
            console.log('Create information result:', result);

            if (result.success) {
              console.log('Information created successfully');
              SuccessToast();
              router.push(getNextRoute(pathname));
            } else {
              console.error('Failed to create information');
              ErrorToast(result.error || "Failed to create information");
            }
          } catch (error) {
            console.error('Error during creation:', error);
            ErrorToast("An error occurred while submitting the form");
          }
        } else {
          console.log('Updating information...');
          try {
            const result = await updateInformation({ success: false, error: false }, minimalData);
            console.log('Update information result:', result);

            if (result.success) {
              console.log('Information updated successfully');
              SuccessToast();
              router.push(getNextRoute(pathname));
            } else {
              console.error('Failed to update information');
              ErrorToast(result.error || "Failed to update information");
            }
          } catch (error) {
            console.error('Error during update:', error);
            ErrorToast("An error occurred while submitting the form");
          }
        }
      } catch (error) {
        console.error("Form submission error:", error);
        ErrorToast("An error occurred while submitting the form");
      } finally {
        console.log('Form submission completed');
        if (setIsSubmitting) {
          console.log('Setting isSubmitting to false');
          setIsSubmitting(false);
        }
      }
    });
  });

  return {
    onSubmit,
    isPending,
    scrollToFirstError
  };
} 