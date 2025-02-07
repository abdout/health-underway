import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

export function MinimalSplitHero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-x-3">
              <Activity className="h-6 w-6 text-blue-600" />
              <h2 className="text-base font-semibold leading-7 text-blue-600">Trusted Healthcare</h2>
            </div>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Health, Our Priority
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We believe in providing accessible, high-quality healthcare services to our community.
              Our team of experienced professionals is dedicated to your well-being.
            </p>
            <div className="mt-8 flex gap-x-6">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">View Services</Button>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Medical professionals"
            className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
          />
        </div>
      </div>
    </div>
  );
}