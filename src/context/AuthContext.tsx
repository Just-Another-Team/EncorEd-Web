import { createContext, Dispatch, useEffect, useState } from "react";
import IUser from "../data/IUser";
import authService from "../app/api/user-service";
import { EmailAuthProvider, User, UserCredential, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, getAuth } from '../app/firebase/config'
import { AxiosResponse } from "axios";

type AuthError = { 
    isError: boolean,
    message: string | null
}

type AuthContextType = {
    login: (email: string, password: string) => Promise<UserCredential | void>;
    signOut: () => Promise<void>
    reauthenticate: (password: string) => Promise<UserCredential>
    getCredentials: (userId: string) => Promise<AxiosResponse<any, any>>
    user: User | null | undefined
    error: AuthError
    closeError: () => void
    load: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderType = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [user, setUser] = useState<User | null>();
    const [error, setError] = useState<AuthError>({
        isError: false,
        message: null
    })
    const [load, setLoad] = useState<boolean>(true);

    const closeError = () => setError((prev) => ({
        ...prev,
        isError: false,
    }))

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(getAuth(), email, password)
    }

    const reauthenticate = (password: string) => {
        const credential = EmailAuthProvider.credential(getAuth().currentUser?.email!, password)
        return reauthenticateWithCredential(getAuth().currentUser!, credential)
    }

    const signOut = () => {
        return getAuth().signOut()
    }

    const getCredentials = (userId: string) => {
        return authService.getUserCredentials(userId)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async (userAuth) => {
            console.log(userAuth)
            if (userAuth) {
                setUser(userAuth)
            } else {
                setUser(null)
            }

            setLoad(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const value = {
        login,
        signOut,
        reauthenticate,
        getCredentials,
        error,
        closeError,
        user,
        load
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}