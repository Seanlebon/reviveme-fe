import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../apis/reviveme';
import DeleteThreadButton from '../../components/DeleteThreadButton/DeleteThreadButton';
import EditThreadForm from './EditThreadForm';
import './index.css';

const ThreadPage = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState({});
  const [tempThreadContent, setTempThreadContent] = useState('');
  // might need to have some more thought on the useAxiosFunction hook and how to pass in additional setter functions
  // this works for now
  useEffect(() => {
    axios
      .get(`/api/v1/threads/${id}`)
      .then((response) => {
        setThread(response.data);
        setTempThreadContent(response.data.content);
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching thread:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              setTempThreadContent={setTempThreadContent}
              tempThreadContent={tempThreadContent}
              thread={thread}
            />
          ) : (
            <p>{tempThreadContent}</p>
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
