import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Subject from "../../api/encored-subject-service"
import { FixMeLater } from "../../../types/FixMeLater";

export type DetailsInput = {
    id?: string;
    name?: string; 
    edpCode?: string; 
    type?: string | null;  
    units?: number | null;
    institution?: string;

    createdBy?: string;
    creationDate?: Date | string;
    //updatedDate
    //updatedBy
    verifiedBy?: string;
    status?: string
}

export type SubjectInput = {
    details?: DetailsInput | undefined;
    schedule?: undefined;
    createdBy?: string;
    institution?: string;
}

type InitialSubjectState = {
    loading: boolean
    data: Array<SubjectInput>
    error: null
}

const initialState: InitialSubjectState = {
    loading: false,
    data: [],
    error: null
}

export const addAllSubjects = createAsyncThunk(
    "subject/institution/add/list",
    async (data: FixMeLater, { rejectWithValue }) => {
        return await Subject.addSubjects(data).catch(error => rejectWithValue(error))
    }
)

export const getSubjects = createAsyncThunk(
    "subject/institution/list",
    async (institutionId: string, {rejectWithValue}) => {
        return await Subject.viewSubjectsByInstitution(institutionId).catch(error => rejectWithValue(error))
    }
)

export const deleteSubject = createAsyncThunk(
    "subject/institution/delete",
    async (subjectId: string, {rejectWithValue}) => {
        return await Subject.deleteSubject(subjectId).catch(error => rejectWithValue(error))
    }
)

//TO-DO
export const updateSubject = createAsyncThunk(
    "subject/institution/update",
    async (subjectId: string, {rejectWithValue}) => {
        return await Subject.deleteSubject(subjectId).catch(error => rejectWithValue(error))
    }
)

const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        resetSubjects: (state) => {
            state.loading = false
            state.data = []
            state.error = null
        },
    },
    extraReducers: (builder) => {
        // Add Subjects
        {
            builder.addCase(addAllSubjects.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(addAllSubjects.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(addAllSubjects.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
        }

        // View Subjects
        {
            builder.addCase(getSubjects.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(getSubjects.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.data = action.payload.data
                state.error = null
            })
            builder.addCase(getSubjects.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
        }

        // Delete Subject
        {
            builder.addCase(deleteSubject.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(deleteSubject.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = null
            })
            builder.addCase(deleteSubject.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
        }
    }
})

export const { resetSubjects } = subjectSlice.actions
export default subjectSlice.reducer