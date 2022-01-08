import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';
import { isFunction } from 'lodash';
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
  resetForm,
  children,
}) {
  const handleClick = (event) => {
    if (event.target.className.includes('popup_opened')) {
      handleClose();
      if (isFunction(resetForm)) {
        resetForm();
      }
    }
  };
  const handleLinkClick = (event) => {
    event.preventDefault();
    handleClose();
    if (isFunction(resetForm)) {
      resetForm();
    }
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
        <p className="popup__bottom-title">
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
  resetForm: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

Popup.defaultProps = {
  resetForm: '',
  children: [],
};

export default Popup;
