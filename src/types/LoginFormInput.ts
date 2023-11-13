import { FilledInputProps, InputProps, OutlinedInputProps } from "@mui/material"
import { FieldValues, RegisterOptions } from "react-hook-form"

export type LoginFormInput = {
    key: string,
    label: string,
    type: React.HTMLInputTypeAttribute | undefined,
    rules: Omit<RegisterOptions<FieldValues, any>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined,
    icon?: Partial<OutlinedInputProps> | Partial<InputProps> | Partial<FilledInputProps> | undefined,
    rows?: number
}