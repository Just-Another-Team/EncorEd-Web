import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../../../features/auth/authSlice';

const RegistrationUserForm = () => {
    const userSelector = useSelector(state => state.authentication);
    const registrationDispatch = useDispatch();

    const {handleSubmit, reset, control, setError, formState: {errors}} = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            agree: false
        }
    });

    const inputs = [
        {key: 'firstName', label: "First name", type: "text", rows: 0, error: errors.firstName},
        {key: 'lastName', label: "Last name", type: "text", rows: 0, error: errors.lastName},
        {key: 'email', label: "Email", type: "email", rows: 0, error: errors.email},
        {key: 'userName', label: "Username", type: "text", rows: 0, error: errors.userName},
        {key: 'password', label: "Password", type: "password", rows: 0, error: errors.password},
        {key: 'confirmPassword', label: "Confirm Password", type: "password", rows: 0, error: errors.confirmPassword},
    ]

    const onSubmit = (data) => {
        registrationDispatch(signUp(data)).unwrap()
            .then((res) => {
                alert("Sign Up Successful!")

                //Sign in
                registrationDispatch(signIn(res.data)).unwrap()
                    .then((res) => {
                        console.log(res)

                        window.location.href = "/register/institution"
                        reset()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                //reset()
            })
            .catch((error) => {
                const err = error.response.data.code
                
                if (err === "auth/email-already-exists" || err === "auth/invalid-email")
                    setError("email", {message: "Email already exists"})
            })
    }

    return <UserForm title='Create Account' type={"register"} inputs={inputs} control={control} onSubmit={onSubmit} handleSubmit={handleSubmit} />
}

export default RegistrationUserForm