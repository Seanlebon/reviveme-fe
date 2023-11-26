import './App.css';

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './views/Home/index.js'
import Login from './views/Login/index.js'
import Post from './views/Post/index.js'
import ThreadPage from './views/ThreadPage/index.js'

const App = () => {
  return (
    <Routes>
        <Route path = '/'>
          <Route path='' index element={<Home />} />
          <Route path='login' element={<Login/>} />
          <Route path='post' element = {<Post/>}/>
          <Route path="test_thread_page" element={<ThreadPage />} />
          {/* Using path='*'' means 'match anything', so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path='*' element={<NoMatch />} />

        </Route>
    </Routes>
  );
};

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
};

export default App;
