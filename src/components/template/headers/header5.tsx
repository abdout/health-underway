"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header5() {
  return (
    <header className="bg-white">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <PlusCircle className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold">MedExpress</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-500">Emergency: </span>
              <span className="text-red-500 font-semibold">1-800-MED-HELP</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-96">
            <Input type="search" placeholder="Search for services, doctors..." />
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-red-500">Find Care</a>
            <a href="#" className="text-gray-600 hover:text-red-500">Services</a>
            <a href="#" className="text-gray-600 hover:text-red-500">Locations</a>
            <Button className="bg-red-500 hover:bg-red-600">Book Now</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}