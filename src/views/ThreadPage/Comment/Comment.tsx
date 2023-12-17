import React from 'react';
import { Comment as CommentType } from '../../../types/CommonTypes';
import './Comment.css';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  return (
    <div className='comment-card'>
      <p className='author-username'>
        {comment.deleted ? '[deleted]' : comment.author_username}
      </p>
      <p>{comment.deleted ? '[deleted]' : comment.content}</p>
      <div className='comment-footer'>
        <p className='comment-footer-button-text'>delete</p>
        <p className='comment-footer-button-text'>reply</p>
      </div>
      <div>
        {comment.children.map((child: CommentType) => (
          <Comment key={child.id} comment={child} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
