import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    target: ''
}

const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
        targetUser: (state, action) => {
            console.log("Target", action.payload)
            state.target = action.payload
        }
    },
})

export const { targetUser } = targetSlice.actions
export default targetSlice.reducer