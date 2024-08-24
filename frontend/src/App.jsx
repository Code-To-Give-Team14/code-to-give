import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/NavBar.css';
import logo from './assets/Zubin-Logo.jpg'

// List of pages
import MainScrollPage from './pages/MainScrollPage'
import EventPage from './pages/EventPage'
import LoginPage from './pages/LoginPage'
import CommunityPage from './pages/CommunityPage'
import EngagementPage from './pages/EngagementPage'
import AdminPage from './pages/AdminPage'
import AdminTablePage from './pages/AdminTablePage'

// Component for navigate the unauthorized users to the loginPage
import ProtectedRoute from './components/ProtectedRoute';

import { ChatBot } from './components/ChatBot';
import { EventForm } from './components/EventForm'

function App() {

  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <>
      <Router>
        <nav>
          <img src={logo} className="nav-logo"/>
            <ul className="nav-links">
              <li><Link className="nav-link" to="/">Main Scroll</Link></li>
              <li><Link className="nav-link" to="/event">Event</Link></li>
              <li><Link className="nav-link" to="/community">Community</Link></li>
              <li><Link className="nav-link" to="/engagement">Volunteer</Link></li>
              <li><Link className="nav-link" to="/admin">Admin</Link></li>
            </ul>
        </nav>
      
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainScrollPage />} />
          <Route path="/event" element={<EventPage />} />

          {/* Protected Routes */}
          <Route path="/community" element={<ProtectedRoute element={<CommunityPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/engagement" element={<ProtectedRoute element={<EngagementPage />} isAuthenticated={isAuthenticated} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} isAuthenticated={isAuthenticated && isAdmin} />}>
            <Route path="table" element={<AdminTablePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App