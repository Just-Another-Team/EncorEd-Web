import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import { setCredentials, signIn } from '../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

// Firebase Client Side SDK should be here

const LoginUserForm = () => {
    const loginDispatch = useDispatch();
    const user = useSelector(state => state.authentication.user)

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

        loginDispatch(signIn(userInput))
            .unwrap()
            .then((res) => {
                
                alert("Successfully logged in!")

                window.location.href = ((res.user.role.find(data => data._systemRole._admin) || res.user.role.find(data => data._systemRole._employee)) && "/dashboard/home") || (res.user.role.find(data => data._systemRole._superAdmin) && "/admin/dashboard/home")
                reset()
            })
            .catch((err) => {
                if (err === "auth/user-invalid-role") setError("emailUserName", {message: "User does not contain the level of authentication needed to use the web"})

                if (err === "auth/user-not-found" || err === "auth/invalid-email") setError("emailUserName", {message: "Invalid email or username"})

                if (err === "auth/wrong-password") setError("password", {message: "Invalid password"})
            })
    }

    return <UserForm type={"login"} title="Login" submitName='LOGIN' inputs={inputs} control={control} errors={errors} onSubmit={onSubmit} handleSubmit={handleSubmit} />
}

export default LoginUserForm