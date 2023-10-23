import { useDispatch, useSelector } from "react-redux";
import UserForm from "../UserForm"
import { useForm } from "react-hook-form";
import { addInstitution } from "../../../features/institution/authInstitution";
import { assignInstitution } from "../../../features/auth/authSlice";
import { addRole, assignRole, viewAssignedRoles } from "../../../features/role/authRoleSlice";
import { setInstitution } from "../../../features/institution/institutionSlice";
import { setRoles } from "../../../features/role/roleSlice";

const RegistrationInstitutionForm = () => {
    const user = useSelector(state => state.user)
    const authUser = useSelector(state => state.authentication)
    const authInstitution = useSelector(state => state.authInstitution)
    const authRoles = useSelector(state => state.authRole)

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

    const onSubmit = async (data) => {

        institutionDispatch(addInstitution(data)).unwrap()
            .then((addInstitutionRes) => {//Assign institution
                return institutionDispatch(assignInstitution({userId: user.data.email, institution: addInstitutionRes.data.id})).unwrap()
                    .then(() => {
                        institutionDispatch(setInstitution(addInstitutionRes.data)) //Set Institution
                        return addInstitutionRes 
                    })
                    .catch((error) => Promise.resolve(error)); 
            })
            //Get Institution
            .then( (assignInstitutionRes) => {//Add role
                return institutionDispatch(addRole({institution: assignInstitutionRes.data.id})).unwrap()
                    .then((addRoleRes) => addRoleRes)
                    .catch((error) => Promise.reject(error))
            })
            .then((res) => { //Assign role
                return institutionDispatch(assignRole({userId: user.data.email, roleId: res.data.id})).unwrap()
                    .then(() => user.data)
                    .catch((error) => Promise.reject(error))
            })
            .then((userData) => { //Get roles
                return institutionDispatch(viewAssignedRoles(userData.id)).unwrap()
                    .then((assignedRoles) => {
                        institutionDispatch(setRoles(assignedRoles.data)) //Set Role
                        window.location.href = "/dashboard/home"
                        reset();
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                console.error(error)

                const code = error.response.data.code

                if (code === 6)
                    setError("name", {message: "Institution name already exists"})
            })
    }

    return <UserForm loading={authInstitution.loading || authRoles.loading || authUser.loading} title="Create Institution" control={control} onSubmit={onSubmit} type="institution" inputs={inputs} handleSubmit={handleSubmit}/>
}

export default RegistrationInstitutionForm