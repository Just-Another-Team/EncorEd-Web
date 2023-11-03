import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import navigationSlice from "../features/navigation/navigationSlice";
import institutionSlice from "../features/institution/institutionSlice";
import subjectSlice from "../features/subject/subjectSlice";
import eventSlice from "../features/event/eventSlice";
import usersSlice from "../features/users/usersSlice";
import profileSlice from "../features/profile/profileSlice";
import targetSlice from "../features/users/targetSlice";

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import roleSlice from "../features/role/roleSlice";
import userSlice from "../features/user/userSlice";
import authInstitution from "../features/institution/authInstitution";
import authRoleSlice from "../features/role/authRoleSlice";

const userPersistConfig = {
    key: "user",
    storage,
}

const pagePersistConfig = {
    key: "page",
    storage,
}

const institutionPersistConfig = {
    key: "institution",
    storage,
}

const rolePersistConfig = {
    key: "role",
    storage,
}

const usersPersistConfig = {
    key: "users",
    storage
}


// const profilePersistConfig = {
//     key: "profile",
//     storage
// }

const userPersistedReducer = persistReducer(userPersistConfig, userSlice)
const pagePersistedReducer = persistReducer(pagePersistConfig, navigationSlice)
const institutionPersistedReducer = persistReducer(institutionPersistConfig, institutionSlice)
const rolePersistReducer = persistReducer(rolePersistConfig, roleSlice)
const usersPersistReducer = persistReducer(usersPersistConfig, usersSlice)
// const profilePersistReducer = persistReducer(profilePersistConfig, profileSlice)

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
    reducer: {
        //Persisted Data
        user: userPersistedReducer,
        pageSelect: pagePersistedReducer, 
        roles: rolePersistReducer, //Gets roles assign to user
        institution: institutionPersistedReducer, //Gets institution assigned to user
        //
        authentication: authSlice,//authUser
        authRole: authRoleSlice,
        authInstitution: authInstitution,
        subjects: subjectSlice,
        events: eventSlice,
        users: usersPersistReducer,
        // profile: profilePersistReducer,
        // users: usersSlice,
        profile: profileSlice,
        targetUser: targetSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)

export default store