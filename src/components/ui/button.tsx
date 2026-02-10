import * as React from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "secondary" | "outline" | "ghost" | "link" | "destructive"
type Size = "default" | "sm" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  href?: string
  target?: string
  rel?: string
}

const variantClasses: Record<Variant, string> = {
  default: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent",
  ghost: "hover:bg-accent",
  link: "text-primary underline-offset-4 hover:underline",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
}

const sizeClasses: Record<Size, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6",
  icon: "h-9 w-9 p-0",
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, href, target, rel, ...props }, ref) => {
    const isLink = asChild || typeof href === "string"
    const Component: any = isLink ? "a" : "button"

    return (
      <Component
        ref={ref as any}
        href={isLink ? href : undefined}
        target={isLink ? target : undefined}
        rel={isLink ? rel : undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
