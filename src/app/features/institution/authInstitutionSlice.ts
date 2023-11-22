import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import Institution from "../../api/encored-institution-service"
import { RegisterFormCredential } from "../../../types/RegisterFormCredential"

type InstitutionData = {
    id?: string,
    createdBy?: string,
    name?: string,
    creationDate?: string,
    desc?: string,
    status?: string,
}

type InitialInstitutionType = {
    loading?: boolean,
    data: InstitutionData,
    error?: any
}

const initialState: InitialInstitutionType = {
    loading: false,
    data: {},
    error: null
}

export const addInstitution = createAsyncThunk(
    "/institution/add",
    async (institutionVal: RegisterFormCredential, {rejectWithValue}) => {
        return await Institution.addInstitution(institutionVal)
                .catch((error) => rejectWithValue(error))
    }
)

export const getInstitution = createAsyncThunk(
    "/institution/get",
    async (institutionId: string, {rejectWithValue}) => {
        return await Institution.viewInstitution(institutionId)
            .catch((error) => rejectWithValue(error))
    }
)

const institutionSlice = createSlice({
    name: "institution",
    initialState,
    reducers: {
        logOutInstitution: (state) => {
            state.loading = false
            state.data = {}
            state.error = null
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(addInstitution.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(addInstitution.fulfilled, (state, actions: PayloadAction<any>) => {
            state.loading = false
            state.error = null
        })
        builder.addCase(addInstitution.rejected, (state, actions: PayloadAction<any>) => {
            state.loading = false
            state.error = actions.payload
        })

        /* Get Institution */
        builder.addCase(getInstitution.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getInstitution.fulfilled, (state, actions: PayloadAction<any>) => {
            state.loading = false
            state.data = actions.payload.data
            state.error = null
        })
        builder.addCase(getInstitution.rejected, (state, actions: PayloadAction<any>) => {
            state.loading = false
            state.error = actions.payload
        })
    }
})

export const { logOutInstitution } = institutionSlice.actions
export default institutionSlice.reducer