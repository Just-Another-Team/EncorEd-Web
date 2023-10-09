import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { auth, onAuthStateChanged } from './app/firebase/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';

import Login from './pages/Login/Login';
import LandingPage from './pages/LandingPage';
import UserInput from './pages/Registration/UserInput';
import Dashboard from './pages/Authenticated/Dashboard';
import Home from './pages/Authenticated/Home/Home';
import Subject from './pages/Authenticated/Subject/Subject';
import Event from './pages/Authenticated/Event/Event';
import MapList from './pages/Authenticated/Maps/MapList';
import UserGroups from './pages/Authenticated/UserGroups/UserGroups';
import Institution from './pages/Authenticated/Institution/Institution';
import SelectedSubject from './pages/Authenticated/Subject/pages/SelectedSubject';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In")

        const loggedIn = {
          user: {
              displayName: user.displayName,
              email: user.email,
          },
          token: user.accessToken
        }

        dispatch(setCredentials(loggedIn))
      } 
      // else {
      //     console.log("Logged Out")
      //     console.log(user)
      // }

    })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<UserInput />} />
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='home' element={<Home />} />

        <Route path='subject' element={<Subject />} />
        <Route path='subject/:id' element={<SelectedSubject />} />

        <Route path='map/list' element={<MapList />} />

        <Route path='event' element={<Event />} />

        <Route path='users' element={<UserGroups />}/>

        <Route path='institution' element={<Institution />} />
      </Route>
      {/* <Route path='/' element={<LandingPage />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegistrationPage/>}/>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='home' element={<Home />} />

        <Route path='subjects' element={<Subjects />} />
        <Route path='subject/:id' element={<SelectedSubject />} />

        <Route path='events' element={<Events />} />
        <Route path='event/:id' element={<SelectedEvent />} />

        <Route path='maplist' element={<MapList />} />
        <Route path='map' element={<MapPage />} />

        <Route path='usergroups' element={<UserGroup />} />

        <Route path='user/:id' element={<SelectedUser />}/>
        <Route path='group/:id' element={<SelectedGroup />}/>
        <Route path='role/:id' element={<SelectedRole />}/>

        <Route path='Institution' element={<Institution />} />

        <Route path='profile/:id'/>
      </Route> */}
    </Routes>
  );
}

export default App;
 