import React from 'react';
import CreateThread from './CreateThread';
import { Link } from 'react-router-dom';
const Post = () =>{
    return (
        <div>
            <h2>Post a Thread</h2>
            <CreateThread/>
            <Link to="/">Go to Home Page</Link>
        </div>
        
    );
};

export default Post;