import { useState } from 'react'
import HelloWorld from './components/hellowWord'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/NavBar.css';
import logo from './assets/Zubin-Logo.jpg'

// List of pages
import MainScrollPage from './pages/MainScrollPage'
import EventPage from './pages/EventPage'
import LoginPage from './pages/LoginPage'
import ChatBotPage from './pages/ChatBotPage'
import CommunityPage from './pages/CommunityPage'
import VolunteerPage from './pages/VolunteerPage'
import AdminPage from './pages/AdminPage'
import AdminTablePage from './pages/AdminTablePage'

// Component for navigate the unauthorized users to the loginPage
import ProtectedRoute from './components/ProtectedRoute';

import { ChatBot } from './components/ChatBot';

function App() {

  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <>
      <Router>
        <nav>
        <img src={logo} className="nav-logo" />
          <ul className="nav-links">
            <li><Link className="nav-link" to="/">Main Scroll</Link></li>
            <li><Link className="nav-link" to="/event">Event</Link></li>
            <li><Link className="nav-link" to="/community">Community</Link></li>
            <li><Link className="nav-link" to="/chatbot">Chat Bot</Link></li>
            <li><Link className="nav-link" to="/volunteer">Volunteer</Link></li>
            <li><Link className="nav-link" to="/admin">Admin</Link></li>
            <li><Link className="nav-link" to="/login">Login</Link></li>
          </ul>
        </nav>
      
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainScrollPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/event" element={<EventPage />} />

          {/* Protected Routes */}
          <Route path="/community" element={<ProtectedRoute element={<CommunityPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/chatbot" element={<ProtectedRoute element={<ChatBotPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/volunteer" element={<ProtectedRoute element={<VolunteerPage />} isAuthenticated={isAuthenticated} />} />

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