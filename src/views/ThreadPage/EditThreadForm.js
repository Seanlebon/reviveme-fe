import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction'
import axios from '../../apis/reviveme'
import {useNavigate} from 'react-router-dom';



const EditThreadForm = ({thread, setIsEditing, setTempThreadContent, tempThreadContent}) =>{
    const [response, error, loading, axiosFetch] = useAxiosFunction()

    const handleEditChange = (event)=>{
        const {value} = event.target
        setTempThreadContent(value)
    }
    
    const handleEditSubmit = (event) =>{
        event.preventDefault()
        axiosFetch({
            axiosInstance: axios,
            method: 'PUT',
            url: `/api/v1/threads/${thread.id}`,
            requestConfig: {
                //TODO: change hardcoded values once we get user API running
              data: {
                content: tempThreadContent,
              }
            }
          }).then( () =>{
                setIsEditing(false)
                setTempThreadContent(tempThreadContent)
            });
    }


    return (
        <form onSubmit={handleEditSubmit}>
            <textarea
                type='content'
                id='content'
                name='content'
                rows='5'
                placeholder='Text (required)'
                value={tempThreadContent}
                onChange={handleEditChange}
                className='form-control my-2 thread-content'
                maxLength='40000'
                required
            /> 
            <button className='btn btn-sm btn-primary' type='submit'>Done</button>
        </form>
    )
};

export default EditThreadForm;