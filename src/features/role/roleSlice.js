import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncoredRoleService from "../../app/api/encored-role-service"

const initialState = {
    loading: false,
    roles: [],
    error: null,
}

export const addRole = createAsyncThunk(
    "role/add",
    async (data, {rejectWithValue}) => {
        try {
            const role = await EncoredRoleService.addRole(data)
            return role
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const assignRole = createAsyncThunk(
    "role/add",
    async (data, {rejectWithValue}) => {
        try {
            const role = await EncoredRoleService.assignRole(data)

            return role
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Add Role
        {
            builder.addCase(addRole.pending, (state, actions) => {
                state.loading = true
            })
            builder.addCase(addRole.fulfilled, (state, actions) => {
                state.loading = false
            })
            builder.addCase(addRole.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
        }

        //Assign Role
        {
            builder.addCase(assignRole.pending, (state, actions) => {
                state.loading = true
            })
            builder.addCase(assignRole.fulfilled, (state, actions) => {
                state.loading = false
                //state.roles 
            })
            builder.addCase(assignRole.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
        }
    }
})

//export const { nextPage, reset } = roleSlice.actions
export default roleSlice.reducer