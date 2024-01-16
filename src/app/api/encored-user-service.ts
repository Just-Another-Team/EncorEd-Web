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
import { userListObj } from "../../types/UserListObject";

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

    deleteUser(id: any) {
        return http.put(`/user/delete/${id}`)
    }

    // getAll() {
    //     return http.get("/user/list")
    // }
    
    getAllUsersByInstitution(userList: userListObj) {
        const {institution, user} = userList
        return http.get(`/user/list/u/${institution}/${user}` )
    }

    getAllUsers () {
        return http.get(`${this.authCommon}/list/`)
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

    viewUser(id: FixMeLater) {
        return http.get(`/user/profile/${id}`)
    }

    viewUserRoles(id: string) {
        return http.get(`/role/debug/user/${id}`)
    }

    assignUserToRole(data: FixMeLater) {
        return http.post(`/role/assign/`, data)
    }

    //password verification before action
    verifyPassword(data: FixMeLater){
        const { password } = data
        const userEmail: FixMeLater = auth.currentUser?.email
        const currentUser: FixMeLater = auth.currentUser

        const credentials = EmailAuthProvider.credential(userEmail, password)

        return reauthenticateWithCredential(currentUser, credentials)
    }

    editUserProfile(data: FixMeLater) {
        return http.put(`/user/edit/profile/${data.id}`, data)
    }

    userBanRestore(data: FixMeLater) {
        return http.put(`/user/ban-restore/${data.id}`, data)
    }

    viewAttendance(institution: string) {
        return http.get(`/attendance/report/${institution}`)
    }
}

export default new EncorEdUserService()