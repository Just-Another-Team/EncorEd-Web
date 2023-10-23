import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page: 'Home'
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        nextPage: (state, action) => {
            console.log("Navigation", action.payload)
            state.page = action.payload
        },
        resetPage: () => ({
            ...initialState
        })
    },
})

export const { nextPage, resetPage } = navigationSlice.actions
export default navigationSlice.reducer

// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
// export const currentSignIn = signIn