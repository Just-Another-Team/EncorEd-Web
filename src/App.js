import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {Routes, Route, Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from './app/firebase/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './features/auth/authSlice';
import { reset } from './features/navigation/navigationSlice';
import { getSubjects } from './features/subject/subjectSlice';
import { getEvents } from './features/event/eventSlice';

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
import AdminDashboard from './pages/Admin/AdminDashboard';

import InstitutionForm from './components/Forms/InstitutionForm';
import RegistrationUserForm from './components/Forms/Formhooks/UserForm-Registration-User-Hooks';
import RegistrationInstitutionForm from './components/Forms/Formhooks/UserForm-Registration-Institution-Hook';
import Profile from './pages/Authenticated/Profile/Profile';

function App() {
  const userAuth = useSelector(state => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(reset())
        dispatch(logOut())
        return
      }

      console.log("Logged In")
    })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LandingPage />}/>

      {/* Public pages */}
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<UserInput />}>
        <Route path='user' element={<RegistrationUserForm />} />
        <Route path='institution' element={<RegistrationInstitutionForm />} /> {/* userLoggedIn.user  ? <RegistrationInstitutionForm /> : <Navigate replace to="/register/user" /> */}

      </Route>

      {/* Authenticated Pages */}
      {/* element={userLoggedIn.user && userLoggedIn.user.role && (userLoggedIn.user.role.find(data => data._systemRole._employee) || userLoggedIn.user.role.find(data => data._systemRole._admin)) ? <Dashboard /> : <Navigate replace to="/login" />} */}
      <Route path='/dashboard' element={<Dashboard />}> 
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
      {/* element={userLoggedIn.user && userLoggedIn.user.role && userLoggedIn.user.role.find(data => data._systemRole._superAdmin) ? <AdminDashboard /> : <Navigate replace to="/login" />} */}
      <Route path='/admin/dashboard' >
        <Route path='home' />

        <Route path='users' />

        <Route path='institutions' />

        <Route path='profile' element={<Profile />}/>
      </Route>
    </Routes>
  );
}

export default App;
 