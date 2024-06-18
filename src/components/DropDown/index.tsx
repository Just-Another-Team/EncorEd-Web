import React from 'react'
import { FormControl, MenuItem, InputLabel, Select, FormControlProps, SelectProps, FormHelperText, useTheme } from '@mui/material'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form' 

type FormInputDropDownType<T extends FieldValues>  = {
    label?: string;
    placeholderLabel?: string
    options?: Array<{ label: string; value: string; }>;
} & FormControlProps & UseControllerProps<T> & SelectProps

const DropDown = <T extends FieldValues>(props: FormInputDropDownType<T>) => {

    const theme = useTheme()

    return(
        <FormControl {...props as FormControlProps}>
            { props.label && <InputLabel>{props.label}</InputLabel> }
            <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            render={({field: {onChange, value}, fieldState: {error}}) => {

                return (
                    <>
                        <Select
                        {...props as SelectProps}
                        displayEmpty
                        onChange={onChange}
                        value={value}
                        defaultValue={props.defaultValue}
                        placeholder={props.placeholderLabel}
                        error={!!error}>
                            {props.options?.map((option) => {
                                return(
                                    <MenuItem
                                    key={option.value}
                                    value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <FormHelperText color={theme.palette.error.main}>{error ? error.message : " "}</FormHelperText>
                    </>
                )
            }}/>
        </FormControl>
    )
}



export default DropDown