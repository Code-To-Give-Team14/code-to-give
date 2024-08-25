import React, { useState } from 'react';
import { Input, Badge, Button } from 'antd';
import { UserOutlined, PlusOutlined, HomeOutlined, MessageOutlined, SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import '../styles/CommunityPage.css';

const CommunityPage = () => {
  const [replies, setReplies] = useState({});
  const [newReply, setNewReply] = useState({});
  const [selectedTag, setSelectedTag] = useState('All');

  const handleInputChange = (threadId, event) => {
    setNewReply({ ...newReply, [threadId]: event.target.value });
  };

  const handleAddReply = (threadId) => {
    const threadReplies = replies[threadId] || [];
    setReplies({
      ...replies,
      [threadId]: [...threadReplies, newReply[threadId]]
    });
    setNewReply({ ...newReply, [threadId]: '' }); // Clear input after submission
  };

  const threads = [
    {
      id: 0,
      title: 'Welcome!',
      content: 'Welcome to our discussion forum! Please feel free to ask questions here or raise an emergency...',
      author: 'Scott Maxwell',
      time: '6 days ago',
      category: 'Accounting',
      tag: 'General',
    },
    {
      id: 1,
      title: 'New Event Poll',
      content: 'What event should we organize next month? Please vote in the poll!',
      author: 'Ronald Jackson',
      time: '2 hours ago',
      category: 'Accounting, Corporate Law',
      tag: 'Event Polling',
    },
    {
      id: 2,
      title: 'Emergency Relief Support',
      content: 'We are organizing support for families affected by the recent floods. Please contact us if you can help!',
      author: 'Alex Johnson',
      time: '1 day ago',
      category: 'Corporate Law',
      tag: 'Emergency Relief',
    },
    {
      id: 3,
      title: 'The Chai Workshop was lit',
      content: 'The Chai Workshop I joined last week was really a fun experience to have!',
      author: 'Anonymous',
      time: '2 days ago',
      category: 'General',
      likes: 28,
      views: 147,
      icon: '<MessageOutlined/>',
      replies: [],
      tag: 'General',
    },
  ];

  const filteredThreads = selectedTag === 'All'
    ? threads
    : threads.filter(thread => thread.tag === selectedTag);

  return (
    <div className="community-page">
      <aside className="sidebar">
        <div className="sidebar-courses">
          <h2>Community Forum</h2>
          <ul>
            <li><HomeOutlined /> Home</li>
            <li><MessageOutlined /> Your Threads</li>
            <li><SaveOutlined /> Saved</li>
          </ul>
          <h3>Current Topics</h3>
          <ul>
          <li onClick={() => setSelectedTag('All')}><MessageOutlined /> All</li>
            <li onClick={() => setSelectedTag('General')}><MessageOutlined /> General</li>
            <li onClick={() => setSelectedTag('Event Polling')}><MessageOutlined /> Event Polling</li>
            <li onClick={() => setSelectedTag('Emergency Relief')}><ExclamationCircleOutlined /> Emergency Relief</li>
          </ul>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginTop: '20px', borderRadius: '20px' }}>
            Join a new topic
          </Button>
        </div>
      </aside>

      <main className="content">
        <div className="content-header">
          <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '20px', borderRadius: '20px' }}>
            Add a new thread
          </Button>
        </div>
        <div className="threads">
          {filteredThreads.map(thread => (
            <div key={thread.id} className="thread-card">
              <h3>{thread.title}</h3>
              <p>{thread.content}</p>
              <div className="thread-meta">
                <span>{thread.author} - {thread.time}</span>
                <span className="thread-tag">{thread.tag}</span>
              </div>
              <div className="response-section">
                {replies[thread.id] && replies[thread.id].map((reply, index) => (
                  <div key={index} className="reply">
                    <UserOutlined className="reply-icon" />
                    <span className="reply-user">Current User:</span>
                    <p>{reply}</p>
                  </div>
                ))}
                <Input.TextArea
                  value={newReply[thread.id] || ''}
                  onChange={(e) => handleInputChange(thread.id, e)}
                  placeholder="Write a reply..."
                  rows={2}
                  className="response-input"
                />
                <Button
                  type="link"
                  className="response-button"
                  onClick={() => handleAddReply(thread.id)}
                >
                  Add Response
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <aside className="right-sidebar">
        <div className="profile-card">
          <img src="path/to/doctor-profile.jpg" alt="Dr Ronald Jackson" />
          <h3>Tvesha</h3>
          <p>Current User</p>
          <Button type="primary" block>
            Profile
          </Button>
        </div>
        <div className="attendees">
          <h3>22 Online</h3>
          <ul>
            <li>Leslie Alexander</li>
            <li>Darlene Robertson</li>
            <li>Albert Flores</li>
            <li>Jane Cooper</li>
            <li>Brooklyn Simmons</li>
            {/* Add more attendees as needed */}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default CommunityPage;
