import { 
  HeartMedical, 
  Emergency, 
  BrainMedical, 
  Orthopedics,
  MedicationBottle,
  Stethoscope,
  BrainScan,
  Surgery,
  Obstetrics,
  Dermatology,
  LungsMedical,
  MedicalChart
} from "@/components/atom/icons";
import { ComponentType } from "react";

export const hospitalDepartments = [
  {
    id: 1,
    name: "CARDIO",
    description: "Cardiology, Heart and cardiovascular care",
    icon: HeartMedical,
  },
  {
    id: 2,
    name: "EMERG",
    description: "Emergency Department, 24/7 emergency medical services",
    icon: Emergency,
  },
  {
    id: 3,
    name: "NEURO",
    description: "Neurology, Brain and nervous system care",
    icon: BrainMedical,
  },
  {
    id: 4,
    name: "ORTHO",
    description: "Orthopedics, Bone and joint specialists",
    icon: Orthopedics,
  },
  {
    id: 5,
    name: "PEDS",
    description: "Pediatrics, Children's healthcare services",
    icon: MedicationBottle,
  },
  {
    id: 6,
    name: "ONCO",
    description: "Oncology, Cancer treatment and care",
    icon: Stethoscope,
  },
  {
    id: 7,
    name: "RADIO",
    description: "Radiology, Medical imaging services",
    icon: BrainScan,
  },
  {
    id: 8,
    name: "SURGERY",
    description: "Surgery, Surgical procedures and care",
    icon: Surgery,
  },
  {
    id: 9,
    name: "OB/GYN",
    description: "Obstetrics and Gynecology, Maternity and women's health",
    icon: Obstetrics,
  },
  {
    id: 10,
    name: "DERM",
    description: "Dermatology, Skin and cosmetic care",
    icon: Dermatology,
  },
  {
    id: 11,
    name: "PSYCH",
    description: "Psychiatry, Mental health services",
    icon: LungsMedical,
  },
  {
    id: 12,
    name: "LAB",
    description: "Laboratory, Medical tests and diagnostics",
    icon: MedicalChart,
  },
];

export type Department = {
  id: number;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string; width?: number; height?: number }>;
};
