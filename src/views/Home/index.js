import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import ThreadCard from '../../components/ThreadCard/ThreadCard'
import axios from '../../apis/reviveme'
import useAxios from '../../hooks/useAxios'

const Home = () => {
  const [threads, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/api/v1/threads'
  })

  console.log("HELLO", threads)
  
  return (
    <div classname>
      <h2>Home Page</h2>
      {/* Use Link to navigate to the about page */}
      {loading && <p>Loading Threads...</p>}
      {!loading && error && <p>There was an error loading threads: {error}</p>}
      {!loading && !error && threads &&
        threads.map((thread) => {
          return <ThreadCard thread={thread}/>
        })
      }
    
      <ul classname='list-group'>
        <li class='list-group-item'>
          <Link to='/login'>Go to Login</Link>
        </li>
        <li class='list-group-item'>
          <Link to='/post'>Create a Post</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;