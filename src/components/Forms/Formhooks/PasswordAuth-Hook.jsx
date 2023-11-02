import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import PasswordAuthForm from '../PasswordAuthForm';
import { verifyPassword } from '../../../features/auth/authSlice';

const PasswordAuthHook = ({ title = "Password Verification"}) => {
    const user = useSelector(state => state.user.data)
    const passwordAuthDispatch = useDispatch();

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm({
        defaultValues: {
            email: user.email,
            password: ""
        }
    });

    const inputs = [
        {key: 'password', label: "Confirm Password", type: "password", error: errors.password},
    ]


    const onSubmit = async (data) => {
        const {
            email, 
            password
        } = data

        await passwordAuthDispatch(verifyPassword({data})).unwrap()
            .then((res) => {
                console.log(res.data)
                reset();
            })
            .catch((err) => {
                console.log(err.response.data)
                return
            })

    }

    return <PasswordAuthForm
                title={title}
                type={"passwordconfirmation"} 
                inputs={inputs} 
                control={control} 
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
            />
}

export { PasswordAuthHook }