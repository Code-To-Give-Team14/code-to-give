import { useState } from 'react'
import HelloWorld from './components/hellowWord'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// List of pages
import MainScrollPage from './pages/MainScrollPage'
import EventPage from './pages/EventPage'
import LoginPage from './pages/LoginPage'
import ChatBotPage from './pages/ChatBotPage'
import CommunityPage from './pages/CommunityPage'
import VolunteerPage from './pages/VolunteerPage'
import AdminPage from './pages/AdminPage'

// Component for navigate the unauthorized users to the loginPage
import ProtectedRoute from './components/ProtectedRoute';

import { ChatBot } from './components/ChatBot';
import { EventForm } from './components/EventForm'

function App() {

  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <>
      <EventForm />
    </>
  )
}

export default App