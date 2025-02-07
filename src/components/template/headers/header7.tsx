"use client";

import { Button } from "@/components/ui/button";
import { HeartPulse as Pulse } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header7() {
  return (
    <header className="bg-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Pulse className="h-8 w-8 text-teal-600" />
            <span className="ml-2 text-2xl font-bold text-teal-900">LifeCare</span>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-teal-600 hover:text-teal-800">Home</a>
            <a href="#" className="text-teal-600 hover:text-teal-800">Services</a>
            <a href="#" className="text-teal-600 hover:text-teal-800">Doctors</a>
            <a href="#" className="text-teal-600 hover:text-teal-800">About</a>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Schedule Visit
            </Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <a href="#" className="text-teal-600 hover:text-teal-800">Home</a>
                <a href="#" className="text-teal-600 hover:text-teal-800">Services</a>
                <a href="#" className="text-teal-600 hover:text-teal-800">Doctors</a>
                <a href="#" className="text-teal-600 hover:text-teal-800">About</a>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Schedule Visit
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}