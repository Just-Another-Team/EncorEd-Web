import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import EncorEdAuthService, { UserInput } from "../../api/encored-auth-service"
import EncorEdUserService from "../../api/encored-user-service"
import { resetPage } from "../navigation/navigationSlice"
import { RegisterFormCredential } from "../../../types/RegisterFormCredential"
import { LoginFormCredential } from "../../../types/LoginFormCredential"

type UserData = {
    id?: string
    institution?: string
    firstName?: string
    lastName?: string
    joinDate?: string
    addedBy?: string
    userName?: string
    email?: string
    password?: string
    isalumni?: boolean
    status?: string
}

export type InitialAuthType = {
    loading?: boolean,
    data: UserData,
    error?: any
}

const initialState: InitialAuthType = {
    loading: false,
    data: {
        id: "",
        institution: "",
        firstName: "",
        lastName: "",
        joinDate: "",
        addedBy: "",
        userName: "",
        email: "",
        isalumni: false,
        status: ""
    },
    error: null
}

export const signUp = createAsyncThunk(
    "user/signUp",
    async (credential: RegisterFormCredential, {rejectWithValue}) => {
        const {
            firstName,
            lastName,
            email,
            userName,
            password,
            institution,
            addedBy = email,
            isalumni = false,
        } = credential

        return await EncorEdAuthService.signUp({firstName, lastName, email, userName, password, institution,addedBy, isalumni})
            .catch((error) => rejectWithValue(error))
    }
)

export const emailExist = createAsyncThunk(
    "user/emailExist",
    async (credential: RegisterFormCredential, {rejectWithValue}) => {
        return await EncorEdAuthService.signUpDbExists(credential)
    }
)

export const getUser = createAsyncThunk(
    'user/get',
    async (credential: RegisterFormCredential | LoginFormCredential, {rejectWithValue}) => {
        return await EncorEdAuthService.getUser(credential.email!)
    }
)

//later
// export const userNameExist = createAsyncThunk(
//     "user/userNameExist",
//     async (credential: RegisterFormCredential, {rejectWithValue}) => {
//         return await EncorEdAuthService.signUpDbExists(credential)
//     }
// )

export const signIn = createAsyncThunk(
    "user/signIn",
    async (credential: LoginFormCredential, {rejectWithValue}) => {
        return await EncorEdAuthService.signIn(credential)
            .catch((error) => rejectWithValue(error));
    }
)

export const updateUser = createAsyncThunk(
    "user/update",
    async (data: RegisterFormCredential, {rejectWithValue}) => {
        console.log("Auth Slice Data", data)
        return await EncorEdAuthService.updateUser(data)
                .catch((error) => rejectWithValue(error))
    }
)

/*
    Things that will be persisted in the page:
    - user (logged in)
    - institution
    - role
    - pageSelect

    Things that will not be persisted:
    - authentication (Log in)
    - subjects
    - events
    - groups
    - roles
    - users
    - floor plans
*/

// export const assignInstitution = createAsyncThunk(
//     "/user/institution/assign",
//     async (data, {rejectWithValue}) => {
//         return await EncorEdAuthService.assignInstitution(data)
//             .then((res) => res)
//             .catch((error) => rejectWithValue(error))
//     }
// )

// export const logOutUser = createAsyncThunk(
//     "user/signOut",
//     async (_, {dispatch}) => {
//         dispatch(resetPage())
//         return await EncorEdAuthService.signOut();
//     }
// )

// /* - - - - - CRUD - - - - - */

// export const getUser = createAsyncThunk(
//     "user/view",
//     async (email, {rejectWithValue}) => {
//         //console.log(credential.user.email)
//         return await EncorEdAuthService.get(email)
//             .then((res) => res.data)
//             .catch((error) => rejectWithValue(error))
//     }
// )

// export const updateUser = createAsyncThunk(
//     "user/update",
//     async (data, {rejectWithValue}) => {
//         return await EncorEdAuthService.updateUser(data)
//             .then((res) => res.data)
//             .catch((error) => rejectWithValue(error))
//     }
// )

