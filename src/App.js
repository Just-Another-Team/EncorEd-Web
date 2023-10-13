import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {Routes, Route, Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import { auth, onAuthStateChanged } from './app/firebase/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './features/auth/authSlice';
import { reset } from './features/navigation/navigationSlice';

import Login from './pages/Login/Login';
import LandingPage from './pages/LandingPage';
import UserInput from './pages/Registration/UserInput';
import Dashboard from './pages/Authenticated/Dashboard';
import {default as InstitutionalHome} from './pages/Authenticated/Home/Home';
import Subject from './pages/Authenticated/Subject/Subject';
import Event from './pages/Authenticated/Event/Event';
import MapList from './pages/Authenticated/Maps/MapList';
import UserGroups from './pages/Authenticated/UserGroups/UserGroups';
import Institution from './pages/Authenticated/Institution/Institution';
import SelectedSubject from './pages/Authenticated/Subject/pages/SelectedSubject';

import {default as AdminHome} from './pages/Admin/Home/Home';

import InstitutionForm from './components/Forms/InstitutionForm';
import RegistrationUserForm from './components/Forms/Formhooks/UserForm-Registration-User-Hooks';
import RegistrationInstitutionForm from './components/Forms/Formhooks/UserForm-Registration-Institution-Hook';
import Profile from './pages/Authenticated/Profile/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';



function App() {
  const userLoggedIn = useSelector(state => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      
      if (user) {
        console.log("Logged In")
        console.log(userLoggedIn)
      } 
      else {
        dispatch(reset())
        dispatch(logOut())
      }
    })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LandingPage />}/>

      {/* Public pages */}
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<UserInput />}>
        <Route path='user' element={<RegistrationUserForm />} />
        <Route path='institution' element={userLoggedIn.user  ? <RegistrationInstitutionForm /> : <Navigate replace to="/register/user" />} />
        {/* <Route path='user' element={<RegistrationUserForm />} />
        <Route path='institution' element={<RegistrationInstitutionForm />} /> */}
      </Route>
      {/* <Route path='/addInstitution' element={<InstitutionForm />} /> */}

      {/* Authenticated Pages */}
      <Route path='/dashboard' element={userLoggedIn.user && userLoggedIn.user.systemRole.admin ? <Dashboard /> : <Navigate replace to="/login" />}>
        <Route path='home' element={<InstitutionalHome />} />

        <Route path='subject' element={<Subject />} />
        <Route path='subject/:id' element={<SelectedSubject />} />

        <Route path='map/list' element={<MapList />} />

        <Route path='event' element={<Event />} />

        <Route path='users' element={<UserGroups />}/>

        <Route path='institution' element={<Institution />} />

        <Route path='profile' element={<Profile />}/>
      </Route>

      {/* userLoggedIn.user.isadmin ? <Navigate replace to="/admin/dashboard/home" /> : */}
      <Route path='/admin/dashboard' element={userLoggedIn.user && userLoggedIn.user.systemRole.superadmin ? <AdminDashboard /> : <Navigate replace to="/login" />}>
        <Route path='home' element={<AdminHome />}/>

        <Route path='users' />

        <Route path='institutions' />
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
 