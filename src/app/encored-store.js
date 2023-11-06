import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import navigationSlice from "../features/navigation/navigationSlice";
import institutionSlice from "../features/institution/institutionSlice";
import subjectSlice from "../features/subject/subjectSlice";
import eventSlice from "../features/event/eventSlice";
import usersSlice from "../features/users/usersSlice";
import profileSlice from "../features/profile/profileSlice";

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import roleSlice from "../features/role/roleSlice";
import userSlice from "../features/user/userSlice";
import authInstitution from "../features/institution/authInstitution";
import authRoleSlice from "../features/role/authRoleSlice";

const rootPersistConfig = {
    key: "root",
    storage,
    //blacklist: ['users', 'subjects', 'events', 'roles', 'floorPlan', 'reports', 'requests']
}

const userPersistConfig = {
    key: "user",
    storage,
    //blacklist: ['loading', 'error']
}

const pagePersistConfig = {
    key: "page",
    storage,
    //blacklist: ['loading', 'error']
}

const institutionPersistConfig = {
    key: "institution",
    storage,
    //blacklist: ['loading', 'error']
}

const rolePersistConfig = {
    key: "role",
    storage,
    //blacklist: ['loading', 'error']
}

const userPersistedReducer = persistReducer(userPersistConfig, userSlice)
const pagePersistedReducer = persistReducer(pagePersistConfig, navigationSlice)
const institutionPersistedReducer = persistReducer(institutionPersistConfig, institutionSlice)
const rolePersistReducer = persistReducer(rolePersistConfig, roleSlice)

const combinedReducers = combineReducers({
    // authentication: persistReducer(userConfig, authSlice),
    // institution: persistReducer(insititutionConfig, institutionSlice),
    // assignedRole: persistReducer(roleConfig, roleSlice),

    subjects: subjectSlice,
    events: eventSlice,
    users: usersSlice,

    //roles: roleSlice
    //floorPlan: floorplanSlice
    //reports: reportSlice
    //requests: requestsSlice
})

const persistedCombinedReducers = persistReducer(rootPersistConfig, combineReducers)

/*
    -- THIS IS A VERY VERY BAD PLAN
 
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
    reducer: {
        //Persisted Data
        user: userPersistedReducer,
        pageSelect: pagePersistedReducer, 
        roles: rolePersistReducer, //Gets roles assign to user
        institution: institutionPersistedReducer, //Gets institution assigned to user
        
        /* Unpersisted Data */
        authentication: authSlice,
        authRole: authRoleSlice,
        authInstitution: authInstitution,

        subjects: subjectSlice,
        events: eventSlice,
        users: usersSlice,
        profile: profileSlice

        //roles: roleSlice
        //floorPlan: floorplanSlice
        //reports: reportSlice
        //requests: requestsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)

export default store