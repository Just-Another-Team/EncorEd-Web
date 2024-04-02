import { Control, FieldValues, RegisterOptions, UseControllerProps } from 'react-hook-form'
import { FilledInputProps, InputProps, OutlinedInputProps, SxProps, TextFieldPropsColorOverrides, TextFieldVariants, Theme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types/index'

export type FormPropsInput<T extends FieldValues> = {
    label?: React.ReactNode,
    rows?: string | number | undefined,
    variant?: TextFieldVariants | undefined,
    size?: OverridableStringUnion<"small" | "medium", TextFieldPropsColorOverrides> | undefined,
    type?: React.HTMLInputTypeAttribute | undefined,

    fullWidth?: boolean | undefined

    color?: OverridableStringUnion<"error" | "primary" | "secondary" | "info" | "success" | "warning", TextFieldPropsColorOverrides> | undefined,
    sx?: SxProps<Theme> | undefined

    formControlProps?: SxProps<Theme> | undefined;
    selectProps?: SxProps<Theme> | undefined;

    options?: Array<{ label: string; value: string; }>;
    defaultValue?: any;

    InputProps?: Partial<OutlinedInputProps> | Partial<InputProps> | Partial<FilledInputProps> | undefined

    setValue?: any
} & UseControllerProps<T>