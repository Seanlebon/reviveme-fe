import React, { useState } from 'react';
import { Comment as CommentType } from '../../../types/CommonTypes';
import axios from '../../../apis/reviveme';
import './Comment.css';
import { AxiosError } from 'axios';
import CommentReplyForm from './CommentReplyForm';

interface CommentProps {
  comment: CommentType;
  refetchComments: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, refetchComments }) => {
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

  return (
    <div className='comment-card'>
      <p className='author-username'>
        {comment.deleted ? '[deleted]' : comment.author_username}
      </p>
      {comment.deleted ? '[deleted]' : comment.content}
      {showReplyEditor && (
        <CommentReplyForm
          parentComment={comment}
          refetchComments={refetchComments}
          setShowReplyEditor={setShowReplyEditor}
        />
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
