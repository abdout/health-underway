"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export function Header1() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-semibold">MediCare</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="text-gray-600 hover:text-primary">Services</Link>
            <Link href="#" className="text-gray-600 hover:text-primary">Doctors</Link>
            <Link href="#" className="text-gray-600 hover:text-primary">About</Link>
            <Link href="#" className="text-gray-600 hover:text-primary">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Sign In</Button>
            <Button>Book Appointment</Button>
          </div>
        </div>
      </div>
    </header>
  );
}