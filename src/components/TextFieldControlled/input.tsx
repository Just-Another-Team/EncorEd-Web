import { TextField, TextFieldProps } from "@mui/material"
import { Control, Controller, FieldValues, RegisterOptions, UseFormSetValue } from "react-hook-form"

type ControlledTextFieldType<T extends FieldValues> = {
    name: string,
    control: Control<T, any>;
    rules: Omit<RegisterOptions<T, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
} & TextFieldProps

const ControlledTextField = <T extends FieldValues>(props: ControlledTextFieldType<T>) => {
    return(
        <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
        render={({
            field: { onChange, value },
            fieldState: { error }
        }) => (
            <TextField
            onChange={onChange}
            value={value}
            error={!!error}
            helperText={error ? error.message : " "}
            {...props as TextFieldProps}/>
        )}/>
    )
}

export default ControlledTextField