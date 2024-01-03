import React, { useState } from 'react';
import axios from '../../apis/reviveme';
import { AxiosError, AxiosResponse } from 'axios';

import './VoteView.css';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import { LiteralType, StringLiteral } from 'typescript';

interface VoteViewProps {
  item_id: number;
  item_type: 'thread' | 'comment';
  initiallyUpvoted: boolean;
  initiallyDownvoted: boolean;
  initialScore: number;
}

const item_type_to_endpoint = {
  thread: '/api/v1/threads',
  comment: '/api/v1/comments',
};

const VoteView: React.FC<VoteViewProps> = ({
  item_id,
  item_type,
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
      .post(`${item_type_to_endpoint[item_type]}/${item_id}/upvote`, {
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
      .post(`${item_type_to_endpoint[item_type]}/${item_id}/downvote`, {
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
