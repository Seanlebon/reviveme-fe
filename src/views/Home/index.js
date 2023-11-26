import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import ThreadCard from '../../components/ThreadCard/ThreadCard'
const Home = () => {
  return (
    <div classname>
      <h2>Home Page</h2>
      {/* Use Link to navigate to the about page */}
      
      <ThreadCard/>
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