import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"
import storage from 'redux-persist/lib/storage'

const initialState = {
    loading: null,
    user: null,
    token: null,
    error: null
}

export const signIn = createAsyncThunk(
    "user/signIn",
    async (userData, {rejectWithValue}) => {
        return await EncorEdAuthService.signIn(userData)
            .then((res) => {
                //console.log(res.user.role.)
                //if (res.user.systemRole.user) throw "auth/user-invalid-role"

                return res
            })
            .catch((error) => rejectWithValue(error))
    }
)

export const signUp = createAsyncThunk(
    "user/signUp",
    async (credential, {rejectWithValue}) => {
        const {firstName, lastName, email, userName, password} = credential

        return await EncorEdAuthService.signUp({firstName, lastName, email, userName, password})
            .then((res) => {
                return res
            })
            .catch((error) => {
                return rejectWithValue(error)
            })
    }
)

export const getUser = createAsyncThunk(
    "user/viewUser",
    async (credential, {rejectWithValue}) => {
        //console.log(credential.user.email)
        return await EncorEdAuthService.get(credential.user.email)
            .then((res) => {
                return res.data
            })
            .catch((error) => rejectWithValue(error))
    }
)

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (data, {rejectWithValue}) => {
        return await EncorEdAuthService.updateUser()
            .then((res) => res.data)
            .catch((error) => rejectWithValue(error))
    }
)

export const logOutUser = createAsyncThunk(
    "user/signOut",
    async () => {
        return await EncorEdAuthService.signOut();
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.loading = false
            state.user = null
            state.token = null
            state.error = false;
        }
    },
    extraReducers: builder => {
        //Signing Up
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
            state.error = actions.payload
        })

        //Signing out
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

        //Signing up
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

        //get User 
    }
})

export const { setCredentials, logOut } = authSlice.actions

// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
// export const currentSignIn = signIn
export default authSlice.reducer