"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Gender, User } from "@prisma/client";

import { PatientFormValidation } from "@/components/patient/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { registerPatient } from "@/components/patient/action";
import { HelpCircle, Bookmark } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type RegisterUserParams = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: "Male" | "Female";
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string | null;
  currentMedication?: string | null;
  familyMedicalHistory?: string | null;
  pastMedicalHistory?: string | null;
  identificationType?: string | null;
  identificationNumber?: string | null;
  identificationDocument?: File | null;
  privacyConsent: boolean;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
};

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    },
  });

  const formSections = [
    {
      label: "Information",
      content: (
        <section className="grid grid-cols-2 ">
          {/* Title column */}
          <div className="flex flex-col justify-start space-y-2">
            <h2 className="">Information</h2>
            <p className="max-w-sm">This information request one time only. You can fill in more information later</p>
          </div>
          {/* Form fields column */}
          <div className="flex-1 space-y-6">
            {/* NAME, EMAIL & PHONE in one row */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Name"
                />
              </div>
              <div className="flex-1">
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="Phone"
                  type="tel"
                />
              </div>
            </div>
            {/* BirthDate & Gender in one row */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <Input
                  id="birthDate"
                  {...form.register("birthDate")}
                  placeholder="Date of birth"
                  type="date"
                />
              </div>
              <div className="flex-1">
                <Select
                  value={form.watch("gender")}
                  onValueChange={val => form.setValue("gender", val as any)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GenderOptions.map((option, i) => (
                      <SelectItem key={option + i} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Address & Occupation in one row */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <Input
                  id="address"
                  {...form.register("address")}
                  placeholder="Address"
                />
              </div>
              <div className="flex-1">
                <Input
                  id="occupation"
                  {...form.register("occupation")}
                  placeholder="Occupation"
                />
              </div>
            </div>
          </div>
        </section>
      ),
    },
    {
      label: "Medical",
      content: (
        <section className="grid grid-cols-2 -mb-10">
          {/* Title column */}
          <div className="flex flex-col justify-start space-y-2">
            <h2 className="">Medical</h2>
            <p className="max-w-sm">This information request one time only. You can fill in more information later</p>
          </div>
          {/* Form fields column */}
          <div className="flex-1 space-y-6">
            {/* PRIMARY CARE PHYSICIAN */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              placeholder="Primary care physician"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            {/* INSURANCE & POLICY NUMBER */}
            <div className="flex flex-col gap-6 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                placeholder="Insurance provider"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                placeholder="Insurance policy number"
              />
            </div>
            {/* ALLERGY & CURRENT MEDICATIONS */}
            <div className="flex flex-col gap-6 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                placeholder="Allergies (if any)"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                placeholder="Current medications"
              />
            </div>
            {/* FAMILY MEDICATION & PAST MEDICATIONS */}
            <div className="flex flex-col gap-6 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                placeholder="Family medical history (if relevant)"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                placeholder="Past medical history"
              />
            </div>
            {/* CONSENT CHECKBOXES */}
            {/* <div className="space-y-4 pt-8">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="treatmentConsent"
                placeholder="I consent to receive treatment for my health condition."
              />
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="disclosureConsent"
                placeholder="I consent to the use and disclosure of my health information for treatment purposes."
              />
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="privacyConsent"
                placeholder="I acknowledge that I have reviewed and agree to the privacy policy"
              />
            </div> */}
          </div>
        </section>
      ),
    },
  ];

  // Add form state logging
  console.log("📝 [RegisterForm] Form errors:", form.formState.errors);
  console.log("📝 [RegisterForm] Form isValid:", form.formState.isValid);
  console.log("📝 [RegisterForm] Form isSubmitting:", form.formState.isSubmitting);

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    console.log("🚀 [RegisterForm] onSubmit started");
    console.log("📝 [RegisterForm] Form values:", values);
    console.log("👤 [RegisterForm] User:", user);
    
    setIsLoading(true);

    let file: File | null = null;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      file = values.identificationDocument[0];
      console.log("📎 [RegisterForm] File selected:", file?.name, file?.size);
    } else {
      console.log("📎 [RegisterForm] No file selected");
    }

    try {
      console.log("🔄 [RegisterForm] Creating patient data object...");
      
      const patient: RegisterUserParams = {
        userId: user.id, // Changed from user.$id to user.id
        name: values.name ?? "",
        email: values.email ?? "",
        phone: values.phone ?? "",
        birthDate: new Date(values.birthDate),
        gender: values.gender as Gender,
        address: values.address ?? "",
        occupation: values.occupation ?? "",
        emergencyContactName: values.emergencyContactName ?? "",
        emergencyContactNumber: values.emergencyContactNumber ?? "",
        primaryPhysician: values.primaryPhysician ?? "",
        insuranceProvider: values.insuranceProvider ?? "",
        insurancePolicyNumber: values.insurancePolicyNumber ?? "",
        allergies: values.allergies ?? null,
        currentMedication: values.currentMedication ?? null,
        familyMedicalHistory: values.familyMedicalHistory ?? null,
        pastMedicalHistory: values.pastMedicalHistory ?? null,
        identificationType: values.identificationType ?? null,
        identificationNumber: values.identificationNumber ?? null,
        identificationDocument: file,
        privacyConsent: values.privacyConsent,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
      };

      console.log("📊 [RegisterForm] Patient data prepared:", patient);
      console.log("🔄 [RegisterForm] Calling registerPatient...");

      const newPatient = await registerPatient(patient);

      console.log("✅ [RegisterForm] registerPatient response:", newPatient);

      if (newPatient) {
        console.log("🔄 [RegisterForm] Patient created successfully, redirecting...");
        console.log("🧭 [RegisterForm] Redirect URL:", `/patients/${user.id}/new-appointment`);
        
        router.push(`/patients/${user.id}/new-appointment`); 
        console.log("✅ [RegisterForm] Router.push called");
      } else {
        console.log("❌ [RegisterForm] newPatient is falsy, no redirect");
      }
    } catch (error) {
      const err = error as Error;
      console.error("❌ [RegisterForm] Error in onSubmit:", err);
      console.error("❌ [RegisterForm] Error stack:", err.stack);
    }

    console.log("🏁 [RegisterForm] Setting loading to false");
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <div className="max-w-4xl mx-auto px-4">
        <form
          onSubmit={(e) => {
            console.log("[DEBUG] form onSubmit event triggered", e);
            console.log("[DEBUG] Current form values:", form.getValues());
            console.log("[DEBUG] Form validation state:", {
              isValid: form.formState.isValid,
              errors: form.formState.errors,
              isSubmitting: form.formState.isSubmitting
            });
            
            return form.handleSubmit(
              (data) => {
                console.log("[DEBUG] form.handleSubmit success", data);
                onSubmit(data);
              },
              (errors) => {
                console.log("[DEBUG] form.handleSubmit errors", errors);
              }
            )(e);
          }}
          className="flex-1 space-y-12 pb-32"
        >
          {formSections[step].content}
          {/* Sticky button bar at bottom - moved inside form for submit to work */}
          <div className="fixed bottom-0 left-0 w-full z-50 bg-background  border-border py-4 flex flex-col items-center shadow-md">
            <div className="max-w-4xl w-full mx-auto px-4">
              {/* Progress bars for each section, as top border */}
              <div className="w-full flex flex-row gap-2 items-center justify-center mb-4">
                <Progress value={step === 0 ? 100 : 0} className="flex-1" />
                <Progress value={step === 1 ? 100 : 0} className="flex-1" />
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {/* Favicon */}
                  <Image src="/favicon.svg" alt="favicon" width={28} height={28} className="opacity-80" />
                  {/* Help Icon */}
                  <HelpCircle className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" aria-label="Help" />
                  {/* Bookmark Icon (label/marker style) */}
                  <Bookmark className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" aria-label="Label" />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="w-20"
                  >
                    Back
                  </Button>
                  {step < formSections.length - 1 ? (
                    <SubmitButton
                      isLoading={false}
                      type="button"
                      className="w-20"
                      onClick={() => {
                        console.log("[DEBUG] Next button clicked");
                        setStep((s) => Math.min(formSections.length - 1, s + 1));
                      }}
                    >
                      Next
                    </SubmitButton>
                  ) : (
                    <SubmitButton
                      isLoading={isLoading}
                      className="w-20"
                    >
                      Submit
                    </SubmitButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default RegisterForm;
