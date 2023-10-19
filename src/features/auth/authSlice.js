import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"
import storage from 'redux-persist/lib/storage'

const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null
}

export const signIn = createAsyncThunk(
    "user/signIn",
    async (userData, {rejectWithValue}) => {
        try {
            const signedIn = await EncorEdAuthService.signIn(userData) //userData.type !== "register" ? await EncorEdAuthService.signIn(userData) : await EncorEdAuthService.registerSignIn(userData)

            if (signedIn.code !== undefined) throw signedIn
            
            return signedIn
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const signUp = createAsyncThunk(
    "user/signUp",
    async (credential, {rejectWithValue}) => {
        const {firstName, lastName, email, userName, password} = credential

        return await EncorEdAuthService.signUp({firstName, lastName, email, userName, password})
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
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
        
        return await EncorEdAuthService.updateUser(data)
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
        setUser: (state, action) => {
            console.log(action.payload)

            // state.loading = false
            // state.user = action.payload.user
            // state.token = action.payload.token
            // state.error = false;
        },
        logOut: (state, action) => {
            state.loading = false
            state.user = null
            state.token = null
            state.error = null;
        }
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
                // state.user = null
                // state.token = null
                state.error = null
            })
            builder.addCase(assignInstitution.fulfilled, (state, actions) => {
                console.log("Assign Institution", actions.payload)
                state.loading = false
                // state.user = actions.payload.user
                // state.token = actions.payload.token
                state.error = null
            })
            builder.addCase(assignInstitution.rejected, (state, actions) => {
                console.error("Assign Institution", actions.payload)
                state.loading = false
                // state.user = null
                // state.token = null
                state.error = actions.payload
            })
        }

        //get User 
    }
})

export const { setUser, logOut } = authSlice.actions

// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
// export const currentSignIn = signIn
export default authSlice.reducer