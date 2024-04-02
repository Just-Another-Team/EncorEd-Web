
import { Controller, FieldValues } from 'react-hook-form' 
import { FixMeLater } from '../../types/FixMeLater'
import { Switch } from '@mui/material'
import React from 'react'
import { FormPropsInput } from '../../types/FormPropsInput'

const FormInputSwitch = <T extends FieldValues>({name, control}: FormPropsInput<T>) => {
    return(
        <Controller
        name={name}
        control={control}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <Switch
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            />
        )}/>
    )
}

export default FormInputSwitch