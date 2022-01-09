import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';
import { useMediaQuery } from 'react-responsive';
import lockScreen from '../../utils/lockScreen';

function Popup({
  handleClose,
  isOpen,
  name,
  popupBottomTitle,
  popupBottomLink,
  setLinkPopupOpen,
  headerRef,
  children,
}) {
  const handleClick = (event) => {
    if (event.target.className.includes('popup_opened')) {
      handleClose();
    }
  };
  const handleLinkClick = (event) => {
    event.preventDefault();
    handleClose();
    setTimeout(() => {
      setLinkPopupOpen(true);
    }, 350);
  };
  const mobileQuery = useMediaQuery({ query: '(max-width: 495px)' });
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
      onClick={handleClick}
      onKeyDown={() => {}}
      className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}
    >
      <div className="popup__container">
        {children}
        <p
          className={
            name === 'info'
              ? 'popup__bottom-title popup__bottom-title_type_info'
              : 'popup__bottom-title'
          }
        >
          {popupBottomTitle}
          <a className="popup__bottom-link" href={popupBottomTitle} onClick={handleLinkClick}>
            {popupBottomLink}
          </a>
        </p>
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

Popup.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  popupBottomTitle: PropTypes.string.isRequired,
  popupBottomLink: PropTypes.string.isRequired,
  setLinkPopupOpen: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object),
};

Popup.defaultProps = {
  children: [],
};

export default Popup;
