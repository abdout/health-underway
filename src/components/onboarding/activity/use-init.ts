import { useState, useEffect } from 'react';
import { UseFormWatch,
  //  UseFormSetValue 
  } from 'react-hook-form';
import { ActivitySchema } from './validation';
import { ActivityUser } from './type';

export function useInitActivities(
  user: ActivityUser,
  watch: UseFormWatch<ActivitySchema>,
  // setValue: UseFormSetValue<ActivitySchema>
) {  
  // Watched form value
  const watchedSelectedActivities = watch("selectedActivities");
  
  // Get initial activities from user data
  const getInitialActivities = () => {
    const activities: string[] = [];
    if (user.partyMember) activities.push("political");
    if (user.unionMember) activities.push("union");
    if (user.ngoMember) activities.push("social");
    if (user.clubMember) activities.push("youth");
    // Voluntary is handled in the form but not stored in database
    return activities;
  };
  
  // State for selected activities with proper initial value
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    watchedSelectedActivities?.length ? watchedSelectedActivities : getInitialActivities()
  );
  
  // Sync the watched value with our state
  useEffect(() => {
    if (watchedSelectedActivities?.length) {
      setSelectedActivities(watchedSelectedActivities);
    }
  }, [watchedSelectedActivities]);

  return {
    selectedActivities,
    setSelectedActivities
  };
} 