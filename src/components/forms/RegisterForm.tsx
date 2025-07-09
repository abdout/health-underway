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

import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { registerPatient } from "@/lib/actions/patient";

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
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Information</h2>
          </div>
          {/* NAME, EMAIL & PHONE in one row */}
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1">
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Full Name"
              />
            </div>
            <div className="flex-1">
              <Input
                id="email"
                {...form.register("email")}
                placeholder="Email address"
                type="email"
              />
            </div>
            <div className="flex-1">
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="Phone Number"
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
          {/* Emergency Contact Name & Emergency Contact Number in one row */}
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1">
              <Input
                id="emergencyContactName"
                {...form.register("emergencyContactName")}
                placeholder="Emergency contact name"
              />
            </div>
            <div className="flex-1">
              <Input
                id="emergencyContactNumber"
                {...form.register("emergencyContactNumber")}
                placeholder="Emergency contact number"
                type="tel"
              />
            </div>
          </div>
        </section>
      ),
    },
    {
      label: "Medical",
      content: (
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical</h2>
          </div>
          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
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
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>
          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 md:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>
          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 md:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>
      ),
    },
    {
      label: "Identification",
      content: (
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>
      ),
    },
    {
      label: "Consent",
      content: (
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health\n            information for treatment purposes."
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the\n            privacy policy"
          />
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
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender as Gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
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
      <form
        onSubmit={(e) => {
          console.log("📋 [RegisterForm] Form submit event triggered");
          console.log("📋 [RegisterForm] Event:", e);
          console.log("📋 [RegisterForm] Current form values:", form.getValues());
          console.log("📋 [RegisterForm] Form validation state:", {
            isValid: form.formState.isValid,
            errors: form.formState.errors,
            isSubmitting: form.formState.isSubmitting
          });
          
          return form.handleSubmit(
            (data) => onSubmit(data),
            (errors) => {}
          )(e);
        }}
        className="flex-1 space-y-12"
      >
        {formSections[step].content}
        <div className="flex justify-between pt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          {step < formSections.length - 1 ? (
            <Button type="button" onClick={() => setStep((s) => Math.min(formSections.length - 1, s + 1))}>
              Next
            </Button>
          ) : (
            <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            )}
          </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
