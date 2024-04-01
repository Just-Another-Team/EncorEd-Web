import IDepartment from "../../types/IDepartment";
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

    viewAll() {
        return http.get<Array<IDepartment>>(`${this.departmentComment}/view/all`)
    }
}

export default new DepartmentService