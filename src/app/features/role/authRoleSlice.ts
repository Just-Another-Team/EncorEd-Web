import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncoredRoleService, { RoleInput } from "../../api/encored-role-service"
import { RegisterFormCredential } from "../../../types/RegisterFormCredential"

const initialState = {
    loading: false,
    data: [],
    error: null,
}

export const addAdminRole = createAsyncThunk(
    "role/admin/add",
    async (credential: RegisterFormCredential, {rejectWithValue}) => {
        return await EncoredRoleService.addAdminRole(credential)
                        .catch((error) => rejectWithValue(error))
    }
)

export const assignAdminRole = createAsyncThunk(
    "role/admin/assign",
    async (credential: RegisterFormCredential, {rejectWithValue}) => {
        return await EncoredRoleService.assignAdminRole(credential)
                        .catch((error) => rejectWithValue(error))
    }
)

export const getAssignedRoles = createAsyncThunk(
    "role/get/roles/assign",
    async (userId: string, {rejectWithValue}) => {
        return await EncoredRoleService.getAssignedRoles(userId).catch((error) => rejectWithValue(error))
    }    
)

// export const viewAssignedRoles = createAsyncThunk(
//     "role//assign/:id",
//     async (userId, {rejectWithValue}) => {
//         try {
//             const assignedRoles = await EncoredRoleService.getRoles(userId)
//             return assignedRoles
//         } catch (error) {
//             return rejectWithValue(error)
//         }
//     }
// )

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers:  {
        logOutRoles: (state) => {
            state.loading = false
            state.data = []
            state.error = null
        }
    },
    extraReducers: builder => {
        //Add Admin Role
        {
            builder.addCase(addAdminRole.pending, (state, actions) => {
                state.loading = true
            })
            builder.addCase(addAdminRole.fulfilled, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(addAdminRole.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Assign Role
        {
            builder.addCase(assignAdminRole.pending, (state) => {
                state.loading = true
            })
            builder.addCase(assignAdminRole.fulfilled, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.data = actions.payload.data
                state.error = null
            })
            builder.addCase(assignAdminRole.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //View Assigned Roles
        {
            builder.addCase(getAssignedRoles.pending, (state) => {
                state.loading = true
            })
            builder.addCase(getAssignedRoles.fulfilled, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.data = actions.payload.data
            })
            builder.addCase(getAssignedRoles.rejected, (state, actions: PayloadAction<any>) => {
                state.loading = false
                state.error = actions.payload
            })
        }
    }
})

export const { logOutRoles } = roleSlice.actions
export default roleSlice.reducer