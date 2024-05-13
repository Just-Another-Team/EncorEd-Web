import { createContext, useEffect, useState } from "react";
import IDepartment from "../data/IDepartment";
import departmentService from "../app/api/department-service";
import { AxiosResponse } from "axios";
import { useUsers } from "../hooks/useUsers";
import IUser from "../data/IUser";

type DepartmentContextType = {
    departments: Array<IDepartment>
    addDepartment: (user: IDepartment) => Promise<AxiosResponse<any, any>>
    updateDepartment: (user: IDepartment) => Promise<AxiosResponse<any, any>>
    deleteDepartment: (userId: string) => Promise<AxiosResponse<any, any>>
    getDepartments: (users: Array<IUser>) => Array<IDepartment>
    getDepartment: (departmentId: string) => IDepartment | undefined
    load: boolean
}

export const DepartmentContext = createContext<DepartmentContextType>({} as DepartmentContextType);

type DepartmentProviderType = {
    children: React.ReactNode;
}

export const DepartmentProvider = ({ children }: DepartmentProviderType) => {
    const [ departments, setDepartments ] = useState<Array<IDepartment>>([]);
    const [ load, setLoad ] = useState<boolean>(true);

    const addDepartment = (department: IDepartment) => {
        setLoad(true)
        return departmentService.add(department)
    }

    const updateDepartment = (department: IDepartment) => {
        setLoad(true)
        return departmentService.update(department)
    }

    const deleteDepartment = (userId: string) => {
        setLoad(true)
        return departmentService.delete(userId)
    }
    
    const getDepartment = (departmentId: string) => {
        return departments.find(department => department.DEPT_ID === departmentId)
    }

    const getDepartments = (users: Array<IUser>) => {
        return departments.map((department): IDepartment => {

            const assignedUsers = users.filter(user => user.DEPT_ID === department.DEPT_ID).length

            return ({
                ...department,
                DEPT_NOOFUSERS: assignedUsers,
            })
        })
    }

    useEffect(() => {
        const fetchedDepartments = async () => {
            const response = await departmentService.viewAll()
            const responseData = response.data;

            setDepartments(responseData)
        }

        fetchedDepartments();
        setLoad(false)
    }, [load])

    const value = {
        departments,
        getDepartments,
        getDepartment,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        load
    }

    return (
        <DepartmentContext.Provider value={value}>
            { children }
        </DepartmentContext.Provider>
    )
}

export default DepartmentContext