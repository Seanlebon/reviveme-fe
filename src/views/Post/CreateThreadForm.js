import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './CreateThreadForm.css'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import axios from '../../apis/reviveme'
import { useNavigate} from 'react-router-dom';


const CreateThreadForm = () => {
    const [postData, setPostData] = useState({
      title: '',
      author:'',
      content:'',
    });

    const [response, error, loading, axiosFetch] = useAxiosFunction();


    const navigate = useNavigate()

    const handleChange  = (event) => {
        const {name, value} = event.target
        setPostData({ ...postData, [name]: value });
    };

    const handleSubmit = (event) =>{
        event.preventDefault()
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
        }).then(()=>{
          navigate("/")
          setPostData({
            ...postData,
            title:'',
            content:'',
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
              <button className='btn btn-lg btn-primary' type='submit'>Create Post</button>
          </form>
        </div>
      );
};

export default CreateThreadForm;