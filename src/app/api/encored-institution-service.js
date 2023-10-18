import http from "./http-common";

class Institution {
    addInstitution(data) {
        return http.post("/institution/add", data)
    }

    viewInstitution(id) {
        console.log(id)
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