import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page: 'Home'
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        nextPage: (state, action) => {
            state.page = action.payload
        },
        reset: () => ({
            ...initialState
        })
    },
})

export const { nextPage, reset } = navigationSlice.actions
export default navigationSlice.reducer

// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
// export const currentSignIn = signIn