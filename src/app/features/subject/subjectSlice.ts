import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Subject from "../../api/encored-subject-service"

const initialState = {
    loading: false,
    subject: [],
    error: null
}

// export const getSubjects = createAsyncThunk(
//     "subject/list",
//     async () => {
//         return await Subject.viewSubjects()
//     }
// )

// const subjectSlice = createSlice({
//     name: 'subject',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getSubjects.pending, (state, action) => {
//             state.loading = true
//             state.subject = []
//             state.error = null
//         })
//         builder.addCase(getSubjects.fulfilled, (state, action) => {
//             state.loading = false
//             state.subject = action.payload.data
//             state.error = null
//         })
//         builder.addCase(getSubjects.rejected, (state, action) => {
//             state.loading = false
//             state.subject = []
//             state.error = action.payload
//         })
//     }
// })

// //export const { nextPage, reset } = navigationSlice.actions
// export default subjectSlice.reducer