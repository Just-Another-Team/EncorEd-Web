import React from 'react'
import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/encored-store-hooks';
import { LoginFormCredential } from '../../../types/LoginFormCredential';
import { LoginFormInput } from '../../../types/LoginFormInput';
import { Grid, InputAdornment, Typography } from '@mui/material';
import { emailExist, getUser, register, signIn } from '../../../app/features/auth/authSlice';
import { getInstitution } from '../../../app/features/institution/authInstitutionSlice';
import { getAssignedRoles, logOutRoles } from '../../../app/features/role/authRoleSlice';
import { Link } from 'react-router-dom';

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

        // We have to do this in edit profile
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
                dispatch(register(dbResult))

                //get Roles
                return dispatch(getAssignedRoles(dbResult.data.id)).unwrap()
                    .then((rolesResult) => Promise.resolve(rolesResult))
                    .catch(error => Promise.reject(error))
            })
            .then((rolesResult: { data: { appAdmin: any; }; }) => {
                //console.log(rolesResult.data.appAdmin)

                if (rolesResult.data.appAdmin) navigate("/admin/dashboard/home")
                else navigate("/dashboard/home")

                reset();
            })
            .catch((error) => {
                //TO-DO: Must be transferred in Service/Slice instead

                if (error.code === "ERR_NETWORK") {
                    alert("Network Error")
                    return;
                }

                if (error.response.data.code === "firestore/missing-email" || error.code === "auth/user-not-found" || error.code === 'auth/missing-email') // 
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
        onSubmit={handleSubmit(onSubmit)}>
            <Grid xs={12} marginTop={4}>
                <Typography variant="body1" textAlign={"center"}>Don't have an account? <Link to="/register/user" style={{}}>Sign Up</Link></Typography>
            </Grid>
        </UserForm>
    )
}

export default LoginUserForm