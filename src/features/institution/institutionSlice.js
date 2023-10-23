import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Institution from "../../app/api/encored-institution-service"

const initialState = {
    data: {}
}

const institutionSlice = createSlice({
    name: "institution",
    initialState,
    reducers: {
        setInstitution: (state, action) => {
            state.data = action.payload
        },
        logOutInstitution: (state) => {
            state.data = {}
        }
    },
})

export const { setInstitution, logOutInstitution } = institutionSlice.actions
export default institutionSlice.reducer