import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBar from "../components/SideBar.jsx";
import AdminPageX from "./admin/AdminPageX.jsx";

const AdminPage = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminPageX />
    </div>
  );
}

export default AdminPage;