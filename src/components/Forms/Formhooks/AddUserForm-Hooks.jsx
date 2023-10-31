import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import AddUserForm from '../AddUserForm';
import { addUsers } from '../../../features/users/usersSlice';

const AddUserFormHook = () => {
    const addBy = useSelector(state => state.user.data.displayName)
    const addInstitution = useSelector(state => state.user.data.institution)
    const addUserDispatch = useDispatch();

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            addedBy: addBy,
            institution: addInstitution,
        }
    });

    const inputs = [
        {key: 'firstName', label: "First name", type: "text", error: errors.firstName},
        {key: 'lastName', label: "Last name", type: "text", error: errors.lastName},
        {key: 'email', label: "Email", type: "email", error: errors.email},
        {key: 'userName', label: "Username", type: "text", error: errors.userName},
        {key: 'password', label: "Password", type: "password", error: errors.password},
    ]


    const onSubmit = async (data) => {
        const {
            firstName,
            lastName,
            email,
            userName,
            password,
            addBy,
            addInstitution
        } = data

        let valid = false;

        await addUserDispatch(addUsers(data)).unwrap()
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