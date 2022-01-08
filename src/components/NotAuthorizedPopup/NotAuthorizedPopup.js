import React from 'react';
import PropTypes from 'prop-types';
import InfoTooltip from '../InfoToolTip/InfoTooltip';

function NotAuthorizedPopup({
  isNotAuthorizedPopupOpen,
  handleClose,
  setIsSigninPopupOpen,
  headerRef,
}) {
  return (
    <InfoTooltip
      isOpen={isNotAuthorizedPopupOpen}
      handleClose={handleClose}
      formMessage="Sign in to visit this page"
      popupBottomLink="Sign in"
      setLinkPopupOpen={setIsSigninPopupOpen}
      headerRef={headerRef}
    />
  );
}

NotAuthorizedPopup.propTypes = {
  isNotAuthorizedPopupOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
};

export default NotAuthorizedPopup;
