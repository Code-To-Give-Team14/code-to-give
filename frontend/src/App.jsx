import { useState } from 'react'
import HelloWorld from './components/hellowWord'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// List of pages
import MainScrollPage from './pages/MainScrollPage'
import EventPage from './pages/EventPage'
import LoginPage from './pages/LoginPage'
import ChatBotPage from './pages/ChatBotPage'
import CommunityPage from './pages/CommunityPage'
import EngagementPage from './pages/EngagementPage'
import AdminPage from './pages/AdminPage'

// Component for navigate the unauthorized users to the loginPage
import ProtectedRoute from './components/ProtectedRoute';

import { ChatBot } from './components/ChatBot';

function App() {

  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <>
      <Router>
        <nav style={{ backgroundColor: '#f0f0f0', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', padding: 0, margin: 0 }}>
            <li style={{ display: 'inline' }}>
              <Link to="/" style={{ color: 'black', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Main Scroll</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/event" style={{ color: 'black', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Event</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/community" style={{ color: 'black', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Community</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/chatbot" style={{ color: 'black', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Chat Bot</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/engagement" style={{ color: 'black', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Engagement</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/admin" style={{ color: 'black', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Admin</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/login" style={{ color: 'black', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Login</Link>
            </li>
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
          <Route path="/engagement" element={<ProtectedRoute element={<EngagementPage />} isAuthenticated={isAuthenticated} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} isAuthenticated={isAuthenticated && isAdmin} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App