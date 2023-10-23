import http from "./http-common";

class Institution {
    addInstitution(data) {
        return http.post("/institution/add", data)
    }

    // assignInstitution(data) {
    //     console.log(data)
    //     return http.post(`/role/assign/${data.userId}`, data)
    // }

    viewInstitution(id) {
        return http.get(`/institution/list/${id}`)
    }

    viewInstitutions() {
        return http.get("/institution/list/all")
    }

    deleteInstitution(data) {
        console.log(data)
    }

    updateInstitution(data) {
        console.log(data)
    }
}

export default new Institution