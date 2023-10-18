import http from "./http-common"
import {
    auth,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signOut 
} from "../firebase/authentication"
import EncoredRoleService from "./encored-role-service"
import EncoredInstitutionService from "./encored-institution-service"

class EncorEdAuthService {
    async signUp(data) {
        return await http.post("/user/signUp", data)
    }

    //These functions should be in the backend. Not here
    async signIn(userData) {
        console.log("Signing In")

        const account = await signInWithEmailAndPassword(auth, userData.emailUserName, userData.password)
            .then(async (result) => {

                //Get User data
                const userData = await this.get(result.user.email)
                    .then((res) => res)
                    .catch((error) => {throw error})

                //Get User Role
                const userRole = await EncoredRoleService.getRoles(result.user.email)
                    .then((res) => res)
                    .catch((error) => {throw error})

                //Get User Institution
                const userInstitution = await EncoredInstitutionService.viewInstitution(userData.data.institution)
                    .then((res) => res)
                    .catch((error) => {throw error})

                //Get Events from Institution
                const loggedIn = {
                    user: {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        role: userRole.data,
                        ...userData.data,
                        institution: userInstitution.data,
                        //role
                    },
                    token: result.user.accessToken,
                    userData,
                }

                console.log(loggedIn)

                return loggedIn
            })
            .catch((error) => {
                throw error
            })

        return account
    }

    async signOut() {
        console.log("Signing Out")

        return await signOut(auth)
            .then((res) => {
                return res
            })
            .catch((error) => {
                throw error
            })
    }

    //For User only
    addUser(data) {
        return http.post("/user/add", data)
    }

    updateUser(data) {
        const {id, userData} = data
        
        return http.put(`/user/update/${id}`, userData)
    }

    deleteUser(data) {
        const {id} = data
        return http.put(`/user/update/${id}`)
    }

    getAll() {
        return http.get("/user/list")
    }

    get(data) {
        return http.get(`/user/list/${data}`)
    }
}

export default new EncorEdAuthService()