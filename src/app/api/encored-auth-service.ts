import http from "./http-common"
import {
    auth,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signOut,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "../firebase/authentication"
import { RegisterFormCredential } from "../../types/RegisterFormCredential"
import { FixMeLater } from "../../types/FixMeLater";

export type UserInput = {
    institution?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    userName?: string,
    addedBy?: string,
    isalumni?: boolean,
    password?: string,
}

class EncorEdAuthService {
    private authCommon: string = "/user";

    signUp(data: RegisterFormCredential) {
        
        const userInput: UserInput = {
            institution: data.institution?.name.toLowerCase().replace(/\s/g,''),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userName: data.userName,
            addedBy: data.addedBy,
            isalumni: data.isalumni,
            password: data.password,
        }

        return http.post(`${this.authCommon}/add`, userInput)
    }

    signUpDbExists(data: RegisterFormCredential) {
        return http.get(`${this.authCommon}/exist/${data.email}`)
    }

    signUpAuthExists(data: RegisterFormCredential) {
        return http.get(`${this.authCommon}/list/auth/${data.email}`)
    }

    signIn(credential: RegisterFormCredential) {
        //Sign in with token
        return signInWithEmailAndPassword(auth, credential.email!, credential.password!)
    }

    getUser(credential: RegisterFormCredential) {
        return http.get(`${this.authCommon}/list/${credential.email}`)
    }

    //These functions should be in the backend. Not here
    //This is where the problem lies (Loading taking too long)
    //Do not make then async await in this class
    // async signIn(credential) {
    //     console.log("Signing In")

    //     console.log(credential)

    //     //Get User data
    //     const userData = await this.get(credential.emailUserName)
    //         .then((res) => res)
    //         .catch((error) => error)

    //     //If backend refused to connect
    //     if (userData.code === "ERR_NETWORK")
    //         return userData

    //     const account = await signInWithEmailAndPassword(auth, credential.emailUserName, credential.password)
    //         .then(async (result) => {

    //             //Get User Roles
    //             // const userRole = credential.type !== "register" ? await EncoredRoleService.getRoles(result.user.email)
    //             //     .then((res) => res)
    //             //     .catch((error) => {throw error}) : null

    //             //Get User Institution
    //             // const userInstitution = await EncoredInstitutionService.viewInstitution(userData.data.institution)
    //             //     .then((res) => res)
    //             //     .catch((error) => {throw error})

    //             //Get Events from Institution
                
    //             const loggedIn = {
    //                 user: {
    //                     displayName: result.user.displayName,
    //                     email: result.user.email,
    //                     ...userData.data,
    //                 },
    //                 token: result.user.accessToken,
    //                 userData,
    //             }

    //             return loggedIn
    //         })
    //         .catch((error) => {
    //             //This is expensive
    //             console.log("Error Catched from Sign In", error)
    //             return error
    //         })

    //     return account
    // }

    // async registerSignIn(credential) {
    //     console.log("Signing In")

    //     const account = await signInWithEmailAndPassword(auth, credential.emailUserName, credential.password)
    //         .then(async (result) => {
    //             console.log(credential)

    //             //Get User data
    //             const userData = await this.get(result.user.email)
    //                 .then((res) => res)
    //                 .catch((error) => {throw error})

    //             //Get Events from Institution
    //             const loggedIn = {
    //                 user: {
    //                     displayName: result.user.displayName,
    //                     email: result.user.email,
    //                     ...userData.data,
    //                 },
    //                 token: result.user.accessToken,
    //                 userData,
    //             }

    //             console.log(loggedIn)

    //             return loggedIn
    //         })
    //         .catch((error) => {
    //             throw error
    //         })

    //     return account
    // }

    // signOut() {
    //     return signOut(auth)
    // }

    // assignInstitution(data) {
    //     console.log(data)
    //     return http.patch(`/user/institution/assign`, data)
    // }

    // //For User only
    // addUser(data) {
    //     return http.post("/user/add", data)
    // }

    // updateUser(data) {
    //     const {id, firstName, lastName, email, password} = data
    //     return http.put(`/user/update/${id}`, {firstName, lastName, email, password})
    // }

    // deleteUser(id) {
    //     return http.put(`/user/delete/${id}`)
    // }

    // getAll() {
    //     return http.get("/user/list")
    // }
    
    // getAllUsersByInstitution(userList) {
    //     const {userInstitution, currUser} = userList
    //     return http.get(`/user/list/u/${userInstitution}/${currUser}` )
    // }

    // get(email) {
    //     console.log("Email", email)
    //     return http.get(`/user/list/${email}`)
    // }

    // viewUser(data) {
    //     return http.get(`/user/profile/${data}`)
    // }

    // //password verification before action
    // verifyPassword(data: FixMeLater){
    //     const { password } = data

    //     const credentials = EmailAuthProvider.credential(auth.currentUser?.email, password)

    //     return reauthenticateWithCredential(auth.currentUser, credentials)
    // }
}

export default new EncorEdAuthService()