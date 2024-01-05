import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThreadCard.css';
import { Thread } from '../../types/CommonTypes';
import VoteView from '../VoteView/VoteView';

interface ThreadCardProps {
  thread: Thread;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  const navigate = useNavigate();
  const { id, author_name, title } = thread;
  const handleClick = () => {
    navigate(`/threads/${id}`);
  };

  const getCreatedAtDate = () =>
    thread.created_at.substring(0, 'YYYY-MM-DD'.length);
  const getCreatedAtTime = () => {
    const startIndex = 'YYYY-MM-DDT'.length;
    return thread.created_at.substring(startIndex, startIndex + 'HH:MM'.length);
  };

  return (
    <div className='card-container'>
      <div className='card'>
        <div
          className='card-body my-0'
          onClick={handleClick}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p className='threadcard-author my-0'> Posted by: {author_name}</p>
            <h5 className='card-title'>{title}</h5>
          </div>
          <p className='threadcard-author'>
            {getCreatedAtDate() + ' ' + getCreatedAtTime()}
          </p>
          {/* On click, this should bring us to the corresponding thread page with comments */}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
          }}
        >
          <VoteView
            item_id={thread.id}
            item_type={'thread'}
            initiallyUpvoted={thread.upvoted}
            initiallyDownvoted={thread.downvoted}
            initialScore={thread.score}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
