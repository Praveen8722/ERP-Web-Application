import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  SuperAdminState from './components/context/SuperAdminState.jsx';
import  AdminState from './components/context/AdminState.jsx';
import EmpState from './components/context/EmpState.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


  
<SuperAdminState>
<AdminState>
  <EmpState>
     
      <App />
      </EmpState>
      </AdminState>
    </SuperAdminState>
   
  </React.StrictMode>
);
