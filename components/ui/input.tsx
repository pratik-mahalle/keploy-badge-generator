import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, clearable, onClear, error, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      props.onChange?.(e)
    }

    const handleClear = () => {
      setValue("")
      onClear?.()
    }

    return (
      <div className="relative">
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-all",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              clearable && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              "hover:border-[var(--keploy-orange)] focus:border-[var(--keploy-orange)]",
              className
            )}
            ref={ref}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {clearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-destructive animate-shake">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input } 