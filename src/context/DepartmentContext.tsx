import { createContext, useEffect, useState } from "react";
import IDepartment from "../data/IDepartment";
import departmentService from "../app/api/department-service";
import { AxiosResponse } from "axios";
import { useUsers } from "../hooks/useUsers";
import IUser from "../data/IUser";
import { collection, onSnapshot } from "firebase/firestore";
import { converter } from "../types/converter";
import { db } from "../app/firebase/config";
import { useAuth } from "../hooks/useAuth";

type DepartmentContextType = {
    departments: Array<IDepartment>
    addDepartment: (user: IDepartment) => Promise<AxiosResponse<any, any>>
    updateDepartment: (user: IDepartment) => Promise<AxiosResponse<any, any>>
    deleteDepartment: (userId: string) => Promise<AxiosResponse<any, any>>
    getDepartments: (users: Array<IUser>) => Array<IDepartment>
    getDepartment: (departmentId: string) => IDepartment | undefined
    assignDean: (data: {DEPT_ID: string;USER_ID: string;}) => Promise<AxiosResponse<any, any>>
    load: boolean
}

export const DepartmentContext = createContext<DepartmentContextType>({} as DepartmentContextType);

type DepartmentProviderType = {
    children: React.ReactNode;
}

export const DepartmentProvider = ({ children }: DepartmentProviderType) => {
    const { user } = useAuth()

    const [ departments, setDepartments ] = useState<Array<IDepartment>>([]);
    const [ load, setLoad ] = useState<boolean>(true);

    const departmentCollection = collection(db, '/Department/').withConverter(converter<IDepartment>())

    const assignDean = (data: { DEPT_ID: string, USER_ID: string}) => {
        return departmentService.assignDean(data)
    }

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
        return departments.filter(department => !department.DEPT_ISDELETED).map((department): IDepartment => {

            const assignedUsers = users.filter(user => user.DEPT_ID === department.DEPT_ID).length

            return ({
                ...department,
                DEPT_NOOFUSERS: assignedUsers,
            })
        })
    }

    useEffect(() => {
        const fetchDepartmentSnapshot = onSnapshot(departmentCollection, (snapshot) => {
            const departmentDocs = snapshot.docs.map((department): IDepartment => {
                const attendanceData = department.data()

                return ({
                    DEPT_ID: department.id,
                    ...attendanceData,
                })
            })

            setDepartments(departmentDocs)
        }, (error) => {
            console.error('Attendance Context Error', error)
        })

        return () => {
            fetchDepartmentSnapshot()
            setLoad(false)
        }
    }, [user])

    const value = {
        departments,
        getDepartments,
        getDepartment,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        assignDean,
        load
    }

    return (
        <DepartmentContext.Provider value={value}>
            { children }
        </DepartmentContext.Provider>
    )
}

export default DepartmentContext