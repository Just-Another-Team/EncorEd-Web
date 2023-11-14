import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//Slices
// import { getInstitution } from '../../../app/features/institution/authInstitution';
// import { viewAssignedRoles } from '../../../app/features/role/authRoleSlice';
// import { getUser, signIn } from '../../../app/features/auth/authSlice';

import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/encored-store-hooks';
import { LoginFormCredential } from '../../../types/LoginFormCredential';
import { LoginFormInput } from '../../../types/LoginFormInput';
import { InputAdornment } from '@mui/material';
import { emailExist, getUser, register, signIn } from '../../../app/features/auth/authSlice';
import { getInstitution } from '../../../app/features/institution/authInstitutionSlice';
import { getAssignedRoles } from '../../../app/features/role/authRoleSlice';

const LoginUserForm = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.authentication)
    const institution = useAppSelector(state => state.institution)
    const roles = useAppSelector(state => state.assignRole)
    // const assignedRole = useAppSelector(state => state.roles);

    let navigate = useNavigate()

    const {handleSubmit, reset, control, setValue, setError, formState: {errors}} = useForm<LoginFormCredential>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const inputs: Array<LoginFormInput> = [
        {
            key: 'email',
            label: "Email",
            type: "email",
            rules: {
                required: "Email is required",
                pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address"
                }
            },
            icon: {
                startAdornment: (
                    <InputAdornment position='start'>
                        <EmailOutlinedIcon />
                    </InputAdornment>
                )
            }
        },
        {
            key: 'password',
            label: "Password",
            type: "password",
            rules: {
                required: "Password is required"
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

    const onSubmit = (credentials: LoginFormCredential) => {
        console.log(credentials)

        dispatch(getUser(credentials)).unwrap()
            .then((dbResult) => {
                return dispatch(signIn(credentials)).unwrap()
                    .then(() => Promise.resolve(dbResult))
                    .catch((error) => Promise.reject(error))
            })
            .then((dbResult) => {
                //get Institution   
                return dispatch(getInstitution(dbResult.data.institution)).unwrap()
                    .then(() => Promise.resolve(dbResult))
                    .catch(error => Promise.reject(error))
            })
            .then((dbResult) => {
                //get Roles
                return dispatch(getAssignedRoles(dbResult.data.id)).unwrap()
                    .then(() => Promise.resolve(dbResult))
                    .catch(error => Promise.reject(error))
            })
            .then((dbResult) => {
                dispatch(register(dbResult))

                navigate("/dashboard/home")
                reset();
            })
            .catch((error) => {
                console.error("Error", error)

                if ((error.code === "ERR_BAD_REQUEST" && error.response.data.code === "firestore/missing-email") || error.code === "auth/user-not-found") // 
                    setError("email", {message: "Email not found. Please register"})

                if (error.code === 'auth/missing-email')
                    setError("email", {message: "Email not found. Please register"})

                if (error.code === "auth/network-request-failed")
                    setError("email", {message: "Cannot log in. Please check your internet connection."})

                if (error.code === "ERR_NETWORK")
                    setError("email", {message: `${error.message}.`})

                if (error.code === "auth/too-many-requests")
                    setError("email", {message: `${error.message}.`})

                if (error.code === "auth/user-invalid-role")
                    setError("email", {message: "User does not contain the level of authentication needed to use the web"})

                if (error.code === "auth/invalid-email")
                    setError("email", {message: "Invalid email"})

                if (error.code === "auth/wrong-password")
                    setError("password", {message: "Invalid password"})
            })
    }

    return (
        <UserForm
        loading={user.loading || institution.loading || roles.loading} 
        type={"login"}
        title="Sign In"
        inputs={inputs}
        control={control}
        onSubmit={handleSubmit(onSubmit)} /> //loading={user.loading || institution.loading || roles.loading} 
    )
}

export default LoginUserForm