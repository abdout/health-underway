'use client';
import { useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { InformationSchema } from "./validation";
import { AnimatedHierarchicalSelect, SelectionStep } from "../../atom/hierarchical-select";
import { useFormValidation } from "./use-validation";
import { useSelect } from "./use-select";
import { 
  COUNTRIES, 
  STATES, 
  LOCALITIES, 
  ADMIN_UNITS, 
  NEIGHBORHOODS 
} from './constant';

interface LocationProps {
  register: UseFormRegister<InformationSchema>;
  errors: FieldErrors<InformationSchema>;
  setValue: UseFormSetValue<InformationSchema>;
  watch?: UseFormWatch<InformationSchema>;
  defaultValues?: Partial<InformationSchema>;
}

const Location = ({
  register,
  errors,
  setValue,
  
  defaultValues
}: LocationProps) => {
  // Use our custom validation hook
  const { sectionRef } = useFormValidation<InformationSchema>({
    errors,
    errorFields: ['currentCountry', 'currentState', 'currentLocality', 'currentAdminUnit', 'currentNeighborhood'],
    errorMessage: "Please complete address information",
    defaultValues,
  });
  
  // Use our custom selection handler hook
  const { handleComplete } = useSelect<InformationSchema>({
    setValue,
    fieldMappings: {
      country: 'currentCountry',
      state: 'currentState',
      locality: 'currentLocality',
      admin_unit: 'currentAdminUnit',
      neighborhood: 'currentNeighborhood'
    }
  });

  // Define the hierarchical steps
  const locationSteps: SelectionStep[] = [
    {
      id: "country",
      title: "Address",
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
    },
    {
      id: "admin_unit",
      title: "Unit",
      placeholder: "Choose unit",
      emptyMessage: "No units available",
      getOptions: (prev) => {
        const localityId = prev.locality?.value;
        return localityId ? (ADMIN_UNITS[localityId] || []) : [];
      }
    },
    {
      id: "neighborhood",
      title: "Neighborhood",
      placeholder: "Choose neighborhood",
      emptyMessage: "No neighborhoods available",
      getOptions: (prev) => {
        const adminUnitId = prev.admin_unit?.value;
        return adminUnitId ? (NEIGHBORHOODS[adminUnitId] || []) : [];
      }
    }
  ];

  // Register all fields required by React Hook Form
  useEffect(() => {
    // Check if any previous data exists to determine if fields should be required
    const hasExistingData = 
      (defaultValues?.currentCountry && defaultValues.currentCountry.length > 0) ||
      (defaultValues?.currentState && defaultValues.currentState.length > 0) ||
      (defaultValues?.currentLocality && defaultValues.currentLocality.length > 0) ||
      (defaultValues?.currentAdminUnit && defaultValues.currentAdminUnit.length > 0) ||
      (defaultValues?.currentNeighborhood && defaultValues.currentNeighborhood.length > 0);
    
    if (!hasExistingData) {
      // Only make fields required if there's no existing data
      register('currentCountry', { required: "Please choose country" });
      register('currentState', { required: "Please choose state" });
      register('currentLocality', { required: "Please choose locality" });
      register('currentAdminUnit', { required: "Please choose unit" });
      register('currentNeighborhood', { required: "Please choose neighborhood" });
    } else {
      // Register fields as optional if there's existing data
      register('currentCountry');
      register('currentState');
      register('currentLocality');
      register('currentAdminUnit');
      register('currentNeighborhood');
    }
  }, [register, defaultValues]);

  // Custom animation timing configurations
  const timing = {
    transitionDelay: 250,
    dropdownDelay: 600
  };

  return (
    <div className="w-full" ref={sectionRef} data-location-field="true">
      {/* AnimatedHierarchicalSelect component with improved z-index and positioning */}
      <div className="relative" style={{ 
        zIndex: 50,
        position: "relative",
        isolation: "isolate" 
      }} data-location-field="true">
        <AnimatedHierarchicalSelect 
          steps={locationSteps} 
          onComplete={handleComplete}
          timing={timing}
          className="w-full"
          isLastStep={true}
          data-location-field="true"
        />
      </div>
    </div>
  );
};

export default Location; 