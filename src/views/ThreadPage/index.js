import React, { useEffect } from 'react';
import {Link , useParams} from 'react-router-dom';
import axios from '../../apis/reviveme'
import useAxiosFunction from '../../hooks/useAxiosFunction'

const ThreadPage = () =>{
    const {id} = useParams()
    const [thread, error, loading, axiosFetch] = useAxiosFunction()

    const threadURL = `/api/v1/threads/${id}`
    const getThreadData = () =>{
        axiosFetch({
            axiosInstance: axios,
            method: 'GET',
            url: threadURL
        });
    }

    useEffect(() =>{
        getThreadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (event) => {
        axiosFetch({
            axiosInstance:axios,
            method:'DELETE',
            url: threadURL
        })
    };
    return (
        <div classname='container'>
            <div classname='row'>
                    {loading && <p>Loading Thread...</p>}
                    {!loading && error && <p>There was an error loading the thread page: {error}</p>}
                    {!loading && !error && thread &&
                        <div>
                            <h2>{thread.title}</h2>
                        </div>
                    }
            </div>
            <div classname='row'>
                <p>{thread.content}</p>
            </div>
            <div classname='row'>
                <Link to="/">
                    <button class='btn btn-sm btn-danger' onClick={handleDelete}>delete thread</button>
                </Link>
            </div>
            <div classname='row'>
                <Link to="/">Go to Home Page</Link>
            </div>
        </div>
    );
};

export default ThreadPage;