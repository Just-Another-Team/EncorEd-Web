import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {Routes, Route, Navigate, useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { auth, onAuthStateChanged, signOut } from './app/firebase/authentication';
import { useDispatch, useSelector } from 'react-redux';

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
import UsersLayout from './pages/Admin/Users/UsersLayout';

function App() {
  const role = useSelector(state => state.roles);
  const user = useSelector(state => state.user.data)

  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        //dispatch(logOut())
        console.log("Logged Out")
        return
      }

      console.log("Logged In")
      console.log("Roles", role)
    })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LandingPage />}/>

      {/* Public pages */}
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<UserInput />}>
        <Route path='user' element={<RegistrationUserForm />} />
        <Route path='institution' element={Object.keys(user).length !== 0 ? <RegistrationInstitutionForm /> : <Navigate replace to={'/register/user'} />}/> {/* userLoggedIn.user  ? <RegistrationInstitutionForm /> : <Navigate replace to="/register/user" /> */}

      </Route>

      {/* Authenticated Pages */}
      <Route path='/dashboard' element={role.data.find(data => data._systemRole._admin) || role.data.find(data => data._systemRole._employee) ? <Dashboard /> : <Navigate replace to={'/login'} />}> 
        <Route path='home' element={<InstitutionalHome />} />

        <Route path='subject' element={<Subject />} />
        <Route path='subject/:id' element={<SelectedSubject />} />

        <Route path='map/list' element={<MapList />} />

        <Route path='event' element={<Event />} />

        <Route path='users/list/u/:institution' element={<UserGroups />}/>

        <Route path='institution' element={<Institution />} />

        <Route path='profile' element={<Profile />}/>
      </Route>

      {/* Admin Pages*/}
      <Route path='/admin/dashboard' element={role.data.find(data => data._systemRole._superAdmin) ? <AdminDashboard /> : <Navigate replace to="/login" />}>
        <Route path='home' />

        <Route path='users' element={<UsersLayout />} />

        <Route path='institutions' />

        <Route path='profile' element={<Profile />}/>
      </Route>
    </Routes>
  );
}

export default App;
 