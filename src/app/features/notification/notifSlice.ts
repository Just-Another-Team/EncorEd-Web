import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncorEdUserService from "../../api/encored-user-service"
import { FixMeLater } from "../../../types/FixMeLater";

export type Notification = {
    id: string;
    instution: string;
    roomName: string;
    submitBy: string;
    submitAt: Date | string;
    verifyBy: string;
    verifyAt: Date | string;
}

interface INotificationInitialState {
    loading: boolean,
    data: Array<Notification>,
    error: any
}

const initialState: INotificationInitialState = {
    loading: false,
    data: [],
    error: null
}

export const viewNotif = createAsyncThunk(
    "/notification/report",
    async (institution: FixMeLater, {rejectWithValue}) => {
        return await EncorEdUserService.viewNotification(institution).catch((error) => rejectWithValue(error))
    }
)
const notifSlice = createSlice ({
name: 'report',
initialState,
reducers: {},
extraReducers: (builder) => {
    {
        builder.addCase(viewNotif.pending, (state, action) => {
            state.loading = true
            state.data = []
            state.error = null
        })
        builder.addCase(viewNotif.fulfilled, (state, action: PayloadAction<FixMeLater>) => {
            state.loading = false
            state.data = action.payload.data
            state.error = null
        })
        builder.addCase(viewNotif.rejected, (state, action: PayloadAction<FixMeLater>) => {
            state.loading = false
            state.data = []
            state.error = action.payload
        })
    }
}
})

export default notifSlice.reducer