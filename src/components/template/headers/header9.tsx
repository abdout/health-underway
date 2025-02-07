"use client";

import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header9() {
  return (
    <header className="bg-gray-50">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Laptop className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">TeleHealth</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-sm text-gray-600">
                Download App
              </Button>
              <Button variant="ghost" className="text-sm text-gray-600">
                Support
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">Virtual Visits</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Doctors</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Prescriptions</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Input 
              type="search" 
              placeholder="Search symptoms..." 
              className="w-64"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}