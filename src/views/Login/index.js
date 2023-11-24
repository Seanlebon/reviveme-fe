import React from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      {/* Use Link to navigate to the about page */}
      <LoginForm/>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default Login;