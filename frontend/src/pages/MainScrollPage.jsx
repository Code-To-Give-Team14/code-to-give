import React from 'react'
import { Link } from 'react-router-dom';
import '../MainScrollPage.css';

const MainScrollPage = () => {
  return (
    <div className="main-scroll-page">
      <h1>Zubin Foundation</h1>

      <div className="event">
        <Link to="/EventPage" style={{ display: 'contents' }}>
          <img src="https://placehold.jp/256x200.png" alt="Latest Events" className="event-image left-image" />
        </Link>
        <div className="event-description right-description">
          <h2>Latest Events</h2>
          <p>This is the description for Event 1. It's going to be an amazing event where you can enjoy, learn, and connect with others. This is the description for Event 1. It's going to be an amazing event where you can enjoy, learn, and connect with others. This is the description for Event 1. It's going to be an amazing event where you can enjoy, learn, and connect with others.</p>
        </div>
      </div>

      <div className="event">
        <div className="event-description left-description">
          <h2>Our Community</h2>
          <p>This is the description for Event 2. Don’t miss out on the opportunity to be part of something extraordinary!</p>
        </div>
        <Link to="/CommunityPage" style={{ display: 'contents' }}>
          <img src="https://placehold.jp/256x200.png" alt="Community" className="event-image right-image" />
        </Link>
      </div>

      <div className="event">
        <Link to="/MainScrollPage" style={{ display: 'contents' }}>
          <img src="https://placehold.jp/256x200.png" alt="Chatbot" className="event-image left-image" />
        </Link>
        <div className="event-description right-description">
          <h2>About Us</h2>
          <p>This is the description for Event 3. Join us for an unforgettable experience filled with excitement and fun.</p>
        </div>
      </div>
    </div>
  );
};

export default MainScrollPage
