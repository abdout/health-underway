"use client";

import { Doctor } from "./constant";
import Image from "next/image";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="flex flex-col space-y-2">
      {/* Doctor Image */}
      <div className="w-60 h-50 bg-gray-200 flex items-center justify-center">
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={240}
          height={160}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const initials = doctor.name.split(' ').map(n => n[0]).join('');
            target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold text-2xl">${initials}</div>`;
          }}
        />
      </div>

      {/* Name */}
      <h3 className="text-base font-black text-gray-900 tracking-wide text-start">
        {doctor.name}
      </h3>

      {/* Description */}
      <p className="text-xs font-medium text-gray-600 leading-relaxed text-start">
        {doctor.description}
      </p>
    </div>
  );
} 