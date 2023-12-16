import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Thread from '../../types/CommonTypes';
import DeleteThreadButton from '../../components/DeleteThreadButton/DeleteThreadButton';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import EditThreadForm from './EditThreadForm';
import './index.css';

const ThreadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [tempThread, setTempThread] = useState<Thread>({ content: '' });
  const [thread, error, loading, axiosFetch] = useAxiosFunction();

  useEffect(() => {
    axiosFetch(
      {
        method: 'GET',
        url: `/api/v1/threads/${id}`,
      },
      [setTempThread],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setIsEditingTrue = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {loading && <p>Loading Thread...</p>}
      {!loading && error && (
        <p>There was an error loading the thread page: {error}</p>
      )}
      {!loading && !error && thread && (
        <div className='container'>
          <h2>{thread.title}</h2>
          {isEditing ? (
            <EditThreadForm
              setIsEditing={setIsEditing}
              setTempThread={setTempThread}
              tempThread={tempThread}
              thread={thread}
            />
          ) : (
            <p>{tempThread.content}</p>
          )}
          <div className='row'>
            <div className='col'>
              <DeleteThreadButton />
            </div>
            <div className='col'>
              <button
                className='btn btn-primary btn-sm'
                onClick={setIsEditingTrue}
              >
                Edit
              </button>
            </div>
          </div>
          <Link to='/'>Go to Home Page</Link>
        </div>
      )}
    </div>
  );
};

export default ThreadPage;
