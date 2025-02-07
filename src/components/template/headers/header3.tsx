"use client";

import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header3() {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Activity className="h-8 w-8 text-emerald-500" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
              VitalCare
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-600 hover:text-emerald-500">
                Our Services
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Preventive Care</DropdownMenuItem>
                <DropdownMenuItem>Chronic Care</DropdownMenuItem>
                <DropdownMenuItem>Mental Health</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-gray-600 hover:text-emerald-500">
              Patient Portal
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-emerald-500">
              Insurance
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
              Schedule Visit
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}