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

    deleteSubject(subjectId: string) {
        return http.delete(`/subject/delete/${subjectId}`)
    }

    deleteSubjectSchedule(subjectId: string) {
        return http.delete(`/subject/schedule/delete/${subjectId}`)
    }

    viewSubjectsByInstitution(institutionId: string) {
        return http.get(`/subject/list/u/${institutionId}`)
    }
}

export default new Subject