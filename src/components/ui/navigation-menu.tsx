import * as React from "react"
import { cn } from "@/lib/utils"

export const NavigationMenu = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn(className)}>{children}</div>
)

export const NavigationMenuList = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn(className)}>{children}</div>
)

export const NavigationMenuItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>

export const NavigationMenuLink = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const NavigationMenuTrigger = NavigationMenuLink
export const NavigationMenuContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const NavigationMenuViewport = () => null
