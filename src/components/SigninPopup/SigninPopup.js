import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SigninPopup({
  closeAllPopups,
  isSigninPopupOpen,
  setIsSignupPopupOpen,
  setLoggedIn,
  headerRef,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    closeAllPopups();
    setLoggedIn(true);
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
          required
        />
      </label>

      <span className="popup__error">{}</span>

      <label className="popup__label" htmlFor="password">
        Password
        <input
          className="popup__input popup__input_type_password"
          type="password"
          placeholder="Enter password"
          name="password"
          required
        />
      </label>

      <span className="popup__error">{}</span>
    </PopupWithForm>
  );
}

SigninPopup.propTypes = {
  closeAllPopups: PropTypes.func.isRequired,
  isSigninPopupOpen: PropTypes.bool.isRequired,
  setIsSignupPopupOpen: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
};

export default SigninPopup;
