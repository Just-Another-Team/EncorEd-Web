import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncorEdUserService from "../../api/encored-user-service"
import { FixMeLater } from "../../../types/FixMeLater"

export type User = {
    id: string
    institution: string
    firstName: string
    lastName: string
    joinDate: string
    addedBy: string
    userName: string
    email: string
    isalumni: boolean
    status: string
}

interface IUserInitialState {
    loading: boolean,
    data: Array<User>,
    error: any
}

const initialState: IUserInitialState = {
    loading: false,
    data: [],
    error: null
}

export const getUsers = createAsyncThunk(
    "/users/get/institution",
    async ({institution, user}: FixMeLater, {rejectWithValue}) => {
        return await EncorEdUserService.getAllUsersByInstitution(institution, user)
    }
)

// export const getAllUsers = createAsyncThunk(
//     "/users/get",
//     async (_, {rejectWithValue}) => {
//         return await EncorEdAuthService.getAll()
//     }
// )

export const addUsers = createAsyncThunk(
    "/users/add",
    async (userData: FixMeLater, {rejectWithValue}) => {
        return await EncorEdUserService.addUser(userData)
            .then((res) => res)
            .catch((error) => rejectWithValue(error))
    }
)

// export const deleteUser = createAsyncThunk(
//     "/users/delete",
//     async (id, {rejectWithValue}) => {
//         return await EncorEdAuthService.deleteUser(id)
//             .then((res) => console.log(res))
//             .catch((error) => rejectWithValue(error))
//     }
// )

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUsers: (state) => {
            state.loading = false
            state.data = []
            state.error = null
        }
    },
    extraReducers: (builder) => {
        {
            builder.addCase(getUsers.pending, (state, action) => {
                state.loading = true
                state.data = []
                state.error = null
            })
            builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.data = action.payload.data
                state.error = null
            })
            builder.addCase(getUsers.rejected, (state, action: PayloadAction<FixMeLater>) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })
        }

        // {
        //     builder.addCase(addUsers.pending, (state, actions) => {
        //         state.loading = true
        //     })
        //     builder.addCase(addUsers.fulfilled, (state, actions) => {
        //         state.loading = false
        //     })
        //     builder.addCase(addUsers.rejected, (state, actions) => {
        //         state.loading = false
        //         state.error = actions.payload
        //     })
        // }

        // {
        //     builder.addCase(getAllUsers.pending, (state, action) => {
        //         state.loading = true
        //         state.users = []
        //         state.error = null
        //     })
        //     builder.addCase(getAllUsers.fulfilled, (state, action) => {
        //         state.loading = false
        //         state.users = action.payload.data
        //         state.error = null
        //     })
        //     builder.addCase(getAllUsers.rejected, (state, action) => {
        //         state.loading = false
        //         state.users = []
        //         state.error = action.payload
        //     })
        // }
    }
})

export const { resetUsers } = usersSlice.actions
export default usersSlice.reducer