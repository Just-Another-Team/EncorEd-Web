import ISubject from "../../types/ISubject";
import { QRCodeType } from "../../types/QRCodeType";
import http from "./http-common";

class SubjectService {
    private subjectCommon: string = "/subject";

    public add(data: ISubject) {
        return http.post(`${this.subjectCommon}/add`, data)
    }

    public update(data: ISubject) {
        return http.put(`${this.subjectCommon}/update/${data.SUB_ID}`, data)
    }

    public assignRoom(data: QRCodeType) {
        return http.patch(`${this.subjectCommon}/assign/${data.SUB_ID}/room`, data)
    }

    public view() {
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