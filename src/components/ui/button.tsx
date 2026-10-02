import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-semibold select-none transition-[scale,background-color,color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg shadow-red",
        accent: "bg-accent text-accent-fg",
        ink: "bg-ink text-ink-fg",
        surface: "bg-surface text-fg shadow-card",
        ghost: "bg-transparent text-fg",
        outline: "bg-transparent text-fg shadow-card",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-[12px]",
        md: "h-11 px-4 text-sm rounded-[14px]",
        lg: "h-12 px-5 text-base rounded-[16px]",
        pill: "h-12 px-5 rounded-full text-sm",
        icon: "size-11 rounded-full",
      },
      press: {
        true: "active:not-disabled:scale-[0.96]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      press: true,
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    static?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  static: isStatic,
  asChild,
  press,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, press: isStatic ? false : (press ?? true) }),
        className,
      )}
      {...props}
    />
  );
}
