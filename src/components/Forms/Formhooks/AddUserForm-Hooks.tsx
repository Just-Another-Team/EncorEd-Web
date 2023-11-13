import {FieldValues, useForm} from 'react-hook-form'
import AddUserForm from '../AddUserForm';
import { useAppDispatch, useAppSelector } from '../../../app/encored-store-hooks';
import { FixMeLater } from '../../../types/FixMeLater';
import { addUsers } from '../../../app/features/users/usersSlice';

const AddUserFormHook = ({ title = "Add Institutional User"}) => {
    const user = useAppSelector(state => state.authentication.data)
    const addUserDispatch = useAppDispatch();

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            addedBy: `${user.firstName} ${user.lastName}`,
            institution: user.institution,
        }
    });

    const inputs = [
        {key: 'firstName', label: "First name", type: "text", error: errors.firstName},
        {key: 'lastName', label: "Last name", type: "text", error: errors.lastName},
        {key: 'email', label: "Email", type: "email", error: errors.email},
        {key: 'userName', label: "Username", type: "text", error: errors.userName},
        {key: 'password', label: "Password", type: "password", error: errors.password},
    ]


    const onSubmit = (data: FixMeLater) => {
        const {
            firstName,
            lastName,
            email,
            userName,
            password,
            addedBy,
            institution
        } = data

        let valid = false;

        addUserDispatch(addUsers(data)).unwrap()
            .then((res) => {
                console.log(res.data)
                valid = true;
                reset();
            })
            .catch((err) => {
                console.log(err.response.data)
                return
            })

        
        // await axios.post("http://localhost:4000/user/add", userInput)
        //     .then((res) => {
        //         console.log(res.data)
        //         valid = true;
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data)
        //         return
        //     })

        //Uhhhh load this please
    }

    return (
        <AddUserForm 
            title={title}
            type="usercreation" 
            inputs={inputs} 
            control={control} 
            onSubmit={handleSubmit(onSubmit)} 
        />
    )
}

export { AddUserFormHook }