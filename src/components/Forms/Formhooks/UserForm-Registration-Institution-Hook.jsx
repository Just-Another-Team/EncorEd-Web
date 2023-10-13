import { useDispatch } from "react-redux";
import UserForm from "../UserForm"
import { useForm } from "react-hook-form";
import { addInstitution } from "../../../features/institution/institutionSlice";


const RegistrationInstitutionForm = () => {
    const institutionDispatch = useDispatch();

    const {handleSubmit, reset, control, setError, formState: {errors}} = useForm({
        defaultValues: {
            name: "",
            desc: ""
        }
    });

    const inputs = [
        {key: 'name', label: "Institution name", type: "text", rows: 0, error: errors.name},
        {key: 'desc', label: "Description", type: "text", rows: 4, error: errors.desc},
    ]

    const onSubmit = (data) => {

        institutionDispatch(addInstitution(data)).unwrap()
            .then((res) => {
                alert(res.data.message)
                
                window.location.href = "/dashboard/home" //To Dashboard or Add User/Role or something

                reset();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return <UserForm title="Create Institution" control={control} onSubmit={onSubmit} type="institution" inputs={inputs} handleSubmit={handleSubmit}/>
}

export default RegistrationInstitutionForm