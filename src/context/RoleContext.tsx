import { createContext, useEffect, useState } from "react";
import IRole from "../data/IRole";
import roleService from "../app/api/role-service";

type RoleContextType = {
    roles: Array<IRole> | null | undefined
    load: boolean
}

export const RoleContext = createContext<RoleContextType>({} as RoleContextType);

type RoleProviderType = {
    children: React.ReactNode;
}

export const RoleProvider = ({ children }: RoleProviderType) => {
    const [ roles, setRoles ] = useState<Array<IRole>>([]);
    const [ load, setLoad ] = useState<boolean>(true);

    useEffect(() => {
        const fetchedRoles = async () => {
            const response = await roleService.viewAll()
            const responseData = response.data;

            setRoles(responseData)
        }

        fetchedRoles();
        setLoad(false)
    }, [load])

    const value = {
        roles,
        load
    }

    return (
        <RoleContext.Provider value={value}>
            { children }
        </RoleContext.Provider>
    )
}

export default RoleContext