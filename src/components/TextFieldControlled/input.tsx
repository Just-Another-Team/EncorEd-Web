import { TextField, TextFieldProps } from "@mui/material"
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form"
import { LoginDataType } from "../../types/InputLoginType"

type ControlledTextFieldType = {
    name: string,
    control: Control<LoginDataType>,
    rules: Omit<RegisterOptions<LoginDataType, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
} & TextFieldProps

const ControlledTextField = (props: ControlledTextFieldType) => {
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