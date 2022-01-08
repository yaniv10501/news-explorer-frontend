/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import './PopupWithForm.css';
import lockScreen from '../../utils/lockScreen';
import { handleClick, handleLinkClick } from '../../utils/form';

export default function PopupWithForm({
  name,
  formName,
  formTitle,
  submitTitle,
  submitLoadingTitle,
  formBottomTitle,
  setLinkPopupOpen,
  isOpen,
  onSubmit,
  formValid,
  formError,
  resetForm,
  isLoading,
  handleClose,
  headerRef,
  children,
}) {
  const mobileQuery = useMediaQuery({ query: '(max-width: 495px)' });
  const clickHandler = (event) => handleClick(event, handleClose, resetForm);
  const linkClickHandler = (event) =>
    handleLinkClick(event, handleClose, resetForm, setLinkPopupOpen);

  useEffect(() => {
    lockScreen(isOpen, headerRef);
  }, [isOpen]);
  useEffect(() => {
    const headerElement = headerRef.current;
    if (!mobileQuery) {
      headerElement.style.visibility = 'visible';
    }
    if (mobileQuery && isOpen) {
      headerElement.style.visibility = 'hidden';
    }
  }, [mobileQuery, isOpen]);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={clickHandler}
      className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}
    >
      <div className="popup__container">
        <form className="popup__form" name={formName} _id="" onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{formTitle}</h2>

          {children}

          <span className="popup__form-error">{formError}</span>

          <button
            className={
              formValid ? 'popup__save-button' : 'popup__save-button popup__save-button_disabled'
            }
            type="submit"
          >
            {isLoading ? `${submitLoadingTitle}...` : submitTitle}
          </button>
          <p className="popup__bottom-title">
            or{' '}
            <a className="popup__bottom-link" href={formBottomTitle} onClick={linkClickHandler}>
              {formBottomTitle}
            </a>
          </p>
        </form>

        <button
          className="popup__close-button"
          type="button"
          aria-label="Close"
          onClick={handleClose}
        />
      </div>
    </div>
  );
}
PopupWithForm.propTypes = {
  name: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  submitTitle: PropTypes.string.isRequired,
  submitLoadingTitle: PropTypes.string.isRequired,
  formBottomTitle: PropTypes.string.isRequired,
  setLinkPopupOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formValid: PropTypes.bool.isRequired,
  formError: PropTypes.string.isRequired,
  resetForm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.arrayOf(PropTypes.object),
};
PopupWithForm.defaultProps = {
  children: [],
};
