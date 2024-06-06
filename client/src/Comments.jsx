import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pane, Heading, UnorderedList, ListItem, Text, Button, TrashIcon, Spinner, Card, majorScale } from 'evergreen-ui';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/comments');
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setLoading(false);
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
    <Pane
      className="comments-container"
      margin={24}
      padding={24}
      border="default"
      borderRadius={4}
      background="tint1"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading size={700} marginBottom={24}>Comments</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <UnorderedList className="comments-list" padding={0} width="100%" maxWidth={600}>
          {comments.map(comment => (
            <ListItem key={comment.id} className="comment-item" padding={0} marginBottom={majorScale(3)}>
              <Card 
                display="flex" 
                flexDirection="column" 
                padding={majorScale(2)} 
                border="muted" 
                borderRadius={4} 
                background="white"
                elevation={1}
                hoverElevation={2}
                width="100%"
              >
                <Pane className="comment-header" display="flex" justifyContent="space-between" marginBottom={majorScale(1)}>
                  <Text className="comment-name" size={500} fontWeight={500}>{comment.name}</Text>
                  <Text className="comment-email" size={300} color="muted">{comment.email}</Text>
                </Pane>
                <Text className="comment-body" size={400} marginBottom={majorScale(2)}>{comment.body}</Text>
                <Button 
                  className="delete-button" 
                  iconBefore={TrashIcon} 
                  intent="danger" 
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </Button>
              </Card>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Pane>
  );
};

export default Comments;
