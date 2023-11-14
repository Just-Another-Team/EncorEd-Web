import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/lib/storage/session'

import authSlice from "./features/auth/authSlice";
import institutionSlice from "./features/institution/authInstitutionSlice";
import assignRoleSlice from "./features/role/authRoleSlice";
import navigationSlice from "./features/navigation/navigationSlice";
import usersSlice from "./features/users/usersSlice";
import roleSlice from "./features/role/roleSlice";

// import subjectSlice from "./features/subject/subjectSlice";
// import eventSlice from "./features/event/eventSlice";

const rootPersistConfig = {
    key: "root",
    storage,
    blacklist: ['auth', 'institution', 'assignRole', 'users'], //, 'subjects', 'events', 'roles', 'floorPlan', 'reports', 'requests'
}

/* ======== Session Storages ======== */
const authPersistConfig = {
    key: "auth",
    storage: sessionStorage,
    blacklist: ['loading', 'error']
}

const institutionPersistConfig = {
    key: "institution",
    storage: sessionStorage,
    blacklist: ['loading', 'error']
}

const assignRolePersistConfig = {
    key: "assignRole",
    storage: sessionStorage,
    blacklist: ['loading', 'error']
}

const usersPersistConfig = {
    key: "users",
    storage: sessionStorage,
    blacklist: ['loading', 'error']
}

const rolePersistConfig = {
    key: "role",
    storage: sessionStorage,
    blacklist: ['loading', 'error']
}

/* ======== Local Storages ======== */
const navigationPersistConfig = {
    key: "navigation",
    storage,
    blacklist: []
}

const combinedReducers = combineReducers({
    authentication: persistReducer(authPersistConfig, authSlice),
    assignRole: persistReducer(assignRolePersistConfig, assignRoleSlice),
    institution: persistReducer(institutionPersistConfig, institutionSlice),
    navigation: persistReducer(navigationPersistConfig, navigationSlice),
    users: persistReducer(usersPersistConfig, usersSlice),
    role: persistReducer(rolePersistConfig, roleSlice),
});

const persistedCombinedReducers = persistReducer(rootPersistConfig, combinedReducers)

const store = configureStore({
    reducer: persistedCombinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default store