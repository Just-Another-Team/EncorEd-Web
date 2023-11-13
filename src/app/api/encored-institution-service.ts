import { RegisterFormCredential } from "../../types/RegisterFormCredential";
import http from "./http-common";

class Institution {
    addInstitution(data: RegisterFormCredential) {

        const institution = {
            name: data.institution?.name,//reqInstitution.name,
            desc: data.institution?.desc,//reqInstitution.desc,
            createdBy: data.email,//reqInstitution.createdBy,
        }

        return http.post("/institution/add", institution)
    }

    // // assignInstitution(data) {
    // //     console.log(data)
    // //     return http.post(`/role/assign/${data.userId}`, data)
    // // }

    viewInstitution(id: string) {
        return http.get(`/institution/list/${id}`)
    }

    // viewInstitutions() {
    //     return http.get("/institution/list/all")
    // }

    // deleteInstitution(data) {
    //     console.log(data)
    // }

    // updateInstitution(data) {
    //     console.log(data)
    // }
}

export default new Institution