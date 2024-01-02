import React, { useState } from 'react';
import { Comment as CommentType } from '../../../types/CommonTypes';
import axios from '../../../apis/reviveme';
import './Comment.css';
import { AxiosError } from 'axios';
import CommentReplyForm from './CommentReplyForm';
import EditCommentForm from './EditCommentForm';
import VoteView from '../../../components/VoteView/VoteView';

interface CommentProps {
  comment: CommentType;
  refetchComments: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, refetchComments }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDeleteButtonPress = () => {
    axios
      .delete(`/api/v1/comments/${comment.id}`)
      .then(refetchComments)
      .catch((err: AxiosError) => {
        console.log('Error deleting comment', err);
      });
  };

  const handleEditButtonPress = () => {
    setShowEditForm(true);
  };

  const handleReplyButtonPress = () => {
    setShowReplyForm(true);
  };

  return (
    <div className='comment-card'>
      <p className='author-username'>
        {comment.deleted ? '[deleted]' : comment.author_username}
      </p>
      {showEditForm ? (
        <EditCommentForm
          comment={comment}
          refetchComments={refetchComments}
          setShowEditForm={setShowEditForm}
        />
      ) : comment.deleted ? (
        '[deleted]'
      ) : (
        comment.content
      )}
      {showReplyForm && (
        <CommentReplyForm
          parentComment={comment}
          refetchComments={refetchComments}
          setShowReplyEditor={setShowReplyForm}
        />
      )}
      <div className='comment-footer'>
        {!comment.deleted && (
          <React.Fragment>
            <button
              className='btn comment-footer-button-text'
              onClick={handleDeleteButtonPress}
            >
              delete
            </button>
            <button
              className='btn comment-footer-button-text'
              onClick={handleEditButtonPress}
            >
              edit
            </button>
          </React.Fragment>
        )}

        <button
          className='btn comment-footer-button-text'
          onClick={handleReplyButtonPress}
        >
          reply
        </button>
        <VoteView
          item_id={comment.id}
          item_type='comment'
          initiallyUpvoted={comment.upvoted}
          initiallyDownvoted={comment.downvoted}
          initialScore={comment.score}
        />
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
