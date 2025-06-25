import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaediatricSchema } from "./validation";
import { FAMILY_PHOTO_OPTIONS } from "./constant";

interface ResearchAndFamilySectionProps {
  register: UseFormRegister<PaediatricSchema>;
  setValue: UseFormSetValue<PaediatricSchema>;
  watch: UseFormWatch<PaediatricSchema>;
  errors: FieldErrors<PaediatricSchema>;
  data?: PaediatricSchema;
}

export function ResearchSection({ 
  register, 
  setValue, 
  watch,
  errors, 
  data 
}: ResearchAndFamilySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Research & Personal Life</h2>
        <hr className="my-4" />
      </div>
      
      {/* Research & Publications */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-800">Research & Publications</h3>

        {/* Scientific Papers Published (full width) */}
        <div>
          <Textarea
            id="scientificPapersPublished"
            {...register('scientificPapersPublished')}
            placeholder="Scientific Papers Published - Please list titles of published research or papers"
            rows={4}
            className="bg-white"
          />
        </div>

        {/* Two-column grid for other research fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Textarea
              id="booksEdited"
              {...register('booksEdited')}
              placeholder="Books Edited"
              rows={3}
              className="bg-white"
            />
          </div>

          <div>
            <Textarea
              id="chaptersEditedInPaediatricsBooks"
              {...register('chaptersEditedInPaediatricsBooks')}
              placeholder="Chapters Edited in Paediatrics Books"
              rows={3}
              className="bg-white"
            />
          </div>

          <div>
            <Textarea
              id="majorCareerAchievement"
              {...register('majorCareerAchievement')}
              placeholder="Major Career Achievement"
              rows={3}
              className="bg-white"
            />
          </div>

          <div>
            <Textarea
              id="recognitionOfServices"
              {...register('recognitionOfServices')}
              placeholder="Recognition of Services (e.g., awards, honors)"
              rows={3}
              className="bg-white"
            />
          </div>
        </div>
      </div>

      {/* Personal & Family Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-800">Personal & Family Information</h3>

        {/* Row: Second Nationality & Photo Publication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              id="secondNationality"
              {...register('secondNationality')}
              placeholder="Second Nationality"
              className="bg-white w-full"
            />
          </div>

          <div className="flex items-center space-x-3 mt-2 md:mt-0">
            <Checkbox
              id="agreeToPhotoPublication"
              {...register('agreeToPhotoPublication')}
            />
            <span className="text-sm">Agree personal photo to be published</span>
          </div>
        </div>

        {/* Spouse details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              id="nameOfSpouse"
              {...register('nameOfSpouse')}
              placeholder="Name of Spouse"
              className="bg-white w-full"
            />
          </div>

          <div>
            <Input
              id="workOfSpouse"
              {...register('workOfSpouse')}
              placeholder="Occupation of Spouse"
              className="bg-white w-full"
            />
          </div>
        </div>

        {/* Children & Special Occasion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Textarea
              id="childrenNamesAndStatus"
              {...register('childrenNamesAndStatus')}
              placeholder="Children Names and Status"
              rows={3}
              className="bg-white"
            />
          </div>

          <div>
            <Textarea
              id="specialOccasionOrRole"
              {...register('specialOccasionOrRole')}
              placeholder="Special Occasion or Role"
              rows={3}
              className="bg-white"
            />
          </div>
        </div>

        {/* Family Photo Request */}
        <div className="max-w-xs">
          <Select onValueChange={(value) => setValue('extendedRequestFamilyPhoto', value)} defaultValue={data?.extendedRequestFamilyPhoto}>
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Family Photo Request" />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_PHOTO_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
} 