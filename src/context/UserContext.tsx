import { createContext, Dispatch, useEffect, useState } from "react";
import IUser, { UserRole } from "../data/IUser";
import userService from "../app/api/user-service";
import { AxiosResponse } from "axios";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../app/firebase/config";
import { converter } from "../types/converter";
import useDepartment from "../hooks/useDepartment";
import { useAuth } from "../hooks/useAuth";

type UserContextType = {
    users: Array<IUser>
    addUser: (user: IUser) => Promise<AxiosResponse<any, any>>
    addKiosk: (kiosk: IUser) => Promise<AxiosResponse<any, any>>
    updateUser: (user: IUser) => Promise<AxiosResponse<any, any>>
    updateKiosk: (kiosk: IUser) => Promise<AxiosResponse<any, any>>
    deleteUser: (userId: string) => Promise<AxiosResponse<any, any>>
    getCurrentUser: () => IUser | undefined
    getTeachers: () => Array<IUser>
    getKiosks: () => Array<IUser>
    getUsers: () => Array<IUser>
    getDeans: () => IUser[]
    getUser: (userId: string) => IUser | undefined,
    getUsersByCreator: (creatorId: string) => Array<IUser>,
    load: boolean,
    setLoad: Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

type UserProviderType = {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderType) => {
    const { user } = useAuth()
    const { departments } = useDepartment()

    const [users, setUsers] = useState<Array<IUser>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const addUser = (user: IUser) => {
        setLoad(true)
        return userService.addUser(user)
    }

    const addKiosk = (kiosk: IUser) => {
        setLoad(true)
        return userService.addKiosk(kiosk)
    }

    const updateUser = (user: IUser) => {
        setLoad(true)
        return userService.updateUser(user)
    }

    const updateKiosk = (kiosk: IUser) => {
        setLoad(true)
        return userService.updateKiosk(kiosk)
    }

    const deleteUser = (userId: string) => {
        setLoad(true)
        return userService.deleteUser(userId)
    }

    const getDeans = () => {
        return getUsers().filter(user => (user.ROLE_ID as UserRole).dean)
    }

    const getTeachers = () => {
        return getUsers().filter(user => (user.ROLE_ID as UserRole).teacher)
    }

    const getUsers = () => {
        return users.map((user): IUser => {
            const department = departments.find(department => department.DEPT_ID === user.DEPT_ID as string)

            return ({
                ...user,
                DEPT_ID: department ? department : null,
            })
        })
    }

    const getUsersByCreator = (creatorId: string) => {
        return users.filter(user => user.USER_CREATEDBY === creatorId).map((user): IUser => {
            const department = departments.find(department => department.DEPT_ID === user.DEPT_ID as string)

            return ({
                ...user,
                DEPT_ID: department ? department : null,
            })
        })
    }

    const getUser = (userId: string) => {
        return users.find(user => user.USER_ID === userId)
    }

    const getKiosks = () => {
        return users.filter(user => (user.ROLE_ID as UserRole).kiosk)
    }

    const getCurrentUser = () => {
        return users.find(userDb => userDb.USER_ID === user?.uid)
    }

    const userCollection = query(collection(db, '/User/').withConverter(converter<IUser>()))

    useEffect(() => {
        const fetchUsers = onSnapshot(userCollection, (snapshot) => {
            const userArray = snapshot.docs.map((user): IUser => {

                const userData = user.data()

                return ({
                    USER_ID: user.id,
                    ...userData,
                    USER_FULLNAME: (userData.ROLE_ID as UserRole).admin ? "admin" : `${userData.USER_FNAME} ${userData.USER_MNAME !== null ? userData.USER_MNAME : ""} ${userData.USER_LNAME}`
                })
            })

            setUsers(userArray)
        }, (error) => {
            console.error(error)
        })

        return () => {
            fetchUsers()
            setLoad(false)
        }
    }, [user])

    const value = {
        users,
        addUser,
        addKiosk,
        updateUser,
        updateKiosk,
        deleteUser,
        setLoad,
        getTeachers,
        getCurrentUser,
        getUsers,
        getDeans,
        getKiosks,
        getUser,
        getUsersByCreator,
        load,
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}