import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder: string;
  className?: string;
}

export function SearchInput({ placeholder, className = "" }: SearchInputProps) {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        className={`w-60 h-9 pr-10 ${className}`}
      />
      <svg
        className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
} 