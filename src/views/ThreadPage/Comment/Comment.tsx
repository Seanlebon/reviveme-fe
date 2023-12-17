import React from 'react';
import { Comment as CommentType } from '../../../types/CommonTypes';
import axios from '../../../apis/reviveme';
import './Comment.css';
import { AxiosError } from 'axios';

interface CommentProps {
  comment: CommentType;
  refetchComments: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, refetchComments }) => {
  const handleDelete = () => {
    axios
      .delete(`/api/v1/comments/${comment.id}`)
      .then(refetchComments)
      .catch((err: AxiosError) => {
        console.log('Error deleting comment', err);
      });
  };

  return (
    <div className='comment-card'>
      <p className='author-username'>
        {comment.deleted ? '[deleted]' : comment.author_username}
      </p>
      <p>{comment.deleted ? '[deleted]' : comment.content}</p>
      <div className='comment-footer'>
        <button
          className='btn comment-footer-button-text'
          onClick={handleDelete}
        >
          delete
        </button>
        <button className='btn comment-footer-button-text'>reply</button>
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
