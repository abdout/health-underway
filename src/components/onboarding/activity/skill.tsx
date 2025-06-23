import { MultiSelect, Option } from "@/components/atom/multi-select";

interface SkillsProps {
  value: string[];
  onChange: (skills: string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SKILLS = [
  "Leadership",
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Planning",
  "Organization",
  "Time Management",
  "Negotiation",
  "Persuasion",
  "Analysis",
  "Research",
  "Writing",
  "Presentation",
  "Training",
  "Mentoring",
] as const;

const SKILL_OPTIONS: Option[] = SKILLS.map((skill) => ({
  label: skill,
  value: skill,
}));

export function Skills({ value, onChange, onFocus, onBlur }: SkillsProps) {
  const selectedOptions = value.map(skill => ({
    label: skill,
    value: skill,
  }));

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Skills
      </label>
      <MultiSelect
        options={SKILL_OPTIONS}
        selected={selectedOptions}
        onChange={(selected) => onChange(selected.map(s => s.value))}
        placeholder="One or more"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
} 