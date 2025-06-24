'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Qualifications } from "@/components/paediatric/qualifications";
import { Subspecialty } from "@/components/paediatric/subspecialty";
import { toast } from "sonner";

// Simple schema for testing
const simpleSchema = z.object({
  fullNameEnglish: z.string().min(2, "Name is required"),
  personalEmail: z.string().email("Valid email required"),
  qualifications: z.array(z.string()).min(1, "Select at least one qualification"),
  paediatricsSubspecialty: z.array(z.string()).min(1, "Select at least one subspecialty"),
});

type SimpleSchema = z.infer<typeof simpleSchema>;

export default function SimplePaediatricPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SimpleSchema>({
    resolver: zodResolver(simpleSchema),
    defaultValues: {
      qualifications: [],
      paediatricsSubspecialty: [],
    },
  });

  const onSubmit = (data: SimpleSchema) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");
    toast.info(`Selected ${data.qualifications.length} qualifications and ${data.paediatricsSubspecialty.length} subspecialties`);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl font-bold text-center">
              Simple Paediatric Form Test
            </CardTitle>
            <CardDescription className="text-center text-blue-100">
              Testing MultiSelect functionality
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div>
                <Label htmlFor="fullNameEnglish" className="text-base font-medium">
                  Full Name *
                </Label>
                <Input
                  id="fullNameEnglish"
                  {...register('fullNameEnglish')}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
                {errors.fullNameEnglish && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullNameEnglish.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="personalEmail" className="text-base font-medium">
                  Email *
                </Label>
                <Input
                  id="personalEmail"
                  type="email"
                  {...register('personalEmail')}
                  placeholder="Enter your email"
                  className="mt-2"
                />
                {errors.personalEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalEmail.message}</p>
                )}
              </div>

              <div>
                <Qualifications 
                  value={watch("qualifications")} 
                  onChange={(qualifications: string[]) => setValue("qualifications", qualifications)} 
                />
                {errors.qualifications && (
                  <p className="text-red-500 text-sm mt-1">{errors.qualifications.message}</p>
                )}
              </div>

              <div>
                <Subspecialty 
                  value={watch("paediatricsSubspecialty")} 
                  onChange={(subspecialty: string[]) => setValue("paediatricsSubspecialty", subspecialty)} 
                />
                {errors.paediatricsSubspecialty && (
                  <p className="text-red-500 text-sm mt-1">{errors.paediatricsSubspecialty.message}</p>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Submit Test Form
                </Button>
              </div>

              {/* Debug info */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">Debug Info:</h3>
                <p><strong>Qualifications:</strong> {JSON.stringify(watch("qualifications"))}</p>
                <p><strong>Subspecialties:</strong> {JSON.stringify(watch("paediatricsSubspecialty"))}</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 