import { createContext, Dispatch, useEffect, useState } from "react";
import IUser, { UserRole } from "../data/IUser";
import userService from "../app/api/user-service";
import { AxiosResponse } from "axios";
import { collection, DocumentReference, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../app/firebase/config";
import { converter } from "../types/converter";
import IDepartment from "../data/IDepartment";
import departmentService from "../app/api/department-service";

type UserContextType = {
    users: Array<IUser> | null | undefined
    addUser: (user: IUser) => Promise<AxiosResponse<any, any>>
    updateUser: (user: IUser) => Promise<AxiosResponse<any, any>>
    deleteUser: (userId: string) => Promise<AxiosResponse<any, any>>
    getTeachers: () => IUser[]
    load: boolean,
    setLoad: Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

type UserProviderType = {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderType) => {
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const addUser = (user: IUser) => {
        setLoad(true)
        return userService.addUser(user)
    }

    const updateUser = (user: IUser) => {
        setLoad(true)
        return userService.updateUser(user)
    }

    const deleteUser = (userId: string) => {
        setLoad(true)
        return userService.deleteUser(userId)
    }

    const getTeachers = () => {
        return users.filter(user => (user.ROLE_ID as UserRole).teacher)
    }

    const userCollection = query(collection(db, '/User/').withConverter(converter<IUser>()))

    useEffect(() => {
        const fetchUsers = onSnapshot(userCollection, async (snapshot) => {
            const userArray = await Promise.all(snapshot.docs.map(async (user): Promise<IUser> => {
                const userData = await userService.getUser(user.id)
                const department = await departmentService.view(user.data().DEPT_ID as string)

                return ({
                    USER_ID: user.id,
                    ...user.data() as IUser,
                    DEPT_ID: department.data,
                    USER_FULLNAME: userData.data.USER_FULLNAME
                })
            }))

            setUsers(userArray)
        }, (error) => {

        })

        return () => {
            fetchUsers()
            setLoad(false)
        }
    }, [load])

    const value = {
        users,
        addUser,
        updateUser,
        deleteUser,
        setLoad,
        getTeachers,
        load,
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}