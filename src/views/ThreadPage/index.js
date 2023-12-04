import React, { useEffect } from 'react';
import {Link , useNavigate, useParams} from 'react-router-dom';
import axios from '../../apis/reviveme'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import DeleteThreadButton from '../../components/DeleteThreadButton/DeleteThreadButton'
import './index.css'

const ThreadPage = () =>{
    const {id} = useParams()
    const [thread, error, loading, axiosFetch] = useAxiosFunction()
    const threadURL = `/api/v1/threads/${id}`

    useEffect(() =>{
        axiosFetch({
            axiosInstance: axios,
            method: 'GET',
            url: threadURL
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {loading && <p>Loading Thread...</p>}
            {!loading && error && <p>There was an error loading the thread page: {error}</p>}
            {!loading && !error && thread &&
                <div className='container'>
                    <h2>{thread.title}</h2>
                    <p>{thread.content}</p>
                    <DeleteThreadButton/>
                    <Link to="/">Go to Home Page</Link>
                </div>
            }
        </div>
    );
};

export default ThreadPage;