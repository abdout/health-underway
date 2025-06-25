import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaediatricSchema } from "./validation";
import { UNIVERSITIES, COUNTRIES } from "./constant";
import { Qualifications } from "./qualifications";
import { Subspecialty } from "./subspecialty";

interface ProfessionalSectionProps {
  register: UseFormRegister<PaediatricSchema>;
  setValue: UseFormSetValue<PaediatricSchema>;
  watch: UseFormWatch<PaediatricSchema>;
  errors: FieldErrors<PaediatricSchema>;
  data?: PaediatricSchema;
}

// Generate years for graduation (from 1970 to current year + 5)
const generateGraduationYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1970; year <= currentYear + 5; year++) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years.reverse();
};

// Career Information Constants
const CAREER_POSITIONS = [
  { value: "consultant", label: "Consultant" },
  { value: "specialist", label: "Specialist" },
  { value: "resident", label: "Resident" },
  { value: "fellow", label: "Fellow" },
  { value: "professor", label: "Professor" },
  { value: "lecturer", label: "Lecturer" },
];

const INSTITUTIONS = [
  { value: "hospital", label: "Hospital" },
  { value: "university", label: "University" },
  { value: "clinic", label: "Clinic" },
  { value: "research_center", label: "Research Center" },
];

const YEARS_OF_EXPERIENCE = Array.from({ length: 40 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `${i + 1} ${i + 1 === 1 ? 'year' : 'years'}`
}));

export function ProfessionalSection({ 
  register, 
  setValue, 
  watch,
  errors, 
  data 
}: ProfessionalSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Professional</h2>
        <hr className="my-4" />
      </div>
      
      {/* Primary Graduation */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-800">Primary graduation</h3>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
          <div>
            <Select onValueChange={(value) => setValue('universityOfPrimaryGraduation', value)} defaultValue={data?.universityOfPrimaryGraduation}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="University *" />
              </SelectTrigger>
              <SelectContent>
                {UNIVERSITIES.map((university) => (
                  <SelectItem key={university.value} value={university.value}>
                    {university.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.universityOfPrimaryGraduation && (
              <p className="text-red-500 text-sm mt-1">{errors.universityOfPrimaryGraduation.message}</p>
            )}
          </div>
          
          <div>
            <Select onValueChange={(value) => setValue('countryOfUniversityOfPrimaryGraduation', value)} defaultValue={data?.countryOfUniversityOfPrimaryGraduation}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Country *" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.countryOfUniversityOfPrimaryGraduation && (
              <p className="text-red-500 text-sm mt-1">{errors.countryOfUniversityOfPrimaryGraduation.message}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => setValue('yearOfGraduationFromMedicine', value)} defaultValue={data?.yearOfGraduationFromMedicine}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Year *" />
              </SelectTrigger>
              <SelectContent>
                {generateGraduationYears().map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.yearOfGraduationFromMedicine && (
              <p className="text-red-500 text-sm mt-1">{errors.yearOfGraduationFromMedicine.message}</p>
            )}
          </div>
          
          <div>
            <Input
              id="awardsDuringPrimaryMedicalDegree"
              {...register('awardsDuringPrimaryMedicalDegree')}
              placeholder="Awards"
              className="bg-white w-full md:w-44"
            />
          </div>
        </div>
      </div>

      {/* Post Graduation */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-800">Post graduation</h3>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
          <div>
            <Select onValueChange={(value) => setValue('universityOfPostGraduation', value)} defaultValue={data?.universityOfPostGraduation}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent>
                {UNIVERSITIES.map((university) => (
                  <SelectItem key={university.value} value={university.value}>
                    {university.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select onValueChange={(value) => setValue('countryOfUniversityOfPostGraduation', value)} defaultValue={data?.countryOfUniversityOfPostGraduation}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select onValueChange={(value) => setValue('yearOfPostGraduation', value)} defaultValue={data?.yearOfPostGraduation}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {generateGraduationYears().map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Input
              id="awardsPostGraduate"
              {...register('awardsPostGraduate')}
              placeholder="Awards"
              className="bg-white w-full md:w-44"
            />
          </div>
        </div>

        {/* <div>
          <Input
            id="otherQualifications"
            {...register('otherQualifications')}
            placeholder="Other Qualifications"
            className="bg-white"
          />
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Qualifications */}
      <div className="space-y-4">
        {/* <h3 className="text-sm font-medium text-gray-800">Qualifications</h3> */}
        <Qualifications
          value={watch('qualifications') || []}
          onChange={(qualifications) => setValue('qualifications', qualifications)}
        />
      </div>

      {/* Subspecialty */}
      <div className="space-y-4">
        {/* <h3 className="text-sm font-medium text-gray-800">Subspecialty</h3> */}
        <Subspecialty
          value={watch('paediatricsSubspecialty') || []}
          onChange={(subspecialties) => setValue('paediatricsSubspecialty', subspecialties)}
        />
        {errors.paediatricsSubspecialty && (
          <p className="text-red-500 text-sm mt-1">{errors.paediatricsSubspecialty.message}</p>
        )}

        {/* <div>
          <Input
            id="otherSubspecialty"
            {...register('otherSubspecialty')}
            placeholder="Other Subspecialty"
            className="bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select onValueChange={(value) => setValue('subspecialtyCertified', value)} defaultValue={data?.subspecialtyCertified}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Subspecialty Certified *" />
              </SelectTrigger>
              <SelectContent>
                {SUBSPECIALTY_CERTIFIED_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subspecialtyCertified && (
              <p className="text-red-500 text-sm mt-1">{errors.subspecialtyCertified.message}</p>
            )}
          </div>
          
          <div>
            <Input
              id="subspecialtyDegreeName"
              {...register('subspecialtyDegreeName')}
              placeholder="Subspecialty Degree Name"
              className="bg-white"
            />
          </div>
        </div> */}
      </div>
      </div>

      {/* Career Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-800">Career Information</h3>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
          <div>
            <Select onValueChange={(value) => setValue('currentPosition', value)} defaultValue={data?.currentPosition}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Position *" />
              </SelectTrigger>
              <SelectContent>
                {CAREER_POSITIONS.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.currentPosition && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPosition.message}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => setValue('currentInstitution', value)} defaultValue={data?.currentInstitution}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Institution *" />
              </SelectTrigger>
              <SelectContent>
                {INSTITUTIONS.map((institution) => (
                  <SelectItem key={institution.value} value={institution.value}>
                    {institution.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.currentInstitution && (
              <p className="text-red-500 text-sm mt-1">{errors.currentInstitution.message}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => setValue('countryOfWork', value)} defaultValue={data?.countryOfWork}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Country *" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.countryOfWork && (
              <p className="text-red-500 text-sm mt-1">{errors.countryOfWork.message}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => setValue('yearsInPosition', value)} defaultValue={data?.yearsInPosition}>
              <SelectTrigger className="bg-white w-full md:w-44">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                {YEARS_OF_EXPERIENCE.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

    </div>
  );
} 