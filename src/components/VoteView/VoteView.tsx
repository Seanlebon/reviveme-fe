import React, { useState } from 'react';
import axios from '../../apis/reviveme';
import { AxiosError, AxiosResponse } from 'axios';

import './VoteView.css';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

interface VoteViewProps {
  thread_id: number;
  initiallyUpvoted: boolean;
  initiallyDownvoted: boolean;
  initialScore: number;
}

const VoteView: React.FC<VoteViewProps> = ({
  thread_id,
  initiallyUpvoted,
  initiallyDownvoted,
  initialScore,
}) => {
  const [upvoted, setUpvoted] = useState<boolean>(initiallyUpvoted);
  const [downvoted, setDownvoted] = useState<boolean>(initiallyDownvoted);
  const [score, setScore] = useState(initialScore);

  // Get the score without counting the current user's contributions
  const getBaseScore = () => {
    if (upvoted) return score - 1;
    if (downvoted) return score + 1;
    return score;
  };

  const onUpvoteClick = () => {
    axios
      .post(`/api/v1/threads/${thread_id}/upvote`, {
        user_id: 1,
        upvote: !upvoted,
      })
      .then((res: AxiosResponse) => {
        if (res.status != 200) {
          console.log(res.data);
          return;
        }

        const newUpvoted = !upvoted;
        const baseScore = getBaseScore();

        // Update score to reflect new button state
        setScore(newUpvoted ? baseScore + 1 : baseScore);

        // Update upvote/downvote button state
        setUpvoted(newUpvoted);
        setDownvoted(false);
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  };

  const onDownvoteClick = () => {
    axios
      .post(`/api/v1/threads/${thread_id}/downvote`, {
        user_id: 1,
        downvote: !downvoted,
      })
      .then((res: AxiosResponse) => {
        if (res.status != 200) {
          console.log(res.data);
          return;
        }

        const newDownvoted = !downvoted;
        const baseScore = getBaseScore();

        // Update score to reflect new button state
        setScore(newDownvoted ? baseScore - 1 : baseScore);

        // Update upvote/downvote button state
        setDownvoted(newDownvoted);
        setUpvoted(false);
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  };

  return (
    <div className='vote-view'>
      <button className='vote-button' onClick={onUpvoteClick}>
        <CaretUpFill color={upvoted ? 'red' : 'black'} />
      </button>
      <p className='score-text'>{score}</p>
      <button className='vote-button' onClick={onDownvoteClick}>
        <CaretDownFill color={downvoted ? 'blue' : 'black'} />
      </button>
    </div>
  );
};

export default VoteView;
