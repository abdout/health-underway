"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/atom/simple-marquee";

export function LogoCloud() {
  return (
    <div className="h-[20rem] rounded-md flex antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={certificates}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const certificates = [
  {
    image: "/cert/planetree.png",
    name: "Planetree",
    title: "International Patient Experience Accreditation",
    size: "w-[140px] h-[120px]",
  },
  {
    image: "/cert/cap.png",
    name: "CAP",
    title: "International Laboratory Services Accreditation",
    size: "w-[120px] h-[120px]",
  },
  {
    image: "/cert/radiology.png",
    name: "Radiology Excellence",
    title: "Center of Excellence in Radiology",
    size: "w-[40px] h-[120px]",
  },
  {
    image: "/cert/himss.png",
    name: "HIMSS",
    title: "Electronic Health Record Accreditation",
    size: "w-[150px] h-[120px]",
  },
  {
    image: "/cert/aabb.png",
    name: "AABB",
    title: "Blood and Biotherapies Advancement",
    size: "w-[140px] h-[120px]",
  },
  {
    image: "/cert/ancc.png",
    name: "ANCC",
    title: "American Nurses Credentialing Center",
    size: "w-[90px] h-[120px]",
  },
  {
    image: "/cert/cbahi.png",
    name: "CBAHI",
    title: "Saudi National Accreditation Body",
    size: "w-[110px] h-[120px]",
  },
  {
    image: "/cert/heart.png",
    name: "American Heart Association",
    title: "Cardiovascular Excellence",
    size: "w-[130px] h-[120px]",
  },
  {
    image: "/cert/achsi.png",
    name: "ACHSI",
    title: "Australian Council on Healthcare Standards",
    size: "w-[120px] h-[120px]",
  },
  {
    image: "/cert/sigma.png",
    name: "Sigma",
    title: "Alpha Gamma Delta Excellence",
    size: "w-[90px] h-[120px]",
  },
];
