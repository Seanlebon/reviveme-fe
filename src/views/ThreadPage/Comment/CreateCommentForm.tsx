import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFunction from '../../../hooks/useAxiosFunction';
import './CommentForm.css';

interface CommentData {
  author_id: number;
  content: string;
}

interface CommentFormProps {
  refetchComments: () => void;
}

const CreateCommentForm: React.FC<CommentFormProps> = ({ refetchComments }) => {
  const { id } = useParams<{ id: string }>();

  const [commentData, setCommentData] = useState<CommentData>({
    author_id: 1, // TODO: we can remove this once we have auth
    content: '',
  });

  const [response, error, loading, axiosFetch] = useAxiosFunction();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCommentData({ ...commentData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axiosFetch({
      method: 'POST',
      url: `/api/v1/threads/${id}/comments`,
      data: {
        ...commentData,
        author_id: 1, // TODO remove this once we have auth
      },
    }).then(() => {
      setCommentData({
        ...commentData,
        content: '',
      });
      refetchComments();
    });
    // Not sure if this will need to be changed to redirect in the future
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <textarea
        id='content'
        name='content'
        rows={5}
        placeholder='Write a comment...'
        value={commentData.content}
        onChange={handleChange}
        className='form-control my-2'
        maxLength={40000}
        required
      />
      <div className='form-footer'>
        <button className='btn btn-primary' type='submit'>
          Create Comment
        </button>
      </div>
    </form>
  );
};

export default CreateCommentForm;
