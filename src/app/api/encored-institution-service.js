import http from "./http-common";

class Institution {
    addInstitution(data) {
        return http.post("/institution/add", data)
    }

    viewInstitution(data) {
        console.log(data)
        //return httpCommon.get("/institution/list/id")
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