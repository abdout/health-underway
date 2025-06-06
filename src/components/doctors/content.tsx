import { hospitalDoctors } from "./constant";
import { DoctorCard } from "./card";
import { SearchInput } from "@/components/ui/search-input";
import { FilterSelect } from "@/components/ui/filter-select";

const departmentOptions = [
  { value: "all", label: "All Departments" },
  { value: "CARDIOLOGY", label: "Cardiology" },
  { value: "EMERGENCY", label: "Emergency" },
  { value: "NEUROLOGY", label: "Neurology" },
  { value: "ORTHOPEDICS", label: "Orthopedics" },
  { value: "PEDIATRICS", label: "Pediatrics" },
  { value: "ONCOLOGY", label: "Oncology" },
  { value: "RADIOLOGY", label: "Radiology" },
  { value: "SURGERY", label: "Surgery" },
  { value: "OB/GYN", label: "OB/GYN" },
  { value: "DERMATOLOGY", label: "Dermatology" },
  { value: "PSYCHIATRY", label: "Psychiatry" },
  { value: "LABORATORY", label: "Laboratory" },
];

export function DoctorsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-10 mx-auto items-center justify-center flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-xl leading-[1] sm:text-3xl md:text-4xl">
        Doctors
        </h2>
        <p className="max-w-[65%] mx-auto text-center justify-center leading-normal text-muted-foreground sm:text-lg sm:leading-6">
        Expert medical professionals
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <SearchInput placeholder="Search doctors..." />
        <FilterSelect placeholder="All Departments" options={departmentOptions} />
      </div>
      

      {/* Doctors Grid */}
      <div className="grid grid-cols-4 gap-12">
        {hospitalDoctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
          />
        ))}
      </div>
    </div>
  );
} 