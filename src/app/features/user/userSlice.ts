import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = {...action.payload}
        },
        updateLoggedInUser: (state, action) => {
            console.log(action.payload)
            state.data = Object.assign(state.data, action.payload)
        },
        logOut: (state, action) => {
            state.data = {}
        }
    },
})

export const { setUser, updateLoggedInUser, logOut } = userSlice.actions
export default userSlice.reducer