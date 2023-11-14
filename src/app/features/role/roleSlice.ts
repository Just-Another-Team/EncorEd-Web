import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EncoredRoleService, { RoleInput } from "../../api/encored-role-service";
import { Role } from "./authRoleSlice";
import { FixMeLater } from "../../../types/FixMeLater";

interface RoleInitialState {
    loading: boolean
    data: Array<Role>
    error: any
}

export type UpdateRoleInput = {
    roleId: string,
    roleInput: RoleInput
}

const initialState: RoleInitialState = {
    loading: false,
    data: [],
    error: null,
}

export const addRole = createAsyncThunk(
    "role/add",
    async (roleData: RoleInput, {rejectWithValue}) => {
        return await EncoredRoleService.addRole(roleData).catch(error => rejectWithValue(error))
    }
)

export const getRolesByInstitution = createAsyncThunk(
    "role/institution/view",
    async (roleId: string, {rejectWithValue}) => {
        return await EncoredRoleService.getRolesByInstitution(roleId).catch(error => rejectWithValue(error))
    }
)

export const updateRole = createAsyncThunk(
    "role/institution/update",
    async ({ roleId, roleInput }: UpdateRoleInput, {rejectWithValue}) => {
        return await EncoredRoleService.updateRole(roleId, roleInput).catch(error => rejectWithValue(error))
    }
)

export const deleteRole = createAsyncThunk(
    "role/institution/delete",
    async (institutionId: string, {rejectWithValue}) => {
        return await EncoredRoleService.deleteRole(institutionId).catch(error => rejectWithValue(error))
    }
)

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        resetRoles: (state) => {
            state.loading = false
            state.data = []
            state.error = null
        }
    },
    extraReducers: (builder) => {
        //Add Role
        {
            builder.addCase(addRole.pending, (state, actions) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(addRole.fulfilled, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(addRole.rejected, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Get Roles (By institution)
        {
            builder.addCase(getRolesByInstitution.pending, (state, actions) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(getRolesByInstitution.fulfilled, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.data = actions.payload.data
                state.error = null
            })
            builder.addCase(getRolesByInstitution.rejected, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.data = []
                state.error = actions.payload
            })
        }

        //Delete Role
        {
            builder.addCase(deleteRole.pending, (state, actions) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(deleteRole.fulfilled, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(deleteRole.rejected, (state, actions: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = actions.payload
            })
        }
    }
})

export const { resetRoles } = roleSlice.actions
export default roleSlice.reducer