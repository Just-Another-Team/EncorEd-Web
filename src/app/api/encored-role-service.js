import http from "./http-common"

class EncorEdRoleService {
    async getRoles (id) {
        //console.log(data)
        return await http.get(`/role/assign/${id}`)
    }
}

export default new EncorEdRoleService();