import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../app/features/user/userSlice';
import { RegisterFormCredential } from '../../../types/RegisterFormCredential';
import { RegisterFormInput } from '../../../types/RegisterFormInput';
import { useAppDispatch } from '../../../app/encored-store-hooks';
import { InitialAuthType, emailExist, register } from '../../../app/features/auth/authSlice';
// import { getUser, signIn, signUp } from '../../../app/features/auth/authSlice';

const RegistrationUserForm = () => {
    const navigate = useNavigate()
    
    const dispatch = useAppDispatch();
    // const user = useSelector(state => state.authentication);

    const {handleSubmit, reset, control, getValues, setError, formState: {errors}} = useForm<RegisterFormCredential>({
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

    const inputs: Array<RegisterFormInput> = [
        {key: 'firstName', label: "First name", type: "text", rules: {required: "First name  is required"}},
        {key: 'lastName', label: "Last name", type: "text", rules: {required: `Last name is required`}},
        {
            key: 'email',
            label: "Email",
            type: "email",
            rules: {
                required: `Email is required`,
                pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address"
                }
            }
        },
        {key: 'userName', label: "Username", type: "text", rules: {required: `Username is required`}},
        {key: 'password', label: "Password", type: "password", rules: {required: `Password is required`, minLength: { value: 8, message: "Password must be 8 characters long" }}},
        {key: 'confirmPassword', label: "Confirm Password", type: "password", rules: { validate: (value) => value === getValues('password') || "Passwords does not match." }},
    ]

    const onSubmit = (credentials: RegisterFormCredential) => {
        const {firstName, lastName, email, userName, password} = credentials
        
        const authCredentials: InitialAuthType = {
            data: {firstName, lastName, email, userName, password},
        }

        //If email exists
        dispatch(emailExist(credentials)).unwrap()
            .then((result) => {
                if (result.data)
                    return Promise.reject("auth/email-already-exists")

                dispatch(register(authCredentials))

                navigate("/register/institution");
                reset();
            })
            .catch((error) => {
                if (error === "auth/email-already-exists" || error === "auth/invalid-email")
                    setError("email", {message: "Email already exists"})
            })

        //If username exists


        // dispatch(register(authCredentials))
        // reset();

        // navigate("/register/institution");

        //Step 1 - Add User to Database and Authentication
        //Step 2 - Login User to the Web <- BAD PLAY
        // await registrationDispatch(signUp(data)).unwrap()
        //     .then(() => {
        //         //Get User
        //         return registrationDispatch(getUser(email)).unwrap()
        //             .then((userData) => {
        //                 console.log("userData", userData)

        //                 return registrationDispatch(signIn({emailUserName: userData.id, password: password})).unwrap()
        //                     .then((userAuth) => Object.assign(userAuth, {...userData}))
        //                     .catch((error) => Promise.reject(error))
        //             })
        //             .then((userResult) => {
        //                 registrationDispatch(setUser(userResult))
        //                 navigate("/register/institution")
        //                 reset();
        //             })
        //             .catch((error) => Promise.reject(error))
        //     })
        //     .catch((error) => {
        //         console.log(error)

        //         const err = error.response.data.code
                
        //         if (err === "auth/email-already-exists" || err === "auth/invalid-email")
        //             setError("email", {message: "Email already exists"})
        //     })
        
        //if (!userSelector.loading) window.location.href = "/register/institution"
    }

    return (
        <UserForm
        // loading={user.loading}
        title='Create Account'
        type={"register"}
        inputs={inputs}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RegistrationUserForm