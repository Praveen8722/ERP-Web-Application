
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import  Dashboard  from '../Dashboard';
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main style={{ 
           padding: "20px",
           width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
           marginLeft: collapsed ? "100px" : "270px",
           marginTop: "80px",
           flexGrow: 1,
           background: "white",
          }}>
          {children}
          <Dashboard/>
        </main>
       
      </div>
    </div>
  );
};

export default AdminLayout;
