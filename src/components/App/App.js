import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import FontFaceObserver from 'fontfaceobserver';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedNews from '../SavedNews/SavedNews';
import { fetchReducer, initialState, useThunkReducer } from '../../utils/fetch';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import aboutProfile from '../../images/about-profile.jpeg';
import headerBackground from '../../images/header-background.jpg';
import headerBackgroundTablet from '../../images/header-background-tablet.jpg';
import headerBackgroundMobile from '../../images/header-background-mobile.jpg';

function App() {
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
  SourceSansProFont.load().then(() => {
    fontsLoaded = {
      ...fontsLoaded,
      source: true,
    };
  });
  interFont.load().then(() => {
    fontsLoaded = {
      ...fontsLoaded,
      inter: true,
    };
  });
  RobotoFont.load().then(() => {
    fontsLoaded = {
      ...fontsLoaded,
      roboto: true,
    };
  });
  RobotoSlabFont.load().then(() => {
    fontsLoaded = {
      ...fontsLoaded,
      robotoSlab: true,
    };
  });
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialState);
  const { loading } = state;
  const headerRef = useRef();
  const homeRef = useRef();
  const [isHome, setIsHome] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessRegisterPopupOpen, setIsSuccessRegisterPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const closeAllPopups = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSuccessRegisterPopupOpen(false);
  };
  useEffect(() => {
    smoothscroll.polyfill();
    mainApi.getUserMe(thunkDispatch).then((response) => {
      console.log(response);
      const headerBackgroundArray = [
        headerBackground,
        headerBackgroundTablet,
        headerBackgroundMobile,
      ];
      headerBackgroundArray.forEach((image) => {
        const img = new Image();
        img.onLoad = () => console.log('Loaded');
        img.src = image;
      });
      const img = new Image();
      img.onload = () => {
        console.log('Loaded about');
      };
      img.src = aboutProfile;
      setCurrentUser(response);
      setLoggedIn(true);
    });
  }, []);
  useEffect(() => {
    console.log(fontsLoaded);
    const { source, inter, roboto, robotoSlab } = fontsLoaded;
    if (source && inter && roboto && robotoSlab) {
      console.log('FontsLoaded');
      thunkDispatch({ type: 'IMAGES_LOADED' });
    }
  }, [fontsLoaded]);
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
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  setIsHome={setIsHome}
                  closeAllPopups={closeAllPopups}
                  isSigninPopupOpen={isSigninPopupOpen}
                  setIsSigninPopupOpen={setIsSigninPopupOpen}
                  isSignupPopupOpen={isSignupPopupOpen}
                  setIsSignupPopupOpen={setIsSignupPopupOpen}
                  isSuccessRegisterPopupOpen={isSuccessRegisterPopupOpen}
                  setIsSuccessRegisterPopupOpen={setIsSuccessRegisterPopupOpen}
                  homeRef={homeRef}
                  headerRef={headerRef}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/saved-news"
              element={loggedIn ? <SavedNews setIsHome={setIsHome} /> : <Navigate to="/" />}
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
