import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaediatricSchema } from "./validation";
import { COUNTRIES } from "./constant";
import { Interests } from "./interests";

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
        <h3 className="text-lg font-medium text-gray-800">Research & Publications</h3>
        
        <div>
          <Textarea
            id="scientificPapersPublished"
            {...register('scientificPapersPublished')}
            placeholder="Scientific Papers Published - Please type titles of published research or papers"
            rows={4}
            className="bg-white"
          />
        </div>

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
            placeholder="Recognition of Services or Research - Recognition by State, University or International Organisation"
            rows={3}
            className="bg-white"
          />
        </div>
      </div>

      {/* Personal & Family Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Personal & Family Information</h3>
        
        <div>
          <Input
            id="secondNationality"
            {...register('secondNationality')}
            placeholder="Second Nationality - Please specify country of acquired nationality"
            className="bg-white"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="agreeToPhotoPublication"
            {...register('agreeToPhotoPublication')}
          />
          <span className="text-sm">Agree personal photo to be published</span>
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <Interests
            value={watch('hobbiesOrInterests') || []}
            onChange={(interests) => setValue('hobbiesOrInterests', interests)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              id="nameOfSpouse"
              {...register('nameOfSpouse')}
              placeholder="Name of Spouse (if married)"
              className="bg-white"
            />
          </div>
          
          <div>
            <Input
              id="workOfSpouse"
              {...register('workOfSpouse')}
              placeholder="Work of Spouse (if married)"
              className="bg-white"
            />
          </div>
        </div>

        <div>
          <Textarea
            id="childrenNamesAndStatus"
            {...register('childrenNamesAndStatus')}
            placeholder="Children Names and Status - Children names and where are they in the ladder of life"
            rows={3}
            className="bg-white"
          />
        </div>

        <div>
          <Textarea
            id="specialOccasionOrRole"
            {...register('specialOccasionOrRole')}
            placeholder="Special Occasion or Role - Any special occasion or role you think should be considered for adding to your bio"
            rows={3}
            className="bg-white"
          />
        </div>

        <div>
          <Input
            id="extendedRequestFamilyPhoto"
            {...register('extendedRequestFamilyPhoto')}
            placeholder="Extended Request or Family Photo - Yes. Please send by email / No"
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
} 