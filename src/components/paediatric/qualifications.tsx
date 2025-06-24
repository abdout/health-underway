import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface QualificationsProps {
  value: string[];
  onChange: (qualifications: string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const QUALIFICATIONS = [
  "MBBS",
  "MD",
  "MRCP",
  "MRCPCH",
  "FRCPCH",
  "DCH",
  "CABP",
  "ABP",
  "MSc",
  "PhD",
  "FRCPI",
  "MRCPI",
  "FRCPC",
  "CCFP",
  "FAAP",
  "FRACP",
  "MMed",
  "FCP",
  "FCPS",
  "DM",
  "DNB",
  "Fellowship",
  "Other"
] as const;

export function Qualifications({ value = [], onChange, onFocus, onBlur }: QualificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];

  const availableQualifications = QUALIFICATIONS.filter(qualification => !safeValue.includes(qualification));
  const filteredQualifications = availableQualifications.filter(qualification => 
    qualification.toLowerCase().includes(searchTerm.toLowerCase())
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

  const addQualification = (qualification: string) => {
    onChange([...safeValue, qualification]);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const removeQualification = (qualificationToRemove: string) => {
    onChange(safeValue.filter(qualification => qualification !== qualificationToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm("");
    }
    if (e.key === 'Enter' && filteredQualifications.length > 0) {
      e.preventDefault();
      addQualification(filteredQualifications[0]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Qualifications *
      </label>
      
      <div className="relative">
        <div className="min-h-[40px] p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <div className="flex flex-wrap gap-1 mb-1">
            {safeValue.map((qualification) => (
              <Badge key={qualification} variant="secondary" className="text-xs">
                {qualification}
                <button
                  type="button"
                  onClick={() => removeQualification(qualification)}
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
            placeholder={safeValue.length === 0 ? "Type to search and add qualifications..." : "Add more qualifications..."}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {isOpen && filteredQualifications.length > 0 && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
          >
            {filteredQualifications.map((qualification) => (
              <button
                key={qualification}
                type="button"
                onClick={() => addQualification(qualification)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
              >
                {qualification}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500">
        {safeValue.length > 0 ? `${safeValue.length} qualification${safeValue.length > 1 ? 's' : ''} selected` : 'No qualifications selected'}
      </div>
    </div>
  );
} 