import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegistrationPage/>}/>
    </Routes>
  );
}

export default App;
 