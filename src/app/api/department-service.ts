import IDepartment from "../../data/IDepartment";
import http from "./http-common"


class DepartmentService {
    private departmentComment: string = "/department";

    add(data: IDepartment) {
        return http.post(`${this.departmentComment}/add`, data)
    }

    update(data: IDepartment) {
        return http.put(`${this.departmentComment}/update/${data.DEPT_ID}`, data)
    }

    delete(departmentID: string) {
        return http.delete(`${this.departmentComment}/delete/${departmentID}`)
    }

    assignDean(data: { DEPT_ID: string, USER_ID: string}) {
        return http.patch(`${this.departmentComment}/assign/${data.DEPT_ID}/dean`, data)
    }

    view(departmentID: string) {
        return http.get<IDepartment>(`${this.departmentComment}/view/s/${departmentID}`)
    }

    viewAll() {
        return http.get<Array<IDepartment>>(`${this.departmentComment}/view/all`)
    }
}

export default new DepartmentService