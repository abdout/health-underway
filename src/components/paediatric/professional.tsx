import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaediatricSchema } from "./validation";
import { UNIVERSITIES, COUNTRIES, POSITIONS, PLACES_OF_TRAINING, PAEDIATRIC_SUBSPECIALTIES, SUBSPECIALTY_CERTIFIED_OPTIONS } from "./constant";
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
        <h2 className="text-xl font-semibold text-gray-900">Professional Background</h2>
        <hr className="my-4" />
      </div>
      
      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Education</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select onValueChange={(value) => setValue('universityOfPrimaryGraduation', value)} defaultValue={data?.universityOfPrimaryGraduation}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="University of Primary Graduation *" />
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
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Country of University *" />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select onValueChange={(value) => setValue('yearOfGraduationFromMedicine', value)} defaultValue={data?.yearOfGraduationFromMedicine}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Year of Graduation from Medicine *" />
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
              placeholder="Awards During Primary Medical Degree"
              className="bg-white"
            />
          </div>
        </div>

        <div>
          <Input
            id="otherQualification"
            {...register('otherQualification')}
            placeholder="Other Qualification"
            className="bg-white"
          />
        </div>

        <div>
          <Textarea
            id="postGraduateStudies"
            {...register('postGraduateStudies')}
            placeholder="Post Graduate Studies - Mention University and Degree and year awarded"
            rows={3}
            className="bg-white"
          />
        </div>

        <div>
          <Textarea
            id="otherQualifications"
            {...register('otherQualifications')}
            placeholder="Other Qualifications"
            rows={3}
            className="bg-white"
          />
        </div>
      </div>

      {/* Qualifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Qualifications</h3>
        <Qualifications
          value={watch('qualifications') || []}
          onChange={(qualifications) => setValue('qualifications', qualifications)}
        />
      </div>

      {/* Subspecialty */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Paediatrics Subspecialty</h3>
        <Subspecialty
          value={watch('paediatricsSubspecialty') || []}
          onChange={(subspecialties) => setValue('paediatricsSubspecialty', subspecialties)}
        />
        {errors.paediatricsSubspecialty && (
          <p className="text-red-500 text-sm mt-1">{errors.paediatricsSubspecialty.message}</p>
        )}

        <div>
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
        </div>
      </div>

      {/* Career Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Career Information</h3>
        
        <div>
          <Textarea
            id="currentPositionInHospital"
            {...register('currentPositionInHospital')}
            placeholder="Current Position in Hospital/University/Health Center *"
            rows={3}
            className="bg-white"
          />
          {errors.currentPositionInHospital && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPositionInHospital.message}</p>
          )}
        </div>

        <div>
          <Select onValueChange={(value) => setValue('countryOfMajorityPaediatricsTraining', value)} defaultValue={data?.countryOfMajorityPaediatricsTraining}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Country of Majority of Paediatrics Training *" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.countryOfMajorityPaediatricsTraining && (
            <p className="text-red-500 text-sm mt-1">{errors.countryOfMajorityPaediatricsTraining.message}</p>
          )}
        </div>

        <div>
          <Textarea
            id="academicPositionCurrentOrPast"
            {...register('academicPositionCurrentOrPast')}
            placeholder="Academic Position Current or Past with Dates"
            rows={3}
            className="bg-white"
          />
        </div>

        <div>
          <Textarea
            id="pastCareerPositions"
            {...register('pastCareerPositions')}
            placeholder="Past Career Positions"
            rows={3}
            className="bg-white"
          />
        </div>
      </div>

    </div>
  );
} 