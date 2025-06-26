import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaediatricSchema } from "./validation";
import { NAME_PREFIXES, CAREER_STAGES, COUNTRIES } from "./constant";

interface InformationSectionProps {
  register: UseFormRegister<PaediatricSchema>;
  setValue: UseFormSetValue<PaediatricSchema>;
  errors: FieldErrors<PaediatricSchema>;
  data?: PaediatricSchema;
}

export function InformationSection({ 
  register, 
  setValue, 
  errors, 
  data 
}: InformationSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Information</h2>
        <hr className="my-4" />
      </div>
      
      {/* Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Input
            id="fullNameEnglish"
            {...register('fullNameEnglish')}
            placeholder="Full Name in English Language *"
            className="bg-white"
          />
          {errors.fullNameEnglish && (
            <p className="text-red-500 text-sm mt-1">{errors.fullNameEnglish.message}</p>
          )}
        </div>
        
        <div>
          <Input
            id="fullNameArabic"
            {...register('fullNameArabic')}
            placeholder="الاسم الكامل باللغة العربية *"
            className="text-right bg-white "
            dir="rtl"
          />
          {errors.fullNameArabic && (
            <p className="text-red-500 text-sm mt-1">{errors.fullNameArabic.message}</p>
          )}
        </div>
      </div>

      {/* Prefix, Career, and Birth Information */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Select onValueChange={(value) => setValue('namePrefix', value)} defaultValue={data?.namePrefix} >
            <SelectTrigger className="bg-white  w-full md:w-44">
              <SelectValue placeholder="Prefix *" />
            </SelectTrigger>
            <SelectContent>
              {NAME_PREFIXES.map((prefix) => (
                <SelectItem key={prefix.value} value={prefix.value}>
                  {prefix.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.namePrefix && (
            <p className="text-red-500 text-sm mt-1">{errors.namePrefix.message}</p>
          )}
        </div>
        
        <div>
          <Select onValueChange={(value) => setValue('stageOfCareer', value)} defaultValue={data?.stageOfCareer}>
            <SelectTrigger className="bg-white w-full md:w-44">
              <SelectValue placeholder="Career *" />
            </SelectTrigger>
            <SelectContent>
              {CAREER_STAGES.map((stage) => (
                <SelectItem key={stage.value} value={stage.value}>
                  {stage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.stageOfCareer && (
            <p className="text-red-500 text-sm mt-1">{errors.stageOfCareer.message}</p>
          )}
        </div>

        <div>
          <Select onValueChange={(value) => setValue('placeOfBirth', value)} defaultValue={data?.placeOfBirth}>
            <SelectTrigger className="bg-white w-full md:w-44">
              <SelectValue placeholder="Place of Birth" />
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
        
        <div className="w-full md:w-40 h-10">
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            placeholder="Date of Birth"
            className="bg-white h-10 w-full md:w-44"
          />
        </div>
      </div>

      {/* Location and Email */}
      {/* <div className="space-y-6">
        <Input
          id="originalHomeTownOrVillage"
          {...register('originalHomeTownOrVillage')}
          placeholder="Original Home Town or Village"
          className="bg-white"
        />

        <Input
          id="personalEmail"
          type="email"
          {...register('personalEmail')}
          placeholder="Personal Email *"
          className="bg-white"
        />
        {errors.personalEmail && (
          <p className="text-red-500 text-sm mt-1">{errors.personalEmail.message}</p>
        )}
      </div> */}

      {/* Agreement */}
      {/* <div className="flex items-center space-x-3">
        <Checkbox
          id="agreeToEmailPublication"
          {...register('agreeToEmailPublication')}
        />
        <span className="text-sm">Agree to email publication *</span>
      </div> */}
      {/* {errors.agreeToEmailPublication && (
        <p className="text-red-500 text-sm mt-1">{errors.agreeToEmailPublication.message}</p>
      )} */}
    </div>
  );
} 