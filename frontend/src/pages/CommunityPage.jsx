import React, { useState } from 'react';
import '../styles/CommunityPage.css';
import voteImage from '../assets/community_vote.png';

const CommunityPage = () => {
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [newReply, setNewReply] = useState(""); // State to store the new reply text

  const threads = [
    {
      id: 0,
      title: 'Welcome!',
      content: 'Welcome to our discussion forum! Please feel free to ask questions here or raise an emergency, the staff and other members are happy to help! You can also raise an event proposal and start a poll!',
      author: 'Scott Maxwell',
      time: '3 days ago',
      category: 'General',
      likes: 51,
      views: 1507,
      replies: [],
    },
    {
      id: 1,
      title: 'House Rental',
      content: 'How do rent a flat in Hong Kong? And is there any place that welcome us ethic minorties?',
      author: 'Anonymous',
      role: 'MEMBER',
      time: '2 days ago',
      category: 'General',
      likes: 48,
      views: 2421,
      replies: [
        {
          id: 1,
          author: 'Scott Maxwell',
          role: 'STAFF',
          time: '7 hours ago',
          content: 'Good question! You can rent a flat with other community members! I think they will welcome you.',
          likes: 27,
          endorsed: true,
          reply: {
            author: 'Emily Kwong',
            time: '1 hour ago',
            content: 'Actually I am finding someone to rent a flat with me. There are 2 more roommates. Feel free to contact me!',
            likes: 22,
          },
        },
      ],
    },
    {
      id: 2,
      title: 'The Chai Workshop was lit',
      content: 'The Chai Workshop I joined last week was really a fun experience to have!',
      author: 'Anonymous',
      role: 'MEMBER',
      time: '2 hours ago',
      category: 'General',
      likes: 28,
      views: 147,
      replies: [],
    },
    {
      id: 3,
      title: 'New Event Poll',
      content: 'What event should we organize next month? Please vote in the poll!',
      image: {voteImage},
      author: 'Event Organizer',
      role: 'STAFF',
      time: '5 days ago',
      category: 'Event Polls',
      likes: 40,
      views: 800,
      replies: [],
    },
    {
      id: 4,
      title: 'Emergency Relief Support',
      content: 'We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!We are organizing support for families affected by the recent floods. Please contact us if you can help!',
      author: 'Relief Coordinator',
      role: 'MEMBER',
      time: '1 day ago',
      category: 'Emergency Relief',
      likes: 60,
      views: 1020,
      replies: [],
    },
  ];

  const filteredThreads = threads.filter(thread => thread.category === selectedCategory);

  const handleReplySubmit = () => {
    if (selectedThread && newReply.trim()) {
      const updatedThreads = threads.map(thread => {
        if (thread.id === selectedThread.id) {
          return {
            ...thread,
            role: 'MEMBER',
            replies: [
              ...thread.replies,
              {
                id: thread.replies.length + 1,
                author: 'Current User',
                time: 'Just now',
                content: newReply,
                likes: 0
              },
            ],
          };
        }
        return thread;
      });
      
      setSelectedThread({
        ...selectedThread,
        replies: [
          ...selectedThread.replies,
          {
            id: selectedThread.replies.length + 1,
            author: 'Current User',
            role: 'MEMBER',
            time: 'Just now',
            content: newReply,
            likes: 0,
          },
        ],
      });

      setNewReply(""); // Clear the input field after submission
    }
  };

  return (
    <div className="community-page">
      <header className="header">
        <h1 className="header-title">Community Forum</h1>
      </header>
      
      <div className="main-container">
        <aside className="sidebar">
          <button className="new-thread-btn"><span>New Thread</span></button>
          <div className="categories">
            <h3>CATEGORIES</h3>
            <ul>
              <li className={selectedCategory === 'General' ? 'active' : ''} onClick={() => setSelectedCategory('General')}><span>General</span></li>
              <li className={selectedCategory === 'Event Polls' ? 'active' : ''} onClick={() => setSelectedCategory('Event Polls')}><span>Event Polls</span></li>
              <li className={selectedCategory === 'Emergency Relief' ? 'active' : ''} onClick={() => setSelectedCategory('Emergency Relief')}><span>Emergency Relief</span></li>
            </ul>
          </div>
        </aside>
        
        <section className="thread-list">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          {filteredThreads.length > 0 ? (
            <div className="thread-section">
              <h3>This Week</h3>
              {filteredThreads.map(thread => (
                <div key={thread.id} className="thread-item" onClick={() => setSelectedThread(thread)}>
                  <h4>{thread.title}</h4>
                  <p>{thread.category} – {thread.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No threads available in this category.</p>
          )}
        </section>
        
        <section className="discussion-panel">
          {selectedThread ? (
            <div className="thread-detail" style={{marginBottom: '120px'}}>
              <h2>{selectedThread.title}</h2>
              <div className="thread-meta">
                <p>{selectedThread.author} – {selectedThread.time}</p>
                <p>{selectedThread.likes} likes • {selectedThread.views} views</p>
              </div>
              <p>{selectedThread.content}</p>
              {selectedThread.replies.map(reply => (
                <div key={reply.id} className="reply-item">
                  <h4>{reply.author} <span className="role-badge">{reply.role}</span></h4>
                  <p>{reply.content}</p>
                  <div className="reply-actions">
                    <span>{reply.likes} likes</span>
                    {reply.endorsed && <span>Endorsed</span>}
                  </div>
                </div>
              ))}

              {/* Input field and button for new reply */}
              <div className="reply-form">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Type your reply here..."
                />
                <button onClick={handleReplySubmit}>Reply</button>
              </div>
            </div>
          ) : (
            <p>Select a thread to view the discussion</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;