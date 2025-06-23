import { MultiSelect, Option } from "@/components/atom/multi-select";

interface InterestsProps {
  value: string[];
  onChange: (interests: string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const INTERESTS = [
  "Politics",
  "Economics",
  "Education",
  "Health",
  "Environment",
  "Technology",
  "Arts",
  "Sports",
  "Volunteer Work",
  "Human Rights",
  "Sustainable Development",
  "Culture",
  "Media",
  "Science",
  "Literature",
] as const;

const INTEREST_OPTIONS: Option[] = INTERESTS.map((interest) => ({
  label: interest,
  value: interest,
}));

export function Interests({ value, onChange, onFocus, onBlur }: InterestsProps) {
  const selectedOptions = value.map(interest => ({
    label: interest,
    value: interest,
  }));

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Interests
      </label>
      <MultiSelect
        options={INTEREST_OPTIONS}
        selected={selectedOptions}
        onChange={(selected) => onChange(selected.map(s => s.value))}
        placeholder="One or more"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
} 