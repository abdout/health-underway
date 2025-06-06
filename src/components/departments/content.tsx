import { hospitalDepartments } from "./constant";
import { DepartmentCard } from "./card";

export function DepartmentsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-10 mx-auto items-center justify-center flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-xl leading-[1] sm:text-3xl md:text-4xl">
        Departments
        </h2>
        <p className="max-w-[65%] mx-auto text-center justify-center leading-normal text-muted-foreground sm:text-lg sm:leading-6">
        Expert medical departments and services
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hospitalDepartments.map((department) => (
          <DepartmentCard 
            key={department.id} 
            department={department} 
          />
        ))}
      </div>
    </div>
  );
}
