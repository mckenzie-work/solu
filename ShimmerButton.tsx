
import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  children: React.ReactNode;
}
export default function ShimmerButton({ className, children, as: Comp = "button", ...props }: ShimmerButtonProps) {
  return (
    <Comp
      className={cn(
        "relative border border-white bg-transparent text-white px-7 py-3 font-heading tracking-widest uppercase text-base font-bold outline-none rounded-none group overflow-hidden transition-all duration-200",
        "hover:border-primary focus:border-primary focus:outline-none",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
    </Comp>
  );
}
