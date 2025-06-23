"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactSchema, ContactSchema } from "./validation";
import { createContact, updateContact } from "./action";
import { useActionState } from "react";
import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FaPhone, FaWhatsapp, FaTwitter, FaFacebook, FaLinkedin, FaTelegram, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useFormContext } from '@/components/onboarding/form-context';
import { getNextRoute } from '../utils';
import { SuccessToast, ErrorToast, showValidationErrorToast } from '@/components/atom/toast';

type ContactField = keyof Omit<ContactSchema, 'id'>;

const tabsData: Array<{icon: React.ReactElement, name: ContactField, label: string, placeholder: string, showOnMobile?: boolean}> = [
  // { icon: <FaTiktok className="w-24 h-24" />, name: 'tiktok', label: 'TikTok', placeholder: '@username' },
  // { icon: <FaInstagram className="w-24 h-24" />, name: 'instagram', label: 'Instagram', placeholder: '@username' },
  { icon: <FaLinkedin className="w-24 h-24" />, name: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username', showOnMobile: false },
  { icon: <FaFacebook className="w-40 h-40" />, name: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/username', showOnMobile: false },
  { icon: <FaTwitter className="w-28 h-28" />, name: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/username', showOnMobile: true },
  { icon: <FaTelegram className="w-28 h-28" />, name: 'telegram', label: 'Telegram', placeholder: '@username', showOnMobile: true },
  { icon: <FaWhatsapp className="w-28 h-28" />, name: 'whatsapp', label: 'WhatsApp', placeholder: '+1234567890', showOnMobile: true },
  { icon: <FaPhone className="w-28 h-28" />, name: 'phone', label: 'Phone', placeholder: '+1234567890', showOnMobile: true },
];

const ContactForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: ContactSchema;
}) => {
  const { formRef, setCurrentFormId } = useFormContext();
  const [activeTab, setActiveTab] = useState<string>("phone");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: data || {
      phone: '',
      whatsapp: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      telegram: '',
      instagram: '',
      tiktok: '',
    }
  });

  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(
    type === "create" ? createContact : updateContact,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((formData) => {
    // Ensure all fields have at least empty string values
    const data = {
      phone: formData.phone || '',
      whatsapp: formData.whatsapp || '',
      twitter: formData.twitter || '',
      facebook: formData.facebook || '',
      linkedin: formData.linkedin || '',
      telegram: formData.telegram || '',
      instagram: formData.instagram || '',
      tiktok: formData.tiktok || '',
      id: formData.id
    };

    // Save to localStorage for step navigation tracking
    localStorage.setItem('contactFormData', JSON.stringify(data));

    startTransition(() => {
      formAction(data);
    });
  }, (errors) => {
    // Show error toast for validation errors
    if (errors.phone) {
      showValidationErrorToast(errors.phone.message || "Phone number is required");
    } else if (errors.whatsapp) {
      showValidationErrorToast(errors.whatsapp.message || "Additional contact method is required");
    }
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (state.success) {
      // Show success toast using the centralized component
      SuccessToast();
      
      // Navigate to next route with slight delay
      setTimeout(() => {
        router.push(getNextRoute(pathname));
      }, 300);
    } else if (state.error) {
      ErrorToast("Failed to save data");
    }
  }, [state, router, pathname]);

  useEffect(() => {
    setCurrentFormId('contact');
  }, [setCurrentFormId]);

  return (
    <form 
      ref={formRef} 
      className="w-full flex flex-col p-2"
      
      onSubmit={onSubmit}
    >
      {data?.id && (
        <input type="hidden" {...register('id')} defaultValue={data.id} />
      )}

      <Tabs 
        defaultValue="phone" 
        
        onValueChange={(value) => setActiveTab(value)}
      >
        {tabsData.map(({ name, label, placeholder }) => (
          <TabsContent key={name} value={name}>
            <Card className='shadow-none border-none'>
              <CardContent>
                <Label className="flex items-center gap-2 py-2">
                  {label}
                </Label>
                <Input
                  id={name}
                  {...register(name)}
                  defaultValue={data?.[name] || ''}
                  placeholder={placeholder}
                  aria-invalid={errors[name] ? "true" : "false"}
                  className="w-full items-center justify-center border rounded-md"
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
        <div className="flex items-center justify-center mb-4">
          <TabsList className="grid grid-cols-4 md:grid-cols-6 items-center justify-center gap-2 md:gap-1 bg-transparent">
            {tabsData.slice().reverse().map(({ icon, name, showOnMobile }) => (
              <TabsTrigger 
                key={name} 
                value={name} 
                className={` flex justify-center items-center   ${!showOnMobile ? 'hidden md:flex' : ''}`}
              >
                {React.cloneElement(icon as React.ReactElement<{className?: string}>, {
                  className: `transition-colors transform hover:scale-110 ${activeTab === name ? 'text-primary scale-110' : 'text-muted-foreground hover:text-primary'} focus:bg-transparent active:bg-transparent`
                })}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
      
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      
      <Button type="submit" className="hidden w-full mt-8" disabled={isPending}>
        {isPending ? "Saving..." : type === "create" ? "Create" : "Update"}
      </Button>

      <button 
        id="submit-contact" 
        type="submit" 
        className="hidden"
      />
    </form>
  );
};

export default ContactForm;