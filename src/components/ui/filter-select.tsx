import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  placeholder: string;
  options: FilterOption[];
  className?: string;
}

export function FilterSelect({ placeholder, options, className = "" }: FilterSelectProps) {
  return (
    <Select>
      <SelectTrigger className={`w-[180px] h-10 ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 