import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"

const initialState = {
    loading: false,
    users: [],
    error: null
}

export const getUsers = createAsyncThunk(
    "/users/get",
    async (institutionId, {rejectWithValue}) => {
        return await EncorEdAuthService.getAllUsersByInstitution(institutionId)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

export const addUsers = createAsyncThunk(
    "/users/add",
    async (userData, {rejectWithValue}) => {
        return await EncorEdAuthService.addUser(userData)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        {
            builder.addCase(addUsers.pending, (state, actions) => {
                state.loading = true
            })
            builder.addCase(addUsers.fulfilled, (state, actions) => {
                state.loading = false
            })
            builder.addCase(addUsers.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
        }
        {
            builder.addCase(getUsers.pending, (state, action) => {
            state.loading = true
            state.users = []
            state.error = null
            })
            builder.addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload.data
                state.error = null
            })
            builder.addCase(getUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.payload
            })
        }
    }
})

export default usersSlice.reducer