export const verifyPassword = createAsyncThunk(
    "user/verify",
    async (data: any, {rejectWithValue}) => {
        return await EncorEdUserService.verifyPassword(data)
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<any>) => {
            state.data = action.payload.data;
        },
        logOut: (state) => {
            state.loading = false
            state.data = {
                id: "",
                institution: "",
                firstName: "",
                lastName: "",
                joinDate: "",
                addedBy: "",
                userName: "",
                email: "",
                isalumni: false,
                status: ""
            }
            state.error = null;
        }
    },
    extraReducers: builder => {
        //Sign Up
        {
            builder.addCase(signUp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(signUp.fulfilled, (state, actions: PayloadAction<any>) => {    
                state.loading = false
                state.data = {
                    id: "",
                    institution: "",
                    firstName: "",
                    lastName: "",
                    joinDate: "",
                    addedBy: "",
                    userName: "",
                    email: "",
                    isalumni: false,
                    status: ""
                }
                state.error = null
            })
            builder.addCase(signUp.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Email Exist
        {
            builder.addCase(emailExist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(emailExist.fulfilled, (state, actions: PayloadAction<any>) => {    
                state.loading = false
                state.error = null
            })
            builder.addCase(emailExist.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Sign In
        {
            builder.addCase(signIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(signIn.fulfilled, (state, actions: PayloadAction<any>) => {    
                state.loading = false
                state.error = null
            })
            builder.addCase(signIn.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Get Signed In User
        {
            builder.addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(getUser.fulfilled, (state, actions: PayloadAction<any>) => {    
                state.loading = false
                state.error = null
            })
            builder.addCase(getUser.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Update User
        {
            builder.addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(updateUser.fulfilled, (state, actions: PayloadAction<any>) => {    
                state.loading = false
                state.error = null
            })
            builder.addCase(updateUser.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }
    }
})
//     extraReducers: builder => {
//         //Signing In
//         {
//             builder.addCase(signIn.pending, (state) => {
//                 state.loading = true
//                 state.user = null
//                 state.token = null
//                 state.error = null
//             })
//             builder.addCase(signIn.fulfilled, (state, actions) => {    
//                 state.loading = false
//                 state.user = actions.payload.user
//                 state.token = actions.payload.token
//                 state.error = null
//             })
//             builder.addCase(signIn.rejected, (state, actions) => {
//                 state.loading = false
//                 state.user = null
//                 state.token = null
//                 state.error = actions.payload.code
//             })
//         }

//         //Signing out
//         {
//             builder.addCase(logOutUser.pending, (state, actions) => {
//                 state.loading = true
//                 state.error = null
//             })
//             builder.addCase(logOutUser.fulfilled, (state, actions) => {
//                 state.loading = false
//                 state.user = null
//                 state.token = null
//                 state.error = null
//             })
//             builder.addCase(logOutUser.rejected, (state, actions) => {
//                 state.loading = false
//                 state.error = actions.payload
//             })
//         }

//         //Signing up
//         {
//             builder.addCase(signUp.pending, (state) => {
//                 state.loading = true
//                 state.user = null
//                 state.token = null
//                 state.error = null
//             })
//             builder.addCase(signUp.fulfilled, (state, actions) => {
//                 state.loading = false
//                 state.user = actions.payload.user
//                 state.token = actions.payload.token
//                 state.error = null
//             })
//             builder.addCase(signUp.rejected, (state, actions) => {
//                 state.loading = false
//                 state.user = null
//                 state.token = null
//                 state.error = actions.payload.response.data
//             })
//         }

//         //Assign Institution
//         {
//             builder.addCase(assignInstitution.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             builder.addCase(assignInstitution.fulfilled, (state, actions) => {
//                 state.loading = false
//                 state.error = null
//             })
//             builder.addCase(assignInstitution.rejected, (state, actions) => {
//                 console.error("Assign Institution", actions.payload)
//                 state.loading = false
//                 state.error = actions.payload
//             })
//         }

//         //Get User
//         {
//             builder.addCase(getUser.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             builder.addCase(getUser.fulfilled, (state, actions) => { 
//                 state.loading = false
//                 state.user = actions.payload
//                 state.error = null
//             })
//             builder.addCase(getUser.rejected, (state, actions) => {
//                 state.loading = false
//                 state.user = null
//                 state.token = null
//                 state.error = actions.payload.code
//             })
//         }

//         //verify password
//         {
//             builder.addCase(verifyPassword.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             builder.addCase(verifyPassword.fulfilled, (state, actions) => {
//                 console.log("Payload", actions.payload)
//                 state.loading = false
//                 state.user = actions.payload
//                 state.error = null
//             })
//             builder.addCase(verifyPassword.rejected, (state, actions) => {
//                 state.loading = false
//                 state.user = null
//                 state.error = actions.payload.code
//             })
//         }
//     }
// })

// // export const selectCurrentUser = (state) => state.auth.user
// // export const selectCurrentToken = (state) => state.auth.token
// // export const currentSignIn = signIn
export const { logOut, register } = authSlice.actions
export default authSlice.reducer