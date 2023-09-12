import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import DashboardLayout from './pages/Authenticated/Dashboard';
import Home from './pages/Authenticated/Home';
import Subjects from './pages/Authenticated/Subjects';
import Events from './pages/Authenticated/Events';
import MapPage from './pages/Authenticated/Map';
import Users from './pages/Authenticated/Users';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegistrationPage/>}/>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='home' element={<Home />} />
        <Route path='subjects' element={<Subjects />} />
        <Route path='events' element={<Events />} />
        <Route path='map' element={<MapPage />} />
        <Route path='groups' element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
 