import React from 'react';
import {Link , useParams} from 'react-router-dom';
import axios from '../../apis/reviveme'
import useAxios from '../../hooks/useAxios'

const ThreadPage = () =>{
    const{id} = useParams()
    const [thread, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: `/api/v1/threads/${id}`
      })

    return (
        <div>
            {loading && <p>Loading Thread...</p>}
            {!loading && error && <p>There was an error loading the thread page: {error}</p>}
            {!loading && !error && thread &&
               <h2>{thread.title}</h2>
            }
            <p>{thread.content}</p>
            <Link to="/">Go to Home Page</Link>
        </div>
    );
};

export default ThreadPage;