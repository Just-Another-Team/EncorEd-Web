import { createContext, useEffect, useState } from "react";
import IUser from "../data/IUser";
import authService from "../app/api/user-service";
import { EmailAuthProvider, UserCredential, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from '../app/firebase/config'

type AuthContextType = {
    login: (email: string, password: string) => Promise<UserCredential | void>;
    signOut: () => Promise<void>
    reauthenticate: (password: string) => Promise<UserCredential>
    user: IUser | null | undefined
    load: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderType = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [user, setUser] = useState<IUser | null>();
    const [load, setLoad] = useState<boolean>(true);

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(getAuth(), email, password)
            // .then((userCredential) => {
            //     sessionStorage.setItem('AuthToken', userCredential.user.refreshToken)
            // })
    }

    const reauthenticate = (password: string) => {
        const credential = EmailAuthProvider.credential(getAuth().currentUser?.email!, password)
        return reauthenticateWithCredential(getAuth().currentUser!, credential)
    }

    const signOut = () => {
        return getAuth().signOut()
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async (userAuth) => {
            if (userAuth) {
                const userSnapshot = await authService.getUser(userAuth.uid);
                const userData = userSnapshot.data;
                
                setUser({
                    USER_ID: userData.USER_ID,
                    USER_FULLNAME: userAuth.displayName as string,
                    USER_USERNAME: userData.USER_USERNAME,
                    USER_PASSWORD: userData.USER_PASSWORD,
                    ROLE_ID: userData.ROLE_ID,
                    DEPT_ID: userData.DEPT_ID,
                    USER_ISDELETED: userData.USER_ISDELETED,
                })
            } else {
                setUser(null)
            }

            setLoad(false)
        })

        return unsubscribe
    }, [])

    const value = {
        // currentUser,
        // getUser,
        login,
        signOut,
        reauthenticate,
        // signUp
        user,
        load
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}