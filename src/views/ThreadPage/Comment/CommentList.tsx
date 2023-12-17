import React from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '../../../types/CommonTypes';
import './CommentList.css';

interface CommentListProps {
  comments: CommentType[];
  refetchComments: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  refetchComments, // may need this here later for sort feature
}) => {
  return (
    <div style={{ textAlign: 'left', marginLeft: 5, marginTop: 10 }}>
      <p>Comments:</p>
      {comments.map((comment: CommentType) => (
        <Comment
          key={comment.id}
          comment={comment}
          refetchComments={refetchComments}
        />
      ))}
    </div>
  );
};

export default CommentList;
