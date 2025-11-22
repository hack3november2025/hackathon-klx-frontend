'use client'

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  size?: string;
  colorClass?: string;
  className?: string;
}

function LoadingSpinner({
  text = "Loading...",
  size = "6",
  colorClass = "text-primary",
  className,
}: LoadingSpinnerProps) {
  const iconSizeClass = `size-${size}`;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center space-x-2 p-6 text-lg font-medium",
        colorClass,
        className
      )}
    >
      <Loader2 className={cn("animate-spin", iconSizeClass)} />
      <span className="mt-0.5">{text}</span>
    </div>
  );
}

export { LoadingSpinner };
