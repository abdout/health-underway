import React from 'react';

interface LovableLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const LovableLogo: React.FC<LovableLogoProps> = ({ 
  className = '', 
  width = 120, 
  height = 32 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="0"
        y="24"
        fontSize="24"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
        className="fill-current"
      >
        Lovable
      </text>
    </svg>
  );
}; 