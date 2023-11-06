import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    target: '',
    action: ''
}

const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
        targetUser: (state, action) => {
            console.log("Target", action.payload)
            state.target = action.payload
        },
        targetAction: (state, action) => {
            console.log("Target", action.payload)
            state.action = action.payload
        }
    },
})

export const { targetUser, targetAction } = targetSlice.actions
export default targetSlice.reducer