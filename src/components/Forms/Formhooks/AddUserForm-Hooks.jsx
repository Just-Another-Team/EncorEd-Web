import {useForm} from 'react-hook-form'
import AddUserForm from '../AddUserForm';
import axios from 'axios'

const AddUserForm = () => {
    
    const {handleSubmit, reset, control, setValue} = useForm({
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
        {key: 'firstName', label: "First name", type: "text", helperText: ""},
        {key: 'lastName', label: "Last name", type: "text", helperText: ""},
        {key: 'email', label: "Email", type: "email", helperText: ""},
        {key: 'userName', label: "Username", type: "text", helperText: ""},
        {key: 'password', label: "Password", type: "password", helperText: ""},
        {key: 'confirmPassword', label: "Confirm Password", type: "password", helperText: ""},
    ]

    const onSubmit = async (data) => {
        const {
            firstName,
            lastName,
            email,
            userName,
            password,
        } = data

        const userInput = {
            firstName,
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
        if (valid)
            reset()
    }

    return <AddUserForm title='Add User' type={"usercreation"} inputs={inputs} control={control} onSubmit={onSubmit} handleSubmit={handleSubmit} />
}

export default AddUserForm