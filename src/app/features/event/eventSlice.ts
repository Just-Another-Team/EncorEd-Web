import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Event from "../../api/encored-event-service"

const initialState = {
    loading: false,
    event: [],
    error: null
}

// export const getEvents = createAsyncThunk(
//     "event/list",
//     async () => {
//         return await Event.viewEvents()
//     }
// )

// const eventSlice = createSlice({
//     name: 'event',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getEvents.pending, (state, action) => {
//             state.loading = true
//             state.event = []
//             state.error = null
//         })
//         builder.addCase(getEvents.fulfilled, (state, action) => {
//             state.loading = false
//             state.event = action.payload.data
//             state.error = null
//         })
//         builder.addCase(getEvents.rejected, (state, action) => {
//             state.loading = false
//             state.event = []
//             state.error = action.payload
//         })
//     }
// })

// //export const { nextPage, reset } = navigationSlice.actions
// export default eventSlice.reducer