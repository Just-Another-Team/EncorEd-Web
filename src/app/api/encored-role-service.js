import http from "./http-common"

class EncorEdRoleService {
    addRole(data) {
        return http.post(`/role/admin/signUp`, data)
    }

    assignRole(data) {
        //Requires User Id and Role Id
        return http.post(`/role/assign`, data)
    }

    getRoles(id) {
        //console.log(data)
        return http.get(`/role/assign/${id}`)
    }
}

export default new EncorEdRoleService();