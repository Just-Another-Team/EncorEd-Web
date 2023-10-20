import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import { setCredentials, signIn } from '../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Firebase Client Side SDK should be here

const LoginUserForm = () => {
    const loginDispatch = useDispatch();
    const user = useSelector(state => state.authentication)

    const {handleSubmit, reset, control, setValue, setError, formState: {errors}} = useForm({
        defaultValues: {
            emailUserName: "",
            password: ""
        }
    });

    const inputs = [
        {key: 'emailUserName', label: "Email", type: "email", error: errors.emailUserName},
        {key: 'password', label: "Password", type: "password", error: errors.password}
    ]

    const onSubmit = (credentials) => {
        loginDispatch(signIn(credentials)).unwrap()
            .then((res) => {
                console.log(res)

                window.location.href = "/dashboard/home"
                reset();
            })
            .catch((error) => {
                console.error("User Form Login", error)

                if (error.code === "ERR_NETWORK") setError("emailUserName", {message: `${error.message}.`})

                if (error.code === "auth/user-invalid-role") setError("emailUserName", {message: "User does not contain the level of authentication needed to use the web"})

                if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") setError("emailUserName", {message: "Invalid email or username"})

                if (error.code === "auth/wrong-password") setError("password", {message: "Invalid password"})
            })
    }

    return <UserForm loading={user.loading} type={"login"} title="Login" submitName='LOGIN' inputs={inputs} control={control} errors={errors} onSubmit={onSubmit} handleSubmit={handleSubmit} />
}

export default LoginUserForm