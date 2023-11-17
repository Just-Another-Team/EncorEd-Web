import React from 'react'
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import { Controller } from 'react-hook-form' 
import { FixMeLater } from '../../types/FixMeLater'

const FormInputDropDown = ({
    name,
    control,
    label,
    rules,
    options,
    formControlProps,
    selectProps,
    fullWidth,
    defaultValue
}: FixMeLater) => {

    const items = () => {
        return options.map((option: FixMeLater) => {
            return(
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            )
        })
    }

    return(
        <FormControl fullWidth={fullWidth} sx={formControlProps}>
            <InputLabel>{label}</InputLabel>
            <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <Select
                onChange={onChange}
                value={value}
                label={label}
                sx={selectProps}
                fullWidth={fullWidth}
                error={!!error}>
                    {items()}
                </Select>
            )}
            />
        </FormControl>
    )
}



export default FormInputDropDown