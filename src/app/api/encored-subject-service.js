import http from "./http-common";

class Subject {
    addSubject(data) {
        console.log(data)
    }

    //For Bulk add
    addSubjects(data) {
        console.log(data)
    }

    updateSubject(data) {
        console.log(data)
    }

    deleteSubject(data) {
        console.log(data)
    }

    viewSubject(data) {
        console.log(data)
    }

    viewSubjects() {
        return http.get("/subject/list")
    }
}

export default new Subject