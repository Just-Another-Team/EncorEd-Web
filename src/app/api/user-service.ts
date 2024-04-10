import http from "./http-common"
import IUser from "../../data/IUser";

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

class UserService {
    private userCommon: string = "/user";

    addUser(user: IUser) {
        return http.post(`${this.userCommon}/add`, user)
    }

    updateUser(user: IUser) {
        return http.put(`${this.userCommon}/update/${user.USER_ID}`, user)
    }

    getUser(uid: string) {
        return http.get<IUser>(`${this.userCommon}/view/s/${uid}`)
    }

    getAllUsers(userArray: Array<IUser>) {
        return http.get<Array<IUser>>(`${this.userCommon}/view/all`, {
            data: userArray
        })
    }

    deleteUser(id: string) {
        return http.delete(`${this.userCommon}/delete/${id}`)
    }
}

export default new UserService()