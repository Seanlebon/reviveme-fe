import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import './CreateThreadForm.css';

interface PostData {
  title: string;
  author_id: number;
  content: string;
}

const CreateThreadForm: React.FC = () => {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    author_id: 1, // TODO: we can remove this once we have auth
    content: '',
  });

  const [response, error, loading, axiosFetch] = useAxiosFunction();

  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axiosFetch({
      method: 'POST',
      url: '/api/v1/threads',
      data: {
        ...postData,
        author_id: 1, // TODO remove this once we have auth
      },
    }).then(() => {
      navigate('/');
      setPostData({
        ...postData,
        title: '',
        content: '',
      });
    });
    // Not sure if this will need to be changed to redirect in the future
  };

  return (
    <div className='container-md'>
      <form className='form-create-thread' onSubmit={handleSubmit}>
        <input
          type='title'
          id='title'
          name='title'
          placeholder='Title'
          value={postData.title}
          onChange={handleChange}
          className='form-control mt-2'
          required
          autoFocus
        />
        <textarea
          id='content'
          name='content'
          rows={5}
          placeholder='Text (required)'
          value={postData.content}
          onChange={handleChange}
          className='form-control my-2 thread-content'
          maxLength={40000}
          required
        />
        <button className='btn btn-lg btn-primary' type='submit'>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreateThreadForm;
