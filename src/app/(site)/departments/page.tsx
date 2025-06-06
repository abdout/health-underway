import { DepartmentsContent } from "@/components/departments/content";

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen py-16">
      <DepartmentsContent />
    </main>
  );
}

export const metadata = {
  title: "Departments | Saudi German Health",
  description: "Explore our comprehensive healthcare departments and specialized medical services",
};
