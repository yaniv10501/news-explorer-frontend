import React from 'react';
import PropTypes from 'prop-types';
import InfoTooltip from '../InfoToolTip/InfoTooltip';

function NotAuthorizedPopup({
  isNotAuthorizedPopupOpen,
  closeAllPopups,
  setIsSigninPopupOpen,
  headerRef,
}) {
  return (
    <InfoTooltip
      isOpen={isNotAuthorizedPopupOpen}
      handleClose={closeAllPopups}
      formMessage="Sign in to visit this page"
      popupBottomLink="Sign in"
      setLinkPopupOpen={setIsSigninPopupOpen}
      headerRef={headerRef}
    />
  );
}

NotAuthorizedPopup.propTypes = {
  isNotAuthorizedPopupOpen: PropTypes.bool.isRequired,
  closeAllPopups: PropTypes.func.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
};

export default NotAuthorizedPopup;
