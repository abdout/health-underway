import Link from "next/link";
import { redirect } from "next/navigation";
import { Calendar, Clock, User, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { auth } from "@/auth";
import { getPatient } from "@/lib/actions/patient";

export default async function PatientAppointmentPage() {
  const session = await auth();
  const user = session?.user;
  
  if (!user) {
    redirect("/login?callbackUrl=/patient/appointment");
  }

  // Check if user has a patient profile
  const patient = user && user.id ? await getPatient(user.id) : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Book Your Appointment
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Schedule a consultation with our experienced healthcare professionals. 
          Choose from available time slots and get the care you need.
        </p>
        <p className="text-sm text-muted-foreground">
          Welcome back, <span className="font-medium">{user.name}</span>
        </p>
      </div>

      {/* Patient Registration Alert */}
      {!patient && (
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            You need to complete your patient registration before booking appointments.
            <Button asChild variant="link" className="h-auto p-0 ml-2 text-amber-700 underline">
              <Link href={`/appointments/patients/${user.id}/register`}>
                Complete Registration
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>New Appointment</CardTitle>
            <CardDescription>
              Schedule a new consultation with our doctors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {patient ? (
              <Button asChild className="w-full">
                <Link href={`/appointments/patients/${user.id}/new-appointment`}>
                  Book Now
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full">
                <Link href={`/appointments/patients/${user.id}/register`}>
                  Register First
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <CardTitle>View Appointments</CardTitle>
            <CardDescription>
              Check your upcoming and past appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <User className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle>Emergency</CardTitle>
            <CardDescription>
              Need immediate medical attention?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full">
              Emergency Contact
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Information Section */}
      <div className="bg-muted/50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          How It Works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold mb-2">Choose Your Doctor</h3>
            <p className="text-sm text-muted-foreground">
              Select from our qualified healthcare professionals
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold mb-2">Pick Date & Time</h3>
            <p className="text-sm text-muted-foreground">
              Choose from available slots that fit your schedule
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold mb-2">Get Confirmation</h3>
            <p className="text-sm text-muted-foreground">
              Receive instant confirmation and reminders
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
        <p className="text-muted-foreground mb-4">
          Our support team is available 24/7 to assist you
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            FAQ
          </Button>
          <Button variant="outline">
            Live Chat
          </Button>
        </div>
      </div>
    </div>
  );
} 