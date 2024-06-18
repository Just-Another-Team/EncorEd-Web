import ISubject from "../../data/ISubject";
import { QRCodeType } from "../../types/QRCodeType";
import http from "./http-common";

class SubjectService {
    private subjectCommon: string = "/subject";

    public add(data: ISubject) {
        return http.post(`${this.subjectCommon}/add`, data)
    }

    public addBatch(data: Array<ISubject>) {
        return http.post(`${this.subjectCommon}/add/multiple`, data)
    }


    public update(data: ISubject) {
        return http.put(`${this.subjectCommon}/update/${data.SUB_ID}`, data)
    }

    public assignInstructor(data: { SUB_ID: string, USER_ID: string }) {
        return http.patch(`${this.subjectCommon}/assign/${data.SUB_ID}/teacher`, data)
    }

    public assignRoom(data: QRCodeType) {
        return http.patch(`${this.subjectCommon}/assign/${data.SUB_ID}/room`, data)
    }

    public removeAssignInstructor(data: Array<string>) {
        return http.patch(`${this.subjectCommon}/assign/teacher/remove`, data)
    } 

    public view(id: string) {
        return http.get<ISubject>(`${this.subjectCommon}/view/s/${id}`)
    }

    public viewAll() {
        return http.get<Array<ISubject>>(`${this.subjectCommon}/view/all`)
    }

    public viewBySchedule(schedule: string) {
        return http.get<Array<ISubject>>(`${this.subjectCommon}/view/q/?currentTime=${schedule}`)
    }

    public deleteSubject(id: string) {
        return http.delete(`${this.subjectCommon}/delete/${id}`)
    }
}

export default new SubjectService()