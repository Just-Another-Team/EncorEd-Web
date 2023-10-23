import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../app/api/encored-auth-service"
import { resetPage } from "../navigation/navigationSlice"

const initialState = {
    data: [],
}

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles: (state, action) => {
            console.log(action.payload)
            state.data = action.payload
        },
        logOutRoles: (state, action) => {
            state.data = []
        }
    },
})

export const { setRoles, logOutRoles } = roleSlice.actions
export default roleSlice.reducer