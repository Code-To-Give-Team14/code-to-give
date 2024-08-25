import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainScrollPage.css';
import activityImage from '../assets/mainScroll_activities.jpg';
import communityImage from '../assets/mainScroll_community.png';
import aboutUsImage from '../assets/mainScroll_aboutUs.jpg';
import { ChatBot } from '../components/ChatBot';
import zubinLogo from '../assets/mainScroll_zubinLogo.jpg';

const MainScrollPage = () => {
  return (
    <div className="main-scroll-page">
      <div className="event">
        <div className="event-box">
          <Link to="/event" style={{ display: 'contents' }}>
            <img src={activityImage} alt="Latest Events" className="event-image right-image" />
          </Link>
          <div className="event-description left-description">
            <h2>Latest Events</h2>
            <p>This is the description for Event 1. It's going to be an amazing event where you can enjoy, learn, and connect with others. This is the description for Event 1. It's going to be an amazing event where you can enjoy, learn, and connect with others. This is the description for Event 1. It's going to be an amazing event where you can enjoy, learn, and connect with others.</p>
          </div>
          <Link to="/event" style={{ display: 'contents' }}>
            <button className="event-button"><span>Learn More</span></button>
          </Link>
        </div>
      </div>

      <div className="event">
        <div className="event-box">
          <div className="event-description right-description">
            <h2>Our Community</h2>
            <p>This is the description for Event 2. Don’t miss out on the opportunity to be part of something extraordinary!</p>
          </div>
          <Link to="/community" style={{ display: 'contents' }}>
            <img src={communityImage} alt="Community" className="event-image left-image" />
          </Link>
          <Link to="/community" style={{ display: 'contents' }}>
            <button className="event-button" style={{ position: 'absolute', left: '650px' }}><span>Learn More</span></button>
          </Link>
        </div>
      </div>

      <div className="event">
        <div className="event-box">
          <Link to="/MainScrollPage" style={{ display: 'contents' }}>
            <img src={aboutUsImage} alt="Chatbot" className="event-image right-image" />
          </Link>
          <div className="event-description left-description">
            <h2>About Us</h2>
            <p>This is the description for Event 3. Join us for an unforgettable experience filled with excitement and fun.</p>
          </div>
          <button className="event-button"><span>Learn More</span></button>
        </div>
      </div>
      <footer>
        <div className="footer-bottom">
          <p>
            &copy; 2024 The Zubin Mathani Gidumal Foundation Limited (registered charity in Hong Kong - IR 91/12344).
            Website Developed By <a href="https://ksantechsoft.com" target="_blank" rel="noopener noreferrer">Code To Give Team 14</a>.
          </p>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default MainScrollPage
