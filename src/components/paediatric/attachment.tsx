'use client';

import { useState, useEffect, useRef } from 'react';
import { useFieldArray, Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Image from 'next/image';
import { PaediatricSchema } from './validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { XCircle } from 'lucide-react';
import { Photo, Pdf, Plus, Paper } from '@/components/atom/icon';

interface AttachmentSectionProps {
  control: Control<PaediatricSchema>;
  errors: FieldErrors<PaediatricSchema>;
  register: UseFormRegister<PaediatricSchema>;
  setValue: UseFormSetValue<PaediatricSchema>;
  watch: UseFormWatch<PaediatricSchema>;
  data?: PaediatricSchema;
}

export const AttachmentSection = ({ control, errors, register, setValue, watch, data }: AttachmentSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'scientificPapersFiles',
  });

  // Ensure at least one paper field is present on mount
  useEffect(() => {
    if (fields.length === 0) {
      append(undefined, { shouldFocus: false });
    }
  }, [fields.length, append]);

  const personalPhotoValue = watch('personalPhoto');
  const [photoPreview, setPhotoPreview] = useState<string | null>(typeof data?.personalPhoto === 'string' ? data.personalPhoto : null);

  useEffect(() => {
    if (personalPhotoValue && personalPhotoValue.length > 0) {
      const file = personalPhotoValue[0];
      if (file instanceof File) {
        const newUrl = URL.createObjectURL(file);
        setPhotoPreview(newUrl);
        return () => URL.revokeObjectURL(newUrl);
      }
    }
  }, [personalPhotoValue]);

  const updatedCvValue = watch('updatedCV');
  const scientificPapersValues = watch('scientificPapersFiles');

  const paperCount = fields.length;
  const totalPaperSlots = paperCount + 1; // Always +1 for "More Paper" button

  // Calculate rows needed for paper section (2 columns grid)
  const getPaperRows = (count: number) => {
    return Math.ceil(count / 2);
  };

  const PAPER_CONTAINER_HEIGHT = 160; // 10rem → same as w-40 / h-40 used for photo & CV
  const V_GAP_PX = 8; // 0.5rem (Tailwind gap-2) between rows

  const paperRows = getPaperRows(totalPaperSlots);

  // Height for each paper box so that total height (including gaps) stays fixed
  const paperBoxHeight = (PAPER_CONTAINER_HEIGHT - (paperRows - 1) * V_GAP_PX) / paperRows;

  // Ref for hidden file input used when adding a new paper
  const hiddenPaperInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection from the hidden input – will append a new field *only* if a file was chosen
  const handleHiddenPaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newIndex = fields.length; // index that the new paper will take
      // First create a new slot in the field-array
      append(undefined, { shouldFocus: false });
      // Then assign the chosen file(s) to that slot
      setValue(`scientificPapersFiles.${newIndex}` as const, files as any, {
        shouldValidate: true,
      });
    }

    // Reset the input so selecting the same file again will still trigger onChange
    if (hiddenPaperInputRef.current) {
      hiddenPaperInputRef.current.value = "";
    }
  };

  // Handle paper upload click
  const handlePaperUpload = (index: number) => {
    const fileInput = document.getElementById(`scientificPapersFiles.${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // Handle add more paper - this will open the hidden file input – new box will be added after successful upload
  const handleAddMorePaper = () => {
    // Simply open the hidden file input – new box will be added after successful upload
    hiddenPaperInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Attachments</h2>
        <hr className="my-4" />
      </div>

      <div className="flex w-full items-start flex-wrap gap-8">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="personalPhoto" className="cursor-pointer">
            <div className="w-40 h-40 rounded-full border border-dashed border-gray-500 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-600 transition-colors overflow-hidden">
              {photoPreview ? (
                <Image src={photoPreview} alt="Profile Preview" width={160} height={160} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <Photo className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="text-sm mt-1">Photo</p>
                </div>
              )}
            </div>
          </Label>
          <Input id="personalPhoto" type="file" accept="image/*" {...register('personalPhoto')} className="hidden" />
          {errors.personalPhoto && <p className="text-red-500 text-sm mt-1 w-40 text-center">{errors.personalPhoto.message as string}</p>}
        </div>

        {/* CV Upload */}
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="updatedCV" className="cursor-pointer">
            <div className="w-40 h-40 rounded-md border border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-600 transition-colors p-2">
              {updatedCvValue && updatedCvValue[0] ? (
                <div className="text-center text-gray-600">
                  <Pdf className="mx-auto h-10 w-10" />
                  <p className="mt-1 text-sm break-words w-full px-1">{updatedCvValue[0].name}</p>
                </div>
              ) : (
                <div className="text-center">
                  <Pdf className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="text-sm mt-1">Resume</p>
                </div>
              )}
            </div>
          </Label>
          <Input id="updatedCV" type="file" accept=".pdf,.doc,.docx" {...register('updatedCV')} className="hidden" />
          {errors.updatedCV && <p className="text-red-500 text-sm mt-1 w-40 text-center">{errors.updatedCV.message as string}</p>}
        </div>

        {/* Scientific Papers Section */}
        <div className="flex flex-col items-center space-y-2" style={{ width: '320px' }}>
          <div 
            className="grid grid-cols-2 gap-2 w-full" // vertical gap is 2 (8px) to match V_GAP_PX
            style={{ 
              gridTemplateRows: `repeat(${paperRows}, ${paperBoxHeight}px)`,
              height: `${PAPER_CONTAINER_HEIGHT}px`
            }}
          >
            {/* Existing Paper Upload Boxes */}
            {fields.map((field, index) => (
              <div key={field.id} className="relative">
                <div
                  onClick={() => handlePaperUpload(index)}
                  className="cursor-pointer w-full rounded-md border border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-600 transition-colors p-2"
                  style={{ height: `${paperBoxHeight}px` }}
                >
                  {scientificPapersValues?.[index]?.[0] ? (
                    <div className="text-center text-gray-600">
                      <Paper className="mx-auto h-6 w-6" />
                      <p className="mt-1 text-xs break-words w-full px-1 leading-tight">
                        {scientificPapersValues[index][0].name.length > 20 
                          ? `${scientificPapersValues[index][0].name.substring(0, 20)}...` 
                          : scientificPapersValues[index][0].name
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Paper className="mx-auto h-6 w-6" />
                      <p className="text-xs mt-1">
                        {index === 0 ? 'First Paper' : 
                         index === 1 ? 'Second Paper' : 
                         `Paper ${index + 1}`}
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  id={`scientificPapersFiles.${index}`}
                  type="file"
                  accept=".pdf"
                  {...register(`scientificPapersFiles.${index}` as const)}
                  className="hidden"
                />
                {fields.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => remove(index)} 
                    className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6"
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            
            {/* Add More Paper Button - Always visible */}
            <div
              onClick={handleAddMorePaper}
              className="cursor-pointer w-full rounded-md border border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-600 transition-colors"
              style={{ height: `${paperBoxHeight}px` }}
            >
              <Plus className="mx-auto h-6 w-6" />
              <p className="text-xs mt-1">More Paper</p>
            </div>
          </div>
          
          {/* Hidden input that is used when the user wants to add a brand-new paper */}
          <input
            ref={hiddenPaperInputRef}
            type="file"
            accept=".pdf"
            onChange={handleHiddenPaperChange}
            className="hidden"
          />
          
          {errors.scientificPapersFiles && (
            <p className="text-red-500 text-sm mt-2 w-full text-center">
              {errors.scientificPapersFiles.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentSection;