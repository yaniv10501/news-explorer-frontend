import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigationType,
  useNavigate,
} from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import FontFaceObserver from 'fontfaceobserver';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedNews from '../SavedNews/SavedNews';
import { fetchReducer, initialPageState, useThunkReducer } from '../../utils/fetch';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import aboutProfile from '../../images/about-profile.jpeg';
import headerBackground from '../../images/header-background.jpg';
import headerBackgroundTablet from '../../images/header-background-tablet.jpg';
import headerBackgroundMobile from '../../images/header-background-mobile.jpg';
import logoutIcon from '../../images/logout.svg';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialPageState);
  const { loading } = state;
  const headerRef = useRef();
  const homeRef = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHome, setIsHome] = useState(location.pathname === '/');
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessRegisterPopupOpen, setIsSuccessRegisterPopupOpen] = useState(false);
  const [isNotAuthorizedPopupOpen, setIsNotAuthorizedPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const closeAllPopups = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSuccessRegisterPopupOpen(false);
    setIsNotAuthorizedPopupOpen(false);
  };
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);
  useEffect(() => {
    if (location.pathname === '/') {
      const pageImages = [
        headerBackground,
        headerBackgroundTablet,
        headerBackgroundMobile,
        logoutIcon,
        aboutProfile,
      ];
      const pageImagesArrLength = pageImages.length * 2 - 1;
      pageImages.forEach((image) => {
        const img = new Image();
        img.src = image;
        img.decode().finally(() => {
          pageImages.push(true);
          if (pageImages.length === pageImagesArrLength) {
            thunkDispatch({ type: 'PAGE_IMAGES_LOADED' });
          }
        });
      });
    }
  }, [location]);
  useLayoutEffect(() => {
    const SourceSansProFont = new FontFaceObserver('Source Sans Pro');
    const interFont = new FontFaceObserver('Inter');
    const RobotoFont = new FontFaceObserver('Roboto');
    const RobotoSlabFont = new FontFaceObserver('Roboto-Slab');
    let fontsLoaded = {
      source: false,
      inter: false,
      roboto: false,
      robotoSlab: false,
    };
    const checkFontsLoaded = () => {
      const { source, inter, roboto, robotoSlab } = fontsLoaded;
      if (source && inter && roboto && robotoSlab) {
        thunkDispatch({ type: 'FONTS_LOADED' });
      }
    };
    SourceSansProFont.load().then(() => {
      fontsLoaded = {
        ...fontsLoaded,
        source: true,
      };
      checkFontsLoaded();
    });
    interFont.load().then(() => {
      fontsLoaded = {
        ...fontsLoaded,
        inter: true,
      };
      checkFontsLoaded();
    });
    RobotoFont.load().then(() => {
      fontsLoaded = {
        ...fontsLoaded,
        roboto: true,
      };
      checkFontsLoaded();
    });
    RobotoSlabFont.load().then(() => {
      fontsLoaded = {
        ...fontsLoaded,
        robotoSlab: true,
      };
      checkFontsLoaded();
    });
  }, []);
  useEffect(() => {
    if (location.pathname === '/') {
      if (navigationType === 'REPLACE') {
        mainApi.getUserMe(thunkDispatch).then((response) => {
          if (response.email) {
            setCurrentUser(response);
            setLoggedIn(true);
            navigate('/save-news');
            setIsHome(false);
          } else {
            setCurrentUser({});
            setLoggedIn(false);
            setIsHome(true);
            setIsNotAuthorizedPopupOpen(true);
          }
        });
      }
      if (navigationType === 'POP') {
        setIsHome(true);
        mainApi.getUserMe(thunkDispatch).then((response) => {
          if (response.email) {
            setCurrentUser(response);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        });
      }
    }
  }, [location]);
  return (
    <>
      <Preloader isLoading={loading} />
      <div className={loading ? 'page page_hidden' : 'page'}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            isHome={isHome}
            setIsSigninPopupOpen={setIsSigninPopupOpen}
            headerRef={headerRef}
            thunkDispatch={thunkDispatch}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  closeAllPopups={closeAllPopups}
                  isSigninPopupOpen={isSigninPopupOpen}
                  setIsSigninPopupOpen={setIsSigninPopupOpen}
                  isSignupPopupOpen={isSignupPopupOpen}
                  setIsSignupPopupOpen={setIsSignupPopupOpen}
                  isSuccessRegisterPopupOpen={isSuccessRegisterPopupOpen}
                  setIsSuccessRegisterPopupOpen={setIsSuccessRegisterPopupOpen}
                  isNotAuthorizedPopupOpen={isNotAuthorizedPopupOpen}
                  setIsNotAuthorizedPopupOpen={setIsNotAuthorizedPopupOpen}
                  homeRef={homeRef}
                  headerRef={headerRef}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedNews />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer isHome={isHome} homeRef={homeRef} />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
