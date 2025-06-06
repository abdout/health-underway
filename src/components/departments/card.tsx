import { Department } from "./constant";

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const IconComponent = department.icon;
  
  return (
    <div className="relative h-52">
      {/* Background that scales on hover */}
      <div className="absolute inset-0 bg-white rounded-3xl shadow-sm border border-gray-100 hover:scale-105 transition-transform duration-300 ease-in-out"></div>
      
      {/* Content that never changes */}
      <div className="relative z-10 h-full p-12 flex items-center">
        <div className="space-y-2 text-center w-full">
          {/* Icon and Title Row */}
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-shrink-0">
              <IconComponent 
                className="w-8 h-8 text-black" 
              />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-wide">
              {department.name}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 max-w-40 mx-auto break-words">
            {department.description}
          </p>
        </div>
      </div>
    </div>
  );
}
