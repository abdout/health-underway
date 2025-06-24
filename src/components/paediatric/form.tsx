'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paediatricSchema } from "./validation";
import type { PaediatricSchema } from "./validation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FormProps {
  type: "create" | "update";
  data?: PaediatricSchema;
}

const Form = ({ type, data }: FormProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaediatricSchema>({
    resolver: zodResolver(paediatricSchema),
    defaultValues: data,
    mode: 'onChange'
  });

  const onSubmit = (formData: PaediatricSchema) => {
    console.log('Form submitted:', formData);
    toast.success('Form submitted successfully');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sudanese Paediatric Doctors Data Collection
          </CardTitle>
          <CardDescription className="text-center">
            June July 2025 - Complete your professional profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="fullNameEnglish">Full Name in English *</Label>
              <Input
                id="fullNameEnglish"
                {...register('fullNameEnglish')}
                placeholder="Enter your full name in English"
              />
              {errors.fullNameEnglish && (
                <p className="text-red-500 text-sm">{errors.fullNameEnglish.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="fullNameArabic">Full Name in Arabic *</Label>
              <Input
                id="fullNameArabic"
                {...register('fullNameArabic')}
                placeholder="Enter your full name in Arabic"
                className="text-right"
              />
              {errors.fullNameArabic && (
                <p className="text-red-500 text-sm">{errors.fullNameArabic.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="personalEmail">Personal Email *</Label>
              <Input
                id="personalEmail"
                type="email"
                {...register('personalEmail')}
                placeholder="Enter personal email"
              />
              {errors.personalEmail && (
                <p className="text-red-500 text-sm">{errors.personalEmail.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Submitting...' : `${type === "create" ? "Submit" : "Update"} Information`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
