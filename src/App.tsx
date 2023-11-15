import './App.css';
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
import Request from './pages/Authenticated/Request/Request';

import Home, {default as AdminHome} from './pages/Admin/Home/Home';
import AdminDashboard from './pages/Admin/AdminDashboard';

import InstitutionForm from './components/Forms/InstitutionForm';
import RegistrationUserForm from './components/Forms/Formhooks/UserForm-Registration-User-Hooks';
import RegistrationInstitutionForm from './components/Forms/Formhooks/UserForm-Registration-Institution-Hook';
// import UsersLayout from './pages/Admin/Users/UsersLayout';
import UsersProfile from './pages/Authenticated/Profile/UsersProfile';
import { useAppDispatch, useAppSelector } from './app/encored-store-hooks';
import UserList from './pages/Authenticated/UserGroups/tabs/UserList';
import GroupList from './pages/Authenticated/UserGroups/tabs/GroupList';
import RoleList from './pages/Authenticated/UserGroups/tabs/RoleList';
import SubSummary from './pages/Authenticated/Subject/pages/Summary';
import SubList from './pages/Authenticated/Subject/pages/SubjectList';
import SchedSubList from './pages/Authenticated/Subject/pages/ScheduledSubject';
import SubRequest from './pages/Authenticated/Subject/pages/Request';
import EventSummary from './pages/Authenticated/Event/tabs/Summary';
import EventList from './pages/Authenticated/Event/tabs/EventList';
import EventSchedList from './pages/Authenticated/Event/tabs/EventSchedList';
import EventRequest from './pages/Authenticated/Event/tabs/EventRequestList';
import AddRole from './pages/Authenticated/UserGroups/Role/AddRole';
import SelectedRole from './pages/Authenticated/UserGroups/Role/SelectedRole';
import UpdateRole from './pages/Authenticated/UserGroups/Role/UpdateRole';
import Profile from './pages/Authenticated/Profile/Profile';
import RoleUsers from './pages/Authenticated/UserGroups/Role/tabs/RoleUsers';
import RoleAccess from './pages/Authenticated/UserGroups/Role/tabs/RoleAccess';
import Report from './pages/Authenticated/Report/Report';
import UsersLayout from './pages/Admin/Users/UsersLayout';
import { logOutRoles } from './app/features/role/authRoleSlice';

function App() {
  const dispatch = useAppDispatch()

  //const role = useAppSelector(state => state.roles);
  const user = useAppSelector(state => state.authentication.data)
  const roles = useAppSelector(state => state.assignRole.data)

  useEffect(() => {
    // console.log("Is Admin or Employee", roles.filter(role => role.admin || typeof role.employee === "object").length != 0)
    // console.log("Is App Admin", roles.filter(role => role.appAdmin).length != 0)
    // onAuthStateChanged(auth, (user) => {
    //   if (!user) {
    //     //dispatch(logOut())
    //     console.log("Logged Out")
    //     return
    //   }

    //   console.log("Logged In")
    //   console.log("Roles", role)
    // })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LandingPage />}/>

      {/* Public pages */}
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<UserInput />}>
        <Route path='user' element={<RegistrationUserForm />} />
        <Route path='institution' element={Object.keys(user).length != 0 ? <RegistrationInstitutionForm /> : <Navigate replace to='/login' />}/> {/*  */}
      </Route>

      {/* Authenticated Pages */}
      <Route path='/dashboard' element={ Object.keys(user).length != 0 ? roles.filter(role => role.admin || typeof role.employee === "object").length != 0  ? <Dashboard /> : <Navigate replace to='/login' /> : <Navigate replace to='/login' />}> {/* */}
        <Route index path='home' element={<InstitutionalHome />} />

        <Route path='map/list' element={<MapList />} />

        <Route path='subject/:institution' element={<Subject />}>
          <Route index path='' element={<SubSummary />}/>
          <Route path='list' element={<SubList />}/>
          <Route path='schedule' element={<SchedSubList />}/>
          <Route path='request' element={<SubRequest />}/>
        </Route>
        <Route path='subject/:institution/add' /> {/* Add Subject */}
        <Route path='subject/:institution/:id' /> {/* Selected Subject */}
        <Route path='subject/:institution/:id/update' /> {/* Update Subject */}

        <Route path='event/:institution' element={<Event />}>
          <Route index path='' element={<EventSummary />}/>
          <Route path='list' element={<EventList />}/>
          <Route path='schedule' element={<EventSchedList />}/>
          <Route path='request' element={<EventRequest />}/>
        </Route>

        <Route path='list' element={<UserGroups />}>
          <Route index path='users/u/:institution' element={<UserList />}/>
          <Route path='groups/u/:institution' element={<GroupList />}/>
          <Route path='roles/u/:institution' element={<RoleList />}/>
          <Route path='roles/u/:institution/:roleId' element={<SelectedRole />}> {/* Selected Role */}
            <Route index path='access' element={<RoleAccess />}/>
            <Route path='users' element={<RoleUsers />}/>
            <Route path='groups' />
          </Route>
        </Route>
        <Route path='role/:institution/add' element={<AddRole />}/> {/* Add Role */}
        <Route path='role/:institution/:id/update' element={<UpdateRole />}/> {/* Update Role */}

        <Route path='institution' element={<Institution />} />

        <Route path='profile/' element={<Profile />}/>


        <Route path='report' element={<Report />}/>

        <Route path='request' element={<Request />}/>
      </Route>

      {/* Admin Pages*/}
      {/* role.data.find(data => data._systemRole._superAdmin) ? <AdminDashboard /> : <Navigate replace to="/login" /> */}

      <Route path='/admin/dashboard' element={Object.keys(user).length != 0 ? roles.filter(role => role.appAdmin).length != 0  ? <AdminDashboard /> : <Navigate replace to='/login'/> : <Navigate replace to='/login'/>}> {/* roles.filter(role => role.appAdmin).length != 0 */}
        <Route path='home' element={<Home />}/>

        <Route path='users' element={<UsersLayout />} />

        <Route path='institutions' />

        <Route path='profile/' element={<Profile />}/>

        <Route path='profile/:id' element={<UsersProfile />}/>
      </Route>
    </Routes>
  );
}

export default App;
 