import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import EncorEdUserService from "../../api/encored-user-service"
import EncorEdRoleService from "../../api/encored-role-service"
import { FixMeLater } from "../../../types/FixMeLater"
import { Permission } from "../../../types/RoleTypes/Permission"

export type User = {
    id?: string
    institution?: string
    firstName?: string
    lastName?: string
    joinDate?: string
    addedBy?: string
    userName?: string
    email?: string
    isalumni?: boolean
    status?: string
}

export type Role = {
    id?: string
    name?: string
    desc?: string
    appAdmin?: boolean
    admin?: boolean
    employee?: boolean | Permission
    teacher?: boolean | Permission
    student?: boolean | Permission
    visitor?: boolean | Permission
}

interface IProfileInitialState {
    loading: boolean,
    data: User,
    roles: Array<Role>,
    error: any
}
const initialState: IProfileInitialState = {
    loading: false,
    data: {},
    roles: [],
    error: null
}
export const viewUser = createAsyncThunk(
    "/profile/view",
    async (id: FixMeLater, {rejectWithValue}) => {
        return await EncorEdUserService.viewUser(id).catch((error) => rejectWithValue(error))
    }
)

export const viewUserRoles = createAsyncThunk(
    "/profile/role/get",
    async (id: string, {rejectWithValue}) => {
        return await EncorEdUserService.viewUserRoles(id).catch((error) => rejectWithValue(error))
    }    
)

export const editUserProfile = createAsyncThunk(
    "/profile/edit",
    async (data: FixMeLater, {rejectWithValue}) => {
        return await EncorEdUserService.editUserProfile(data).catch((error) => rejectWithValue(error))
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        {
            builder.addCase(viewUser.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(viewUser.fulfilled, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.data = action.payload.data
                state.error = null
            })
            builder.addCase(viewUser.rejected, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = action.payload
            })
        }
        {
            builder.addCase(viewUserRoles.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(viewUserRoles.fulfilled, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.roles = action.payload.data
                state.error = null
            })
            builder.addCase(viewUserRoles.rejected, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = action.payload
            })
        }
        {
            builder.addCase(editUserProfile.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(editUserProfile.fulfilled, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.roles = action.payload.data
                state.error = null
            })
            builder.addCase(editUserProfile.rejected, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.error = action.payload
            })
        }
    }
})

//export const { viewUser } = profileSlice.actions
export default profileSlice.reducer