import {useForm} from 'react-hook-form'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { InputAdornment } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../app/encored-store-hooks';
import EditUserProfileForm from '../EditUserProfileForm';
import { verifyPassword } from '../../../app/features/auth/authSlice';
import { deleteUser } from '../../../app/features/users/usersSlice';
import { FixMeLater } from '../../../types/FixMeLater';
import { editUserProfile } from '../../../app/features/profile/profileSlice';

const EditUserProfileHook = ({ title = "Edit User Profile" }) => {
    const editUserProfileDispatch = useAppDispatch();
    const target = useAppSelector(state => state.target.target)

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm({
        defaultValues: {
            id: target,
            firstName: "",
            lastName: "",
        }
    });

    const inputs: FixMeLater = [
        {
            key: 'firstName',
            label: "First Name",
            type: "string",
            rules: {
                required: "First name is required",
            },
            error: errors.firstName
        },
        {
            key: 'lastName',
            label: "Last Name",
            type: "string",
            rules: {
                required: "Last name is required",
            },
            error: errors.lastName
        }
    ]

    const onSubmit = async (data: FixMeLater) => {
        const {id, firstName, lastName} = data;
            
        try{
            await editUserProfileDispatch(editUserProfile(data))
            .then(()=>{
                window.location.reload()
            })
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <EditUserProfileForm
        title={title}
        type={"edituserprofile"} 
        inputs={inputs} 
        control={control} 
        onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export { EditUserProfileHook }