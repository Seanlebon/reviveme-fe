import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import './DeleteThreadButton.css';

const DeleteThreadButton: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [response, error, loading, axiosFetch] = useAxiosFunction();

  const handleDelete = () => {
    axiosFetch({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/v1/threads/${id}`,
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <button className='btn btn-danger btn-sm' onClick={handleDelete}>
        Delete Thread
      </button>
    </div>
  );
};

export default DeleteThreadButton;
