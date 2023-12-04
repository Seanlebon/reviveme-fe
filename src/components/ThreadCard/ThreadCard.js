import 'bootstrap/dist/css/bootstrap.min.css';
import './ThreadCard.css'
import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const ThreadCard = (props) => {
    // TODO: probably take in values from the api in the main page this is being called from 
    const {id, author_name, title} = props.thread
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate(`/threads/${id}`)
    }
    return  (
        <div className='card-container'>
            <div className="card">
                <div className="card-body my-0" onClick={handleClick}>
                        <p className="threadcard-author my-0"> Posted by: {author_name}</p>
                        <h5 className="card-title">{title}</h5>
                        {/* On click this should bring us to the corresponding thread page with comments */}
                </div>
            </div>
        </div>
    );
};

export default ThreadCard;