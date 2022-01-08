import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn, setIsNotAuthorizedPopupOpen }) {
  if (!loggedIn) setIsNotAuthorizedPopupOpen(true);
  return loggedIn ? children : <Navigate to="/" />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setIsNotAuthorizedPopupOpen: PropTypes.func.isRequired,
};

export default ProtectedRoute;
