import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const SubmitButton = ({ isLoading, className, children, type = "submit", onClick }: ButtonProps) => {
  return (
    <Button
      type={type}
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={16}
            height={16}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
