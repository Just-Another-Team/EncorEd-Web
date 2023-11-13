import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { FormPropsInput } from '../../types/FormPropsInput'

const FormInputTextField = ({
    name,
    control,
    rules,
    label,
    rows,
    variant,
    size,
    type,
    color,
    fullWidth,
    sx,
    InputProps
}: FormPropsInput) => {
    return(
        <Controller
        name={name}
        control={control}
        rules={rules} 
        render={({
            field: { onChange, value },
            fieldState: { error }
        }) => (
            <TextField
            onChange={onChange}
            value={value}
            error={!!error}
            helperText={error ? error.message : " "}
            variant={variant}
            color={color}
            fullWidth={fullWidth}
            label={label}
            type={type}
            multiline={rows as number > 0 ? true : false}
            rows={rows}
            size={size}
            sx={sx}
            InputProps={InputProps}/>
        )}/>
    )
}

export default FormInputTextField