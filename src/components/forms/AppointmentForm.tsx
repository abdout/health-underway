// src/components/forms/AppointmentForm.tsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/components/patient/validation";
import { Appointment, Status } from "@prisma/client";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import ReactDatePicker from "react-datepicker";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import {
  CreateAppointmentParams,
  UpdateAppointmentParams,
} from "@/lib/actions/type";

type AppointmentFormType = "create" | "schedule" | "cancel";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: AppointmentFormType;
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status: Status;
    switch (type) {
      case "schedule":
        status = Status.scheduled;
        break;
      case "cancel":
        status = Status.cancelled;
        break;
      default:
        status = Status.pending;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData: CreateAppointmentParams = {
          userId,
          patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status,
          note: values.note || "", // Ensure note is always a string
        };

        const newAppointment = await createAppointment(appointmentData);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.id}`
          );
        }
      } else if (type === "schedule" || type === "cancel") {
        const appointmentToUpdate: UpdateAppointmentParams = {
          userId,
          appointmentId: appointment?.id!,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Book";
  }

  return (
    <Form {...form}>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-8 py-8">
            {/* Header Section (left) */}
        {type === "create" && (
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="header">Appointment</h1>
                <p className="text-dark-700 mt-2">
              Request a new appointment in 10 seconds.
            </p>
              </div>
        )}
            {/* Form Fields Section (right) */}
            <div className="flex-1 space-y-6">
              {(type === "create" || type === "schedule") && (
          <>
                  {/* Doctor Select */}
                  <FormField
              control={form.control}
              name="primaryPhysician"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Doctor - Select a doctor" />
                            </SelectTrigger>
                            <SelectContent>
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                                  <div className="flex items-center gap-2">
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
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date Picker */}
                  <FormField
              control={form.control}
              name="schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex rounded-md border border-dark-500 bg-dark-400 items-center">
                            <Image
                              src="/assets/icons/calendar.svg"
                              height={24}
                              width={24}
                              alt="calendar"
                              className="ml-2"
                            />
                            <ReactDatePicker
              showTimeSelect
                              selected={field.value}
                              onChange={(date: Date | null) => field.onChange(date)}
                              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy  -  h:mm aa"
                              wrapperClassName="date-picker"
                              className="bg-transparent border-0 focus:ring-0 focus:border-0 px-2 py-2 w-full"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
            />

                  <div className={`flex flex-col gap-6  ${type === "create" ? "xl:flex-row" : ""}`}>
                    {/* Reason */}
                    <FormField
                control={form.control}
                name="reason"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Textarea
                              placeholder="Appointment reason - Annual monthly check-up"
                              {...field}
                disabled={type === "schedule"}
                              className="shad-textArea"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Note */}
                    <FormField
                control={form.control}
                name="note"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Textarea
                              placeholder="Comments/notes - Prefer afternoon appointments, if possible"
                              {...field}
                disabled={type === "schedule"}
                              className="shad-textArea"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
              />
            </div>
          </>
        )}

              {type === "cancel" ? (
                <FormField
            control={form.control}
            name="cancellationReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Reason for cancellation - Urgent meeting came up"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
            </div>
          </div>
          {/* Sticky button bar at bottom */}
          <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none">
            <div className="max-w-4xl w-full mx-auto bg-background border-t border-border py-4 flex flex-col items-end pointer-events-auto">
        <SubmitButton
          isLoading={isLoading}
                className={`$${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
                } w-20`}
        >
          {buttonLabel}
        </SubmitButton>
            </div>
          </div>
      </form>
      </div>
    </Form>
  );
};
