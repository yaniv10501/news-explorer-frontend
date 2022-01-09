import React from 'react';
import PropTypes from 'prop-types';
import InfoTooltip from '../InfoToolTip/InfoTooltip';

function SuccessRegisterPopup({
  closeAllPopups,
  isSuccessRegisterPopupOpen,
  setIsSigninPopupOpen,
  headerRef,
}) {
  return (
    <InfoTooltip
      isOpen={isSuccessRegisterPopupOpen}
      handleClose={closeAllPopups}
      formMessage="Registration successfully completed!"
      popupBottomLink="Sign in"
      setLinkPopupOpen={setIsSigninPopupOpen}
      headerRef={headerRef}
    />
  );
}

SuccessRegisterPopup.propTypes = {
  closeAllPopups: PropTypes.func.isRequired,
  isSuccessRegisterPopupOpen: PropTypes.bool.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
};

export default SuccessRegisterPopup;
