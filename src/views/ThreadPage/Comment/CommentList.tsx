import React from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '../../../types/CommonTypes';
import './CommentList.css';

interface CommentListProps {
  comments: CommentType[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div style={{ textAlign: 'left', marginLeft: 5, marginTop: 10 }}>
      <p>Comments:</p>
      {comments.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
