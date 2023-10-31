import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, signIn, signUp } from '../../../features/auth/authSlice';
import { setUser } from '../../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const RegistrationUserForm = () => {
    const navigate = useNavigate()
    
    const user = useSelector(state => state.authentication);

    const registrationDispatch = useDispatch();

    const {handleSubmit, reset, control, getValues, setError, formState: {errors}} = useForm({
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
        {key: 'firstName', label: "First name", type: "text", rows: 0, error: errors.firstName, rules: {required: "First name  is required"}},
        {key: 'lastName', label: "Last name", type: "text", rows: 0, error: errors.lastName, rules: {required: `Last name is required`}},
        {key: 'email', label: "Email", type: "email", rows: 0, error: errors.email, rules: {required: `Email is required`}},
        {key: 'userName', label: "Username", type: "text", rows: 0, error: errors.userName, rules: {required: `Username is required`}},
        {key: 'password', label: "Password", type: "password", rows: 0, error: errors.password, rules: {required: `Password is required`, minLength: { value: 8, message: "Password must be 8 characters long" }}},
        {key: 'confirmPassword', label: "Confirm Password", type: "password", rows: 0, error: errors.confirmPassword, rules: { validate: (value) => value === getValues('password') || "Passwords does not match." }},
    ]

    const onSubmit = async (data) => {
        const {firstName, lastName, email, userName, password} = data
        
        //Step 1 - Add User to Database and Authentication
        //Step 2 - Login User to the Web
        await registrationDispatch(signUp(data)).unwrap()
            .then(() => {
                //Get User
                return registrationDispatch(getUser(email)).unwrap()
                    .then((userData) => {
                        console.log("userData", userData)

                        return registrationDispatch(signIn({emailUserName: userData.id, password: password})).unwrap()
                            .then((userAuth) => Object.assign(userAuth, {...userData}))
                            .catch((error) => Promise.reject(error))
                    })
                    .then((userResult) => {
                        registrationDispatch(setUser(userResult))
                        navigate("/register/institution")
                        reset();
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                console.log(error)

                const err = error.response.data.code
                
                if (err === "auth/email-already-exists" || err === "auth/invalid-email")
                    setError("email", {message: "Email already exists"})
            })
        
        //if (!userSelector.loading) window.location.href = "/register/institution"
    }

    return (
        <UserForm
        loading={user.loading}
        title='Create Account'
        type={"register"}
        inputs={inputs}
        control={control}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    )
}

export default RegistrationUserForm