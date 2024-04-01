import { createContext, useEffect, useState } from "react";
import IDepartment from "../types/IDepartment";
import departmentService from "../app/api/department-service";
import { AxiosResponse } from "axios";

type DepartmentContextType = {
    departments: Array<IDepartment> | null | undefined
    addDepartment: (user: IDepartment) => Promise<AxiosResponse<any, any>>
    updateDepartment: (user: IDepartment) => Promise<AxiosResponse<any, any>>
    deleteDepartment: (userId: string) => Promise<AxiosResponse<any, any>>
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