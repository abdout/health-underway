import { DoctorsContent } from "@/components/doctors/content";

export default function DoctorsPage() {
  return (
    <main className="min-h-screen py-16">
      <DoctorsContent />
    </main>
  );
}

export const metadata = {
  title: "Our Doctors | Saudi German Health",
  description: "Meet our experienced medical professionals and specialists across various healthcare departments",
}; 