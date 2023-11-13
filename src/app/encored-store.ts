import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/lib/storage/session'

import authSlice from "./features/auth/authSlice";
import institutionSlice from "./features/institution/authInstitutionSlice";
import roleSlice from "./features/role/authRoleSlice";

import navigationSlice from "./features/navigation/navigationSlice";
import usersSlice from "./features/users/usersSlice";

// import subjectSlice from "./features/subject/subjectSlice";
// import eventSlice from "./features/event/eventSlice";
// import usersSlice from "./features/users/usersSlice";
// import profileSlice from "./features/profile/profileSlice";
// import targetSlice from "./features/users/targetSlice";
// import roleSlice from "./features/role/roleSlice";
// import userSlice from "./features/user/userSlice";
// import authInstitution from "./features/institution/authInstitution";
// import authRoleSlice from "./features/role/authRoleSlice";


const rootPersistConfig = {
    key: "root",
    storage,
    blacklist: ['auth', 'institution', 'role', 'users'], //, 'subjects', 'events', 'roles', 'floorPlan', 'reports', 'requests'
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

const rolePersistConfig = {
    key: "role",
    storage: sessionStorage,
    blacklist: ['loading', 'error']
}

const usersPersistConfig = {
    key: "users",
    storage: sessionStorage,
    blacklist: ['loading', 'error']
}

/* ======== Local Storages ======== */
const navigationPersistConfig = {
    key: "navigation",
    storage,
    blacklist: []
}

// const usersPersistConfig = {
//     key: "users",
//     storage
// }


// const profilePersistConfig = {
//     key: "profile",
//     storage
// }

// const userPersistedReducer = persistReducer(userPersistConfig, userSlice)
// const pagePersistedReducer = persistReducer(pagePersistConfig, navigationSlice)
// const institutionPersistedReducer = persistReducer(institutionPersistConfig, institutionSlice)
// const rolePersistReducer = persistReducer(rolePersistConfig, roleSlice)
// const usersPersistReducer = persistReducer(usersPersistConfig, usersSlice)
// const profilePersistReducer = persistReducer(profilePersistConfig, profileSlice)

const combinedReducers = combineReducers({
    authentication: persistReducer(authPersistConfig, authSlice),
    role: persistReducer(rolePersistConfig, roleSlice),
    institution: persistReducer(institutionPersistConfig, institutionSlice),
    navigation: persistReducer(navigationPersistConfig, navigationSlice),
    users: persistReducer(usersPersistConfig, usersSlice)
});

const persistedCombinedReducers = persistReducer(rootPersistConfig, combinedReducers)

// //Persisted Data
// user: userPersistedReducer,
// pageSelect: pagePersistedReducer, 
// roles: rolePersistReducer, //Gets roles assign to user
// institution: institutionPersistedReducer, //Gets institution assigned to user

// /* Unpersisted Data */
// authentication: authSlice,
// authRole: authRoleSlice,
// authInstitution: authInstitution,

// subjects: subjectSlice,
// events: eventSlice,
// users: usersPersistReducer,
// // profile: profilePersistReducer,
// // users: usersSlice,
// profile: profileSlice,
// targetUser: targetSlice,

/*
    Plan:
        Persist the following data:
            - LoggedIn user (No loading, no error)
            - Role based on LoggedIn User
            - Institution based on LoggedIn User
            - Page
        
        The following data must not persist on every reload (Blacklist them)
            - Authentication (User, but with loading and error)
            - Authentication (Role, but with loading and error)
            - Authentication (Institution, but with loading and error)
            - Subject
            - Event
            - Users
            - Employees
*/

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