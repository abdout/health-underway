import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PaediatricSchema } from "./validation";

interface PersonalSectionProps {
  register: UseFormRegister<PaediatricSchema>;
  setValue: UseFormSetValue<PaediatricSchema>;
  watch: UseFormWatch<PaediatricSchema>;
  errors: FieldErrors<PaediatricSchema>;
  data?: PaediatricSchema;
}

export function PersonalSection({ 
  register, 
  setValue, 
  watch,
  errors, 
  data 
}: PersonalSectionProps) {
  const personalPhotos: any[] = Array.isArray(watch('personalPhotos')) ? [...(watch('personalPhotos') as any[])] : [];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Personal</h2>
        <hr className="my-4" />
      </div>
      
      {/* Research fields removed to keep this section purely personal */}

      {/* Personal & Family Information */}
      <div className="space-y-4">
        {/* <h3 className="text-sm font-medium text-gray-800">Personal & Family Information</h3> */}

        {/* Row: Second Nationality & Photo Publication */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <Input
              id="secondNationality"
              {...register('secondNationality')}
              placeholder="Second Nationality"
              className="bg-white w-full"
            />
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

        {/* Personal Photos Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium pb-4">Family Photos (up to 4)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="grid w-full max-w-sm items-center gap-3 mt-4">
                <Label htmlFor={`photo-${idx}`}>Photo {idx + 1}</Label>
                <Input
                  id={`photo-${idx}`}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const updated = [...personalPhotos];
                    updated[idx] = file;
                    setValue('personalPhotos', updated);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <Checkbox
              id="agreeToPhotoPublication"
              {...register('agreeToPhotoPublication')}
            />
            <span className="text-sm">Agree personal photo to be published</span>
          </div>
        </div>
      </div>
    </div>
  );
} 