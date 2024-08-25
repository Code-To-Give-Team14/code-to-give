import React, { useState } from 'react';
import '../styles/CommentBox.css';

const CommentBox = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment(''); // Clear the input after submission
    }
  };

  return (
    <div className="comment-box">
      <textarea
        className="comment-input"
        placeholder="Type your comment here..."
        value={comment}
        onChange={handleInputChange}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CommentBox;
