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
import Subjects from './pages/Subjects';
import Kiosks from './pages/Kiosks';
import IUser, { UserRole } from './data/IUser';
import Kiosk from './pages/Kiosk';
import { useUsers } from './hooks/useUsers';
import Map from './pages/Map';
import Room from './pages/Room';
import SelectedSubject from './pages/SelectedSubject';
import SelectedUser from './pages/UserSelected';
import AddUserPage from './pages/Users/AddUserPage';
import AddSubjectPage from './pages/Subjects/AddSubjectPage';

function App() {
  const { user } = useAuth()
  const { getCurrentUser } = useUsers()

  return (
    <Routes>
      {/* Public pages */}
      <Route path='/' element={ getCurrentUser() ? IdentifyRole(getCurrentUser()!) : <Login />}/> {/* IdentifyRole(getCurrentUser()!) */} 

      {/* Admin user */}
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

        <Route path='subject'>
          <Route element={<Subjects />} index/>
          <Route path=':subjectId' element={<SelectedSubject />} />
          <Route path='add' element={<AddSubjectPage />}/>
        </Route>

        <Route path='users'>
          <Route element={<Users />} index/>
          <Route path=':userId' element={<SelectedUser />}/>
          <Route path='add' element={<AddUserPage />}/>
        </Route>

        <Route path='kiosk'>
          <Route element={<Kiosks />} index />
          <Route path=':kioskId' element={<Kiosk />}/>
        </Route>

        <Route path="roomMap" element={<Room />}/>
      </Route>

      {/* Dean */}
      <Route path='/dean' element={ !user ? <Navigate replace to="/" /> : <Layout />  }> 
        <Route index path='home' element={<Home />}  />

        <Route path='attendances' element={<Attendances />} />

        <Route path='rooms'>
          <Route element={<QRCodes />} index/>
          <Route path=':roomId' element={<SelectedRoom />}/>
        </Route>

        <Route path='subject'>
          <Route element={<Subjects />} index/>
          <Route path=':subjectId' element={<SelectedSubject />} />
          <Route path='add' element={<AddSubjectPage />}/>
        </Route>

        <Route path='users'>
          <Route element={<Users />} index/>
          <Route path=':userId' element={<SelectedUser />}/>
          <Route path='add' element={<AddUserPage />}/>
        </Route>

        <Route path='kiosk'>
          <Route element={<Kiosks />} index />
          <Route path=':kioskId' element={<Kiosk />}/>
        </Route>

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

        <Route path='users'>
          <Route element={<Users />} index/>
          <Route path=':userId' element={<SelectedUser />}/>
          <Route path='add' element={<AddUserPage />}/>
        </Route>

        <Route path='kiosk'>
          <Route element={<Kiosks />} index />
          <Route path=':kioskId' element={<Kiosk />}/>
        </Route>

        <Route path='notifications'>
          <Route element={<NotificationList />} index/>
          <Route path=':notificationId' element={<NotificationItem />}/>
        </Route>
      </Route>

      
      {/* Indoor navigation */}
      <Route path='/kiosk' element={ !user ? <Navigate replace to="/" /> : <Layout /> }> {/* !user ? <Navigate replace to="/" /> : <Layout /> */}
        <Route index path='home' element={<Map />}  />
      </Route>
    </Routes>
  );
}

const IdentifyRole = (user: IUser) => {
  return  (user.ROLE_ID as UserRole).admin ? <Navigate replace to="/admin/home" /> : 
          (user.ROLE_ID as UserRole).campusDirector ? <Navigate replace to="/campusDirector/home" /> : 
          (user.ROLE_ID as UserRole).dean ? <Navigate replace to="/dean/home" /> : 
          (user.ROLE_ID as UserRole).kiosk ? <Navigate replace to="/kiosk/home" /> : 
          <Login />
}

export default App;
 