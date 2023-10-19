import { useDispatch, useSelector } from "react-redux";
import UserForm from "../UserForm"
import { useForm } from "react-hook-form";
import { addInstitution } from "../../../features/institution/institutionSlice";
import { assignInstitution } from "../../../features/auth/authSlice";
import { addRole } from "../../../features/role/roleSlice";

const RegistrationInstitutionForm = () => {
    const user = useSelector(state => state.authentication.user)
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

        //Add insitution
        institutionDispatch(addInstitution(data)).unwrap()
            .then((res) => {
                console.log(res.data)

                //Assign institution
                institutionDispatch(assignInstitution({userId: user.email, institution: res.data.id})).unwrap()
                    .then(() => {

                        //Add Admin role based on institution
                        institutionDispatch(addRole({institution: res.data.id})).unwrap()
                            .then(() => {
                                //Assign admin role
                                institutionDispatch(assignRole())

                                reset();
                            })
                            .catch((error) => {
                                console.log("Add Role", error)
                            })
                    })
                    .catch((error) => {
                        console.log("Assign Institution", error)
                    })

                //window.location.href = "/dashboard/home" //To Dashboard or Add User/Role or something
                
            })
            .catch((error) => {
                console.log("Add Institution", error)
            })
    }

    return <UserForm loading={false} title="Create Institution" control={control} onSubmit={onSubmit} type="institution" inputs={inputs} handleSubmit={handleSubmit}/>
}

export default RegistrationInstitutionForm