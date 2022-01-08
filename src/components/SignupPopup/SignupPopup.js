import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { handleLinkClick } from '../../utils/form';
import useFormValidation from '../../utils/useFormValidation';

function SignupPopup({
  closeAllPopups,
  isSignupPopupOpen,
  setIsSigninPopupOpen,
  setIsSuccessRegisterPopupOpen,
  headerRef,
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const { email, password } = values;
  const { email: emailError, password: passwordError } = errors;
  const setLinkPopupOpen = () => {
    setIsSigninPopupOpen(true);
  };
  const handleSubmit = (event) => {
    if (isValid) {
      handleLinkClick(event, closeAllPopups, setIsSuccessRegisterPopupOpen);
      resetForm();
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
      isLoading={false}
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
          handleChange={handleChange}
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
          value={password}
          handleChange={handleChange}
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
          required
        />
      </label>

      <span className="popup__error">{}</span>
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
