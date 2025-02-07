"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "The care I received was exceptional. The staff was professional and caring.",
    author: "Sarah Johnson",
    role: "Patient",
    rating: 5,
  },
  {
    content: "State-of-the-art facilities and extremely knowledgeable doctors.",
    author: "Michael Chen",
    role: "Patient",
    rating: 5,
  },
  {
    content: "They made me feel comfortable and well-cared for throughout my treatment.",
    author: "Emily Davis",
    role: "Patient",
    rating: 5,
  },
];

export function TestimonialHero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8"
        >
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Trusted by Thousands of Satisfied Patients
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our commitment to excellence in healthcare has earned us the trust and
            confidence of patients across the region. Read their stories below.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg">Book Appointment</Button>
            <Button variant="outline" size="lg">View Services</Button>
          </div>
        </motion.div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="flex flex-col justify-between p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}