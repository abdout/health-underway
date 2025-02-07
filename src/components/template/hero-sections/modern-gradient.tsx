"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModernGradientHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-8" />
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Modern Healthcare
            <span className="text-blue-600"> for Everyone</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience healthcare reimagined. Our innovative approach combines cutting-edge technology
            with compassionate care to provide you with the best medical services possible.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="rounded-full">
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-purple-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </motion.div>
    </div>
  );
}