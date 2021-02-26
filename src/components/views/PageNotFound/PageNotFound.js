import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <p>404-not found</p>
    <Link exact to='/'>
      Home Page
    </Link>
  </div>
);

export default NotFound;
