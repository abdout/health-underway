import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface InterestsProps {
  value: string[];
  onChange: (interests: string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const INTERESTS = [
  "Reading",
  "Writing",
  "Research",
  "Teaching",
  "Mentoring",
  "Public Speaking",
  "Community Service",
  "Volunteering",
  "Sports",
  "Football",
  "Basketball",
  "Tennis",
  "Swimming",
  "Running",
  "Cycling",
  "Gym/Fitness",
  "Yoga",
  "Hiking",
  "Travel",
  "Photography",
  "Art",
  "Painting",
  "Drawing",
  "Music",
  "Playing Instruments",
  "Singing",
  "Dancing",
  "Cooking",
  "Gardening",
  "Technology",
  "Coding",
  "Gaming",
  "Board Games",
  "Chess",
  "Movies",
  "Theater",
  "Literature",
  "History",
  "Science",
  "Astronomy",
  "Nature",
  "Environment",
  "Animals",
  "Pets",
  "Family Time",
  "Social Gatherings",
  "Networking",
  "Conferences",
  "Workshops",
  "Learning Languages",
  "Cultural Activities",
  "Religious Activities",
  "Meditation",
  "Mindfulness",
  "Crafts",
  "DIY Projects",
  "Collecting",
  "Antiques",
  "Cars",
  "Fashion",
  "Beauty",
  "Interior Design",
  "Architecture",
  "Business",
  "Entrepreneurship",
  "Investing",
  "Real Estate",
  "Charity Work",
  "Political Activities",
  "Environmental Causes",
  "Social Justice",
  "Human Rights",
  "Other"
] as const;

export function Interests({ value = [], onChange, onFocus, onBlur }: InterestsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];

  const availableInterests = INTERESTS.filter(interest => !safeValue.includes(interest));
  const filteredInterests = availableInterests.filter(interest => 
    interest.toLowerCase().includes(searchTerm.toLowerCase())
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

  const addInterest = (interest: string) => {
    onChange([...safeValue, interest]);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const removeInterest = (interestToRemove: string) => {
    onChange(safeValue.filter(interest => interest !== interestToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm("");
    }
    if (e.key === 'Enter' && filteredInterests.length > 0) {
      e.preventDefault();
      addInterest(filteredInterests[0]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Interests
      </label>
      
      <div className="relative">
        <div className="min-h-[40px] p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <div className="flex flex-wrap gap-1 mb-1">
            {safeValue.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
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
            placeholder={safeValue.length === 0 ? "add one or more interests *" : "Add more interests..."}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {isOpen && filteredInterests.length > 0 && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
          >
            {filteredInterests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => addInterest(interest)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
              >
                {interest}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* <div className="text-xs text-gray-500">
        {safeValue.length > 0 ? `${safeValue.length} interest${safeValue.length > 1 ? 's' : ''} selected` : 'No interests selected'}
      </div> */}
    </div>
  );
} 