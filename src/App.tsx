import './App.css';
import {Routes, Route, Navigate, useLocation, useNavigate} from 'react-router-dom';

import Login from './pages/Login';
import LandingPage from './pages/Landing/LandingPage';

import Layout from './pages/_Layout';
import Home from './pages/Home';
import QRCodes from './pages/QRCode';
import SelectedRoom from './pages/QRCodeViewRoom';
import NotificationList from './pages/Notifications';
import NotificationItem from './pages/Notification';
import Attendances from './pages/Attendances';
import { useAuth } from './hooks/useAuth';
import Department from './pages/Department';
import Users from './pages/Users';
import Subjects from './pages/Subject';
import Kiosks from './pages/Kiosks';
import { UserRole } from './data/IUser';

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public pages */}
      <Route path='/' element={ user ? (user.ROLE_ID as UserRole).admin ? <Navigate replace to="/admin/home" /> : (user.ROLE_ID as UserRole).campusDirector ? <Navigate replace to="/campusDirector/home" /> : (user.ROLE_ID as UserRole).dean ? <Navigate replace to="/dean/home" /> : <Login /> : <Login />}/>

      {/* All Users */}
      <Route path='/admin' element={ !user ? <Navigate replace to="/" /> : <Layout />  }> 
        <Route index path='home' element={<Home />}  />

        <Route path='attendances' element={<Attendances />} />

        <Route path='rooms'>
          <Route element={<QRCodes />} index/>
          <Route path=':roomId' element={<SelectedRoom />}/>
        </Route>

        <Route path='notifications'>
          <Route element={<NotificationList />} index/>
          <Route path=':notificationId' element={<NotificationItem />}/>
        </Route>

        <Route path='department' element={<Department />} />
        <Route path='subject' element={<Subjects />}/>
        <Route path='users' element={<Users />}/>

        <Route path='kiosk' element={<Kiosks />}/>
      </Route>

      {/* Dean */}
      <Route path='/dean' element={ !user ? <Navigate replace to="/" /> : <Layout />  }> 
        <Route index path='home' element={<Home />}  />

        <Route path='attendances' element={<Attendances />} />

        <Route path='rooms'>
          <Route element={<QRCodes />} index/>
          <Route path=':roomId' element={<SelectedRoom />}/>
        </Route>

        <Route path='users' element={<Users />}/>

        <Route path='kiosk' element={<Kiosks />}/>

        <Route path='notifications'>
          <Route element={<NotificationList />} index/>
          <Route path=':notificationId' element={<NotificationItem />}/>
        </Route>
      </Route>

      {/* Campus Director */}
      <Route path='/campusDirector' element={ !user ? <Navigate replace to="/" /> : <Layout />  }> 
        <Route index path='home' element={<Home />}  />

        <Route path='attendances' element={<Attendances />} />

        <Route path='department' element={<Department />} />
        <Route path='users' element={<Users />}/>

        <Route path='kiosk' element={<Kiosks />}/>

        <Route path='notifications'>
          <Route element={<NotificationList />} index/>
          <Route path=':notificationId' element={<NotificationItem />}/>
        </Route>
      </Route>

      
      
      
      {/* <Route path='/register' element={<UserInput />}> Registration is not needed
        <Route path='user' element={<RegistrationUserForm />} />
        <Route path='institution' element={<RegistrationInstitutionForm />}/>
        <Route path='institution' element={Object.keys(user).length != 0 ? <RegistrationInstitutionForm /> : <Navigate replace to='/login' />}/>
      </Route> */}

      {/* Authenticated Pages */}
      {/* <Route path='/dashboard' element={ Object.keys(role).length != 0 && !role.appAdmin ? <Dashboard /> : <Navigate replace to='/login' /> }>
        <Route index path='home' element={<InstitutionalHome />} />

        <Route path='map/list' element={<MapList />} />

        <Route path='subject/:institution' element={<Subject />}>
          <Route index path='' element={<SubSummary />}/>
          <Route path='list' element={<SubList />}/>
          <Route path='schedule' element={<SchedSubList />}/>
          <Route path='request' element={<SubRequest />}/>
        </Route>
        <Route path='subject/:institution/add' element={<AddSubject />}/> 
        <Route path='subject/:institution/:id' element={<SelectedSubject />} />
        <Route path='subject/:institution/:id/update' /> 

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
          <Route path='roles/u/:institution/:roleId' element={<SelectedRole />}>
            <Route index path='access' element={<RoleAccess />}/>
            <Route path='users' element={<RoleUsers />}/>
            <Route path='groups' />
          </Route>
        </Route>
        <Route path='role/:institution/add' element={<AddRole />}/>
        <Route path='role/:institution/:id/update' element={<UpdateRole />}/>

        <Route path='institution' element={<Institution />} />

        <Route path='profile/' element={<Profile />}/>
        <Route path='profile/:id' element={<UsersProfile />}/>

        <Route path='report' element={<Report />}>
          <Route index path='summary' element={<ReportSummary/>}/>
          <Route index path='attendance' element={<AttendanceList/>}/>
        </Route>

        <Route path='request' element={<Request />}/>
      </Route> */}

      {/* Admin Pages - Admin is also not needed */}
      {/* <Route path='/admin/dashboard' element={ Object.keys(role).length != 0 && role.appAdmin ? <AdminDashboard /> : <Navigate replace to='/login' /> }>
        <Route path='home' element={<Home />}/>

        <Route path='users' element={<UsersLayout />} />

        <Route path='institutions' />

        <Route path='profile/' element={<Profile />}/>

        <Route path='profile/:id' element={<UsersProfile />}/>
      </Route> */}
    </Routes>
  );
}

export default App;
 