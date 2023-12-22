import UserForm from "../UserForm"
import { useForm } from "react-hook-form";
import { RegisterFormInput } from "../../../types/RegisterFormInput";
import { RegisterFormCredential } from "../../../types/RegisterFormCredential";
import { useAppDispatch, useAppSelector } from "../../../app/encored-store-hooks";
import { signUp } from "../../../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { addInstitution } from "../../../app/features/institution/authInstitutionSlice";
import { addAdminRole, assignAdminRole } from "../../../app/features/role/authRoleSlice";
const RegistrationInstitutionForm = () => {
    const navigate = useNavigate()

    const registeredUser = useAppSelector(state => state.authentication.data);

    const dispatch = useAppDispatch();

    const {handleSubmit, reset, control, setError, formState: {errors}} = useForm<RegisterFormCredential>({
        defaultValues: {
            institution: {
                name: "",
                desc: "",
            }
        }
    });

    const inputs: Array<RegisterFormInput> = [
        {key: 'institution.name', label: "Institution name", type: "text", rules: {required: "Institution name is required."}, },
        // {key: 'institution.desc', label: "Description", type: "text", rules: {required: "Give at least a small description of the institution."}, rows: 4,},
        {key: 'businessPermit', label: "Business Permit", type: "file", rules: {required: "Business permit is required."},},
        {key: 'chedDoc', label: "CHED Document", type: "file", rules: {required: "Random file test"},},
    ]

    const onSubmit = (institutionCredential: RegisterFormCredential) => {
        const completeCredential: RegisterFormCredential = {
            //...registeredUser,
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            email: registeredUser.email,
            userName: registeredUser.userName,
            password: registeredUser.password,
            ...institutionCredential,
        }

        dispatch(addInstitution(completeCredential)).unwrap()
            .then(() => {
                return dispatch(addAdminRole(completeCredential)).unwrap()
                    .then(() => {
                        return dispatch(assignAdminRole(completeCredential)).unwrap().catch((error) => Promise.reject(error))
                    })
                    .catch((error) => Promise.reject(error))
            })
            .then(() => {
                return dispatch(signUp(completeCredential)).unwrap()
                    .then(() => {
                        reset();
                        navigate("/login");
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                console.error("Error Occured!", error)
            })
        
        //assignRole
        // dispatch(signUp(completeCredential))

        // navigate("/login");

        
        // institutionDispatch(addInstitution(data)).unwrap()
        //     .then((addInstitutionRes) => {//Assign institution
        //         return institutionDispatch(assignInstitution({userId: user.data.email, institution: addInstitutionRes.data.id})).unwrap()
        //             .then(() => {
        //                 institutionDispatch(setInstitution(addInstitutionRes.data)) //Set Institution
        //                 return addInstitutionRes 
        //             })
        //             .catch((error) => Promise.resolve(error)); 
        //     })
        //     //Get Institution
        //     .then( (assignInstitutionRes) => {//Add role
        //         return institutionDispatch(addAdminRole({institution: assignInstitutionRes.data.id})).unwrap()
        //             .then((addRoleRes) => addRoleRes)
        //             .catch((error) => Promise.reject(error))
        //     })
        //     .then((res) => { //Assign role
        //         return institutionDispatch(assignAdminRole({userId: user.data.email, roleId: res.data.id})).unwrap()
        //             .then(() => user.data)
        //             .catch((error) => Promise.reject(error))
        //     })
        //     .then((userData) => { //Get roles
        //         return institutionDispatch(viewAssignedRoles(userData.id)).unwrap()
        //             .then((assignedRoles) => {
        //                 institutionDispatch(setRoles(assignedRoles.data)) //Set Role
        //                 window.location.href = "/dashboard/home"
        //                 reset();
        //             })
        //             .catch((error) => Promise.reject(error))
        //     })
        //     .catch((error) => {
        //         console.error(error)

        //         const code = error.response.data.code

        //         if (code === 6)
        //             setError("name", {message: "Institution name already exists"})
        //     })
    }

    return (
        <UserForm
        //loading={authInstitution.loading || authRoles.loading || authUser.loading}
        title="Create Institution"
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        type="institution"
        inputs={inputs} />
    )
}

export default RegistrationInstitutionForm