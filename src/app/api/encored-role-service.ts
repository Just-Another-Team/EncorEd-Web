import { RegisterFormCredential } from "../../types/RegisterFormCredential";
import { Permission } from "../../types/RoleTypes/Permission";
import http from "./http-common"

export type RoleInput = {
    name: string,
    desc: string,
    //type: reqRole.type, < For identifying only
    institution?: string,
    type?: string;

    permission?: Permission,

	creationDate?: Date,
    
	createdBy?: string,
    updatedBy?: string,
}

export type AssignRoleInput = {
    userId?: string;
    roleId?: string;
}

class EncorEdRoleService {
    addAdminRole(data: RegisterFormCredential) {
        const adminRole: RoleInput = {
            name: "admin",
            desc: `Institutional admin of ${data.institution?.name}`,
            institution: data.institution?.name.toLowerCase().replace(/\s/g,''),
            type: "admin",
            createdBy: data.email
        }

        console.log("Add Admin Role Thunk", adminRole)

        return http.post(`/role/add`, adminRole)
    }

    assignAdminRole(data: RegisterFormCredential) {
        //Requires User Id and Role Id

        const assignedData: AssignRoleInput = {
            userId: data.email,
            roleId: `${data.institution?.name.toLowerCase().replace(/\s/g,'')}-admin`
        }

        return http.post(`/role/assign`, assignedData)
    }

    getAssignedRoles(userId: string) {
        return http.get(`/role/assign/user/${userId}`)
    }

    // getRoles(id) {
    //     //console.log(data)
    //     return http.get(`/role/assign/${id}`)
    // }

    // addRole(data) {
    //     return http.post('/role/add', data);
    // }
}

export default new EncorEdRoleService();