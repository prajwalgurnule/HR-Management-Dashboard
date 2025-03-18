import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { ThemeProvider } from './Context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
            <App />
          </ThemeProvider>  
      </BrowserRouter>
  // </React.StrictMode>,
)
