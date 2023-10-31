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

<<<<<<< HEAD
export const getAllUsers = createAsyncThunk(
    "/users/get",
    async (_, {rejectWithValue}) => {
        return await EncorEdAuthService.getAll()
=======
export const addUsers = createAsyncThunk(
    "/users/add",
    async (userData, {rejectWithValue}) => {
        return await EncorEdAuthService.addUser(userData)
>>>>>>> 28f2748b8b5c9139da3dd57c7505a9b10a52c6ff
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        {
<<<<<<< HEAD
            builder.addCase(getUsers.pending, (state, action) => {
                state.loading = true
                state.users = []
                state.error = null
=======
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
>>>>>>> 28f2748b8b5c9139da3dd57c7505a9b10a52c6ff
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
<<<<<<< HEAD

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
=======
>>>>>>> 28f2748b8b5c9139da3dd57c7505a9b10a52c6ff
    }
})

export default usersSlice.reducer