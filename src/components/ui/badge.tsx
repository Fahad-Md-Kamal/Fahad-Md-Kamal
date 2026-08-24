import * as React from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "secondary" | "destructive" | "outline"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  default: "bg-primary/15 text-primary border border-primary/25",
  secondary: "bg-secondary/20 text-secondary border border-secondary/25",
  destructive: "bg-destructive/15 text-destructive border border-destructive/25",
  outline: "border border-border/70 text-foreground",
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}
