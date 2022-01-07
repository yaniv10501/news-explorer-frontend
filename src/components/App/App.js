import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedCardList from '../SavedCardList/SavedCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
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
  }, []);
  return (
    <div className="page">
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
            element={
              loggedIn ? (
                <>
                  <SavedNewsHeader setIsHome={setIsHome} />
                  <SavedCardList>
                    <div className="news-card__keyword">{}</div>
                  </SavedCardList>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer isHome={isHome} homeRef={homeRef} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
