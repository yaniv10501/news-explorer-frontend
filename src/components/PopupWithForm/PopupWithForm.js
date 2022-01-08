import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';

export default function PopupWithForm({
  name,
  formName,
  formTitle,
  submitTitle,
  submitLoadingTitle,
  popupBottomLink,
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
  return (
    <Popup
      handleClose={handleClose}
      isOpen={isOpen}
      name={name}
      popupBottomTitle="or "
      popupBottomLink={popupBottomLink}
      setLinkPopupOpen={setLinkPopupOpen}
      headerRef={headerRef}
      resetForm={resetForm}
    >
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
      </form>
    </Popup>
  );
}
PopupWithForm.propTypes = {
  name: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  submitTitle: PropTypes.string.isRequired,
  submitLoadingTitle: PropTypes.string.isRequired,
  popupBottomLink: PropTypes.string.isRequired,
  setLinkPopupOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formValid: PropTypes.bool.isRequired,
  formError: PropTypes.string.isRequired,
  resetForm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object),
};
PopupWithForm.defaultProps = {
  children: [],
};
