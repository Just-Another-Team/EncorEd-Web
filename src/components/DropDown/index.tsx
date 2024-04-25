import React from 'react'
import { FormControl, MenuItem, InputLabel, Select, FormControlProps, SelectProps, FormHelperText } from '@mui/material'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form' 

type FormInputDropDownType<T extends FieldValues>  = {
    label: string;
    options?: Array<{ label: string; value: string; }>;
} & FormControlProps & UseControllerProps<T> & SelectProps

const DropDown = <T extends FieldValues>(props: FormInputDropDownType<T>) => {

    return(
        <FormControl {...props as FormControlProps}>
            <InputLabel>{props.label}</InputLabel>
            <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <>
                    <Select
                    displayEmpty
                    onChange={onChange}
                    value={value}
                    defaultValue={props.defaultValue}
                    label={props.label}
                    {...props as SelectProps}
                    error={!!error}>
                        {props.options?.map((option) => {
                            return(
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText color='error'>{error ? error.message : " "}</FormHelperText>
                </>
            )}/>
        </FormControl>
    )
}



export default DropDown