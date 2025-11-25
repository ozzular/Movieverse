import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/20 text-white hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-600/30",
        destructive:
          "bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-white/20 text-white hover:bg-gradient-to-r hover:from-red-500/30 hover:to-pink-600/30",
        outline:
          "border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md",
        secondary:
          "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-white/20 text-white hover:bg-gradient-to-r hover:from-gray-500/30 hover:to-gray-600/30",
        ghost:
          "hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-sm",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
        glass:
          "bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md",
        primary:
          "bg-gradient-to-r from-blue-500/30 to-purple-600/30 border border-blue-400/30 text-white hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-purple-600/40",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-lg",
        xl: "h-14 rounded-xl px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
