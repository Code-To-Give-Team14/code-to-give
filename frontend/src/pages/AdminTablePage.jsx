import React from 'react';
import '../styles/AdminTable.css';

import { EventTable } from "../components/admin/EventTable";

const AdminTablePage = () => {
  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <EventTable />
    </div>
  )
}

export default AdminTablePage;