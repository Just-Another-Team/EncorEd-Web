import { TimePicker } from "@mui/x-date-pickers"
import { Controller } from "react-hook-form"
import { FormPropsInput } from "../../types/FormPropsInput"


const InputTimePicker = ({ 
    name,
    control,
    rules,
    label
}: FormPropsInput) => {
    return (
        <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
            field: { onChange, value },
            fieldState: { error }
        }) => (
            <TimePicker
            label={label}
            value={value}
            onChange={onChange}
            slotProps={{
                textField: {
                    error: !!error
                }
            }}/>
        )}/>
    )
}

export default InputTimePicker