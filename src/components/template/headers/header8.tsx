"use client";

import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header8() {
  return (
    <header className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="flex items-center">
            <Shield className="h-10 w-10 text-indigo-400" />
            <div className="ml-3">
              <h1 className="text-2xl font-bold">SafeHealth</h1>
              <p className="text-indigo-400 text-sm">Protecting Your Wellbeing</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-4 md:space-y-0">
            <nav className="flex items-center md:mr-8 space-x-6">
              <a href="#" className="text-indigo-200 hover:text-white">Home</a>
              <a href="#" className="text-indigo-200 hover:text-white">Services</a>
              <a href="#" className="text-indigo-200 hover:text-white">About</a>
              <Badge variant="secondary" className="bg-indigo-800 text-indigo-200">
                COVID-19 Info
              </Badge>
            </nav>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-white hover:bg-indigo-800">
                Sign In
              </Button>
              <Button className="bg-white text-indigo-900 hover:bg-indigo-100">
                Emergency Care
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}