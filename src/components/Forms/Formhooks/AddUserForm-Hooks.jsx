import {useForm} from 'react-hook-form'
import AddUserForm from '../AddUserForm';
import axios from 'axios'

const AddUserFormHook = () => {
    
    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm({
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
        }
    });

    const inputs = [
        {key: 'firstName', label: "First name", type: "text", error: errors.firstName},
        {key: 'middleName', label: "Middle name", type: "text", error: errors.middleName},
        {key: 'lastName', label: "Last name", type: "text", error: errors.lastName},
        {key: 'email', label: "Email", type: "email", error: errors.email},
        {key: 'userName', label: "Username", type: "text", error: errors.userName},
        {key: 'password', label: "Password", type: "password", error: errors.password},
    ]


    const onSubmit = async (data) => {
        const {
            firstName,
            middleName,
            lastName,
            email,
            userName,
            password,
        } = data

        const userInput = {
            firstName,
            middleName,
            lastName,
            email,
            userName,
            password,
        }

        let valid = false;

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

    return <AddUserForm 
                title='Add Institution User' 
                type={"usercreation"} 
                inputs={inputs} 
                control={control} 
                onSubmit={onSubmit} 
                handleSubmit={handleSubmit}
            />
}

export { AddUserFormHook }