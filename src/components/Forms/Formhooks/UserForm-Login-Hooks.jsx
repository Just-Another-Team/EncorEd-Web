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

    const onSubmit = (data) => {
        const { emailUserName, password } = data

        const userInput = {
            emailUserName,
            password,
        }

        loginDispatch(signIn(userInput)).unwrap()
            .then((res) => {
                
                alert("Successfully logged in!")

                //window.location.href = ((res.user.role.find(data => data._systemRole._admin) || res.user.role.find(data => data._systemRole._employee)) && "/dashboard/home") || (res.user.role.find(data => data._systemRole._superAdmin) && "/admin/dashboard/home")
                
                window.location.href = "/dashboard/home"
                
                reset()
            })
            .catch((err) => {
                console.error("User Form Login", err)

                if (err.code === "ERR_NETWORK") setError("emailUserName", {message: `${err.message}.`})

                if (err.code === "auth/user-invalid-role") setError("emailUserName", {message: "User does not contain the level of authentication needed to use the web"})

                if (err.code === "auth/user-not-found" || err.code === "auth/invalid-email") setError("emailUserName", {message: "Invalid email or username"})

                if (err.code === "auth/wrong-password") setError("password", {message: "Invalid password"})
            })
    }

    return <UserForm loading={user.loading} type={"login"} title="Login" submitName='LOGIN' inputs={inputs} control={control} errors={errors} onSubmit={onSubmit} handleSubmit={handleSubmit} />
}

export default LoginUserForm