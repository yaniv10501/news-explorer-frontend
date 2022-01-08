import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate push to="/" />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
