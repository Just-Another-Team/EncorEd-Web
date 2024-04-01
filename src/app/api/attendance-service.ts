import http from "./http-common"
import IAttendance from "../../types/IAttendance";

class AttendanceService {
    private commonUrl: string = "attendance";

    viewAttendances() {
        return http.get<Array<IAttendance>>(`${this.commonUrl}/view/all`)
    }

    addAttendance(data: IAttendance) {
        return http.post<IAttendance>(`${this.commonUrl}/add`, data)
    }
}

export default new AttendanceService()