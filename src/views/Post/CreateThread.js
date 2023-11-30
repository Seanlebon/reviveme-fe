import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './CreateThread.css'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import axios from '../../apis/reviveme'
import { useNavigate } from 'react-router-dom';


const CreateThread = () => {
    const [data, error, loading, axiosFetch] = useAxiosFunction();
    const navigate = useNavigate()
    const [postData, setPostData] = useState({
        title: '',
        author:'',
        content:'',
    });

    const handleChange  = (event) => {
        const {name, value} = event.target
        setPostData({ ...postData, [name]: value });
    };

    const handleSubmit = (event) =>{
        event.preventDefault()
        // TODO: Upon submition we should create a thread via our API and add to our db
        axiosFetch({
          axiosInstance: axios,
          method: 'POST',
          url: '/api/v1/threads',
          requestConfig: {
             //TODO: change hardcoded values once we get user API running
            data: {
              title: postData.title,
              content: postData.content,
              author_id: 1,
            }
          }
        })
        

        setPostData({
            ...postData,
            title:'',
            content:'',
        });
        // Not sure if this will need to be changed to redirect in the future
        navigate("/");
    };

    return (
        <div className='container-md'>
          <form class='form-create-thread' onSubmit={handleSubmit}>
            <input
              type='title'
              id='title'
              name='title'
              placeholder='Title'
              value={postData.title}
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
                value={postData.content}
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