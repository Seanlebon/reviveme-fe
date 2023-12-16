import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThreadCard.css';
import Thread from '../../types/CommonTypes';

interface ThreadCardProps {
  thread: Thread;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  const navigate = useNavigate();
  const { id, author_name, title } = thread;
  const handleClick = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <div className='card-container'>
      <div className='card'>
        <div className='card-body my-0' onClick={handleClick}>
          <p className='threadcard-author my-0'> Posted by: {author_name}</p>
          <h5 className='card-title'>{title}</h5>
          {/* On click, this should bring us to the corresponding thread page with comments */}
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
