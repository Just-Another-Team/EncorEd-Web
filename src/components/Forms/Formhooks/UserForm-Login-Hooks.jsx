import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import { setCredentials, signIn } from '../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

// Firebase Client Side SDK should be here

const LoginUserForm = () => {
    const loginDispatch = useDispatch();
    // const user = useSelector(state => state.authentication)

    const {handleSubmit, reset, control, setValue, setError, formState: {errors}} = useForm({
        defaultValues: {
            emailUserName: "",
            password: ""
        }
    });

    const inputs = [
        {key: 'emailUserName', label: "Username or Email", type: "text", error: errors.emailUserName},
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
            .then(() => {
                alert("Successfully logged in!")

                //dispatch to next page
                //loginDispatch(setCredentials({ user: res.user, token: res.token }))
                //console.log(res)

                window.location.href = "/dashboard/home"
                reset()
            })
            .catch((err) => {
                if (err === "auth/user-not-found" || err === "auth/invalid-email") setError("emailUserName", {message: "Invalid email or username"})

                if (err === "auth/wrong-password") setError("password", {message: "Invalid password"})
            })
    }

    // This felt weird
    // useEffect(() => {
    //     if (!user.loading && user.token !== null) {
    //         signInWithCustomToken(auth, user.token)
    //             .then((result) => {
    //                 alert("Successfully logged in")
    //             })
    //             .catch((error) => {
    //                 console.log({error: "One Big Oof Happened", message: error.message})
    //             })
    //     }

    //     onAuthStateChanged(auth, (user) => {
    //         console.log(user)
    //     })
    // }, [user.loading])

    return <UserForm type={"login"} submitName='LOGIN' inputs={inputs} control={control} errors={errors} onSubmit={onSubmit} handleSubmit={handleSubmit} />
}

export default LoginUserForm