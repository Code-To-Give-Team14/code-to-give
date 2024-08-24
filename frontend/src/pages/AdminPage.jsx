import React from 'react'
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      THIS IS THE ADMIN PAGE
      <Outlet />
    </div>
  )
}

export default AdminPage