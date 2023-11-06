import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"
import { resetPage } from "../navigation/navigationSlice"

const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null
}

const newInitialState = {
    loading: false,
    data: {},
    error: null
}

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

export const signIn = createAsyncThunk(
    "user/signIn",
    async (userData, {rejectWithValue}) => {
        try {
            const signedIn = await EncorEdAuthService.signIn(userData) //userData.type !== "register" ? await EncorEdAuthService.signIn(userData) : await EncorEdAuthService.registerSignIn(userData)
                .then((result) => {
                    const loggedIn = {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        token: result.user.accessToken,
                    }

                    return loggedIn
                })
                .catch((error) => Promise.reject(error))
            
            return signedIn
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const assignInstitution = createAsyncThunk(
    "/user/institution/assign",
    async (data, {rejectWithValue}) => {
        return await EncorEdAuthService.assignInstitution(data)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

export const logOutUser = createAsyncThunk(
    "user/signOut",
    async (_, {dispatch}) => {
        dispatch(resetPage())
        return await EncorEdAuthService.signOut();
    }
)

/* - - - - - CRUD - - - - - */

export const signUp = createAsyncThunk(
    "user/signUp",
    async (credential, {rejectWithValue}) => {
        const {firstName, lastName, email, userName, password} = credential

        return await EncorEdAuthService.signUp({firstName, lastName, email, userName, password})
            .catch((error) => rejectWithValue(error))
    }
)

export const getUser = createAsyncThunk(
    "user/view",
    async (email, {rejectWithValue}) => {
        //console.log(credential.user.email)
        return await EncorEdAuthService.get(email)
            .then((res) => res.data)
            .catch((error) => rejectWithValue(error))
    }
)

export const updateUser = createAsyncThunk(
    "user/update",
    async (data, {rejectWithValue}) => {
        return await EncorEdAuthService.updateUser(data)
            .then((res) => res.data)
            .catch((error) => rejectWithValue(error))
    }
)

export const verifyPassword = createAsyncThunk(
    "user/verify",
    async (data, {rejectWithValue}) => {
        return await EncorEdAuthService.verifyPassword(data)
        .then((res) => res.data)
        .catch((error) => rejectWithValue(error))
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // logOut: (state, action) => {
        //     state.loading = false
        //     state.user = null
        //     state.token = null
        //     state.error = null;
        // }
    },
    extraReducers: builder => {
        //Signing In
        {
            builder.addCase(signIn.pending, (state) => {
                state.loading = true
                state.user = null
                state.token = null
                state.error = null
            })
            builder.addCase(signIn.fulfilled, (state, actions) => {    
                state.loading = false
                state.user = actions.payload.user
                state.token = actions.payload.token
                state.error = null
            })
            builder.addCase(signIn.rejected, (state, actions) => {
                state.loading = false
                state.user = null
                state.token = null
                state.error = actions.payload.code
            })
        }

        //Signing out
        {
            builder.addCase(logOutUser.pending, (state, actions) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(logOutUser.fulfilled, (state, actions) => {
                state.loading = false
                state.user = null
                state.token = null
                state.error = null
            })
            builder.addCase(logOutUser.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Signing up
        {
            builder.addCase(signUp.pending, (state) => {
                state.loading = true
                state.user = null
                state.token = null
                state.error = null
            })
            builder.addCase(signUp.fulfilled, (state, actions) => {
                state.loading = false
                state.user = actions.payload.user
                state.token = actions.payload.token
                state.error = null
            })
            builder.addCase(signUp.rejected, (state, actions) => {
                state.loading = false
                state.user = null
                state.token = null
                state.error = actions.payload.response.data
            })
        }

        //Assign Institution
        {
            builder.addCase(assignInstitution.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(assignInstitution.fulfilled, (state, actions) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(assignInstitution.rejected, (state, actions) => {
                console.error("Assign Institution", actions.payload)
                state.loading = false
                state.error = actions.payload
            })
        }

        //Get User
        {
            builder.addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(getUser.fulfilled, (state, actions) => { 
                state.loading = false
                state.user = actions.payload
                state.error = null
            })
            builder.addCase(getUser.rejected, (state, actions) => {
                state.loading = false
                state.user = null
                state.token = null
                state.error = actions.payload.code
            })
        }

        //verify password
        {
            builder.addCase(verifyPassword.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(verifyPassword.fulfilled, (state, actions) => { 
                state.loading = false
                state.user = actions.payload
                state.error = null
            })
            builder.addCase(verifyPassword.rejected, (state, actions) => {
                state.loading = false
                state.user = null
                state.error = actions.payload.code
            })
        }
    }
})

// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
// export const currentSignIn = signIn
export default authSlice.reducer