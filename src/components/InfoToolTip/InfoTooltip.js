/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../PopupWithForm/PopupWithForm.css';
import { handleClick, handleLinkClick } from '../../utils/form';

export default function InfoTooltip({
  isOpen,
  handleClose,
  formMessage,
  formBottomTitle,
  setLinkPopupOpen,
}) {
  const clickHandler = (event) => handleClick(event, false, handleClose);
  const linkClickHandler = (event) => handleLinkClick(event, handleClose, false, setLinkPopupOpen);

  return (
    <div
      onClick={clickHandler}
      role="button"
      tabIndex={0}
      className={isOpen ? `popup popup_opened` : `popup`}
    >
      <div className="popup__container popup__container_type_info">
        <p className="popup__message">{formMessage}</p>
        <a
          className="popup__bottom-title popup__bottom-link popup__bottom-link_info"
          href={formBottomTitle}
          onClick={linkClickHandler}
        >
          {formBottomTitle}
        </a>
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
InfoTooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formMessage: PropTypes.string.isRequired,
  formBottomTitle: PropTypes.string.isRequired,
  setLinkPopupOpen: PropTypes.func.isRequired,
};
