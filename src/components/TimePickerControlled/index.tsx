import { TimePicker } from "@mui/x-date-pickers"
import { Controller, FieldValues } from "react-hook-form"
import { FormPropsInput } from "../../types/FormPropsInput"
import dayjs from "dayjs"

const TimePickerControlled = <T extends FieldValues>(props: FormPropsInput<T>) => {

    const { name, control, rules, label } = props

    return (
        <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
            field: { onChange, value },
            fieldState: { error }
        }) => {
            return (
                <TimePicker
                label={label}
                disabled={props.disabled}
                value={value ? dayjs(value) : null}
                onChange={onChange}
                slotProps={{
                    textField: {
                        size: "small", 
                        error: !!error,
                        helperText: error ? error.message : " ",
                        fullWidth: props.fullWidth
                    }
                }}/>
            )
        }}/>
    )
}

export default TimePickerControlled