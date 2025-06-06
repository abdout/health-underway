import React from 'react';
import { cn } from '@/lib/utils';

interface ExpandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'white';
  children: React.ReactNode;
  className?: string;
}

const ExpandButton = ({ 
  variant = 'default', 
  children, 
  className, 
  ...props 
}: ExpandButtonProps) => {
  const baseClasses = "rounded-2xl px-6 py-2 font-semibold transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-3xl hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none";
  
  const variantClasses = {
    default: "bg-primary text-background border-2 border-primary",
    outline: "border-2 border-black text-black",
    white: "bg-background text-foreground border-2 border-background"
  };

  return (
    <button 
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ExpandButton;