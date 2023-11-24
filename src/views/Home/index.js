import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      {/* Use Link to navigate to the about page */}
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;