'use client';
import { useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { InformationSchema } from "./validation";
import { AnimatedHierarchicalSelect, SelectionStep } from "../../atom/hierarchical-select";
import { useFormValidation } from "./use-validation";
import { useSelect } from "./use-select";
import { BIRTH_MONTHS, generateBirthYears, COUNTRIES, STATES, LOCALITIES } from './constant';

interface BirthdateProps {
  register: UseFormRegister<InformationSchema>;
  errors: FieldErrors<InformationSchema>;
  setValue: UseFormSetValue<InformationSchema>;
  defaultValues?: Partial<InformationSchema>;
}

const Birthdate = ({
  register,
  errors,
  setValue,
  defaultValues
}: BirthdateProps) => {
  // Use our custom validation hook
  const { sectionRef } = useFormValidation<InformationSchema>({
    errors,
    errorFields: ['birthMonth', 'birthYear', 'birthCountry', 'birthState', 'birthLocality'],
    errorMessage: "Please complete birth information",
    defaultValues,
  });
  
  // Use our custom selection handler hook
  const { handleComplete } = useSelect<InformationSchema>({
    setValue,
    fieldMappings: {
      month: 'birthMonth',
      year: 'birthYear',
      country: 'birthCountry',
      state: 'birthState',
      locality: 'birthLocality'
    }
  });

  // Define the hierarchical steps
  const birthdateSteps: SelectionStep[] = [
    {
      id: "month",
      title: "Birth Date",
      placeholder: "Choose month",
      emptyMessage: "No months available",
      getOptions: () => BIRTH_MONTHS
    },
    {
      id: "year",
      title: "Year",
      placeholder: "Choose year",
      emptyMessage: "No years available",
      getOptions: () => generateBirthYears()
    },
    {
      id: "country",
      title: "Birth Country",
      placeholder: "Choose country",
      emptyMessage: "No countries available",
      getOptions: () => COUNTRIES
    },
    {
      id: "state",
      title: "State",
      placeholder: "Choose state",
      emptyMessage: "No states available",
      getOptions: (prev) => {
        const countryId = prev.country?.value;
        return countryId ? (STATES[countryId] || []) : [];
      }
    },
    {
      id: "locality",
      title: "Locality",
      placeholder: "Choose locality",
      emptyMessage: "No localities available",
      getOptions: (prev) => {
        const stateId = prev.state?.value;
        return stateId ? (LOCALITIES[stateId] || []) : [];
      }
    }
  ];

  // Register all fields required by React Hook Form
  useEffect(() => {
    // Check if any previous data exists to determine if fields should be required
    const hasExistingData = 
      (defaultValues?.birthMonth && defaultValues.birthMonth.length > 0) ||
      (defaultValues?.birthYear && defaultValues.birthYear.length > 0) ||
      (defaultValues?.birthCountry && defaultValues.birthCountry.length > 0) ||
      (defaultValues?.birthState && defaultValues.birthState.length > 0) ||
      (defaultValues?.birthLocality && defaultValues.birthLocality.length > 0);
    
    if (!hasExistingData) {
      // Only make fields required if there's no existing data
      register('birthMonth', { required: "Please choose birth month" });
      register('birthYear', { required: "Please choose birth year" });
      register('birthCountry', { required: "Please choose birth country" });
      register('birthState', { required: "Please choose birth state" });
      register('birthLocality', { required: "Please choose birth locality" });
    } else {
      // Register fields as optional if there's existing data
      register('birthMonth');
      register('birthYear');
      register('birthCountry');
      register('birthState');
      register('birthLocality');
    }
  }, [register, defaultValues]);

  // Returning a React component - marking all elements with data-birthdate-field
  return (
    <div className="w-full" ref={sectionRef} data-birthdate-field="true">
      {/* AnimatedHierarchicalSelect component for birthdate selection */}
      <div className="relative" style={{ 
        zIndex: 40,
        position: "relative"
      }} data-birthdate-field="true">
        <AnimatedHierarchicalSelect 
          steps={birthdateSteps}
          onComplete={handleComplete}
          timing={{
            transitionDelay: 250,
            dropdownDelay: 600
          }}
          className="w-full"
          data-birthdate-field="true"
        />
      </div>
    </div>
  );
};

export default Birthdate; 