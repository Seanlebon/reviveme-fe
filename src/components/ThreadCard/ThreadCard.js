import 'bootstrap/dist/css/bootstrap.min.css';
import './ThreadCard.css'
import React, { useState } from 'react';

const ThreadCard = () => {
    // TODO: probably take in values from the api in the main page this is being called from
    const [threadData, setThreadData] = useState({
        title: 'Test Thread',
        author: 'Seanlebon',
        content: 'This is some stuff written by me',
    });

    return  (
        <div classname='card-container'>
            <div className="card">
                <div className="card-body my-0">
                    <p className="threadcard-author my-0"> Posted by: {threadData.author}</p>
                    <h5 className="card-title">{threadData.title}</h5>
                    {/* On click this should bring us to the corresponding thread page with comments */}
                    <a href="/test_thread_page" className="stretched-link"></a>
                </div>
            </div>
        </div>
    );
};

export default ThreadCard;