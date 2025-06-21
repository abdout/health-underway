"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { AppointmentWithPatient } from "@/lib/actions/patient-type";

interface PatientDashboardProps {
  userId: string;
  patientId: string;
  appointments: AppointmentWithPatient[];
}

export function PatientDashboard({ 
  userId, 
  patientId, 
  appointments 
}: PatientDashboardProps) {
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentWithPatient[]>([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentWithPatient[]>([]);

  useEffect(() => {
    const now = new Date();
    const upcoming = appointments.filter(apt => 
      new Date(apt.schedule) > now && apt.status !== "cancelled"
    );
    const past = appointments.filter(apt => 
      new Date(apt.schedule) <= now || apt.status === "cancelled"
    );

    setUpcomingAppointments(upcoming);
    setPastAppointments(past);
  }, [appointments]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
          <p className="text-muted-foreground">
            Manage your healthcare appointments and view your medical schedule
          </p>
        </div>
        <Button asChild className="shad-primary-btn">
          <Link href={`/patients/${userId}/new-appointment`}>
            <Plus className="h-4 w-4 mr-2" />
            Book New Appointment
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {upcomingAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Scheduled appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {appointments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              All appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {pastAppointments.filter(apt => apt.status === "scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Past appointments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Dr. {appointment.primaryPhysician}
                    </CardTitle>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(appointment.schedule).dateTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Reason:</strong> {appointment.reason}
                  </p>
                  {appointment.note && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Notes:</strong> {appointment.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any scheduled appointments yet.
              </p>
              <Button asChild>
                <Link href={`/patients/${userId}/new-appointment`}>
                  Book Your First Appointment
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
        {pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.slice(0, 5).map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {formatDateTime(appointment.schedule).dateOnly}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(appointment.schedule).timeOnly}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Dr. {appointment.primaryPhysician}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.reason}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={appointment.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
            {pastAppointments.length > 5 && (
              <Card>
                <CardContent className="text-center py-4">
                  <Button variant="outline">
                    View All Past Appointments ({pastAppointments.length - 5} more)
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No past appointments found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 