import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from '../../apis/reviveme';
import useAxiosFunction from '../../hooks/useAxiosFunction';

const EditThreadForm = ({
  thread,
  setIsEditing,
  setTempThread,
  tempThread,
}) => {
  const [response, error, loading, axiosFetch] = useAxiosFunction();

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setTempThread({ ...tempThread, [name]: value });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    axiosFetch({
      axiosInstance: axios,
      method: 'PUT',
      url: `/api/v1/threads/${thread.id}`,
      requestConfig: {
        //TODO: change hardcoded values once we get user API running
        data: {
          content: tempThread.content,
        },
      },
    }).then(() => {
      setIsEditing(false);
      setTempThread(tempThread);
    });
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <textarea
        type='content'
        id='content'
        name='content'
        rows='5'
        placeholder='Text (required)'
        value={tempThread.content}
        onChange={handleEditChange}
        className='form-control my-2 thread-content'
        maxLength='40000'
        required
      />
      <button className='btn btn-sm btn-primary' type='submit'>
        Done
      </button>
    </form>
  );
};

export default EditThreadForm;
