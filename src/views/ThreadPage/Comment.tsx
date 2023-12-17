import React from 'react';
import { Comment as CommentType } from '../../types/CommonTypes';
import './Comment.css';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  return (
    <div className='comment-card'>
      <p className='author-username'>{comment.author_username}</p>
      <p>{comment.content}</p>
      <div>
        {comment.children.map((child: CommentType) => (
          <Comment key={child.id} comment={child} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
