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
import { ErrorToast } from '@/components/atom/toast';

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

  const personalPhotos = watch('personalPhotos') as string[] | undefined;
  const firstPhoto = Array.isArray(personalPhotos) ? personalPhotos[0] : undefined;
  const [photoPreview, setPhotoPreview] = useState<string | null>(typeof firstPhoto === 'string' ? firstPhoto : null);

  useEffect(() => {
    if (typeof firstPhoto === 'string') {
      setPhotoPreview(firstPhoto);
    }
  }, [firstPhoto]);

  const updatedCvValue = watch('updatedCV') as string | undefined;
  const scientificPapersValues = watch('scientificPapersFiles') as string[] | undefined;

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

  // === Cloudinary upload helper ===
  const uploadToCloudinary = async (file: File, fieldType: 'image' | 'raw'): Promise<string> => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${fieldType === 'raw' ? 'raw' : 'image'}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'social'); // make sure this preset exists in Cloudinary
    try {
      const res = await fetch(url, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.secure_url as string;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      ErrorToast('فشل رفع الملف. حاول مرة أخرى.');
      throw err;
    }
  };

  // Handle file selection from the hidden input – will append a new field *only* if a file was chosen
  const handleHiddenPaperChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      try {
        const url = await uploadToCloudinary(file, 'raw');
        append(url as any, { shouldFocus: false });
      } catch (_) {}
    }
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

  // Helper to detect if a Cloudinary/raw URL is a PDF
  const isPdfUrl = (url: string) => url.toLowerCase().endsWith('.pdf') || (url.includes('cloudinary.com') && url.includes('/raw/'));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Attachments</h2>
        <hr className="my-4" />
      </div>

      <div className="flex w-full items-start flex-wrap gap-12">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="personalPhotos" className="cursor-pointer">
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
          <Input id="personalPhotos" type="file" accept="image/*" className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await uploadToCloudinary(file, 'image');
                const updated = Array.isArray(personalPhotos) ? [...personalPhotos] : [];
                updated[0] = url;
                setValue('personalPhotos', updated, { shouldValidate: true });
                setPhotoPreview(url);
              } catch (_) {}
            }}
          />
          {errors.personalPhotos && <p className="text-red-500 text-sm mt-1 w-40 text-center">{errors.personalPhotos.message as string}</p>}
        </div>

        {/* CV Upload */}
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="updatedCV" className="cursor-pointer">
            <div className="w-40 h-40 rounded-md border border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-600 transition-colors">
              {updatedCvValue ? (
                isPdfUrl(updatedCvValue) ? (
                  <div className="relative w-full h-full overflow-hidden bg-white">
                    <div className="absolute" style={{ width: '120%', height: '120%', left: '-5%', top: '-1%' }}>
                      <iframe
                        src={updatedCvValue}
                        width="100%"
                        height="100%"
                        className="pointer-events-none w-full h-full"
                        title="CV Preview"
                        frameBorder="0"
                        scrolling="no"
                      />
                    </div>
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-xs text-center py-1 z-10">
                      Resume
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-600">
                    <Pdf className="mx-auto h-10 w-10" />
                    <p className="mt-1 text-sm break-words w-full px-1">
                      {(() => {
                        const name = updatedCvValue.split('/').pop() || 'Resume';
                        return name.length > 20 ? `${name.substring(0, 20)}...` : name;
                      })()}
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center">
                  <Pdf className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="text-sm mt-1">Resume</p>
                </div>
              )}
            </div>
          </Label>
          <Input id="updatedCV" type="file" accept=".pdf,.doc,.docx" className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await uploadToCloudinary(file, 'raw');
                setValue('updatedCV' as const, url, { shouldValidate: true });
              } catch (_) {}
            }}
          />
          {errors.updatedCV && <p className="text-red-500 text-sm mt-1 w-40 text-center">{errors.updatedCV.message as string}</p>}
        </div>

        {/* Scientific Papers Section */}
        <div className="flex flex-col items-center space-y-2" style={{ width: '380px' }}>
          <div 
            className="grid grid-cols-2 gap-x-12 gap-y-2 w-full" // vertical gap is 2 (8px) to match V_GAP_PX
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
                  className="cursor-pointer w-full rounded-md border border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-600 transition-colors"
                  style={{ height: `${paperBoxHeight}px` }}
                >
                  {scientificPapersValues && scientificPapersValues[index] ? (
                    isPdfUrl(scientificPapersValues[index]) ? (
                      <div className="relative w-full h-full overflow-hidden bg-white">
                        <div className="absolute" style={{ width: '122%', height: '122%', left: '-5%', top: '-1%' }}>
                          <iframe
                            src={scientificPapersValues[index]}
                            width="100%"
                            height="100%"
                            className="pointer-events-none w-full h-full"
                            title={`Paper ${index + 1} Preview`}
                            frameBorder="0"
                            scrolling="no"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-600">
                        <Paper className="mx-auto h-6 w-6" />
                        <p className="mt-1 text-xs break-words w-full px-1 leading-tight">
                          {(() => {
                            const name = scientificPapersValues[index].split('/').pop() || `Paper ${index + 1}`;
                            return name.length > 20 ? `${name.substring(0, 20)}...` : name;
                          })()}
                        </p>
                      </div>
                    )
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
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await uploadToCloudinary(file, 'raw');
                      setValue(`scientificPapersFiles.${index}` as const, url, { shouldValidate: true });
                    } catch (_) {}
                  }}
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