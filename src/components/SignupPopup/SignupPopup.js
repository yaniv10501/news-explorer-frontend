import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormValidation from '../../utils/useFormValidation';
import mainApi from '../../utils/MainApi';
import { fetchReducer, initialState, useThunkReducer } from '../../utils/fetch';

function SignupPopup({
  closeAllPopups,
  isSignupPopupOpen,
  setIsSigninPopupOpen,
  setIsSuccessRegisterPopupOpen,
  headerRef,
}) {
  const [formError, setFormError] = useState('');
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const { email = '', password = '', name = '' } = values;
  const { email: emailError, password: passwordError, name: nameError } = errors;
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialState);
  const { silentLoading } = state;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      mainApi.signUp(thunkDispatch, email, password, name).then((response) => {
        if (response instanceof Error) {
          if (response.message === 'This Email is already used') {
            setFormError(response.message);
            return;
          }
          setFormError('Something went wrong, please try again');
          return;
        }
        closeAllPopups();
        setIsSuccessRegisterPopupOpen(true);
        resetForm();
        setFormError('');
      });
    }
  };
  return (
    <PopupWithForm
      name="signup"
      formName="signup"
      formTitle="Sign up"
      submitTitle="Sign up"
      submitLoadingTitle="Signing up"
      popupBottomLink="Sign in"
      setLinkPopupOpen={setIsSigninPopupOpen}
      isOpen={isSignupPopupOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      formError={formError}
      resetForm={resetForm}
      isLoading={silentLoading}
      closeAllPopups={closeAllPopups}
      setFormError={setFormError}
      headerRef={headerRef}
    >
      <label className="popup__label" htmlFor="email">
        Email
        <input
          className="popup__input popup__input_type_email"
          type="email"
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

      <label className="popup__label" htmlFor="password">
        Name
        <input
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Enter name"
          name="name"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChange}
          required
        />
      </label>

      <span className="popup__error">{nameError}</span>
    </PopupWithForm>
  );
}

SignupPopup.propTypes = {
  closeAllPopups: PropTypes.func.isRequired,
  isSignupPopupOpen: PropTypes.bool.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  setIsSuccessRegisterPopupOpen: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
};

export default SignupPopup;
