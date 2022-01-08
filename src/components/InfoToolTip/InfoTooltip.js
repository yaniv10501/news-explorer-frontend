/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';

export default function InfoTooltip({
  isOpen,
  handleClose,
  formMessage,
  popupBottomLink,
  setLinkPopupOpen,
  headerRef,
}) {
  return (
    <Popup
      handleClose={handleClose}
      isOpen={isOpen}
      name="info"
      popupBottomTitle=""
      popupBottomLink={popupBottomLink}
      setLinkPopupOpen={setLinkPopupOpen}
      headerRef={headerRef}
      resetForm={() => {}}
    >
      <p className="popup__message">{formMessage}</p>
    </Popup>
  );
}
InfoTooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formMessage: PropTypes.string.isRequired,
  popupBottomLink: PropTypes.string.isRequired,
  setLinkPopupOpen: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
};
