"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Stethoscope, 
  Heart, 
  Activity, 
  Brain,
  Cross,
  Microscope
} from "lucide-react";

const services = [
  {
    title: "Primary Care",
    icon: Stethoscope,
    color: "text-blue-500",
  },
  {
    title: "Cardiology",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Diagnostics",
    icon: Activity,
    color: "text-green-500",
  },
  {
    title: "Neurology",
    icon: Brain,
    color: "text-purple-500",
  },
  {
    title: "Emergency",
    icon: Cross,
    color: "text-yellow-500",
  },
  {
    title: "Lab Services",
    icon: Microscope,
    color: "text-indigo-500",
  },
];

export function InteractiveCardsHero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Comprehensive Healthcare
              <span className="text-blue-600"> Services</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of medical services designed to meet all your healthcare needs.
              Our expert team provides specialized care across multiple disciplines.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center">
                    <service.icon className={`h-12 w-12 ${service.color} mb-4`} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="lg">Schedule Consultation</Button>
            <Button variant="outline" size="lg">View All Services</Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}