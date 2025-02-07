"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Plus,
  Activity,
  Thermometer,
  Pill,
  Stethoscope
} from "lucide-react";

const floatingIcons = [
  { Icon: Heart, color: "text-red-500", x: -20, y: -20 },
  { Icon: Plus, color: "text-blue-500", x: 20, y: 20 },
  { Icon: Activity, color: "text-green-500", x: -30, y: 30 },
  { Icon: Thermometer, color: "text-yellow-500", x: 30, y: -30 },
  { Icon: Pill, color: "text-purple-500", x: -40, y: -10 },
  { Icon: Stethoscope, color: "text-indigo-500", x: 40, y: 10 },
];

export function FloatingElementsHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color}`}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            x: [item.x, -item.x, item.x],
            y: [item.y, -item.y, item.y],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: index * 0.5,
          }}
          style={{
            left: `${50 + index * 10}%`,
            top: `${30 + (index % 3) * 20}%`,
          }}
        >
          <item.Icon className="h-8 w-8 sm:h-12 sm:w-12" />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            The Future of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Healthcare{" "}
            </span>
            is Here
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Experience healthcare reimagined with cutting-edge technology and
            compassionate care. Your well-being is our top priority.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}