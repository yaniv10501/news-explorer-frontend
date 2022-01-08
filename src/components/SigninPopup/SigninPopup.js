import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { fetchReducer, initialState, useThunkReducer } from '../../utils/fetch';
import mainApi from '../../utils/MainApi';
import useFormValidation from '../../utils/useFormValidation';

function SigninPopup({
  closeAllPopups,
  isSigninPopupOpen,
  setIsSignupPopupOpen,
  setLoggedIn,
  headerRef,
  setCurrentUser,
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const { email = '', password = '' } = values;
  const { email: emailError, password: passwordError } = errors;
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialState);
  const { loading } = state;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid) {
      const response = await mainApi.signIn(thunkDispatch, email, password);
      if (response instanceof Error) {
        return;
      }
      setCurrentUser(response);
      closeAllPopups();
      setLoggedIn(true);
      resetForm();
    }
  };
  return (
    <PopupWithForm
      name="signin"
      formName="signin"
      formTitle="Sign in"
      submitTitle="Sign in"
      submitLoadingTitle="Signing in"
      formBottomTitle="Sign up"
      setLinkPopupOpen={setIsSignupPopupOpen}
      isOpen={isSigninPopupOpen}
      onSubmit={handleSubmit}
      formValid
      isLoading={loading}
      handleClose={closeAllPopups}
      headerRef={headerRef}
    >
      <label className="popup__label" htmlFor="email">
        Email
        <input
          className="popup__input popup__input_type_email"
          type="text"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </label>

      <span className="popup__error">{emailError}</span>

      <label className="popup__label" htmlFor="password">
        Password
        <input
          className="popup__input popup__input_type_password"
          type="password"
          placeholder="Enter password"
          name="password"
          minLength="6"
          value={password}
          onChange={handleChange}
          required
        />
      </label>

      <span className="popup__error">{passwordError}</span>
    </PopupWithForm>
  );
}

SigninPopup.propTypes = {
  closeAllPopups: PropTypes.func.isRequired,
  isSigninPopupOpen: PropTypes.bool.isRequired,
  setIsSignupPopupOpen: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default SigninPopup;
