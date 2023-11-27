import 'bootstrap/dist/css/bootstrap.min.css';
import './ThreadCard.css'
import React from 'react';
import {Link} from "react-router-dom";

const ThreadCard = (props) => {
    // TODO: probably take in values from the api in the main page this is being called from 
    const thread = props.thread
    return  (
        <div classname='card-container'>
            <div className="card">
                <Link to={`/threads/${thread.id}`} style={{textDecoration: 'none'}} className="card-body my-0">
                        <p className="threadcard-author my-0"> Posted by: {thread.author_name}</p>
                        <h5 className="card-title">{thread.title}</h5>
                        {/* On click this should bring us to the corresponding thread page with comments */}
                </Link>
            </div>
        </div>
    );
};

export default ThreadCard;