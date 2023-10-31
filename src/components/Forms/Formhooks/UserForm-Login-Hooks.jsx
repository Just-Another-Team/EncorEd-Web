import {useForm} from 'react-hook-form'
import UserForm from '../UserForm';
import { getUser, signIn } from '../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { viewAssignedRoles } from '../../../features/role/authRoleSlice';
import { setUser } from '../../../features/user/userSlice';
import { setInstitution } from '../../../features/institution/institutionSlice';
import { getInstitution } from '../../../features/institution/authInstitution';
import { setRoles } from '../../../features/role/roleSlice';
import { useNavigate } from 'react-router-dom'

// Firebase Client Side SDK should be here

const LoginUserForm = () => {
    const loginDispatch = useDispatch();

    const user = useSelector(state => state.authentication)
    const institution = useSelector(state => state.authInstitution)
    const roles = useSelector(state => state.authRole)
    const assignedRole = useSelector(state => state.roles);

    let navigate = useNavigate()

    const {handleSubmit, reset, control, setValue, setError, formState: {errors}} = useForm({
        defaultValues: {
            emailUserName: "",
            password: ""
        }
    });

    const inputs = [
        {key: 'emailUserName', label: "Email", type: "email", error: errors.emailUserName},
        {key: 'password', label: "Password", type: "password", error: errors.password}
    ]

    const onSubmit = async (credentials) => {
        await loginDispatch(getUser(credentials.emailUserName)).unwrap()
            .then((userData) => {
                return loginDispatch(signIn({emailUserName: userData.id, password: credentials.password})).unwrap()
                    .then((userAuth) => {
                        return loginDispatch(setUser(Object.assign(userAuth, {...userData}))).payload
                    })
                    .then((setUserRes) => {
                        //Get Institution
                        return loginDispatch(getInstitution(setUserRes.institution)).unwrap()
                            .then((getInstitutionRes) => {
                                loginDispatch(setInstitution(getInstitutionRes.data))
                                return setUserRes
                            })
                            .catch((error) => Promise.reject(error))
                    })
                    .then((setUserRes) => { //Get Role
                        return loginDispatch(viewAssignedRoles(setUserRes.id)).unwrap()
                            .then((assignedRoles) => {
                                console.log(assignedRoles)
                                loginDispatch(setRoles(assignedRoles.data))

                                navigate((assignedRoles.data.find(data => data._systemRole._admin) || assignedRoles.data.find(data => data._systemRole._employee) && "/dashboard/home") || (assignedRoles.data.find(data => data._systemRole._superAdmin) && "/admin/dashboard/home"))
                                reset();
                            })
                            .catch((error) => Promise.reject(error))
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                console.error(error)

                if (error.code === "ERR_BAD_REQUEST" && error.response.data.code === "firestore/missing-email") setError("emailUserName", {message: "Email not found in the system's database. Please register"})

                if (error.code === 'auth/missing-email') setError("emailUserName", {message: "Email not found in the system's database. Please register"})

                if (error.code === "auth/network-request-failed") setError("emailUserName", {message: "Cannot log in. Please check your internet connection."})

                if (error.code === "ERR_NETWORK") setError("emailUserName", {message: `${error.message}.`})

                if (error.code === "auth/too-many-requests") setError("emailUserName", {message: `${error.message}.`})

                if (error.code === "auth/user-invalid-role") setError("emailUserName", {message: "User does not contain the level of authentication needed to use the web"})

                if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") setError("emailUserName", {message: "Invalid email or username"})

                if (error.code === "auth/wrong-password") setError("password", {message: "Invalid password"})
            })
    }

    return <UserForm loading={user.loading || institution.loading || roles.loading} type={"login"} title="Login" submitName='LOGIN' inputs={inputs} control={control} errors={errors} onSubmit={onSubmit} handleSubmit={handleSubmit} />
}

export default LoginUserForm