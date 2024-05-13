import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from './assets/themes/defaultTheme';
// import store, { persistor } from './app/encored-store';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './context/AuthContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { RoomProvider } from './context/RoomContext';
import { SubjectProvider } from './context/SubjectContext';
import { UserProvider } from './context/UserContext';
import { DepartmentProvider } from './context/DepartmentContext';
import { RoleProvider } from './context/RoleContext';
import { ClockProvider } from './context/ClockContext';
import { NotificationProvider } from './context/NotificationContext';
import { KioskLogProvider } from './context/KioskContext';
import { NavigationProvider } from './context/NavigationContext';
import ScheduleProvider from './context/ScheduleContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> */}

        <AuthProvider>
          <DepartmentProvider>
            <UserProvider>
              <ScheduleProvider>
                <RoomProvider>
                  <SubjectProvider>
                    <KioskLogProvider>
                      <AttendanceProvider>
                        <NotificationProvider>
                          <NavigationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                              <ClockProvider>
                                <BrowserRouter>
                                  <ThemeProvider theme={defaultTheme}>
                                    <App />
                                  </ThemeProvider>
                                </BrowserRouter>
                              </ClockProvider>

                            </LocalizationProvider>

                          </NavigationProvider>
                        </NotificationProvider>
                      </AttendanceProvider>
                    </KioskLogProvider>
                  </SubjectProvider>
                </RoomProvider>
              </ScheduleProvider>
            </UserProvider>
          </DepartmentProvider>
        </AuthProvider>
        
      {/* </PersistGate>
    </Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
