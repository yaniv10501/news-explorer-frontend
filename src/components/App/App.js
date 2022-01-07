import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
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

function App() {
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
      const img = new Image();
      img.onload = () => {
        console.log('imageLoaded');
      };
      img.src = aboutProfile;
      setCurrentUser(response);
      setLoggedIn(true);
    });
  }, []);
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
