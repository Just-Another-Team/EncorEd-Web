
import { Controller } from 'react-hook-form' 
import { FixMeLater } from '../../types/FixMeLater'

const FormInputSwitch = ({name, control}: FixMeLater) => {
    // return(
    //     <Controller
    //     name={el.key}
    //     control={control}
    //     rules={{
    //         required: (el.key !== 'password' && el.key !== 'confirmPassword') && `${el.label} is required`,
    //         minLength: el.key === "password" ? {
    //             value: 8,
    //             message: "Password must be 8 characters long"
    //         } : null
    //     }} //-Give each controller the error
    //     render={({field}) => (
    //         <TextField
    //         fullWidth
    //         label={el.label}
    //         type={el.type}
    //         error={el.error ? true : false}
    //         helperText={el.error ? el.error.message : null}
    //         {...field}/>
    //     )}/>
    // )
}

export default FormInputSwitch