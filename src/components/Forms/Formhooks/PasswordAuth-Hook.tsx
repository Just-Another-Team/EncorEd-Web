import {useForm} from 'react-hook-form'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { InputAdornment } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../app/encored-store-hooks';
import PasswordAuthForm from '../PasswordAuthForm';
import { verifyPassword } from '../../../app/features/auth/authSlice';
import { deleteUser } from '../../../app/features/users/usersSlice';
import { FixMeLater } from '../../../types/FixMeLater';

const PasswordAuthHook = ({ title = "Password Verification" }) => {
    const passwordAuthDispatch = useAppDispatch();
    const deleteUserDispatch = useAppDispatch();
    const target = useAppSelector(state => state.target.target)

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm({
        defaultValues: {
            password: ""
        }
    });

    const inputs: FixMeLater = [
        {
            key: 'password',
            label: "Password",
            type: "password",
            rules: {
                required: "Password is required",
            },
            icon: {
                startAdornment: (
                    <InputAdornment position='start'>
                        <LockOutlinedIcon />
                    </InputAdornment>
                )
            }
        }
    ]
    //deleteUserDispatch(deleteUser(target))
    const onSubmit = async (password: FixMeLater) => {
        reset()
        var verify: FixMeLater
        try{
            await passwordAuthDispatch(verifyPassword(password))
            .then((res)=>{
                console.log(res)
                if(res.type ===  "user/verify/fulfilled"){
                    verify = true
                }
                else{
                    verify = false
                }
            })
        } catch(e) {
            console.log(e)
        }

        //debugging purposes
        console.log("Verify status: " + verify)

        if(verify === true) {
            try{
                deleteUserDispatch(deleteUser(target))
                reset()
                window.location.reload()
                
            } catch(e) {
                console.log(e)
            }
        }
        else{
            reset()
            alert("Wrong password")
        }
    }

    return (
        <PasswordAuthForm
        title={title}
        type={"verifypassword"} 
        inputs={inputs} 
        control={control} 
        onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export { PasswordAuthHook }