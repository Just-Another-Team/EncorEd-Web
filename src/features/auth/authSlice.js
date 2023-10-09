import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"

const initialState = {
    loading: null,
    user: null,
    token: null,
    error: null
}

export const signIn = createAsyncThunk(
    "user/signUp",
    async ({emailUserName, password}, {rejectWithValue}) => {
        try {
            const user = await EncorEdAuthService.signIn({emailUserName, password})

            return user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const logOutUser = createAsyncThunk(
    "user/signOut",
    async () => {
        await EncorEdAuthService.signOut();
        localStorage.removeItem('user')
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
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
    }
})

export const { setCredentials } = authSlice.actions

// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
// export const currentSignIn = signIn
export default authSlice.reducer