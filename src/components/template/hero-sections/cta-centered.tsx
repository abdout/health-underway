import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

export function CTACenteredHero() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Health Journey
            <span className="text-blue-600"> Starts Here</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Schedule your appointment today and take the first step towards better health.
            Our team of medical professionals is ready to provide you with exceptional care.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2">
              <Calendar className="h-5 w-5" />
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Phone className="h-5 w-5" />
              Call Now
            </Button>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6 text-sm">
            <div className="flex items-center gap-x-2">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span>Available 24/7</span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <span>Expert Doctors</span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="h-3 w-3 rounded-full bg-purple-400" />
              <span>Emergency Care</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}