import React from 'react';
import {Link , useLocation} from 'react-router-dom';
import axios from '../../apis/reviveme'
import useAxios from '../../hooks/useAxios'

const ThreadPage = () =>{
    const { state } = useLocation();
    console.log(state)
    const { thread } = state
    return (
        <div>
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
            <Link to="/">Go to Home Page</Link>
        </div>
    );
};

export default ThreadPage;