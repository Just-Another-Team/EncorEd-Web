import { TimePicker } from "@mui/x-date-pickers"
import { Controller, FieldValues } from "react-hook-form"
import { FormPropsInput } from "../../types/FormPropsInput"
import dayjs from "dayjs"

const TimePickerControlled = <T extends FieldValues>({ 
    name,
    control,
    rules,
    label
}: FormPropsInput<T>) => {
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
            value={dayjs(value)}
            onChange={onChange}
            slotProps={{
                textField: {
                    size: "small", 
                    error: !!error
                }
            }}/>
        )}/>
    )
}

export default TimePickerControlled