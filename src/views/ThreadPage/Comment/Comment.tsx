import React, { useState } from 'react';
import { Comment as CommentType } from '../../../types/CommonTypes';
import axios from '../../../apis/reviveme';
import './Comment.css';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

interface CommentProps {
  comment: CommentType;
  refetchComments: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, refetchComments }) => {
  const { id } = useParams<{ id: string }>(); // Thread id
  const [showReplyEditor, setShowReplyEditor] = useState(false);

  const handleDeleteButtonPress = () => {
    axios
      .delete(`/api/v1/comments/${comment.id}`)
      .then(refetchComments)
      .catch((err: AxiosError) => {
        console.log('Error deleting comment', err);
      });
  };

  const handleReplyButtonPress = () => {
    setShowReplyEditor(true);
  };

  const handleReplyCancel = () => {
    setShowReplyEditor(false);
  };

  const handleReplySubmit = () => {
    axios.post(`/api/v1/thread/${id}/comments`, {});
  };

  return (
    <div className='comment-card'>
      <p className='author-username'>
        {comment.deleted ? '[deleted]' : comment.author_username}
      </p>
      <p>{comment.deleted ? '[deleted]' : comment.content}</p>
      {showReplyEditor && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea placeholder='Reply to this comment' />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              className='btn btn-sm btn-secondary'
              onClick={handleReplyCancel}
            >
              Cancel
            </button>
            <button
              className='btn btn-sm btn-primary'
              onClick={handleReplySubmit}
            >
              Reply
            </button>
          </div>
        </div>
      )}
      <div className='comment-footer'>
        <button
          className='btn comment-footer-button-text'
          onClick={handleDeleteButtonPress}
        >
          delete
        </button>
        <button
          className='btn comment-footer-button-text'
          onClick={handleReplyButtonPress}
        >
          reply
        </button>
      </div>
      <div>
        {comment.children.map((child: CommentType) => (
          <Comment
            key={child.id}
            comment={child}
            refetchComments={refetchComments}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
