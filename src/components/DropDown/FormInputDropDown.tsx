import React from 'react'
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import { Control, Controller, FieldValue, FieldValues } from 'react-hook-form' 
import { FixMeLater } from '../../types/FixMeLater'
import { FormPropsInput } from '../../types/FormPropsInput'

// type InputDropDownType = {
//     name: string;
//     control?: Control<FieldValues> | undefined;
//     label: string;
//     rules?: 
// }

const FormInputDropDown: React.FC<FormPropsInput> = ({
    name,
    control,
    label,
    rules,
    options,
    formControlProps,
    selectProps,
    fullWidth,
    defaultValue
}) => {

    return(
        <FormControl fullWidth={fullWidth} sx={formControlProps}>
            <InputLabel>{label}</InputLabel>
            <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <Select
                displayEmpty
                onChange={onChange}
                value={value}
                label={label}
                sx={selectProps}
                fullWidth={fullWidth}
                error={!!error}>
                    {options?.map((option) => {
                        return(
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        )
                    })}
                </Select>
            )}
            />
        </FormControl>
    )
}



export default FormInputDropDown