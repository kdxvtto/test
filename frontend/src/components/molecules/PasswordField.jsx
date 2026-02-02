import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/atoms/Label"
import { Input } from "@/components/atoms/Input"
import { cn } from "@/lib/utils"

export function PasswordField({ id = "password", ...inputProps }) {
  const [show, setShow] = useState(false)

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Password</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          className="pr-11"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className={cn(
            "absolute inset-y-0 right-2 grid w-9 place-items-center text-slate-500",
            "transition hover:text-slate-700 dark:hover:text-slate-200"
          )}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}
