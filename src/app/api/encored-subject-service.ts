import { FixMeLater } from "../../types/FixMeLater";
import http from "./http-common";

class Subject {
    // addSubject(data) {
    //     console.log(data)
    // }

    //For Bulk add
    addSubjects(data: FixMeLater) {
        return http.post(`/subject/add/all`, data)
    }

    // updateSubject(data) {
    //     console.log(data)
    // }

    // deleteSubject(data) {
    //     console.log(data)
    // }

    // viewSubject(data) {
    //     console.log(data)
    // }

    viewSubjectsByInstitution(institutionId: string) {
        return http.get(`/subject/list/u/${institutionId}`)
    }
}

export default new Subject