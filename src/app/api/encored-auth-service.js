import http from "./http-common"
import { auth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "../firebase/authentication"

class EncorEdAuthService {
    signUp(data) {
        return http.post("/user/signUp", data)
    }

    async signIn(userData) {
        console.log("Signing In")

        //Sign in with firebase
        const account = await signInWithEmailAndPassword(auth, userData.emailUserName, userData.password)
            .then((result) => {

                const loggedIn = {
                    user: {
                        displayName: result.user.displayName,
                        email: result.user.email,
                    },
                    token: result.user.accessToken
                }

                return loggedIn
            })
            .catch((error) => {
                throw error
            })

        return account
    }

    async signOut() {
        console.log("Signing Out")

        await signOut(auth)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Maybe??
    userLoggedIn() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Logged In")
                console.log(user)
                
                
            } else {
                console.log("Logged Out")
                console.log(user)
            }
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
}

export default new EncorEdAuthService()