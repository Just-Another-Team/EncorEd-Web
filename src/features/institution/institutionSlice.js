import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Institution from "../../app/api/encored-institution-service"

const initialState = {
    loading: null,
    name: null,
    description: null,
    error: null
}

export const addInstitution = createAsyncThunk(
    "/institution/add",
    async (institutionVal, {rejectWithValue}) => {
        return await Institution.addInstitution(institutionVal)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

const institutionSlice = createSlice({
    name: "institution",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addInstitution.pending, (state) => {
            state.loading = true
            state.name = null
            state.description = null
            state.error = null
        })
        builder.addCase(addInstitution.fulfilled, (state, actions) => {
            state.loading = false
            state.name = actions.payload
            state.description = actions.payload
            state.error = null
        })
        builder.addCase(addInstitution.rejected, (state, actions) => {
            state.loading = false
            state.name = null
            state.description = null
            state.error = actions.payload
        })
    }
})

export default institutionSlice.reducer