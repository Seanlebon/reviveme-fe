import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../apis/reviveme';
import ThreadCard from '../../components/ThreadCard/ThreadCard';
import useAxios from '../../hooks/useAxios';
const Home = () => {
  const [threads, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/api/v1/threads',
  });

  return (
    <div>
      {/* TODO: create a loading animation instead */}
      {/* TODO: direct to an error page */}
      {loading && <p>Loading Threads...</p>}
      {!loading && error && <p>There was an error loading threads: {error}</p>}
      {!loading && !error && threads && (
        <div className='container'>
          <h2>Home Page</h2>
          {threads.map((thread) => {
            return (
              <div>
                <ThreadCard
                  id={thread.id}
                  author_name={thread.author_name}
                  title={thread.title}
                />
              </div>
            );
          })}
          <div>
            <Link to='/login'>Go to Login</Link>
          </div>
          <div>
            <Link to='/post'>Create a Post</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
