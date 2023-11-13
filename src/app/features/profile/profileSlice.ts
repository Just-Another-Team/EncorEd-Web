import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncorEdAuthService from "../../api/encored-auth-service"

const initialState = {
    data: {}
}

// export const viewUser = createAsyncThunk(
//     "/profile/view",
//     async (data, {rejectWithValue}) => {
//         return await EncorEdAuthService.viewUser(data)
//             .then((res) => res)
//             .catch((error) => rejectWithValue(error))
//     }
// )

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        viewUser: (state, action) => {
            state.data = {...action.payload}
        },
    }
})

export const { viewUser } = profileSlice.actions
export default profileSlice.reducer