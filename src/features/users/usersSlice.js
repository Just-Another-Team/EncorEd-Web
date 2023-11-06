import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"

const initialState = {
    loading: false,
    users: [],
    error: null
}

export const getUsers = createAsyncThunk(
    "/users/get/institution",
    async (userList, {rejectWithValue}) => {
        return await EncorEdAuthService.getAllUsersByInstitution(userList)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

export const getAllUsers = createAsyncThunk(
    "/users/get",
    async (_, {rejectWithValue}) => {
        return await EncorEdAuthService.getAll()
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

export const deleteUser = createAsyncThunk(
    "/users/delete",
    async (id, {rejectWithValue}) => {
        return await EncorEdAuthService.deleteUser(id)
            .then((res) => console.log(res))
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