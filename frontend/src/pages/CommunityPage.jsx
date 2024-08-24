import React, { useState } from 'react';
import '../styles/CommunityPage.css';

const CommunityPage = () => {
  const [selectedThread, setSelectedThread] = useState(null);

  const threads = [
    {
      id: 1,
      title: 'Quadratic equation',
      content: 'How do we solve ax² + bx + c = 0?',
      author: 'Anonymous',
      time: '2 hours ago',
      category: 'Lectures – W1',
      likes: 4,
      views: 242,
      replies: [
        {
          id: 1,
          author: 'Scott Maxwell',
          role: 'STAFF',
          time: '2 hours ago',
          content: 'Good question! You can use the quadratic formula:',
          equation: 'x = (-b ± √(b² - 4ac)) / 2a',
          likes: 2,
          endorsed: true,
          reply: {
            author: 'Emily Kwong',
            time: '2 hours ago',
            content: 'Also note the graph of a quadratic function is called a parabola and has this general shape:',
            image: '/path/to/image.png', // Replace with an actual image path
            likes: 2,
          },
        },
      ],
    },
    {
      id: 2,
      title: 'Supersonic flow',
      content: 'Discuss the characteristics of supersonic flow.',
      author: 'Anonymous',
      time: '2 hours ago',
      category: 'Assignments – A1',
      likes: 2,
      views: 150,
      replies: [],
    },
  ];

  return (
    <div className="community-page">
      <header className="header">
        <h1 className="header-title">The Zubin Foundation – Community Forum</h1>
      </header>
      
      <div className="main-container">
        <aside className="sidebar">
          <button className="new-thread-btn"><span>New Thread</span></button>
          <div className="categories">
            <h3>CATEGORIES</h3>
            <ul>
              <li><span>General</span></li>
              <li><span>Event Polls</span></li>
              <li><span>Emergency Relief</span></li>
            </ul>
          </div>
        </aside>
        
        <section className="thread-list">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="thread-section">
            <h3>Pinned</h3>
            <div className="thread-item pinned" onClick={() => setSelectedThread(threads[0])}>
              <h4>Welcome!</h4>
              <p>General – Scott Maxwell</p>
            </div>
          </div>
          <div className="thread-section">
            <h3>This Week</h3>
            {threads.map(thread => (
              <div key={thread.id} className="thread-item" onClick={() => setSelectedThread(thread)}>
                <h4>{thread.title}</h4>
                <p>{thread.category} – {thread.author}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="discussion-panel">
          {selectedThread ? (
            <div className="thread-detail">
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
                  {reply.equation && <pre>{reply.equation}</pre>}
                  <div className="reply-actions">
                    <span>{reply.likes} likes</span>
                    {reply.endorsed && <span>Endorsed</span>}
                  </div>
                  {reply.reply && (
                    <div className="nested-reply">
                      <p>{reply.reply.author} – {reply.reply.time}</p>
                      <p>{reply.reply.content}</p>
                      {reply.reply.image && <img src={reply.reply.image} alt="Graph" />}
                    </div>
                  )}
                </div>
              ))}
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