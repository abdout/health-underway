'use client';

import { useState, useTransition, useRef, useEffect } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paediatricSchema } from "./validation";
import type { PaediatricSchema } from "./validation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPaediatricDoctor, updatePaediatricDoctor } from "./action";
import { toast } from "sonner";
import { InformationSection } from "./information";
import { ProfessionalSection } from "./professional";
import { ResearchSection } from "./research";
import SiteHeading from "../atom/site-heading";
import { AttachmentSection } from "./attachment";
import { useRouter } from "next/navigation";
import { QUALIFICATIONS, PAEDIATRIC_SUBSPECIALTIES } from "./constant";

interface FormProps {
  type: "create" | "update";
  data?: PaediatricSchema;
}

const Form = ({ type, data }: FormProps) => {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const form = useForm<PaediatricSchema>({
    resolver: zodResolver(paediatricSchema) as Resolver<PaediatricSchema>,
    defaultValues: data || {
      qualifications: [],
      paediatricsSubspecialty: [],
      skills: [],
      hobbiesOrInterests: [],
      agreeToEmailPublication: false,
      agreeToPhotoPublication: false,
      scientificPapersFiles: [],
    },
    mode: 'onChange'
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset
  } = form;

  // Initialize form with data if provided
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<PaediatricSchema> = (formData) => {
    // Full debug logs for form submission
    if (process.env.NODE_ENV !== "production") {
      console.groupCollapsed("[Paediatric Form] Submit");
      console.log("Type:", type);
      console.log("Payload:", JSON.parse(JSON.stringify(formData)));
      console.groupEnd();
    }
    startTransition(async () => {
      try {
        const action = type === "create" ? createPaediatricDoctor : updatePaediatricDoctor;
        const result = await action({} as any, formData);
        
        if (process.env.NODE_ENV !== "production") {
          console.groupCollapsed("[Paediatric Form] Response");
          console.log(result);
          console.groupEnd();
        }
        
        if (result.success) {
          toast.success(`تم حفظ معلومات الطبيب بنجاح.`);
          router.push("/paediatric/review");
        } else {
          toast.error(result.error || "An error occurred");
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[Paediatric Form] Unexpected error", error);
        }
        toast.error("An unexpected error occurred");
      }
    });
  };

  // Handler to auto-fill form with sample data for testing
  const handleFillTest = () => {
    const sample: Partial<PaediatricSchema> = {
      fullNameEnglish: "Test Doctor",
      fullNameArabic: "طبيب اختبار",
      namePrefix: "doctor",
      stageOfCareer: "trainee",
      placeOfBirth: "sudan",
      dateOfBirth: "1990-01-01",
      originalHomeTownOrVillage: "Omdurman",
      personalEmail: "test@example.com",
      agreeToEmailPublication: true,
      universityOfPrimaryGraduation: "university-of-khartoum",
      countryOfUniversityOfPrimaryGraduation: "sudan",
      yearOfGraduationFromMedicine: "2015",
      qualifications: ["mbbs"],
      paediatricsSubspecialty: ["general_paediatrics"],
      subspecialtyCertified: "yes",
      currentPositionInHospital: "consultant",
      countryOfMajorityPaediatricsTraining: "sudan",
    };

    for (const [key, value] of Object.entries(sample)) {
      // @ts-ignore
      setValue(key, value);
    }

    toast.info("Form filled with test data");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="font-heading">Paediatric Doctor</h1>
        <p className="text-lg">Sudanese Paediatric Doctors Data Collection</p>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-4">
          <Button type="button" variant="outline" size="sm" onClick={handleFillTest}>
            Fill with test data
          </Button>
        </div>
        <Card className="border-none shadow-none">
        
          
          <CardContent className="p-8">
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Attachment Section */}
              <AttachmentSection
                control={control}
                register={register}
                setValue={setValue}
                errors={errors}
                watch={watch}
                data={data}
              />

              {/* Personal Information Section */}
              <InformationSection
                register={register}
                setValue={setValue}
                errors={errors}
                data={data}
              />

              {/* Professional Background Section */}
              <ProfessionalSection
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                data={data}
              />

              {/* Research & Family Section */}
                <ResearchSection
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                data={data}
              />

              {/* Submit Button */}
              <div className="flex justify-center md:justify-start pt-6">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full md:w-auto px-10 py-4"
                >
                  {isPending 
                    ? `${type === "create" ? "Creating" : "Updating"}...` 
                    : `${type === "create" ? "Create" : "Update"} Profile`
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;
