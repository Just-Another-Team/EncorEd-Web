import http from "./http-common"
import {
    auth,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signOut 
} from "../firebase/authentication"
import encoredRoleService from "./encored-role-service"

class EncorEdAuthService {
    async signUp(data) {
        return await http.post("/user/signUp", data)
    }

    async signIn(userData) {
        console.log("Signing In")

        if (userData.token) {
            const account = await signInWithCustomToken(auth, userData.token)
                .then(async (result) => {

                    const userData = await this.get(result.user.email)
                        .then((res) => res)
                        .catch((error) => {throw error})

                    const loggedIn = {
                        user: {
                            displayName: result.user.displayName,
                            email: result.user.email,
                            ...userData.data,
                        },
                        token: result.user.accessToken,
                    }

                    return loggedIn
                })
                .catch((error) => {
                    throw error
                })

            return account
        }

        if (userData.emailUserName && userData.password) {
            const account = await signInWithEmailAndPassword(auth, userData.emailUserName, userData.password)
                .then(async (result) => {

                    const userData = await this.get(result.user.email)
                        .then((res) => res)
                        .catch((error) => {throw error})

                    // Works only for institutional admins assigning a role
                    // const assignedRoles = await encoredRoleService.getRoles(result.user.email);
                    // console.log("roles", assignedRoles.data)

                    const loggedIn = {
                        user: {
                            displayName: result.user.displayName,
                            email: result.user.email,
                            ...userData.data,
                            //role
                        },
                        token: result.user.accessToken,
                        userData,
                    }

                    return loggedIn
                })
                .catch((error) => {
                    throw error
                })

            return account
        }
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