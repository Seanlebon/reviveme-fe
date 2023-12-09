import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreadCard from '../../components/ThreadCard/ThreadCard'
import axios from '../../apis/reviveme'
import useAxiosFunction from '../../hooks/useAxiosFunction'

const Home = () => {
  const [threads, error, loading, axiosFetch] = useAxiosFunction()
  useEffect(()=>{
    axiosFetch(
      {
        axiosInstance: axios,
        method: 'GET',
        url: '/api/v1/threads',
      }
    )
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      {/* TODO: create a loading animation instead */}
      {/* TODO: direct to an error page */}
      {loading && <p>Loading Threads...</p>}
      {!loading && error && <p>There was an error loading threads: {error}</p>}
      {!loading && !error && threads &&
        <div className='container'>
          <h2>Home Page</h2>
          {
            threads.map((thread) => {return <div><ThreadCard thread={thread}/></div>})
          }
          <div>
            <Link to='/login'>Go to Login</Link>
          </div>
          <div>
            <Link to='/post'>Create a Post</Link>
          </div>
        </div>
      }
      
    </div>
  );
};

export default Home;