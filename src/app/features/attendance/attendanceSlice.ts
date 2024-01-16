import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EncorEdUserService from "../../api/encored-user-service"
import { FixMeLater } from "../../../types/FixMeLater";

export type Attendance = {
    id: string;
    instution: string;
    roomName: string;
    submitBy: string;
    submitAt: Date | string;
    verifyBy?: string;
    verifyAt?: Date | string;
    status: string;
}

interface IAttendanceInitialState {
    loading: boolean,
    data: Array<Attendance>,
    error: any
}

const initialState: IAttendanceInitialState = {
    loading: false,
    data: [],
    error: null
}

export const viewAttendance = createAsyncThunk(
    "/attendance/report",
    async (institution: FixMeLater, {rejectWithValue}) => {
        return await EncorEdUserService.viewAttendance(institution).catch((error) => rejectWithValue(error))
    }
)
const attendanceSlice = createSlice ({
name: 'report',
initialState,
reducers: {},
extraReducers: (builder) => {
    {
        builder.addCase(viewAttendance.pending, (state, action) => {
            state.loading = true
            state.data = []
            state.error = null
        })
        builder.addCase(viewAttendance.fulfilled, (state, action: PayloadAction<FixMeLater>) => {
            state.loading = false
            state.data = action.payload.data
            state.error = null
        })
        builder.addCase(viewAttendance.rejected, (state, action: PayloadAction<FixMeLater>) => {
            state.loading = false
            state.data = []
            state.error = action.payload
        })
    }
}
})

export default attendanceSlice.reducer