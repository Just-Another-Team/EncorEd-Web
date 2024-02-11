import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from './assets/themes/defaultTheme';
import store, { persistor } from './app/encored-store';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
              <App />
            </ThemeProvider>
          </BrowserRouter>
          
        </LocalizationProvider>
        
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
