import React, { ChangeEvent, useState } from 'react';
import { Comment as CommentType } from '../../../types/CommonTypes';
import axios from '../../../apis/reviveme';
import { AxiosError } from 'axios';

import './CommentForm.css';

interface EditCommentFormProps {
  comment: CommentType;
  refetchComments: () => void;
  setShowEditForm: (show: boolean) => void;
}

const EditCommentForm: React.FC<EditCommentFormProps> = ({
  comment,
  refetchComments,
  setShowEditForm,
}) => {
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEditChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setEditedContent(value);
  };

  const handleEditSubmit = () => {
    axios
      .put(`/api/v1/comments/${comment.id}`, {
        author_id: 1, // TODO: change hardcoded value once we get user API running
        content: editedContent,
      })
      .then(() => {
        setShowEditForm(false);
        refetchComments();
      })
      .catch((err: AxiosError) => {
        console.log('Error posting comment', err);
      });
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };

  return (
    <form className='comment-form' onSubmit={handleEditSubmit}>
      <textarea
        onChange={handleEditChange}
        value={editedContent}
        className='form-control my-2 form-text-input'
        required
      />
      <div className='form-footer'>
        <button
          className='btn btn-sm btn-secondary form-button'
          onClick={handleEditCancel}
        >
          Cancel
        </button>
        <button className='btn btn-sm btn-primary form-button' type='submit'>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditCommentForm;
