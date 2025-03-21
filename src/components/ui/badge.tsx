import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset",
      className
    )}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge } 