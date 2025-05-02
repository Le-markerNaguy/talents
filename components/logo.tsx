import type React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "icon" | "full"
}

export function Logo({ size = "md", variant = "full", className, ...props }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={cn("font-bold", sizeClasses[size], className)} {...props}>
      {variant === "icon" ? (
        <span className="text-primary">15K</span>
      ) : (
        <div className="flex items-center gap-1">
          <span className="text-primary">15K</span>
          <span className="gradient-text">-Talents</span>
        </div>
      )}
    </div>
  )
}
