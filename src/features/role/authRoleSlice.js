import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncoredRoleService from "../../app/api/encored-role-service"

const initialState = {
    loading: false,
    roleAssigned: [],
    error: null,
}

export const addAdminRole = createAsyncThunk(
    "role/admin/add",
    async (data, {rejectWithValue}) => {
        console.log("Add Role Thunk: ", data)
        try {
            const role = await EncoredRoleService.addAdminRole(data)
            return role
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const assignAdminRole = createAsyncThunk(
    "role/admin/assign",
    async (data, {rejectWithValue}) => {
        try {
            //Requires User Id and Role Id
            const role = await EncoredRoleService.assignRole(data)

            return role
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const viewAssignedRoles = createAsyncThunk(
    "role//assign/:id",
    async (userId, {rejectWithValue}) => {
        try {
            const assignedRoles = await EncoredRoleService.getRoles(userId)
            return assignedRoles
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const authRoleSlice = createSlice({
    name: 'role',
    initialState,
    //reducers: {},
    extraReducers: builder => {
        //Add Role
        {
            builder.addCase(addAdminRole.pending, (state, actions) => {
                state.loading = true
            })
            builder.addCase(addAdminRole.fulfilled, (state, actions) => {
                state.loading = false
            })
            builder.addCase(addAdminRole.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Assign Role
        {
            builder.addCase(assignAdminRole.pending, (state) => {
                state.loading = true
            })
            builder.addCase(assignAdminRole.fulfilled, (state) => {
                state.loading = false
            })
            builder.addCase(assignAdminRole.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //View Assigned Roles
        {
            builder.addCase(viewAssignedRoles.pending, (state) => {
                state.loading = true
            })
            builder.addCase(viewAssignedRoles.fulfilled, (state, actions) => {
                state.loading = false
                state.roleAssigned = actions.payload.data
            })
            builder.addCase(viewAssignedRoles.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
        }
    }
})

//export const { nextPage, reset } = roleSlice.actions
export default authRoleSlice.reducer