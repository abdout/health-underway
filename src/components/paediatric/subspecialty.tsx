import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SubspecialtyProps {
  value: string[];
  onChange: (subspecialty: string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const PAEDIATRIC_SUBSPECIALTIES = [
  "General Paediatrics",
  "Neonatology",
  "Paediatric Cardiology",
  "Paediatric Gastroenterology",
  "Paediatric Neurology",
  "Paediatric Endocrinology",
  "Paediatric Pulmonology",
  "Paediatric Nephrology",
  "Paediatric Hematology/Oncology",
  "Paediatric Infectious Diseases",
  "Paediatric Rheumatology",
  "Paediatric Dermatology",
  "Paediatric Psychiatry",
  "Paediatric Surgery",
  "Paediatric Orthopedics",
  "Paediatric Urology",
  "Paediatric Ophthalmology",
  "Paediatric ENT",
  "Paediatric Radiology",
  "Paediatric Pathology",
  "Paediatric Anesthesia",
  "Paediatric Emergency Medicine",
  "Paediatric Critical Care",
  "Paediatric Genetics",
  "Paediatric Allergy/Immunology",
  "Paediatric Rehabilitation",
  "Developmental Pediatrics",
  "Adolescent Medicine",
  "Paediatric Palliative Care",
  "Paediatric Sports Medicine",
  "Child Protection",
  "Paediatric Dentistry",
  "Paediatric Nutrition",
  "Paediatric Psychology",
  "Paediatric Social Work",
  "Other"
] as const;

export function Subspecialty({ value = [], onChange, onFocus, onBlur }: SubspecialtyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];

  const availableSubspecialties = PAEDIATRIC_SUBSPECIALTIES.filter(subspecialty => !safeValue.includes(subspecialty));
  const filteredSubspecialties = availableSubspecialties.filter(subspecialty => 
    subspecialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFocus = () => {
    setIsOpen(true);
    if (onFocus) onFocus();
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if clicking on dropdown
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    setTimeout(() => {
      setIsOpen(false);
      setSearchTerm("");
      if (onBlur) onBlur();
    }, 100);
  };

  const addSubspecialty = (subspecialty: string) => {
    onChange([...safeValue, subspecialty]);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const removeSubspecialty = (subspecialtyToRemove: string) => {
    onChange(safeValue.filter(subspecialty => subspecialty !== subspecialtyToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm("");
    }
    if (e.key === 'Enter' && filteredSubspecialties.length > 0) {
      e.preventDefault();
      addSubspecialty(filteredSubspecialties[0]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium">
        Subspecialty
      </label>
      
      <div className="relative">
        <div className="min-h-[40px] p-2 border border-gray-300 rounded-md bg-white focus-within:border-primary">
          <div className="flex flex-wrap gap-1 mb-1">
            {safeValue.map((subspecialty) => (
              <Badge key={subspecialty} variant="secondary" className="text-xs">
                {subspecialty}
                <button
                  type="button"
                  onClick={() => removeSubspecialty(subspecialty)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={safeValue.length === 0 ? "add one or more subspecialties *" : "Add more subspecialties..."}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {isOpen && filteredSubspecialties.length > 0 && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
          >
            {filteredSubspecialties.map((subspecialty) => (
              <button
                key={subspecialty}
                type="button"
                onClick={() => addSubspecialty(subspecialty)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
              >
                {subspecialty}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* <div className="text-xs text-gray-500">
        {safeValue.length > 0 ? `${safeValue.length} subspecialt${safeValue.length > 1 ? 'ies' : 'y'} selected` : 'No subspecialties selected'}
      </div> */}
    </div>
  );
} 