import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import navigationSlice from "../features/navigation/navigationSlice";

const store = configureStore({
    reducer: {
        pageSelect: navigationSlice, 
        authentication: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store