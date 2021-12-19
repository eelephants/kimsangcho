import React from 'react';
import { Link } from 'gatsby';

import AppLayout from '../components/AppLayout';

const NotFound = () => {
  return (
    <AppLayout>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Head home</Link>
      </p>
    </AppLayout>
  );
};

export default NotFound;
