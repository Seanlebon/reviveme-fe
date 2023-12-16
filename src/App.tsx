import './App.css';

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Home from './views/Home/index';
import Login from './views/Login/index';
import Post from './views/Post/index';
import ThreadPage from './views/ThreadPage/index';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='/threads' />
          <Route path='/threads/:id' element={<ThreadPage />} />
          <Route path='login' element={<Login />} />
          <Route path='post' element={<Post />} />

          {/* Using path='*' means 'match anything', so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const NoMatch: React.FC = () => {
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
