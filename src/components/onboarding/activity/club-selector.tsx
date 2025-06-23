'use client';

import { UseFormSetValue } from "react-hook-form";
import { ActivitySchema } from "./validation";

interface ClubSelectorProps {
  setValue: UseFormSetValue<ActivitySchema>;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const CLUB_TYPES = ["political", "union", "social", "youth", "voluntary"] as const;

export default function ClubSelector({ setValue, selectedTypes, setSelectedTypes }: ClubSelectorProps) {
  const handleSelect = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(newTypes);
    setValue("selectedActivities", newTypes);
    
    // Set specific booleans based on type selection
    if (type === "political") {
      setValue("partyMember", newTypes.includes("political"));
    } else if (type === "union") {
      setValue("unionMember", newTypes.includes("union"));
    } else if (type === "social") {
      setValue("ngoMember", newTypes.includes("social"));
    } else if (type === "youth") {
      setValue("clubMember", newTypes.includes("youth"));
    } else if (type === "voluntary") {
      setValue("voluntaryMember", newTypes.includes("voluntary"));
    }
  };

  return (
    <div className="space-y-3 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <label className="block text-sm font-medium text-gray-900">
          Have you ever been a member of any activity...?
        </label>
        <p className="text-sm text-gray-500">One or more</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {CLUB_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleSelect(type)}
            className={`px-2 py-1 rounded-full text-sm font-normal transition-colors hover:bg-opacity-80
              ${
                selectedTypes.includes(type)
                  ? "bg-neutral-600 text-background"
                  : "bg-neutral-100 text-gray-700 border border-gray-300 "
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
