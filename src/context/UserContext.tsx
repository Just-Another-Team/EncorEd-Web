import { createContext, useEffect, useState } from "react";
import IUser from "../types/IUser";
import userService from "../app/api/auth-service";
import { AxiosResponse } from "axios";

type UserContextType = {
    users: Array<IUser> | null | undefined
    addUser: (user: IUser) => Promise<AxiosResponse<any, any>>
    updateUser: (user: IUser) => Promise<AxiosResponse<any, any>>
    deleteUser: (userId: string) => Promise<AxiosResponse<any, any>>
    load: boolean
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

    useEffect(() => {
        const fetchUsers = async () => {
            const userResponse = await userService.getAllUsers()
            const userData = userResponse.data;

            setUsers(userData)
        }

        fetchUsers();
        setLoad(false)
    }, [load])

    const value = {
        users,
        addUser,
        updateUser,
        deleteUser,
        load,
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}