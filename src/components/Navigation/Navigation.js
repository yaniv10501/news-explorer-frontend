import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Navigation.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Navigation({
  loggedIn,
  setLoggedIn,
  isHome,
  setIsSigninPopupOpen,
  menuOpen,
  setMenuOpen,
  navigationRef,
}) {
  const currentUser = useContext(CurrentUserContext);
  const mobileQuery = useMediaQuery({ query: '(max-width: 495px)' });
  const navigate = useNavigate();
  const handleSavedArticlesClick = () => {
    if (!isHome) return;
    setMenuOpen(false);
    navigate('/saved-news');
  };
  const handleHomeClick = () => {
    if (isHome) return;
    setMenuOpen(false);
    navigate('/');
  };
  const handleSigninClick = () => {
    setMenuOpen(false);
    setIsSigninPopupOpen(true);
  };
  const handleSignOutClick = () => {
    setLoggedIn(false);
    navigate('/');
  };
  return (
    <ul className={menuOpen ? 'navigation navigation_open' : 'navigation'} ref={navigationRef}>
      {!mobileQuery &&
        (loggedIn ? (
          <>
            <li
              className={isHome ? 'navigation__item  navigation__item_active' : 'navigation__item'}
            >
              <div
                className={
                  isHome ? 'navigation__title' : 'navigation__title navigation__title_light'
                }
                onClick={handleHomeClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                Home
              </div>
            </li>
            <li
              className={
                isHome
                  ? 'navigation__item'
                  : 'navigation__item  navigation__item_active navigation__item_active_light'
              }
            >
              <div
                className={
                  isHome ? 'navigation__title' : 'navigation__title navigation__title_light'
                }
                onClick={handleSavedArticlesClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                Saved Articles
              </div>
            </li>
            <li className="navigation__item">
              <div
                className={
                  isHome
                    ? 'navigation__title navigation__title_user-action'
                    : 'navigation__title navigation__title_light navigation__title_user-action navigation__title_user-action_light'
                }
                onClick={handleSignOutClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                {currentUser.name}
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="navigation__item  navigation__item_active">
              <div className="navigation__title">Home</div>
            </li>
            <li className="navigation__item">
              <div
                className="navigation__title navigation__title_sign-in"
                onClick={handleSigninClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                Sign In
              </div>
            </li>
          </>
        ))}
      {mobileQuery &&
        (loggedIn ? (
          <>
            <li className="navigation__item">
              <div
                className="navigation__title"
                onClick={handleHomeClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                Home
              </div>
            </li>
            <li className="navigation__item">
              <div
                className="navigation__title"
                onClick={handleSavedArticlesClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                Saved Articles
              </div>
            </li>
            <li className="navigation__item">
              <div
                className="navigation__title navigation__title_user-action"
                onClick={handleSignOutClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                {currentUser.message}
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="navigation__item  navigation__item_active">
              <div className="navigation__title">Home</div>
            </li>
            <li className="navigation__item">
              <div
                className="navigation__title navigation__title_sign-in"
                onClick={handleSigninClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                Sign In
              </div>
            </li>
          </>
        ))}
    </ul>
  );
}

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  isHome: PropTypes.bool.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  navigationRef: PropTypes.instanceOf(Object).isRequired,
};

export default Navigation;
