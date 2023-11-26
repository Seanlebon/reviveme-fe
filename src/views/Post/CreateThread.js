import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './CreateThread.css'
import { useNavigate } from "react-router-dom";

const CreateThread = () => {
    const navigate = useNavigate();
    const [threadData, setThreadData] = useState({
        title: '',
        author:'',
        content:'',
    });

    const handleChange  = (event) => {
        const {name, value} = event.target
        setThreadData({ ...threadData, [name]: value });
    };

    const handleSubmit = (event) =>{
        event.preventDefault()
        // TODO: Upon submition we should create a thread via our API and add to our db
        setThreadData({
            ...threadData,
            title:'',
            content:'',
        });
        // Not sure if this will need to be changed to redirect in the future
        navigate('/');
    };

    return (
        <div className='container-md'>
          <form class='form-create-thread' onSubmit={handleSubmit}>
            <input
              type='title'
              id='title'
              name='title'
              placeholder='Title'
              value={threadData.title}
              onChange={handleChange}
              className='form-control mt-2'
              required autofocus
            />
            <textarea
                type='content'
                id='content'
                name='content'
                rows='5'
                placeholder='Text (required)'
                value={threadData.content}
                onChange={handleChange}
                className='form-control my-2 thread-content'
                maxLength='40000'
                required
              />
            <button class='btn btn-lg btn-primary' type='submit'>Create Post</button>
          </form>
        </div>
      );
};

export default CreateThread;