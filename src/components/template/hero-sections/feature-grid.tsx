import { Button } from "@/components/ui/button";
import { 
 
  Clock, 
  Users, 
  Shield, 
  Stethoscope, 
  
} from "lucide-react";

const features = [
  {
    name: "24/7 Care",
    description: "Round-the-clock medical support",
    icon: Clock,
  },
  {
    name: "Expert Doctors",
    description: "Highly qualified medical professionals",
    icon: Users,
  },
  {
    name: "Safe & Secure",
    description: "Protected health information",
    icon: Shield,
  },
  {
    name: "Modern Equipment",
    description: "State-of-the-art medical technology",
    icon: Stethoscope,
  },
];

export function FeatureGridHero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-blue-600">Your Trusted Healthcare Partner</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Better Approach to Healthcare</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  We're committed to providing exceptional medical care with a focus on patient comfort and advanced treatment methods.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Modern healthcare facility"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  {features.map((feature) => (
                    <li key={feature.name} className="flex gap-x-3">
                      <feature.icon
                        className="mt-1 h-5 w-5 flex-none text-blue-600"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-gray-900">
                          {feature.name}.
                        </strong>{" "}
                        {feature.description}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button size="lg">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}