import React from 'react';
import CreateThreadForm from './CreateThreadForm';
import { Link } from 'react-router-dom';
const Post = () =>{
    return (
        <div>
            <h2>Post a Thread</h2>
            <CreateThreadForm/>
            <Link to="/">Go to Home Page</Link>
        </div>
        
    );
};

export default Post;