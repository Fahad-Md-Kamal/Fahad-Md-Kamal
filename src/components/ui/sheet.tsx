import * as React from "react"

// Minimal stubs to avoid external dependencies
export const Sheet = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SheetTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SheetContent = ({ children }: { children: React.ReactNode; side?: string; className?: string }) => (
  <div>{children}</div>
)
