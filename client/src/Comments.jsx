import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css'; // Import CSS file for styling

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${id}`);
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comments-container">
      <h1 className="comments-header">Comments</h1>
      <ul className="comments-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <div className="comment-header">
              <p className="comment-name">{comment.name}</p>
              <p className="comment-email">{comment.email}</p>
            </div>
            <p className="comment-body">{comment.body}</p>
            <button className="delete-button" onClick={() => deleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
