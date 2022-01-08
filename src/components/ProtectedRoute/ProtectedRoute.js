import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

function ProtectedRoute({ children, loggedIn, thunkDispatch, setCurrentUser, setLoggedIn }) {
  useEffect(() => {
    mainApi.getUserMe(thunkDispatch).then((response) => {
      if (response.email) {
        setCurrentUser(response);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);
  return loggedIn ? children : <Navigate replace to="/" />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  thunkDispatch: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default ProtectedRoute;
