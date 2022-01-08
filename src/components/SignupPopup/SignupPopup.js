import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { handleLinkClick } from '../../utils/form';
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
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const { email = '', password = '', name = '' } = values;
  const { email: emailError, password: passwordError, name: nameError } = errors;
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialState);
  const { silentLoading } = state;
  const setLinkPopupOpen = () => {
    setIsSigninPopupOpen(true);
  };
  const handleSubmit = (event) => {
    if (isValid) {
      mainApi.signUp(thunkDispatch, email, password, name).then((response) => {
        console.log(response);
        handleLinkClick(event, closeAllPopups, setIsSuccessRegisterPopupOpen);
        resetForm();
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
      formBottomTitle="Sign in"
      setLinkPopupOpen={setLinkPopupOpen}
      isOpen={isSignupPopupOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      isLoading={silentLoading}
      handleClose={closeAllPopups}
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
