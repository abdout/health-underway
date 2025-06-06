export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  description: string;
  image: string;
  experience: string;
}

export const hospitalDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialty: "CARDIOLOGY",
    description: "Cardiology specialist with expertise in heart surgery, cardiovascular interventions, and cardiac catheterization. She has performed over 2,000 successful cardiac procedures.",
    image: "/doctor/a.jpeg",
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. Mohammed Hassan",
    specialty: "EMERGENCY",
    description: "Emergency Medicine expert specializing in trauma care, critical emergency procedures, and advanced life support. He leads the emergency response team.",
    image: "/doctor/b.jpeg",
    experience: "12 years",
  },
  {
    id: 3,
    name: "Dr. Fatima Al-Zahra",
    specialty: "NEUROLOGY",
    description: "Neurology specialist focusing on brain disorders, stroke treatment, epilepsy management, and neurodegenerative diseases. Pioneer in Parkinson's disease treatment.",
    image: "/doctor/c.jpeg",
    experience: "18 years",
  },
  {
    id: 4,
    name: "Dr. Omar Khalil",
    specialty: "ORTHOPEDICS",
    description: "Orthopedic surgeon specializing in joint replacement, sports medicine, and complex fracture repair. He has performed over 3,500 joint replacements.",
    image: "/doctor/d.jpeg",
    experience: "14 years",
  },
  {
    id: 5,
    name: "Dr. Aisha Rahman",
    specialty: "PEDIATRICS",
    description: "Pediatrics specialist dedicated to children's healthcare, developmental medicine, and pediatric emergency care. Expert in childhood developmental disorders.",
    image: "/doctor/e.jpeg",
    experience: "16 years",
  },
  {
    id: 6,
    name: "Dr. Yusuf Mansour",
    specialty: "ONCOLOGY",
    description: "Oncology specialist focusing on cancer treatment, chemotherapy protocols, and immunotherapy. Instrumental in developing personalized cancer treatment plans.",
    image: "/doctor/g.jpeg",
    experience: "20 years",
  },
  {
    id: 7,
    name: "Dr. Layla Nasser",
    specialty: "RADIOLOGY",
    description: "Radiology expert specializing in advanced medical imaging, MRI diagnostics, and interventional radiology. Pioneer in AI-assisted imaging diagnostics.",
    image: "/doctor/h.jpeg",
    experience: "11 years",
  },
  {
    id: 8,
    name: "Dr. Khalid Al-Rashid",
    specialty: "SURGERY",
    description: "General surgery specialist with expertise in minimally invasive procedures, laparoscopic surgery, and robotic-assisted operations. Over 4,000 successful surgeries.",
    image: "/doctor/dumbledore.jpeg",
    experience: "22 years",
  },
  {
    id: 9,
    name: "Dr. Maryam Qasim",
    specialty: "OB/GYN",
    description: "Obstetrics and Gynecology specialist focusing on women's health, maternity care, and high-risk pregnancy management. Successfully managed over 2,500 deliveries.",
    image: "/doctor/mcgonagall.jpeg",
    experience: "13 years",
  },
  {
    id: 10,
    name: "Dr. Ibrahim Farouk",
    specialty: "DERMATOLOGY",
    description: "Dermatology specialist focusing on skin conditions, cosmetic dermatology, and advanced skin cancer treatment using latest technology and laser therapy.",
    image: "/doctor/snape.jpeg",
    experience: "17 years",
  },
  {
    id: 11,
    name: "Dr. Nadia Salim",
    specialty: "PSYCHIATRY",
    description: "Psychiatry specialist dedicated to mental health services, behavioral disorders treatment, and anxiety management. Developer of innovative treatment approaches.",
    image: "/doctor/hagrid.jpeg",
    experience: "19 years",
  },
  {
    id: 12,
    name: "Dr. Tariq Al-Mahmoud",
    specialty: "LABORATORY",
    description: "Laboratory Medicine specialist focusing on clinical pathology, medical diagnostics, and molecular diagnostics. Oversees cutting-edge diagnostic technologies.",
    image: "/doctor/harry-potter.jpeg",
    experience: "21 years",
  },
]; 