import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import './Header.css';
import lockScreen from '../../utils/lockScreen';
import mobileNavigation from '../../images/mobile-navigation.svg';
import mobileNavigationLight from '../../images/mobile-navigation-light.svg';
import closeIcon from '../../images/close-icon.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, setLoggedIn, isHome, setIsSigninPopupOpen, headerRef, thunkDispatch }) {
  const navigationRef = useRef();
  const mobileQuery = useMediaQuery({ query: '(max-width: 495px)' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(mobileNavigation);

  const handleClick = () => {
    if (menuOpen) {
      const animation = navigationRef.current.animate(
        [
          {
            transform: 'translateY(0)',
          },
          {
            transform: 'translateY(-15px)',
          },
          {
            transform: 'translateY(-50px)',
          },
          {
            transform: 'translateY(-150px)',
          },
          {
            transform: 'translateY(-550px)',
          },
        ],
        { duration: 550, easing: 'cubic-bezier(.5, .45, .7, .5)' }
      );
      animation.onfinish = () => setMenuOpen(!menuOpen);
      return;
    }
    setMenuOpen(!menuOpen);
  };
  const checkMobileMenuTheme = () => {
    if (!isHome) {
      setMenuIcon(mobileNavigationLight);
    }
    if (isHome) {
      setMenuIcon(mobileNavigation);
    }
  };
  useEffect(() => {
    if (menuOpen) {
      setMenuIcon(closeIcon);
    } else {
      checkMobileMenuTheme();
    }
  }, [menuOpen, isHome]);
  useEffect(() => {
    if (!mobileQuery) {
      setMenuOpen(false);
      checkMobileMenuTheme();
    }
  }, [mobileQuery]);
  useEffect(() => {
    lockScreen(menuOpen);
  }, [menuOpen]);
  return (
    <>
      <header
        className={isHome ? 'header' : 'header header_light'}
        style={menuOpen ? { backgroundColor: '#1A1B22' } : {}}
        ref={headerRef}
      >
        {
          // If mobile query and menu is open render the main color title, if not check if need to
          // render main color or light
        }
        {mobileQuery &&
          (menuOpen ? (
            <h2 className="header__title">NewsExplorer</h2>
          ) : (
            <h2 className={isHome ? 'header__title' : 'header__title header__title_light'}>
              NewsExplorer
            </h2>
          ))}
        {
          // If mobile query render the mobile button
        }
        {mobileQuery && (
          <div
            className="navigation__menu-icon"
            onClick={handleClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <img className="navigation__menu-icon-image" src={menuIcon} alt="mobile menu icon" />
          </div>
        )}
        {
          // If not mobile query render the Header title and the Navigation component
        }
        {!mobileQuery && (
          <>
            <h2 className={isHome ? 'header__title' : 'header__title header__title_light'}>
              NewsExplorer
            </h2>
            <Navigation
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isHome={isHome}
              setIsSigninPopupOpen={setIsSigninPopupOpen}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              navigationRef={navigationRef}
              thunkDispatch={thunkDispatch}
            />
          </>
        )}
      </header>
      {
        // If mobile query and menu is open render the Navigation component outside of header to
        // support putting the Navigation component behind header with z-index
      }
      {mobileQuery &&
        (menuOpen ? (
          <div className="navigation__mobile-overlay">
            <Navigation
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isHome={isHome}
              setIsSigninPopupOpen={setIsSigninPopupOpen}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              navigationRef={navigationRef}
            />
          </div>
        ) : (
          ''
        ))}
    </>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  isHome: PropTypes.bool.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
  thunkDispatch: PropTypes.func.isRequired,
};

export default Header;
