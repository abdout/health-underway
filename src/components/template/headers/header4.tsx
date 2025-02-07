"use client";

import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header4() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <Stethoscope className="h-10 w-10 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">DocConnect</h1>
              <p className="text-sm text-blue-400">Your Health, Our Priority</p>
            </div>
          </div>
          <nav className="flex items-center mt-4 md:mt-0 space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Doctors</a>
              <Badge variant="secondary" className="bg-blue-500">24/7 Support</Badge>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}