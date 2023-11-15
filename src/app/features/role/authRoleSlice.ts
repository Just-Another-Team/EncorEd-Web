import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncoredRoleService, { RoleInput } from "../../api/encored-role-service"
import { RegisterFormCredential } from "../../../types/RegisterFormCredential"
import { Permission } from "../../../types/RoleTypes/Permission"
import { User } from "../users/usersSlice"

export type Role = {
    id?: string
    name?: string
    desc?: string
    institution?: string
    
    appAdmin?: boolean
    admin?: boolean
    employee?: boolean | Permission
    teacher?: boolean | Permission
    student?: boolean | Permission
    visitor?: boolean | Permission

    usersAssigned: Array<User>

    createdBy?: User | string
    creationDate?: string
    updatedBy?: string
    updatedDate?: string
    status?: string
}

export interface IAssignedRoleInitialState {
    loading: boolean
    data: Array<Role>
    error: any
}

const initialState: IAssignedRoleInitialState = {
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
    "role/admin/get/assign",
    async (userId: string, {rejectWithValue}) => {
        return await EncoredRoleService.getAssignedRoles(userId).catch((error) => rejectWithValue(error))
    }    
)

const assignRoleSlice = createSlice({
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
                state.error = null
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

export const { logOutRoles } = assignRoleSlice.actions
export default assignRoleSlice.reducer