import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: [],
    error: null,
}

export const addRole = createAsyncThunk(
    "role/add",
    async (roleData, {rejectWithValue}) => {
        try {
            console.log("Role Added", roleData)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const roleListSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default roleListSlice.reducer