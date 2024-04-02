import IRole from "../../types/IRole";
import http from "./http-common"


class RoleService {
    private roleCommon: string = "/role";

    add() {
        return http.post(`${this.roleCommon}/add`)
    }

    update() {

    }

    delete() {

    }

    viewAll() {
        return http.get<Array<IRole>>(`${this.roleCommon}/view/all`)
    }
}

export default new RoleService