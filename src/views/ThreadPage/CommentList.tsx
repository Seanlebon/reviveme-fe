import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '../../types/CommonTypes';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useParams } from 'react-router-dom';
import './CommentList.css';

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [response, error, loading, axiosFetch] = useAxiosFunction();
  const { id } = useParams<{ id: string }>(); // TODO change this to thread_id

  useEffect(() => {
    axiosFetch(
      {
        method: 'GET',
        url: `/api/v1/threads/${id}/comments`,
      },
      [setComments],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {loading && <p>Loading Comments...</p>}
      {!loading && error && (
        <p>There was an error loading the comments: {error}</p>
      )}
      {response && (
        <div style={{ textAlign: 'left', marginLeft: 5, marginTop: 10 }}>
          <p>Comments:</p>
          {comments.map((comment: CommentType) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
