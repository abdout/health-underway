"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function VideoBackgroundHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/hero-video.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gray-900/70" />
      <div className="relative h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40"
        >
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className=" max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Revolutionary Healthcare for the Digital Age
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Combining cutting-edge technology with compassionate care to deliver
              the future of healthcare today. Experience medical excellence reimagined.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Video
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}