import { Label } from "@/components/atoms/Label"
import { Input } from "@/components/atoms/Input"

export function TextField({ label, id, ...inputProps }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
    </div>
  )
}
