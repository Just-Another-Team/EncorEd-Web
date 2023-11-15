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

class EncorEdUserService {
    private authCommon: string = "/user";

    // getUser(credential: RegisterFormCredential) {
    //     return http.get(`${this.authCommon}/list/${credential.email}`)
    // }

    //These functions should be in the backend. Not here
    //This is where the problem lies (Loading taking too long)
    //Do not make then async await in this class

    // //For User only
    
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
    
    getAllUsersByInstitution(institution: string | undefined, user: string | undefined) {
        return http.get(`/user/list/u/${institution}/${user}` )
    }

    addUser(data: FixMeLater) {
        const user: UserInput = {
            institution: data.institution,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userName: data.userName,
            addedBy: data.addedBy,
            isalumni: false,
            password: data.password,
        }

        return http.post("/user/add", user)
    }

    // get(email) {
    //     console.log("Email", email)
    //     return http.get(`/user/list/${email}`)
    // }

    // viewUser(data) {
    //     return http.get(`/user/profile/${data}`)
    // }

    // //password verification before action
    // verifyPassword(data){
    //     const { password } = data

    //     const credentials = EmailAuthProvider.credential(auth.currentUser.email, password)

    //     return reauthenticateWithCredential(auth.currentUser, credentials)
    // }
}

export default new EncorEdUserService()