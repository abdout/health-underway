import React from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { InformationSchema } from "./validation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GraduateInfoProps {
  register: UseFormRegister<InformationSchema>;
  errors: FieldErrors<InformationSchema>;
  setValue: UseFormSetValue<InformationSchema>;
  educationLevel: string;
  completionYearItems: { value: string; label: string }[];
  bachelorCompletionYearItems: { value: string; label: string }[];
  masterCompletionYearItems: { value: string; label: string }[];
  phdCompletionYearItems: { value: string; label: string }[];
  onCompletionYearSelect: (item: { value: string; label: string }) => void;
  onBachelorCompletionYearSelect: (item: { value: string; label: string }) => void;
  onMasterCompletionYearSelect: (item: { value: string; label: string }) => void;
  onPhdCompletionYearSelect: (item: { value: string; label: string }) => void;
  selectedCompletionYear: { value: string; label: string } | null;
  selectedBachelorCompletionYear: { value: string; label: string } | null;
  selectedMasterCompletionYear: { value: string; label: string } | null;
  selectedPhdCompletionYear: { value: string; label: string } | null;
}

const GraduateInfo = ({
  register,
  errors,
  educationLevel,
  completionYearItems,
  bachelorCompletionYearItems,
  masterCompletionYearItems,
  phdCompletionYearItems,
  onCompletionYearSelect,
  onBachelorCompletionYearSelect,
  onMasterCompletionYearSelect,
  onPhdCompletionYearSelect,
  selectedCompletionYear,
  selectedBachelorCompletionYear,
  selectedMasterCompletionYear,
  selectedPhdCompletionYear,
}: GraduateInfoProps) => {
  if (educationLevel === 'student') {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col mt-4">
        {/* Base education information - shown for all non-student types */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Educational Institution Name:</p>
          <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
          <Input
            className="w-full"
            placeholder="Educational Institution Name"
            {...register('institution')}
          />
          {errors.institution && (
            <p className="text-xs text-red-500 mt-1">{errors.institution.message}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Major:</p>
          <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
          <Input
            className="w-full"
            placeholder="Major"
            {...register('major')}
          />
          {errors.major && (
            <p className="text-xs text-red-500 mt-1">{errors.major.message}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Graduation Year:</p>
          <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
          
          <Select
            onValueChange={(value) => {
              const selectedItem = completionYearItems.find(item => item.value === value);
              if (selectedItem) {
                onCompletionYearSelect(selectedItem);
              }
            }}
            value={selectedCompletionYear?.value || ''}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose graduation year" />
            </SelectTrigger>
            <SelectContent>
              {completionYearItems.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Hidden field for form validation */}
          <input 
            type="hidden" 
            {...register('yearOfCompletion')}
            value={selectedCompletionYear?.value || ''}
          />
          
          {errors.yearOfCompletion && (
            <p className="text-xs text-red-500 mt-1">{errors.yearOfCompletion.message}</p>
          )}
        </div>

        {/* Bachelor's information - shown for master, PhD, and professor */}
        {(educationLevel === 'master' || educationLevel === 'phd' || educationLevel === 'professor') && (
          <>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Bachelor's Institution:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              <Input
                className="w-full"
                placeholder="Bachelor's Institution"
                {...register('bachelorInstitution')}
              />
              {errors.bachelorInstitution && (
                <p className="text-xs text-red-500 mt-1">{errors.bachelorInstitution.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Bachelor's Major:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              <Input
                className="w-full"
                placeholder="Bachelor's Major"
                {...register('bachelorMajor')}
              />
              {errors.bachelorMajor && (
                <p className="text-xs text-red-500 mt-1">{errors.bachelorMajor.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Bachelor's Graduation Year:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              
              <Select
                onValueChange={(value) => {
                  const selectedItem = bachelorCompletionYearItems.find(item => item.value === value);
                  if (selectedItem) {
                    onBachelorCompletionYearSelect(selectedItem);
                  }
                }}
                value={selectedBachelorCompletionYear?.value || ''}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose bachelor's graduation year" />
                </SelectTrigger>
                <SelectContent>
                  {bachelorCompletionYearItems.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Hidden field for form validation */}
              <input 
                type="hidden" 
                {...register('bachelorCompletionYear')}
                value={selectedBachelorCompletionYear?.value || ''}
              />
              
              {errors.bachelorCompletionYear && (
                <p className="text-xs text-red-500 mt-1">{errors.bachelorCompletionYear.message}</p>
              )}
            </div>
          </>
        )}

        {/* Master's information - shown for PhD and professor */}
        {(educationLevel === 'phd' || educationLevel === 'professor') && (
          <>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Master's Institution:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              <Input
                className="w-full"
                placeholder="Master's Institution"
                {...register('masterInstitution')}
              />
              {errors.masterInstitution && (
                <p className="text-xs text-red-500 mt-1">{errors.masterInstitution.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Master's Major:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              <Input
                className="w-full"
                placeholder="Master's Major"
                {...register('masterMajor')}
              />
              {errors.masterMajor && (
                <p className="text-xs text-red-500 mt-1">{errors.masterMajor.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Master's Graduation Year:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              
              <Select
                onValueChange={(value) => {
                  const selectedItem = masterCompletionYearItems.find(item => item.value === value);
                  if (selectedItem) {
                    onMasterCompletionYearSelect(selectedItem);
                  }
                }}
                value={selectedMasterCompletionYear?.value || ''}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose master's graduation year" />
                </SelectTrigger>
                <SelectContent>
                  {masterCompletionYearItems.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Hidden field for form validation */}
              <input 
                type="hidden" 
                {...register('masterCompletionYear')}
                value={selectedMasterCompletionYear?.value || ''}
              />
              
              {errors.masterCompletionYear && (
                <p className="text-xs text-red-500 mt-1">{errors.masterCompletionYear.message}</p>
              )}
            </div>
          </>
        )}

        {/* PhD information - shown only for professor */}
        {educationLevel === 'professor' && (
          <>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">PhD Institution:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              <Input
                className="w-full"
                placeholder="PhD Institution"
                {...register('phdInstitution')}
              />
              {errors.phdInstitution && (
                <p className="text-xs text-red-500 mt-1">{errors.phdInstitution.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">PhD Major:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              <Input
                className="w-full"
                placeholder="PhD Major"
                {...register('phdMajor')}
              />
              {errors.phdMajor && (
                <p className="text-xs text-red-500 mt-1">{errors.phdMajor.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">PhD Graduation Year:</p>
              <hr className="w-20 h-[1px] bg-black -mt-1 mb-2" />
              
              <Select
                onValueChange={(value) => {
                  const selectedItem = phdCompletionYearItems.find(item => item.value === value);
                  if (selectedItem) {
                    onPhdCompletionYearSelect(selectedItem);
                  }
                }}
                value={selectedPhdCompletionYear?.value || ''}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose PhD graduation year" />
                </SelectTrigger>
                <SelectContent>
                  {phdCompletionYearItems.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Hidden field for form validation */}
              <input 
                type="hidden" 
                {...register('phdCompletionYear')}
                value={selectedPhdCompletionYear?.value || ''}
              />
              
              {errors.phdCompletionYear && (
                <p className="text-xs text-red-500 mt-1">{errors.phdCompletionYear.message}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GraduateInfo; 