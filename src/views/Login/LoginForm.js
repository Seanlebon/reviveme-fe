import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './LoginForm.css'
const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here, e.g., make an API call to validate the credentials
    console.log('Username:', loginData.username);
    console.log('Password:', loginData.password);
    // Reset the form after processing the data
    setLoginData({ username: '', password: '' });
  };

  return (
    <form class='form-signin' onSubmit={handleSubmit}>
      <h1 class='h3 mb-3 font-weight-normal'>Please sign in</h1>
      <input
        type='text'
        id='username'
        name='username'
        placeholder='Username'
        value={loginData.username}
        onChange={handleChange}
        className='form-control'
        required autofocus
      />
      <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          value={loginData.password}
          onChange={handleChange}
          className='form-control'
          required
        />
      <div class='checkbox mb-3'>
        <label>
          <input type='checkbox' value='remember-me' /> Remember me
        </label>
      </div>

      <button class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>

      <p class='mt-5 mb-0 text-muted'>&copy; 2023-2023</p>
    </form>
  );
};

export default LoginForm;
