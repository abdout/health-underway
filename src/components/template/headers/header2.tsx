"use client";

import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header2() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Navigation className="h-8 w-8 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">HealthHub</span>
          </div>
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-8">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink href="#">Primary Care</NavigationMenuLink>
                    <NavigationMenuLink href="#">Specialists</NavigationMenuLink>
                    <NavigationMenuLink href="#">Emergency Care</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-white" href="#">Find a Doctor</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-white" href="#">Locations</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            Emergency: 911
          </Button>
        </div>
      </div>
    </header>
  );
}