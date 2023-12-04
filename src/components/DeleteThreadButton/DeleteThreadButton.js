import React, { useEffect } from 'react';
import {Link , useNavigate, useParams} from 'react-router-dom';
import axios from '../../apis/reviveme'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import './DeleteThreadButton.css'

const DeleteThreadButton = () =>{
    const {id} = useParams()
    const navigate = useNavigate()
    const [response, error, loading, axiosFetch] = useAxiosFunction()

    const threadURL = `/api/v1/threads/${id}`

    const handleDelete = () => {
        axiosFetch({
            axiosInstance:axios,
            method:'DELETE',
            url: threadURL
        }).then(() => {
            navigate('/')
        })
    };

    return (
        <div>
            <button className='btn btn-danger btn-sm' onClick={handleDelete}>Delete Thread</button>
        </div>
    );
};

export default DeleteThreadButton;