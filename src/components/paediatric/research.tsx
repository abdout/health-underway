import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { PaediatricSchema } from "./validation";

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
        <h2 className="text-xl font-semibold">Research</h2>
        <hr className="my-4" />
      </div>
      
      {/* Research & Publications */}
      <div className="space-y-4">
        {/* <h3 className="text-sm font-medium text-gray-800">Research & Publications</h3> */}

        {/* Scientific Papers Published (full width) */}
        {/* <div>
          <Textarea
            id="scientificPapersPublished"
            {...register('scientificPapersPublished')}
            placeholder="Scientific Papers Published - Please list titles of published research or papers"
            rows={4}
            className="bg-white"
          />
        </div> */}

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

      {/* Personal & Family Information block removed to keep this section strictly research-focused */}
    </div>
  );
} 