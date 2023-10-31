import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"

const initialState = {
    loading: false,
    users: [],
    error: null
}

export const getUsers = createAsyncThunk(
    "/users/get/institution",
    async (institutionId, {rejectWithValue}) => {
        return await EncorEdAuthService.getAllUsersByInstitution(institutionId)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

export const getAllUsers = createAsyncThunk(
    "/users/get",
    async (_, {rejectWithValue}) => {
        return await EncorEdAuthService.getAll()
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
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

        {
            builder.addCase(getAllUsers.pending, (state, action) => {
                state.loading = true
                state.users = []
                state.error = null
            })
            builder.addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload.data
                state.error = null
            })
            builder.addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.payload
            })
        }
    }
})

export default usersSlice.reducer