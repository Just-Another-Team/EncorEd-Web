
import { Controller } from 'react-hook-form' 
import { FixMeLater } from '../../types/FixMeLater'
import { Switch } from '@mui/material'
import React from 'react'
import { FormPropsInput } from '../../types/FormPropsInput'

const FormInputSwitch: React.FC<FormPropsInput> = ({name, control}) => {
    return(
        <Controller
        name={name}
        control={control}
        //rules={rules} //-Give each controller the error
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <Switch
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            />
            // <TextField
            // fullWidth
            // label={el.label}
            // type={el.type}
            // error={el.error ? true : false}
            // helperText={el.error ? el.error.message : null}
            // {...field}/>
        )}/>
    )
}

export default FormInputSwitch