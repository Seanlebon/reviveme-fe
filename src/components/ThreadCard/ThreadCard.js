import 'bootstrap/dist/css/bootstrap.min.css';
import './ThreadCard.css'
import React from 'react';
import {useNavigate} from "react-router-dom";

const ThreadCard = ({threadId, title, author}) => {
    const navigate = useNavigate();
    // TODO: probably take in values from the api in the main page this is being called from 

    const handleClick = (event) =>{
        navigate('/test_thread_page')
    }

    return  (
        <div classname='card-container' onClick={handleClick}>
            <div className="card">
                <div className="card-body my-0">
                    <p className="threadcard-author my-0"> Posted by: {author}</p>
                    <h5 className="card-title">{title}</h5>
                    {/* On click this should bring us to the corresponding thread page with comments */}
                </div>
            </div>
        </div>
    );
};

export default ThreadCard;