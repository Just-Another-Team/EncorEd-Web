import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Institution from "../../app/api/encored-institution-service"

const initialState = {
    loading: false,
    data: {},
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

export const getInstitution = createAsyncThunk(
    "/institution/get",
    async (institutionId, {rejectWithValue}) => {
        return await Institution.viewInstitution(institutionId)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

const authInstitutionSlice = createSlice({
    name: "authInstitution",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addInstitution.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(addInstitution.fulfilled, (state, actions) => {
            state.loading = false
            state.error = null
        })
        builder.addCase(addInstitution.rejected, (state, actions) => {
            state.loading = false
            state.error = actions.payload
        })

        /* Get Institution */
        builder.addCase(getInstitution.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getInstitution.fulfilled, (state, actions) => {
            state.loading = false
            state.data = actions.payload.data
            state.error = null
        })
        builder.addCase(getInstitution.rejected, (state, actions) => {
            state.loading = false
            state.error = actions.payload
        })
    }
})

export default authInstitutionSlice.reducer