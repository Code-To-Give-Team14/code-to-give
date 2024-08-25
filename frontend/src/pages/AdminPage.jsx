import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBar from "../components/SideBar.jsx";

const AdminPage = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="admin-sidebar">
          <button className="new-event-btn"><span>New Event</span></button>
          <div className="admin-categories">
            <ul>
            <Link className="side-link" to="/admin"><li><span>Dashboard</span></li></Link>
            <Link className="side-link" to="/admin/table"><li><span>Events</span></li></Link>
            </ul>
          </div>
        </aside>
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;