"use client";

import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header6() {
  return (
    <header className="bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="flex items-center">
            <HeartPulse className="h-10 w-10 text-purple-600" />
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-purple-900">WellnessPro</h1>
              <Badge variant="secondary" className="bg-purple-200 text-purple-700">
                Trusted Healthcare
              </Badge>
            </div>
          </div>
          <nav className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-6">
              <a href="#" className="text-purple-600 hover:text-purple-800">Services</a>
              <a href="#" className="text-purple-600 hover:text-purple-800">Specialists</a>
              <a href="#" className="text-purple-600 hover:text-purple-800">Resources</a>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="border-purple-600 text-purple-600">
                Patient Login
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Book Appointment
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}