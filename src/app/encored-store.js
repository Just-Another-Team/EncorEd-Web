import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import navigationSlice from "../features/navigation/navigationSlice";
import institutionSlice from "../features/institution/institutionSlice";
import subjectSlice from "../features/subject/subjectSlice";
import eventSlice from "../features/event/eventSlice";

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: "root",
    storage,
}

const authPersistedReducer = persistReducer(persistConfig, authSlice)
const pagePersistedReducer = persistReducer(persistConfig, navigationSlice)

const store = configureStore({
    reducer: {
        pageSelect: pagePersistedReducer, 
        authentication: authPersistedReducer,
        institution: institutionSlice,
        subjects: subjectSlice,
        events: eventSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)

export default store